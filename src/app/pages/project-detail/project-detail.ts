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
  // PROYECTO
  // ============================================================

  project?: Project;

  previousProject?: Project;

  nextProject?: Project;


  // ============================================================
  // VISOR DE IMÁGENES
  // ============================================================

  lightboxOpen = false;

  selectedImageIndex = 0;


  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly titleService: Title
  ) {}


  // ============================================================
  // INICIALIZACIÓN
  // ============================================================

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const projectId =
        params.get('id');


      const projectIndex =
        PROJECTS.findIndex(
          project =>
            project.id === projectId
        );


      if (projectIndex === -1) {

        void this.router.navigate([
          '/proyectos'
        ]);

        return;

      }


      this.project =
        PROJECTS[projectIndex];


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


      this.closeLightbox();


      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    });

  }


  // ============================================================
  // DESTRUCCIÓN
  // ============================================================

  ngOnDestroy(): void {

    this.enablePageScroll();

  }


  // ============================================================
  // IMÁGENES DISPONIBLES PARA EL VISOR
  // ============================================================

  get projectImages(): string[] {

    if (!this.project) {
      return [];
    }


    const images: string[] = [];


    /*
     * La portada se agrega solamente
     * cuando el proyecto no es confidencial.
     */

    if (
      this.project.image &&
      !this.project.confidential
    ) {

      images.push(
        this.project.image
      );

    }


    /*
     * Agregamos las imágenes de galería
     * evitando duplicados.
     */

    for (
      const image of this.project.gallery ?? []
    ) {

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
  // IMAGEN ACTUAL
  // ============================================================

  get selectedImage(): string {

    return (
      this.projectImages[
        this.selectedImageIndex
      ] ?? ''
    );

  }


  // ============================================================
  // ABRIR LIGHTBOX
  // ============================================================

  openLightboxByImage(
    image: string
  ): void {

    const index =
      this.projectImages.indexOf(image);


    if (index === -1) {
      return;
    }


    this.selectedImageIndex =
      index;


    this.lightboxOpen =
      true;


    this.disablePageScroll();

  }


  // ============================================================
  // CERRAR LIGHTBOX
  // ============================================================

  closeLightbox(): void {

    this.lightboxOpen =
      false;


    this.enablePageScroll();

  }


  // ============================================================
  // IMAGEN ANTERIOR
  // ============================================================

  previousImage(
    event?: Event
  ): void {

    event?.stopPropagation();


    const images =
      this.projectImages;


    if (
      images.length <= 1
    ) {
      return;
    }


    this.selectedImageIndex =
      this.selectedImageIndex === 0
        ? images.length - 1
        : this.selectedImageIndex - 1;

  }


  // ============================================================
  // IMAGEN SIGUIENTE
  // ============================================================

  nextImage(
    event?: Event
  ): void {

    event?.stopPropagation();


    const images =
      this.projectImages;


    if (
      images.length <= 1
    ) {
      return;
    }


    this.selectedImageIndex =
      this.selectedImageIndex ===
      images.length - 1
        ? 0
        : this.selectedImageIndex + 1;

  }


  // ============================================================
  // CLIC DENTRO DEL MODAL
  // ============================================================

  stopPropagation(
    event: Event
  ): void {

    event.stopPropagation();

  }


  // ============================================================
  // TECLADO
  // ============================================================

  @HostListener(
    'document:keydown',
    ['$event']
  )
  handleKeyboard(
    event: KeyboardEvent
  ): void {

    if (!this.lightboxOpen) {
      return;
    }


    if (event.key === 'Escape') {

      this.closeLightbox();

      return;

    }


    if (event.key === 'ArrowLeft') {

      this.previousImage();

      return;

    }


    if (event.key === 'ArrowRight') {

      this.nextImage();

    }

  }


  // ============================================================
  // BLOQUEAR SCROLL
  // ============================================================

  private disablePageScroll(): void {

    document.body.style.overflow =
      'hidden';

  }


  // ============================================================
  // RESTAURAR SCROLL
  // ============================================================

  private enablePageScroll(): void {

    document.body.style.overflow =
      '';

  }


  // ============================================================
  // ERROR DE IMAGEN
  // ============================================================

  imageError(
    event: Event
  ): void {

    const image =
      event.target as HTMLImageElement;


    image.onerror = null;


    image.src =
      '/assets/images/projects/project-placeholder.png';

  }

}