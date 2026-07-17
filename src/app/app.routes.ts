import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home')
        .then(component => component.Home),
    title: 'Inicio | Juan Pablo Rojas'
  },
  {
    path: 'sobre-mi',
    loadComponent: () =>
      import('./pages/about/about')
        .then(component => component.About),
    title: 'Sobre mí | Juan Pablo Rojas'
  },
  {
    path: 'experiencia',
    loadComponent: () =>
      import('./pages/experience/experience')
        .then(component => component.Experience),
    title: 'Experiencia | Juan Pablo Rojas'
  },
  {
    path: 'proyectos',
    loadComponent: () =>
      import('./pages/projects/projects')
        .then(component => component.Projects),
    title: 'Proyectos | Juan Pablo Rojas'
  },
  {
  path: 'proyectos/:id',
  loadComponent: () =>
    import('./pages/project-detail/project-detail')
      .then(component => component.ProjectDetail),
  title: 'Detalle del proyecto | Juan Pablo Rojas'
},
  {
    path: 'habilidades',
    loadComponent: () =>
      import('./pages/skills/skills')
        .then(component => component.Skills),
    title: 'Habilidades | Juan Pablo Rojas'
  },
  {
    path: 'formacion',
    loadComponent: () =>
      import('./pages/education/education')
        .then(component => component.Education),
    title: 'Formación | Juan Pablo Rojas'
  },
  {
    path: 'contacto',
    loadComponent: () =>
      import('./pages/contact/contact')
        .then(component => component.Contact),
    title: 'Contacto | Juan Pablo Rojas'
  },
  {
    path: '**',
    redirectTo: ''
  }
];