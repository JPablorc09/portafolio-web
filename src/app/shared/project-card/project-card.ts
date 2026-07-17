import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Project } from '../../models/project';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css'
})
export class ProjectCard {
  @Input({ required: true }) project!: Project;

  imageError(event: Event): void {
    const image = event.target as HTMLImageElement;

    image.onerror = null;
    image.src = 'assets/images/projects/project-placeholder.png';
  }
}