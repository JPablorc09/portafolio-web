import { Component, ElementRef, HostListener, ViewChild, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { PROFESSIONAL_CONTACT } from '../../data/professional-contact';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  readonly menuOpen = signal(false);
  readonly profileOpen = signal(false);
  readonly cvUrl = PROFESSIONAL_CONTACT.cv;
  readonly primaryLinks = [
    { path: '/proyectos', label: 'Proyectos' },
    { path: '/experiencia', label: 'Experiencia' },
  ];
  readonly profileLinks = [
    { path: '/sobre-mi', label: 'Sobre mí' },
    { path: '/formacion', label: 'Formación' },
    { path: '/habilidades', label: 'Conocimientos' },
  ];
  readonly businessLinks = [
    { path: '/servicios', label: 'Servicios' },
    { path: '/contacto', label: 'Contacto' },
  ];

  @ViewChild('menuToggle') private menuToggle?: ElementRef<HTMLButtonElement>;
  @ViewChild('profileToggle') private profileToggle?: ElementRef<HTMLButtonElement>;
  private readonly host = inject(ElementRef<HTMLElement>);

  constructor() {
    inject(Router).events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntilDestroyed(),
    ).subscribe(() => this.closeMenu(true));
  }

  toggleMenu(): void {
    this.menuOpen.update(open => !open);
    this.profileOpen.set(false);
  }

  toggleProfile(): void {
    this.profileOpen.update(open => !open);
  }

  closeMenu(restoreFocus = false): void {
    const trigger = this.menuOpen() ? this.menuToggle : this.profileOpen() ? this.profileToggle : undefined;
    this.menuOpen.set(false);
    this.profileOpen.set(false);
    if (restoreFocus) trigger?.nativeElement.focus();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: Event): void {
    if (this.menuOpen() || this.profileOpen()) {
      event.preventDefault();
      this.closeMenu(true);
    }
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: MouseEvent): void {
    if (this.profileOpen() && event.target instanceof Node && !this.host.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }
}
