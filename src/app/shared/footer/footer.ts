import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FooterLink {
  label: string;
  route: string;
}

interface FooterSocial {
  label: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  readonly currentYear = new Date().getFullYear();

  readonly navigationLinks: FooterLink[] = [
    {
      label: 'Inicio',
      route: '/'
    },
    {
      label: 'Sobre mí',
      route: '/sobre-mi'
    },
    {
      label: 'Experiencia',
      route: '/experiencia'
    },
    {
      label: 'Proyectos',
      route: '/proyectos'
    },
    {
      label: 'Habilidades',
      route: '/habilidades'
    },
    {
      label: 'Formación',
      route: '/formacion'
    },
    {
      label: 'Contacto',
      route: '/contacto'
    }
  ];

  readonly socialLinks: FooterSocial[] = [
    {
      label: 'LinkedIn',
      icon: 'in',
      url: 'https://www.linkedin.com/in/juan-pablo-rojas-contreras-15ab09345/'
    },
    {
      label: 'GitHub',
      icon: 'GH',
      url: 'https://github.com/JPablorc09'
    },
    {
      label: 'Correo',
      icon: '@',
      url: 'mailto:juanparojasc1999@gmail.com'
    }
  ];

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}