import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PROJECTS } from '../../data/projects';
import { ProjectCard } from '../../shared/project-card/project-card';

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
  readonly projects = PROJECTS;
}