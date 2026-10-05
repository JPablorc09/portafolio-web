import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PROJECTS } from '../../data/projects';
import {
  Project,
  ProjectType
} from '../../models/project';

import { ProjectCard } from '../../shared/project-card/project-card';


// ============================================================
// TIPOS
// ============================================================

type ProjectFilter =
  | 'all'
  | ProjectType;


interface FilterOption {
  value: ProjectFilter;
  label: string;
}


interface ProjectTypeInformation {
  number: string;
  title: string;
  description: string;
}


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

  // ============================================================
  // PROYECTOS
  // ============================================================

  readonly projects: Project[] =
    PROJECTS;


  // ============================================================
  // FILTRO ACTUAL
  // ============================================================

  selectedFilter: ProjectFilter =
    'all';


  // ============================================================
  // FILTROS DISPONIBLES
  // ============================================================

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
    }

  ];


  // ============================================================
  // ÁREAS DE DESARROLLO
  // ============================================================

  readonly projectTypes: ProjectTypeInformation[] = [

    {
      number: '01',

      title: 'Aplicaciones web',

      description:
        'Sistemas Full Stack desarrollados para gestionar información, procesos y operaciones.'
    },

    {
      number: '02',

      title: 'Integraciones',

      description:
        'Soluciones que conectan aplicaciones, APIs y plataformas empresariales.'
    },

    {
      number: '03',

      title: 'Datos y monitoreo',

      description:
        'Procesamiento de información, bases de datos y herramientas orientadas al monitoreo.'
    }

  ];


  // ============================================================
  // PROYECTOS FILTRADOS
  // ============================================================

  get filteredProjects(): Project[] {

    if (
      this.selectedFilter === 'all'
    ) {

      return this.projects;

    }


    return this.projects.filter(
      project =>
        project.type ===
        this.selectedFilter
    );

  }


  // ============================================================
  // CAMBIAR FILTRO
  // ============================================================

  selectFilter(
    filter: ProjectFilter
  ): void {

    this.selectedFilter =
      filter;

  }


  // ============================================================
  // CANTIDAD POR FILTRO
  // ============================================================

  getFilterCount(
    filter: ProjectFilter
  ): number {

    if (
      filter === 'all'
    ) {

      return this.projects.length;

    }


    return this.projects.filter(
      project =>
        project.type === filter
    ).length;

  }


  // ============================================================
  // TEXTO DEL FILTRO ACTUAL
  // ============================================================

  get selectedFilterLabel(): string {

    const filter =
      this.filters.find(
        item =>
          item.value ===
          this.selectedFilter
      );


    return filter?.label ??
      'Todos';

  }

}