import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PROFESSIONAL_CONTACT } from '../../data/professional-contact';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  readonly currentYear = new Date().getFullYear();
  readonly contact = PROFESSIONAL_CONTACT;
  readonly navigationLinks = [
    { label: 'Inicio', route: '/' },
    { label: 'Proyectos', route: '/proyectos' },
    { label: 'Experiencia', route: '/experiencia' },
    { label: 'Sobre mí', route: '/sobre-mi' },
    { label: 'Formación', route: '/formacion' },
    { label: 'Conocimientos', route: '/habilidades' },
    { label: 'Servicios', route: '/servicios' },
    { label: 'Contacto', route: '/contacto' },
  ];
  readonly socialLinks = [
    { label: 'LinkedIn', url: this.contact.linkedin },
    { label: 'GitHub', url: this.contact.github },
  ];

  scrollToTop(): void {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' });
    document.querySelector<HTMLAnchorElement>('.navbar__brand')?.focus({ preventScroll: true });
  }
}
