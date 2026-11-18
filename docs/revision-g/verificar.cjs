const fs = require('node:fs');
const crypto = require('node:crypto');
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
  const imageInventory = JSON.parse(fs.readFileSync('docs/revision-g/imagenes.json', 'utf8'));
  const pixelChecks = [];
  await evaluate(`window.hashImage = async url => {
    const image = new Image(); image.src = url; await image.decode();
    const canvas = document.createElement('canvas'); canvas.width=image.naturalWidth; canvas.height=image.naturalHeight;
    const context=canvas.getContext('2d',{willReadFrequently:true}); context.drawImage(image,0,0);
    const bytes=context.getImageData(0,0,canvas.width,canvas.height).data;
    const hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))).map(v=>v.toString(16).padStart(2,'0')).join('');
    const result={width:canvas.width,height:canvas.height,hash}; canvas.width=0;canvas.height=0;return result;
  }`);
  for (const image of imageInventory.images) {
    const originalBytes = fs.readFileSync(path.join('src', image.source));
    assert.equal(
      crypto.createHash('sha256').update(originalBytes).digest('hex'),
      image.originalSha256,
    );
    const original = await evaluate(`window.hashImage(${JSON.stringify(image.source)})`);
    const full = image.variants.find((variant) => variant.width === image.width);
    const optimized = await evaluate(`window.hashImage(${JSON.stringify(full.src)})`);
    assert.deepEqual(optimized, original, 'Decoded pixels changed: ' + image.source);
    for (const variant of image.variants) {
      const dimensions = await evaluate(
        `(async()=>{const i=new Image();i.src=${JSON.stringify(variant.src)};await i.decode();return {width:i.naturalWidth,height:i.naturalHeight};})()`,
      );
      assert.equal(dimensions.width, variant.width);
      assert(Math.abs(dimensions.height - (image.height * variant.width) / image.width) <= 1);
    }
    pixelChecks.push({
      source: image.source,
      originalSha256: image.originalSha256,
      decodedPixelSha256: original.hash,
      identical: true,
      variants: image.variants.length,
    });
  }
  const cacheChecks = [];
  for (const resource of [
    imageInventory.images[0].variants[0].src,
    '/assets/fonts/inter-latin.woff2',
    '/',
    '/proyectos/no-existe',
  ]) {
    const response = await fetch('http://localhost:4198' + resource);
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
    assert.equal(response.headers.get('referrer-policy'), 'strict-origin-when-cross-origin');
    const cache = response.headers.get('cache-control');
    if (resource.includes('/optimized/')) assert(cache.includes('immutable'));
    if (resource.endsWith('.woff2')) assert(cache.includes('604800'));
    if (resource === '/') assert(cache.includes('no-cache'));
    if (resource.endsWith('no-existe')) assert(cache.includes('no-store'));
    cacheChecks.push({ resource, cache, status: response.status });
  }
  await command('Network.enable');
  await command('Network.setBlockedURLs', {
    urls: ['*fonts.googleapis.com*', '*fonts.gstatic.com*'],
  });
  await navigate('/');
  await evaluate(`document.fonts.load('400 16px Inter')`);
  await evaluate('document.fonts.ready');
  assert(await evaluate(`document.fonts.check('400 16px Inter')`));
  const externalResources = await evaluate(
    `performance.getEntriesByType('resource').map(e=>e.name).filter(url=>new URL(url).origin!==location.origin)`,
  );
  assert.deepEqual(externalResources, []);
  await command('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
  });
  assert.equal(await evaluate(`getComputedStyle(document.documentElement).scrollBehavior`), 'auto');
  await navigate('/proyectos');
  await viewport(390);
  await delay(400);
  const cards = await evaluate(
    `[...document.querySelectorAll('app-project-card img')].map(i=>({src:i.currentSrc,loading:i.loading,priority:i.fetchPriority,width:i.getAttribute('width'),height:i.getAttribute('height'),fit:getComputedStyle(i).objectFit}))`,
  );
  assert.equal(cards[0].loading, 'eager');
  assert.equal(cards[0].priority, 'high');
  for (const card of cards) {
    assert(card.src.includes('/optimized/'));
    assert(Number(card.width) > 0 && Number(card.height) > 0);
    assert.equal(card.fit, 'contain');
  }
  assert.equal(
    await evaluate(
      `getComputedStyle(document.querySelector('.project-filter')).transitionDuration`,
    ),
    '0s',
  );
  await screenshot('catalogo-movil');
  await command('Emulation.setCPUThrottlingRate', { rate: 4 });
  await evaluate(
    `window.interactions=[];new PerformanceObserver(list=>{for(const e of list.getEntries())if(e.interactionId)window.interactions.push({id:e.interactionId,duration:e.duration,name:e.name});}).observe({type:'event',buffered:true,durationThreshold:16})`,
  );
  const click = async (selector) => {
    const point = await evaluate(
      `(()=>{const element=document.querySelector(${JSON.stringify(selector)});element.scrollIntoView({block:'center',behavior:'instant'});const r=element.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2};})()`,
    );
    await command('Input.dispatchMouseEvent', {
      type: 'mousePressed',
      button: 'left',
      clickCount: 1,
      ...point,
    });
    await command('Input.dispatchMouseEvent', {
      type: 'mouseReleased',
      button: 'left',
      clickCount: 1,
      ...point,
    });
    await delay(250);
  };
  await click('.navbar__toggle');
  assert.equal(
    await evaluate(`document.querySelector('.navbar__toggle').getAttribute('aria-expanded')`),
    'true',
  );
  await command('Input.dispatchKeyEvent', {
    type: 'keyDown',
    key: 'Escape',
    code: 'Escape',
    windowsVirtualKeyCode: 27,
  });
  await command('Input.dispatchKeyEvent', {
    type: 'keyUp',
    key: 'Escape',
    code: 'Escape',
    windowsVirtualKeyCode: 27,
  });
  assert.equal(
    await evaluate(`document.querySelector('.navbar__toggle').getAttribute('aria-expanded')`),
    'false',
  );
  await click('.project-filter:nth-child(2)');
  assert((await evaluate(`document.querySelectorAll('.project-grid > li').length`)) < 9);
  await click('.catalog-toolbar button');
  assert.equal(await evaluate(`document.querySelectorAll('.project-grid > li').length`), 9);
  const interactionSamples = await evaluate('window.interactions');
  await command('Emulation.setCPUThrottlingRate', { rate: 1 });
  await navigate('/proyectos/ventas');
  await delay(400);
  await click('.detail-cover');
  await delay(300);
  assert.equal(await evaluate(`document.activeElement.className`), 'project-lightbox__close');
  const firstSrc = await evaluate(`document.querySelector('.project-lightbox__image img').src`);
  await command('Input.dispatchKeyEvent', {
    type: 'keyDown',
    key: 'ArrowRight',
    code: 'ArrowRight',
    windowsVirtualKeyCode: 39,
  });
  await command('Input.dispatchKeyEvent', {
    type: 'keyUp',
    key: 'ArrowRight',
    code: 'ArrowRight',
    windowsVirtualKeyCode: 39,
  });
  await delay(150);
  assert.notEqual(
    await evaluate(`document.querySelector('.project-lightbox__image img').src`),
    firstSrc,
  );
  await evaluate(`document.querySelector('.project-lightbox__image img').decode()`);
  await screenshot('galeria-movil');
  await command('Input.dispatchKeyEvent', {
    type: 'keyDown',
    key: 'Escape',
    code: 'Escape',
    windowsVirtualKeyCode: 27,
  });
  await command('Input.dispatchKeyEvent', {
    type: 'keyUp',
    key: 'Escape',
    code: 'Escape',
    windowsVirtualKeyCode: 27,
  });
  await delay(150);
  assert.equal(await evaluate(`document.activeElement.className`), 'detail-cover');
  await screenshot('detalle-movil');
  await viewport(1440);
  await evaluate(`scrollTo({top:0,behavior:'instant'})`);
  await screenshot('detalle-escritorio');
  const luminance = (hex) =>
    hex
      .match(/\w\w/g)
      .map((value) => parseInt(value, 16) / 255)
      .map((value) => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4))
      .reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
  const contrastChecks = [
    ['f1f5fb', '2563eb', 4.5],
    ['b0bfd3', '111c2e', 4.5],
    ['83b4ff', '111c2e', 4.5],
    ['506b91', '111c2e', 3],
  ].map(([foreground, background, minimum]) => {
    const a = luminance(foreground),
      b = luminance(background),
      ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    assert(ratio >= minimum);
    return { foreground, background, ratio, minimum };
  });
  await evaluate(`document.querySelector('.detail-cover img').dispatchEvent(new Event('error'))`);
  assert.equal(
    await evaluate(`document.querySelector('.detail-cover img').getAttribute('src')`),
    '/assets/images/ventas/ImagenPrincipalVentas.png',
  );
  await evaluate(`document.querySelector('.detail-cover img').decode()`);
  await evaluate(`document.querySelector('.detail-cover img').dispatchEvent(new Event('error'))`);
  assert.equal(
    await evaluate(`document.querySelector('.detail-cover img').getAttribute('src')`),
    '/assets/images/projects/project-placeholder.svg',
  );
  assert.equal(
    await evaluate(`document.querySelector('.detail-cover img').hasAttribute('srcset')`),
    false,
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
    originalFilesByteIdentical: true,
    pixelChecks,
    cacheChecks,
    externalResources,
    responsiveCards: cards,
    reducedMotion: true,
    nativeKeyboardGallery: true,
    originalImageFallback: true,
    interactionSamples,
    contrastChecks,
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
      originalFilesByteIdentical: true,
      pixelChecks,
      cacheChecks,
      externalResources,
      responsiveCards: cards,
      reducedMotion: true,
      nativeKeyboardGallery: true,
      originalImageFallback: true,
      interactionSamples,
      contrastChecks,
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
