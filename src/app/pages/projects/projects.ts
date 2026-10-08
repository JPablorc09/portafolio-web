
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// ============================================================
// DATOS Y MODELOS
// ============================================================

import { PROJECTS } from '../../data/projects';

import {
  Project,
  ProjectType
} from '../../models/project';

// ============================================================
// COMPONENTES
// ============================================================

import { ProjectCard } from '../../shared/project-card/project-card';

// ============================================================
// TIPOS
// ============================================================

type ProjectFilter = 'all' | ProjectType;

interface FilterOption {
  value: ProjectFilter;
  label: string;
}

interface ProjectTypeInformation {
  number: string;
  title: string;
  description: string;
}

// ============================================================
// COMPONENTE
// ============================================================

@Component({
  selector: 'app-projects',
  standalone: true,

  imports: [
    RouterLink,
    ProjectCard
  ],

  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects {

  // ==========================================================
  // LISTA DE PROYECTOS
  // ==========================================================

  readonly projects: Project[] = PROJECTS;

  // ==========================================================
  // FILTRO SELECCIONADO
  // ==========================================================

  selectedFilter: ProjectFilter = 'all';

  // ==========================================================
  // FILTROS DISPONIBLES
  // ==========================================================

  readonly filters: FilterOption[] = [
    {
      value: 'all',
      label: 'Todos'
    },
    {
      value: 'empresarial',
      label: 'Empresariales'
    },
    {
      value: 'full-stack',
      label: 'Full Stack'
    },
    {
      value: 'integracion',
      label: 'Integraciones'
    },
    {
      value: 'datos',
      label: 'Datos y monitoreo'
    },
    {
      value: 'web-comercial',
      label: 'Web comercial'
    }
  ];

  // ==========================================================
  // ÁREAS DE DESARROLLO
  // ==========================================================

  readonly projectTypes: ProjectTypeInformation[] = [
    {
      number: '01',
      title: 'Aplicaciones web',
      description:
        'Desarrollo de aplicaciones Full Stack para gestionar información, procesos y operaciones empresariales.'
    },
    {
      number: '02',
      title: 'Integraciones',
      description:
        'Desarrollo de soluciones que conectan aplicaciones, APIs y plataformas empresariales.'
    },
    {
      number: '03',
      title: 'Datos y monitoreo',
      description:
        'Procesamiento de información, gestión de bases de datos y desarrollo de herramientas de monitoreo.'
    },
    {
      number: '04',
      title: 'Sitios web comerciales',
      description:
        'Diseño y desarrollo de sitios web modernos, responsive y orientados a la experiencia del usuario.'
    }
  ];

  // ==========================================================
  // PROYECTOS FILTRADOS
  // ==========================================================

  get filteredProjects(): Project[] {

    if (this.selectedFilter === 'all') {
      return this.projects;
    }

    return this.projects.filter(
      project => project.type === this.selectedFilter
    );
  }

  // ==========================================================
  // CAMBIAR FILTRO
  // ==========================================================

  selectFilter(filter: ProjectFilter): void {

    this.selectedFilter = filter;

  }

  // ==========================================================
  // CANTIDAD DE PROYECTOS POR FILTRO
  // ==========================================================

  getFilterCount(filter: ProjectFilter): number {

    if (filter === 'all') {
      return this.projects.length;
    }

    return this.projects.filter(
      project => project.type === filter
    ).length;
  }

  // ==========================================================
  // NOMBRE DEL FILTRO ACTUAL
  // ==========================================================

  get selectedFilterLabel(): string {

    const selected = this.filters.find(
      filter => filter.value === this.selectedFilter
    );

    return selected?.label ?? 'Todos';
  }

  // ==========================================================
  // DESPLAZAMIENTO A PROYECTOS DESTACADOS
  // ==========================================================

  scrollToProjects(): void {

    // Buscar la sección de proyectos en el HTML.
    const section = document.getElementById(
      'project-list'
    );

    // Evitar errores si no se encuentra la sección.
    if (!section) {
      return;
    }

    // Respetar las preferencias de accesibilidad.
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Desplazarse hasta los proyectos.
    section.scrollIntoView({
      behavior: prefersReducedMotion
        ? 'auto'
        : 'smooth',
      block: 'start'
    });
  }

}
