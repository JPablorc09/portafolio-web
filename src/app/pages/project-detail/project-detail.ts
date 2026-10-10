
import {
  Component,
  HostListener,
  OnDestroy,
  OnInit
} from '@angular/core';

import { Title } from '@angular/platform-browser';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { Subscription } from 'rxjs';

import { PROJECTS } from '../../data/projects';
import { Project } from '../../models/project';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css'
})
export class ProjectDetail implements OnInit, OnDestroy {

  // ============================================================
  // PROYECTO ACTUAL Y NAVEGACIÓN
  // ============================================================

  project?: Project;

  previousProject?: Project;
  nextProject?: Project;

  // ============================================================
  // GALERÍA Y LIGHTBOX
  // ============================================================

  lightboxOpen = false;

  selectedImageIndex = 0;

  private routeSubscription?: Subscription;

  private previousOverflow = '';

  private openingElement: HTMLElement | null = null;

  // ============================================================
  // CONSTRUCTOR
  // ============================================================

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly titleService: Title
  ) {}

  // ============================================================
  // INICIALIZACIÓN
  // ============================================================

  ngOnInit(): void {

    this.routeSubscription = this.route.paramMap.subscribe(
      params => {

        const id = params.get('id');

        const index = PROJECTS.findIndex(
          item => item.id === id
        );

        // Si no existe el proyecto, regresar al listado.
        if (index < 0) {

          this.closeLightbox();

          this.project = undefined;
          this.previousProject = undefined;
          this.nextProject = undefined;

          void this.router.navigate(['/proyectos']);

          return;
        }

        // Cerrar cualquier galería abierta.
        this.closeLightbox();

        // Reiniciar la imagen seleccionada.
        this.selectedImageIndex = 0;

        // Obtener el proyecto.
        this.project = PROJECTS[index];

        // Proyecto anterior.
        this.previousProject =
          index > 0
            ? PROJECTS[index - 1]
            : undefined;

        // Proyecto siguiente.
        this.nextProject =
          index < PROJECTS.length - 1
            ? PROJECTS[index + 1]
            : undefined;

        // Actualizar el título del navegador.
        this.titleService.setTitle(
          `${this.project.title} | Juan Pablo Rojas`
        );

        // Regresar al inicio al cambiar de proyecto.
        if (typeof window !== 'undefined') {

          window.scrollTo({
            top: 0,
            behavior: 'auto'
          });

        }

      }
    );

  }

  // ============================================================
  // DESTRUCCIÓN DEL COMPONENTE
  // ============================================================

  ngOnDestroy(): void {

    this.routeSubscription?.unsubscribe();

    this.closeLightbox();

  }

  // ============================================================
  // OBTENER IMÁGENES DEL PROYECTO
  // ============================================================

  get projectImages(): string[] {

    if (!this.project) {
      return [];
    }

    // No mostrar imágenes internas de proyectos confidenciales.
    if (this.project.confidential) {
      return [];
    }

    const images: string[] = [];

    // Imagen principal.
    if (this.project.image) {

      images.push(this.project.image);

    }

    // Imágenes adicionales.
    for (const image of this.project.gallery ?? []) {

      if (
        image &&
        !images.includes(image)
      ) {

        images.push(image);

      }

    }

    return images;

  }

  // ============================================================
  // IMAGEN SELECCIONADA
  // ============================================================

  get selectedImage(): string {

    return this.projectImages[
      this.selectedImageIndex
    ] ?? '';

  }

  // ============================================================
  // CANTIDAD DE IMÁGENES
  // ============================================================

  get totalImages(): number {

    return this.projectImages.length;

  }

  // ============================================================
  // ABRIR LIGHTBOX
  // ============================================================

  openLightboxByImage(
    image: string,
    trigger?: HTMLElement
  ): void {

    if (
      typeof document === 'undefined' ||
      this.lightboxOpen
    ) {
      return;
    }

    const index = this.projectImages.indexOf(image);

    if (index < 0) {
      return;
    }

    // Guardar el elemento que abrió la galería.
    this.openingElement =
      trigger ??
      (
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null
      );

    this.selectedImageIndex = index;

    // Guardar el overflow anterior.
    this.previousOverflow =
      document.body.style.overflow;

    this.lightboxOpen = true;

    // Evitar desplazamiento del fondo.
    document.body.style.overflow = 'hidden';

    // Enfocar el botón de cierre.
    setTimeout(() => {

      document
        .querySelector<HTMLElement>(
          '.project-lightbox__close'
        )
        ?.focus();

    }, 0);

  }

  // ============================================================
  // CERRAR LIGHTBOX
  // ============================================================

  closeLightbox(): void {

    if (!this.lightboxOpen) {
      return;
    }

    this.lightboxOpen = false;

    if (typeof document !== 'undefined') {

      // Restaurar el desplazamiento.
      document.body.style.overflow =
        this.previousOverflow;

    }

    const trigger = this.openingElement;

    this.openingElement = null;

    // Devolver el foco al elemento original.
    setTimeout(() => {

      if (trigger?.isConnected) {
        trigger.focus();
      }

    }, 0);

  }

  // ============================================================
  // IMAGEN ANTERIOR
  // ============================================================

  previousImage(event?: Event): void {

    event?.stopPropagation();

    const count = this.totalImages;

    if (count <= 1) {
      return;
    }

    this.selectedImageIndex =
      (
        this.selectedImageIndex - 1 + count
      ) % count;

  }

  // ============================================================
  // IMAGEN SIGUIENTE
  // ============================================================

  nextImage(event?: Event): void {

    event?.stopPropagation();

    const count = this.totalImages;

    if (count <= 1) {
      return;
    }

    this.selectedImageIndex =
      (
        this.selectedImageIndex + 1
      ) % count;

  }

  // ============================================================
  // EVITAR PROPAGACIÓN DE EVENTOS
  // ============================================================

  stopPropagation(event: Event): void {

    event.stopPropagation();

  }

  // ============================================================
  // CONTROL POR TECLADO
  // ============================================================

  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {

    if (!this.lightboxOpen) {
      return;
    }

    // Cerrar con ESC.
    if (event.key === 'Escape') {

      event.preventDefault();

      this.closeLightbox();

      return;
    }

    // Imagen anterior.
    if (event.key === 'ArrowLeft') {

      event.preventDefault();

      this.previousImage();

      return;
    }

    // Imagen siguiente.
    if (event.key === 'ArrowRight') {

      event.preventDefault();

      this.nextImage();

      return;
    }

    // Mantener el foco dentro del lightbox.
    if (event.key === 'Tab') {

      const modal =
        document.querySelector<HTMLElement>(
          '.project-lightbox'
        );

      const focusables =
        modal?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href]'
        );

      if (
        !modal ||
        !focusables ||
        focusables.length === 0
      ) {
        return;
      }

      const first = focusables[0];

      const last =
        focusables[focusables.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {

        event.preventDefault();

        last.focus();

      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {

        event.preventDefault();

        first.focus();

      }

    }

  }

  // ============================================================
  // IMAGEN DE RESPALDO
  // ============================================================

  imageError(event: Event): void {

    const img = event.target as HTMLImageElement;

    // Evitar bucles si también falla el placeholder.
    img.onerror = null;

    img.src =
      '/assets/images/projects/project-placeholder.png';

  }

}
