import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { PAGE_SEO } from './seo/site';
const titleFor = (path: string) => PAGE_SEO.find((page) => page.path === path)!.title;
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: titleFor(''),
  },
  {
    path: 'sobre-mi',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
    title: titleFor('sobre-mi'),
  },
  {
    path: 'formacion',
    loadComponent: () => import('./pages/education/education').then((m) => m.Education),
    title: titleFor('formacion'),
  },
  {
    path: 'experiencia',
    loadComponent: () => import('./pages/experience/experience').then((m) => m.Experience),
    title: titleFor('experiencia'),
  },
  {
    path: 'proyectos',
    loadComponent: () => import('./pages/projects/projects').then((m) => m.Projects),
    title: titleFor('proyectos'),
  },
  { path: 'proyectos/ventas', redirectTo: '/proyectos/vendetico', pathMatch: 'full' },
  {
    path: 'proyectos/:id',
    canMatch: [
      (_route, segments) =>
        import('./data/projects').then(({ PROJECTS }) =>
          PROJECTS.some((project) => project.id === segments[1]?.path),
        ),
    ],
    loadComponent: () =>
      import('./pages/project-detail/project-detail').then((m) => m.ProjectDetail),
    resolve: {
      project: (route: ActivatedRouteSnapshot) =>
        import('./data/projects').then(({ PROJECTS }) =>
          PROJECTS.find((project) => project.id === route.paramMap.get('id')),
        ),
    },
    title: (route) =>
      import('./data/projects').then(
        ({ PROJECTS }) =>
          `${PROJECTS.find((project) => project.id === route.paramMap.get('id'))!.title} | Juan Pablo Rojas`,
      ),
  },
  {
    path: 'servicios',
    loadComponent: () => import('./pages/services/services').then((m) => m.Services),
    title: titleFor('servicios'),
  },
  {
    path: 'habilidades',
    loadComponent: () => import('./pages/skills/skills').then((m) => m.Skills),
    title: titleFor('habilidades'),
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
    title: titleFor('contacto'),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
    title: 'Página no encontrada | Juan Pablo Rojas',
    data: { notFound: true },
  },
];
