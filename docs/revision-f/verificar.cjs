const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const { spawn } = require('node:child_process');
const assert = require('node:assert/strict');
const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const out = path.resolve('docs/revision-f');
fs.mkdirSync(out, { recursive: true });
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-portfolio-f-'));
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
      if (entry.text.includes('404') && entry.url === 'http://localhost:4198/proyectos/no-existe') expectedNotFoundNetwork.push(entry.url);
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
  const manifest = JSON.parse(
    fs.readFileSync('dist/portafolio-web/prerendered-routes.json', 'utf8'),
  );
  const routes = Object.keys(manifest.routes);
  assert.equal(routes.length, 17);
  const origin = 'https://portafolioprofesionaljuanpablorojasc.netlify.app';
  const httpChecks = [],
    titles = new Set();
  for (const route of routes) {
    const response = await fetch('http://localhost:4198' + route, {
      headers: { 'User-Agent': 'Googlebot' },
    });
    const html = await response.text();
    assert.equal(response.status, 200, route);
    const doc = new JSDOM(html).window.document;
    assert(
      doc.querySelector('main h1')?.textContent.trim(),
      route + ' must render without JavaScript',
    );
    assert.equal(doc.querySelectorAll('link[rel="canonical"]').length, 1);
    assert.equal(doc.querySelector('link[rel="canonical"]').href, origin + route);
    const title = doc.title;
    assert(!titles.has(title), 'duplicate title ' + title);
    titles.add(title);
    const description = doc.querySelector('meta[name="description"]').content;
    assert(description.length > 40);
    assert.equal(doc.querySelectorAll('meta[name="description"]').length, 1);
    assert.equal(doc.querySelector('meta[property="og:title"]').content, title);
    assert.equal(doc.querySelector('meta[name="twitter:title"]').content, title);
    assert.equal(doc.querySelector('meta[property="og:url"]').content, origin + route);
    assert.equal(
      doc.querySelector('meta[property="og:image"]').content,
      origin + '/assets/images/portafolio-social.png',
    );
    assert.equal(
      doc.querySelector('meta[name="robots"]').content,
      'index, follow, max-image-preview:large',
    );
    const graph = JSON.parse(doc.querySelector('#portfolio-structured-data').textContent)['@graph'];
    assert(
      graph.some(
        (node) => node['@type'] === 'Person' && node.name === 'Juan Pablo Rojas Contreras',
      ),
    );
    if (route.startsWith('/proyectos/'))
      assert(graph.some((node) => node['@type'] === 'CreativeWork'));
    if (
      [
        '/proyectos/incidentes',
        '/proyectos/fallapp',
        '/proyectos/asms',
        '/proyectos/prtg',
      ].includes(route)
    ) {
      assert.equal(doc.querySelector('.detail-gallery'), null);
      assert.equal(doc.querySelector('main a[href*="github.com"]'), null);
      const work = graph.find((node) => node['@type'] === 'CreativeWork');
      assert.equal(work.image, undefined);
      assert.equal(work.codeRepository, undefined);
    }
    httpChecks.push({
      route,
      status: response.status,
      title,
      description,
      canonical: doc.querySelector('link[rel="canonical"]').href,
      h1: doc.querySelector('main h1').textContent.trim(),
    });
  }
  const invalidRoutes = [
    '/ruta-inexistente',
    '/proyectos/no-existe',
    '/proyectos/control-financiero',
    '/proyectos/incidentes-clean-architecture',
  ];
  const notFoundChecks = [];
  for (const route of invalidRoutes) {
    const response = await fetch('http://localhost:4198' + route, { redirect: 'manual' });
    assert.equal(response.status, 404, route);
    const doc = new JSDOM(await response.text()).window.document;
    assert(doc.querySelector('main h1').textContent.includes('Página no encontrada'));
    assert.equal(doc.querySelector('meta[name="robots"]').content, 'noindex, follow');
    assert.equal(doc.querySelector('#portfolio-structured-data'), null);
    assert.equal(response.headers.get('location'), null);
    notFoundChecks.push({
      route,
      status: response.status,
      robots: doc.querySelector('meta[name="robots"]').content,
    });
  }
  const sitemapResponse = await fetch('http://localhost:4198/sitemap.xml');
  assert.equal(sitemapResponse.status, 200);
  const xml = new JSDOM(await sitemapResponse.text(), { contentType: 'application/xml' }).window
    .document;
  const urls = [...xml.querySelectorAll('loc')].map((loc) => loc.textContent);
  assert.deepEqual(urls.sort(), routes.map((route) => origin + route).sort());
  const robotsResponse = await fetch('http://localhost:4198/robots.txt');
  assert.equal(robotsResponse.status, 200);
  assert((await robotsResponse.text()).includes('Sitemap: ' + origin + '/sitemap.xml'));
  const imageResponse = await fetch('http://localhost:4198/assets/images/portafolio-social.png');
  assert.equal(imageResponse.status, 200);
  const png = Buffer.from(await imageResponse.arrayBuffer());
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
  for (const file of ['/favicon.svg', '/portfolio.ico'])
    assert.equal((await fetch('http://localhost:4198' + file)).status, 200);
  const browserChecks = [];
  for (const route of routes) {
    await navigate(route);
    const metadata = await evaluate(
      `({title:document.title,canonical:document.querySelector('link[rel="canonical"]').href,description:document.querySelector('meta[name="description"]').content})`,
    );
    assert.equal(metadata.canonical, origin + route);
    for (const width of [320, 390, 768, 1440]) {
      await viewport(width);
      const r = await evaluate(
        `({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,main:document.querySelectorAll('main').length,h1:document.querySelectorAll('main h1').length})`,
      );
      assert(r.scrollWidth <= width + 1, route + ' overflow ' + width);
      assert.equal(r.main, 1);
      assert.equal(r.h1, 1);
      browserChecks.push({ route, ...r });
    }
  }
  await navigate('/contacto?plan=profesional#cotizar');
  await delay(700);
  assert(
    (await evaluate(`document.querySelector('.selected-plan')?.textContent`)).includes(
      'Profesional',
    ),
  );
  assert.equal(
    await evaluate(`document.querySelector('link[rel="canonical"]').href`),
    origin + '/contacto',
  );
  await navigate('/proyectos/ventas');
  await delay(400);
  await evaluate(`document.querySelector('a[href="/proyectos/prtg"]').click()`);
  await ready('/proyectos/prtg');
  assert.equal(
    await evaluate(`document.querySelector('meta[property="og:url"]').content`),
    origin + '/proyectos/prtg',
  );
  await evaluate(`document.querySelector('a[href="/proyectos/escaneatodo"]').click()`);
  await ready('/proyectos/escaneatodo');
  assert.equal(
    await evaluate(`document.querySelector('link[rel="canonical"]').href`),
    origin + '/proyectos/escaneatodo',
  );
  await navigate('/proyectos/no-existe');
  await viewport(1440);
  await screenshot('404-escritorio');
  await viewport(390);
  await screenshot('404-movil');
  await evaluate(`document.querySelector('main a[href="/proyectos"]').click()`);
  await ready('/proyectos');
  assert.equal(
    await evaluate(`document.querySelector('meta[name="robots"]').content`),
    'index, follow, max-image-preview:large',
  );
  const cv = await fetch(
    'http://localhost:4198/assets/documents/CV_Juan_Pablo_Rojas_Contreras.pdf',
  );
  assert.equal(cv.status, 200);
  assert.equal(errors.length, 0, JSON.stringify(errors));
  const report = {
    date: new Date().toISOString(),
    httpChecks,
    notFoundChecks,
    sitemapUrls: urls,
    robots: true,
    socialImage: { width: 1200, height: 630 },
    browserChecks,
    projectNavigation: true,
    quotationHydration: true,
    notFoundRecovery: true,
    cvStatus: cv.status,
    consoleErrors: errors,
    expectedNotFoundNetwork,
  };
  fs.writeFileSync(path.join(out, 'verificacion.json'), JSON.stringify(report, null, 2));
  console.log(
    JSON.stringify({
      httpPages: httpChecks.length,
      http404: notFoundChecks.length,
      sitemap: urls.length,
      browserChecks: browserChecks.length,
      consoleErrors: errors,
    expectedNotFoundNetwork,
    }),
  );
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
