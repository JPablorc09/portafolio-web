import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROJECTS } from '../../data/projects';
import { PROFESSIONAL_CONTACT } from '../../data/professional-contact';
import { Project } from '../../models/project';
import { ProjectCard } from '../../shared/project-card/project-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProjectCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  readonly contact = PROFESSIONAL_CONTACT;
  readonly projectCount = PROJECTS.length;
  readonly featuredProjects = ['vendetico', 'escaneatodo', 'incidentes']
    .map(id => PROJECTS.find(project => project.id === id))
    .filter((project): project is Project => !!project);
  readonly technologies = ['C#', 'ASP.NET Core', 'Angular', 'SQL Server', 'APIs REST'];
  readonly services = [
    {
      title: 'Páginas web',
      description: 'Presencia profesional, catálogos y contacto para negocios, comercios y profesionales.',
      technologies: ['Responsive', 'WhatsApp', 'SEO técnico'],
    },
    {
      title: 'Sistemas web',
      description: 'Aplicaciones para administrar información y digitalizar procesos según el alcance del negocio.',
      technologies: ['Angular', 'ASP.NET Core', 'SQL Server'],
    },
    {
      title: 'APIs e integraciones',
      description: 'Servicios para conectar aplicaciones, intercambiar información y automatizar tareas.',
      technologies: ['APIs REST', '.NET', 'Integraciones'],
    },
  ];
}
