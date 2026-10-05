import { Routes } from '@angular/router';

export const routes: Routes = [

  // ============================================================
  // INICIO
  // ============================================================
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home')
        .then(component => component.Home),
    title: 'Inicio | Juan Pablo Rojas'
  },


  // ============================================================
  // SOBRE MÍ
  // ============================================================
  {
    path: 'sobre-mi',
    loadComponent: () =>
      import('./pages/about/about')
        .then(component => component.About),
    title: 'Sobre mí | Juan Pablo Rojas'
  },


  // ============================================================
  // FORMACIÓN
  // ============================================================
  {
    path: 'formacion',
    loadComponent: () =>
      import('./pages/education/education')
        .then(component => component.Education),
    title: 'Formación | Juan Pablo Rojas'
  },


  // ============================================================
  // EXPERIENCIA
  // ============================================================
  {
    path: 'experiencia',
    loadComponent: () =>
      import('./pages/experience/experience')
        .then(component => component.Experience),
    title: 'Experiencia | Juan Pablo Rojas'
  },


  // ============================================================
  // PROYECTOS
  // ============================================================
  {
    path: 'proyectos',
    loadComponent: () =>
      import('./pages/projects/projects')
        .then(component => component.Projects),
    title: 'Proyectos | Juan Pablo Rojas'
  },


  // ============================================================
  // DETALLE DE PROYECTO
  // ============================================================
  {
    path: 'proyectos/:id',
    loadComponent: () =>
      import('./pages/project-detail/project-detail')
        .then(component => component.ProjectDetail),
    title: 'Detalle del proyecto | Juan Pablo Rojas'
  },


  // ============================================================
  // SERVICIOS
  // ============================================================
  {
    path: 'servicios',
    loadComponent: () =>
      import('./pages/services/services')
        .then(component => component.Services),
    title: 'Servicios | Juan Pablo Rojas'
  },


  // ============================================================
  // HABILIDADES
  // ============================================================
  {
    path: 'habilidades',
    loadComponent: () =>
      import('./pages/skills/skills')
        .then(component => component.Skills),
    title: 'Habilidades | Juan Pablo Rojas'
  },


  // ============================================================
  // CONTACTO
  // ============================================================
  {
    path: 'contacto',
    loadComponent: () =>
      import('./pages/contact/contact')
        .then(component => component.Contact),
    title: 'Contacto | Juan Pablo Rojas'
  },


  // ============================================================
  // RUTA NO ENCONTRADA
  // ============================================================
  {
    path: '**',
    redirectTo: ''
  }

];