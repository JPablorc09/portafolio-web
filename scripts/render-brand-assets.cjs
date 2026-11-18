// Export code-native SVG branding with the locally installed Chrome; no image dependencies.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { spawn } = require('node:child_process');
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-brand-export-'));
const chrome = spawn(
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
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
      await delay(100);
    }
  }
  if (!port) throw Error('Chrome did not expose its debugging port');
  const pages = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  socket = new WebSocket(pages.find((page) => page.type === 'page').webSocketDebuggerUrl);
  await new Promise((resolve) => socket.addEventListener('open', resolve, { once: true }));
  let id = 0;
  const pending = new Map();
  socket.addEventListener('message', (event) => {
    const result = JSON.parse(event.data);
    if (result.id) {
      const task = pending.get(result.id);
      if (task) {
        clearTimeout(task.timer);
        pending.delete(result.id);
        result.error ? task.reject(result.error) : task.resolve(result.result);
      }
    }
  });
  const command = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const requestId = ++id;
      pending.set(requestId, {
        resolve,
        reject,
        timer: setTimeout(() => reject(Error(method + ' timed out')), 10000),
      });
      socket.send(JSON.stringify({ id: requestId, method, params }));
    });
  await command('Page.enable');
  await command('Emulation.setDefaultBackgroundColorOverride', { color: { r: 0, g: 0, b: 0, a: 0 } });
  for (const [source, width, height, destination] of [
    ['public/social-preview.svg', 1200, 630, 'src/assets/images/portafolio-social.png'],
    ['public/favicon.svg', 64, 64, 'public/portfolio.ico'],
  ]) {
    await command('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await command('Page.navigate', { url: pathToFileURL(path.resolve(source)).href });
    await delay(400);
    const result = await command('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false,
      omitBackground: true,
    });
    const png = Buffer.from(result.data, 'base64');
    if (destination.endsWith('.ico')) {
      const header = Buffer.alloc(22);
      header.writeUInt16LE(1, 2);
      header.writeUInt16LE(1, 4);
      header[6] = width;
      header[7] = height;
      header.writeUInt16LE(1, 10);
      header.writeUInt16LE(32, 12);
      header.writeUInt32LE(png.length, 14);
      header.writeUInt32LE(22, 18);
      fs.writeFileSync(destination, Buffer.concat([header, png]));
    } else fs.writeFileSync(destination, png);
    console.log(`Exported ${destination}: ${width}x${height}`);
  }
})()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    socket?.close();
    chrome.kill();
  });
