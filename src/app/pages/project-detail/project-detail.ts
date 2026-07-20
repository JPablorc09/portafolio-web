import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { PROJECTS } from '../../data/projects';
import { Project } from '../../models/project';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css'
})
export class ProjectDetail implements OnInit {
  project?: Project;
  previousProject?: Project;
  nextProject?: Project;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly titleService: Title
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const projectId = params.get('id');

      const projectIndex = PROJECTS.findIndex(
        project => project.id === projectId
      );

      if (projectIndex === -1) {
        void this.router.navigate(['/proyectos']);
        return;
      }

      this.project = PROJECTS[projectIndex];

      this.previousProject =
        projectIndex > 0
          ? PROJECTS[projectIndex - 1]
          : undefined;

      this.nextProject =
        projectIndex < PROJECTS.length - 1
          ? PROJECTS[projectIndex + 1]
          : undefined;

      this.titleService.setTitle(
        `${this.project.title} | Juan Pablo Rojas`
      );

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  imageError(event: Event): void {
    const image = event.target as HTMLImageElement;

    image.onerror = null;
    image.src = 'src/assets/images/project-placeholder.png';
  }
}