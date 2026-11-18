const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const { spawn } = require('node:child_process');
const assert = require('node:assert/strict');
const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const out = path.resolve('docs/revision-g');
fs.mkdirSync(out, { recursive: true });
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-portfolio-g-'));
const server = spawn(process.execPath, ['dist/portafolio-web/server/server.mjs'], {
  env: { ...process.env, PORT: '4198' },
  windowsHide: true,
  stdio: 'ignore',
});
const chrome = spawn(
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--disable-extensions',
    '--remote-debugging-port=0',
    `--user-data-dir=${profile}`,
    'about:blank',
  ],
  { windowsHide: true, stdio: 'ignore' },
);
let socket;
(async () => {
  let port;
  for (let i = 0; i < 100 && !port; i++) {
    try {
      port = fs.readFileSync(path.join(profile, 'DevToolsActivePort'), 'utf8').split('\n')[0];
    } catch {
      await delay(150);
    }
  }
  assert(port, 'Chrome debugging port unavailable');
  for (let i = 0; i < 100; i++) {
    try {
      if ((await fetch('http://localhost:4198')).ok) break;
    } catch {}
    await delay(100);
  }
  const pages = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  socket = new WebSocket(pages.find((p) => p.type === 'page').webSocketDebuggerUrl);
  await new Promise((r) => socket.addEventListener('open', r, { once: true }));
  const pending = new Map(),
    errors = [],
    expectedNotFoundNetwork = [];
  let id = 0;
  socket.addEventListener('message', (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id) {
      const p = pending.get(msg.id);
      if (p) {
        clearTimeout(p.timer);
        pending.delete(msg.id);
        msg.error ? p.reject(msg.error) : p.resolve(msg.result);
      }
    }
    if (msg.method === 'Runtime.exceptionThrown') errors.push(msg.params.exceptionDetails);
    if (msg.method === 'Log.entryAdded' && msg.params.entry.level === 'error') {
      const entry = msg.params.entry;
      if (entry.text.includes('404') && entry.url === 'http://localhost:4198/proyectos/no-existe')
        expectedNotFoundNetwork.push(entry.url);
      else errors.push({ text: entry.text, url: entry.url });
    }
    if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error')
      errors.push(msg.params.args.map((arg) => arg.description || arg.value).join(' '));
  });
  const command = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const n = ++id;
      pending.set(n, {
        resolve,
        reject,
        timer: setTimeout(() => reject(Error(method + ' timeout')), 12000),
      });
      socket.send(JSON.stringify({ id: n, method, params }));
    });
  const evaluate = async (expression) => {
    const r = await command('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (r.exceptionDetails) throw Error(JSON.stringify(r.exceptionDetails));
    return r.result.value;
  };
  await command('Page.enable');
  await command('Runtime.enable');
  await command('Log.enable');
  const ready = async (route) => {
    for (let i = 0; i < 100; i++) {
      if (
        await evaluate(
          `location.pathname===${JSON.stringify(route.split('?')[0].split('#')[0])} && !!document.querySelector('main h1')`,
        )
      ) {
        await delay(180);
        return;
      }
      await delay(100);
    }
    throw Error('Route not ready: ' + route);
  };
  const navigate = async (route) => {
    await command('Page.navigate', { url: 'http://localhost:4198' + route });
    await ready(route);
  };
  const viewport = async (width) => {
    await command('Emulation.setDeviceMetricsOverride', {
      width,
      height: 1100,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await delay(120);
  };
  const screenshot = async (name) => {
    const r = await command('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false,
    });
    fs.writeFileSync(path.join(out, name + '.png'), Buffer.from(r.data, 'base64'));
  };
  const scrollTo = async (selector) => {
    await evaluate(
      `scrollTo({top:document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect().top+scrollY-24,behavior:'instant'})`,
    );
    await delay(100);
  };
  const label = process.argv[2] || 'despues';
  await viewport(390);
  await command('Emulation.setCPUThrottlingRate', { rate: 4 });
  await command('Network.enable');
  await command('Network.setCacheDisabled', { cacheDisabled: true });
  await command('Network.emulateNetworkConditions', {
    offline: false,
    latency: 80,
    downloadThroughput: 500000,
    uploadThroughput: 125000,
    connectionType: 'cellular4g',
  });
  await command('Page.addScriptToEvaluateOnNewDocument', {
    source: `
    window.__lab = {lcp:null, cls:0, sessionValue:0, sessionStart:0, lastShift:0, interactions:[]};
    new PerformanceObserver(list => {for(const e of list.getEntries()) window.__lab.lcp={ms:e.startTime,tag:e.element?.tagName,text:e.element?.textContent?.slice(0,110),url:e.url};}).observe({type:'largest-contentful-paint',buffered:true});
    new PerformanceObserver(list => {for(const e of list.getEntries()){if(e.hadRecentInput)continue;const m=window.__lab;if(e.startTime-m.lastShift>1000||e.startTime-m.sessionStart>5000){m.sessionStart=e.startTime;m.sessionValue=0;}m.sessionValue+=e.value;m.lastShift=e.startTime;m.cls=Math.max(m.cls,m.sessionValue);}}).observe({type:'layout-shift',buffered:true});
    new PerformanceObserver(list => {for(const e of list.getEntries())if(e.interactionId)window.__lab.interactions.push({duration:e.duration,name:e.name,id:e.interactionId});}).observe({type:'event',buffered:true,durationThreshold:16});
  `,
  });
  const runs = [];
  for (const route of ['/', '/proyectos', '/proyectos/ventas']) {
    for (let run = 1; run <= 3; run++) {
      await command('Network.clearBrowserCache');
      await command('Page.navigate', { url: 'http://localhost:4198' + route });
      await delay(8000);
      const metrics = await evaluate(
        `({lcp:window.__lab.lcp,cls:window.__lab.cls,fcp:performance.getEntriesByName('first-contentful-paint')[0]?.startTime,domReady:performance.getEntriesByType('navigation')[0]?.domContentLoadedEventEnd,resources:performance.getEntriesByType('resource').map(e=>({url:e.name,bytes:e.encodedBodySize,transfer:e.transferSize,type:e.initiatorType,duration:e.duration})),images:[...document.images].map(i=>({src:i.currentSrc,complete:i.complete,width:i.naturalWidth}))})`,
      );
      assert(metrics.lcp, route + ' missing LCP');
      runs.push({ route, run, ...metrics });
      console.log(JSON.stringify({ label, route, run, lcp: metrics.lcp.ms, cls: metrics.cls }));
    }
  }
  const summary = ['/', '/proyectos', '/proyectos/ventas'].map((route) => {
    const samples = runs.filter((r) => r.route === route);
    const median = (values) => values.sort((a, b) => a - b)[Math.floor(values.length / 2)];
    return {
      route,
      lcpMedianMs: median(samples.map((r) => r.lcp.ms)),
      fcpMedianMs: median(samples.map((r) => r.fcp)),
      clsMax: Math.max(...samples.map((r) => r.cls)),
      localImageBytesMedian: median(
        samples.map((r) =>
          r.resources.filter((e) => e.type === 'img').reduce((sum, e) => sum + e.bytes, 0),
        ),
      ),
    };
  });
  await command('Network.emulateNetworkConditions', {
    offline: false,
    latency: 0,
    downloadThroughput: -1,
    uploadThroughput: -1,
  });
  const report = {
    date: new Date().toISOString(),
    label,
    conditions: {
      viewport: '390x1100',
      cpuSlowdown: 4,
      latencyMs: 80,
      downloadBytesPerSecond: 500000,
      cache: 'disabled',
      samplesPerRoute: 3,
      observationWindowMs: 8000,
      server: 'local Express, uncompressed assets',
    },
    summary,
    runs,
    consoleErrors: errors,
  };
  fs.writeFileSync(
    path.join(out, 'rendimiento-' + label + '.json'),
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(summary));
})()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => {
    if (socket) socket.close();
    chrome.kill();
    server.kill();
  });
