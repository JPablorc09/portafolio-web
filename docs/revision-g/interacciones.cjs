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
  await viewport(390);
  await command('Emulation.setCPUThrottlingRate',{rate:4});
  await navigate('/proyectos');await delay(1200);
  await evaluate(`window.events=[];window.tasks=[];new PerformanceObserver(list=>{for(const e of list.getEntries())if(e.interactionId)window.events.push({id:e.interactionId,duration:e.duration,name:e.name});}).observe({type:'event',durationThreshold:16});new PerformanceObserver(list=>window.tasks.push(...list.getEntries().map(e=>({start:e.startTime,duration:e.duration})))).observe({type:'longtask'});`);
  const click=async selector=>{
    const point=await evaluate(`(()=>{const e=document.querySelector(${JSON.stringify(selector)});e.scrollIntoView({block:'center',behavior:'instant'});const r=e.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2};})()`);
    await command('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',clickCount:1,...point});
    await command('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',clickCount:1,...point});await delay(350);
  };
  await command('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  await click('.navbar__toggle');await click('.navbar__toggle');
  const cycles=[];
  for(let cycle=0;cycle<3;cycle++){
    for(const index of [2,3,4]){
      await click('.project-filter:nth-child('+index+')');
      assert((await evaluate(`document.querySelectorAll('.project-grid > li').length`))<9);
      await click('.catalog-toolbar button');
      assert.equal(await evaluate(`document.querySelectorAll('.project-grid > li').length`),9);
    }
    cycles.push(await evaluate(`({entries:window.events,mainThreadLongTasks:window.tasks})`));
  }
  const events=await evaluate('window.events');
  const groups=new Map();for(const event of events)groups.set(event.id,Math.max(groups.get(event.id)||0,event.duration));
  const durations=[...groups.values()].sort((a,b)=>a-b);
  const report={date:new Date().toISOString(),conditions:{viewport:'390x1100',deviceScaleFactor:1,cpuSlowdown:4,network:'local, no network throttle',session:'new Chrome profile; no pixel-validation workload',eventThresholdMs:16},interactionsObserved:durations.length,medianObservedMs:durations[Math.floor(durations.length/2)],maxObservedMs:Math.max(...durations),cycles,consoleErrors:errors};
  assert.equal(errors.length,0,JSON.stringify(errors));
  fs.writeFileSync(path.join(out,'interacciones.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({interactionsObserved:report.interactionsObserved,medianObservedMs:report.medianObservedMs,maxObservedMs:report.maxObservedMs}));
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>{if(socket)socket.close();chrome.kill();server.kill();});
