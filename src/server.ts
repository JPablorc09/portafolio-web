import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import {
  createWebRequestFromNodeRequest,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import {
  getAllowedHosts,
  getContext,
  getTrustProxyHeaders,
} from '@netlify/angular-runtime/app-engine.js';
import express from 'express';
import { join } from 'node:path';

const angularAppEngine = new AngularAppEngine({
  allowedHosts:
    process.env['NETLIFY'] === 'true' || process.env['SITE_ID']
      ? getAllowedHosts()
      : ['localhost', '127.0.0.1'],
  trustProxyHeaders: getTrustProxyHeaders(),
});
export async function netlifyAppEngineHandler(request: Request): Promise<Response> {
  const result =
    (await angularAppEngine.handle(request, getContext())) ||
    new Response('Not found', { status: 404 });
  const headers = new Headers(result.headers);
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  if (result.status >= 400) headers.set('Cache-Control', 'no-store');
  return new Response(result.body, {
    status: result.status,
    statusText: result.statusText,
    headers,
  });
}
export const reqHandler = createRequestHandler(netlifyAppEngineHandler);

if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const app = express();
  app.disable('x-powered-by');
  app.use((_request, response, next) => {
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });
  // Serve generated HTML, including directory indexes, before the SSR fallback.
  app.use(
    express.static(join(import.meta.dirname, '../browser'), {
      index: 'index.html',
      redirect: false,
      maxAge: '1h',
      setHeaders: (response, filePath) => {
        if (filePath.endsWith('.html')) response.setHeader('Cache-Control', 'no-cache');
        else if (filePath.includes('optimized') || /-[A-Z0-9]+\.(js|css)$/.test(filePath))
          response.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        else if (filePath.endsWith('.woff2'))
          response.setHeader('Cache-Control', 'public, max-age=604800');
      },
    }),
  );
  app.use((request, response, next) => {
    netlifyAppEngineHandler(createWebRequestFromNodeRequest(request))
      .then((result) => writeResponseToNodeResponse(result, response))
      .catch(next);
  });
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => console.log(`Node Express server listening on http://localhost:${port}`));
}
