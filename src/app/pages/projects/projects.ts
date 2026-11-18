import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROJECTS } from '../../data/projects';
import { Project, ProjectContext, ProjectType } from '../../models/project';
import { ProjectCard } from '../../shared/project-card/project-card';

type ProjectFilter = 'all' | ProjectType;
type ContextFilter = 'all' | ProjectContext;

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterLink, ProjectCard],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  readonly projects: Project[] = PROJECTS;
  selectedFilter: ProjectFilter = 'all';
  selectedContext: ContextFilter = 'all';
  readonly contexts: { value: ContextFilter; label: string }[] = [
    { value: 'all', label: 'Todos los contextos' },
    { value: 'personal', label: 'Personales' },
    { value: 'institutional', label: 'Institucionales' },
    { value: 'demo', label: 'Demos comerciales' },
  ];
  readonly filters: { value: ProjectFilter; label: string }[] = [
    { value: 'all', label: 'Todas las categorías' },
    { value: 'empresarial', label: 'Empresariales' },
    { value: 'full-stack', label: 'Full Stack' },
    { value: 'integracion', label: 'Integraciones' },
    { value: 'datos', label: 'Datos y monitoreo' },
    { value: 'web-comercial', label: 'Web comercial' },
    { value: 'movil', label: 'Móviles' },
    { value: 'herramienta-web', label: 'Herramientas web' },
  ];
  get contextualProjects(): Project[] {
    return this.selectedContext === 'all' ? this.projects : this.projects.filter(project => project.context === this.selectedContext);
  }
  get filteredProjects(): Project[] {
    return this.selectedFilter === 'all' ? this.contextualProjects : this.contextualProjects.filter(project => project.type === this.selectedFilter);
  }
  get selectedContextLabel(): string {
    return this.contexts.find(context => context.value === this.selectedContext)?.label ?? '';
  }
  get selectedFilterLabel(): string {
    return this.filters.find(filter => filter.value === this.selectedFilter)?.label ?? '';
  }
  selectContext(context: ContextFilter): void { this.selectedContext = context; }
  selectFilter(filter: ProjectFilter): void { this.selectedFilter = filter; }
  changeCategory(value: string): void {
    const filter = this.filters.find(item => item.value === value);
    if (filter) this.selectFilter(filter.value);
  }
  resetFilters(): void { this.selectedContext = 'all'; this.selectedFilter = 'all'; }
  getFilterCount(filter: ProjectFilter): number {
    return filter === 'all' ? this.contextualProjects.length : this.contextualProjects.filter(project => project.type === filter).length;
  }
  scrollToProjects(): void {
    document.getElementById('project-list')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      block: 'start',
    });
  }
}
