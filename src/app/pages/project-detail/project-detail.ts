import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  project?: Project;
  previousProject?: Project;
  nextProject?: Project;
  lightboxOpen = false;
  selectedImageIndex = 0;
  private routeSubscription?: Subscription;
  private previousOverflow = '';
  private openingElement: HTMLElement | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly titleService: Title
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const index = PROJECTS.findIndex(item => item.id === id);
      if (index < 0) {
        void this.router.navigate(['/proyectos']);
        return;
      }
      this.closeLightbox();
      this.project = PROJECTS[index];
      this.previousProject = index > 0 ? PROJECTS[index - 1] : undefined;
      this.nextProject = index < PROJECTS.length - 1 ? PROJECTS[index + 1] : undefined;
      this.titleService.setTitle(`${this.project.title} | Juan Pablo Rojas`);
      window.scrollTo({ top: 0, behavior: 'auto' });
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.closeLightbox();
  }

  get projectImages(): string[] {
    if (!this.project) return [];
    const images: string[] = [];
    if (this.project.image && !this.project.confidential) images.push(this.project.image);
    for (const image of this.project.gallery ?? []) {
      if (image && !images.includes(image)) images.push(image);
    }
    return images;
  }

  get selectedImage(): string {
    return this.projectImages[this.selectedImageIndex] ?? '';
  }

  openLightboxByImage(image: string, trigger?: HTMLElement): void {
    const index = this.projectImages.indexOf(image);
    if (index < 0) return;
    this.openingElement = trigger ?? (document.activeElement as HTMLElement);
    this.selectedImageIndex = index;
    this.previousOverflow = document.body.style.overflow;
    this.lightboxOpen = true;
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.querySelector<HTMLElement>('.project-lightbox__close')?.focus(), 0);
  }

  closeLightbox(): void {
    if (!this.lightboxOpen) return;
    this.lightboxOpen = false;
    document.body.style.overflow = this.previousOverflow;
    const trigger = this.openingElement;
    this.openingElement = null;
    setTimeout(() => trigger?.focus(), 0);
  }

  previousImage(event?: Event): void {
    event?.stopPropagation();
    const count = this.projectImages.length;
    if (count > 1) this.selectedImageIndex = (this.selectedImageIndex - 1 + count) % count;
  }

  nextImage(event?: Event): void {
    event?.stopPropagation();
    const count = this.projectImages.length;
    if (count > 1) this.selectedImageIndex = (this.selectedImageIndex + 1) % count;
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    if (!this.lightboxOpen) return;
    if (event.key === 'Escape') this.closeLightbox();
    if (event.key === 'ArrowLeft') this.previousImage();
    if (event.key === 'ArrowRight') this.nextImage();
    if (event.key === 'Tab') {
      const modal = document.querySelector<HTMLElement>('.project-lightbox');
      const focusables = modal?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]');
      if (!modal || !focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    }
  }

  imageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.onerror = null;
    img.src = '/assets/images/projects/project-placeholder.png';
  }
}
