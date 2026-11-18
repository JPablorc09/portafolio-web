import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { PROJECTS } from './data/projects';
import { PAGE_SEO } from './seo/site';
export const serverRoutes: ServerRoute[] = [
  ...PAGE_SEO.map((page) => ({ path: page.path, renderMode: RenderMode.Prerender }) as const),
  { path: 'proyectos/ventas', renderMode: RenderMode.Server, status: 301 },
  {
    path: 'proyectos/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => PROJECTS.map((project) => ({ id: project.id })),
    fallback: PrerenderFallback.Server,
  },
  { path: '**', renderMode: RenderMode.Server, status: 404 },
];
