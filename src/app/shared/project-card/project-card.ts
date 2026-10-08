
import {
  Component,
  Input
} from '@angular/core';

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

  // ============================================================
  // PROYECTO RECIBIDO DESDE EL COMPONENTE PADRE
  // ============================================================

  @Input({ required: true })
  project!: Project;

  // ============================================================
  // IMAGEN DE RESPALDO
  // ============================================================

  readonly fallbackImage =
    '/assets/images/projects/project-placeholder.png';

  // ============================================================
  // TECNOLOGÍAS VISIBLES
  // ============================================================

  get visibleTechnologies(): string[] {
    return this.project.technologies.slice(0, 5);
  }

  get remainingTechnologies(): number {
    return Math.max(
      this.project.technologies.length - 5,
      0
    );
  }

  // ============================================================
  // TIPO DE PROYECTO
  // ============================================================

  get isCommercialDemo(): boolean {
    return this.project.type === 'web-comercial';
  }

  // ============================================================
  // IMAGEN NO DISPONIBLE
  // ============================================================

  imageError(event: Event): void {

    const image = event.target as HTMLImageElement;

    if (image.src.endsWith(this.fallbackImage)) {
      return;
    }

    image.onerror = null;
    image.src = this.fallbackImage;
  }

}
