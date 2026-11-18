import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import assert from 'node:assert/strict';
const output = 'dist/portafolio-web';
const { routes } = JSON.parse(await readFile(join(output, 'prerendered-routes.json'), 'utf8'));
const canonicalFrom = (html) => {
  const tag = html.match(/<link\b[^>]*rel="canonical"[^>]*>/i)?.[0];
  const href = tag?.match(/href="([^"]+)"/)?.[1];
  assert(href, 'A prerendered page is missing its canonical URL');
  return href;
};
const home = await readFile(join(output, 'browser/index.html'), 'utf8');
const origin = new URL(canonicalFrom(home)).origin;
const urls = [];
for (const route of Object.keys(routes).sort()) {
  const html = await readFile(join(output, 'browser', route, 'index.html'), 'utf8');
  const canonical = canonicalFrom(html);
  assert.equal(canonical, origin + route, 'Canonical and generated route disagree');
  assert(
    !/<meta[^>]+content="noindex/i.test(html),
    'A non-indexable page must not enter the sitemap',
  );
  urls.push(canonical);
}
assert.equal(new Set(urls).size, urls.length, 'Duplicate canonical URLs');
const escapeXml = (value) =>
  value.replace(
    /[<>&"']/g,
    (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char],
  );
await writeFile(
  join(output, 'browser/sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`).join('\n') +
    '\n</urlset>\n',
);
await writeFile(
  join(output, 'browser/robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,
);
console.log(`Generated sitemap.xml (${urls.length} canonical routes) and robots.txt`);
