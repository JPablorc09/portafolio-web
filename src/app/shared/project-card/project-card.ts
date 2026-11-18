import { Component, Input, OnChanges, signal } from '@angular/core';
import { CARD_IMAGE_SIZES, projectImage } from '../../data/project-image';
import { RouterLink } from '@angular/router';
import {
  isRestrictedProject,
  Project,
  PROJECT_CONTEXT_LABELS,
  PROJECT_STATUS_LABELS,
} from '../../models/project';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard implements OnChanges {
  @Input({ required: true }) project!: Project;
  @Input() priority = false;
  readonly imageAsset = projectImage;
  readonly imageSizes = CARD_IMAGE_SIZES;
  readonly imageFailed = signal(false);
  readonly contextLabels = PROJECT_CONTEXT_LABELS;
  readonly statusLabels = PROJECT_STATUS_LABELS;
  get restricted(): boolean {
    return isRestrictedProject(this.project);
  }
  get visibleTechnologies(): string[] {
    return this.project.technologies.slice(0, 3);
  }
  get remainingTechnologies(): number {
    return Math.max(this.project.technologies.length - 3, 0);
  }
  get previewAlt(): string {
    return this.project.imageKind === 'promotional'
      ? 'Material promocional de ' + this.project.title + '. No es una captura real.'
      : 'Captura del proyecto ' + this.project.title;
  }
  ngOnChanges(): void {
    this.imageFailed.set(false);
  }
  imageError(event: Event): void {
    const image = event.target as HTMLImageElement;
    if (image.getAttribute('src') !== this.project.image) {
      image.removeAttribute('srcset');
      image.src = this.project.image;
      return;
    }
    this.imageFailed.set(true);
  }
}
