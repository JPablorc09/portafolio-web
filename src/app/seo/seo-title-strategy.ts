import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { PROFESSIONAL_CONTACT } from '../data/professional-contact';
import type { Project } from '../models/project';
import { PAGE_SEO, SITE_NAME, SITE_ORIGIN, SOCIAL_IMAGE, SOCIAL_IMAGE_ALT } from './site';

@Injectable()
export class SeoTitleStrategy extends TitleStrategy {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    let leaf = snapshot.root;
    while (leaf.firstChild) leaf = leaf.firstChild;
    const path = snapshot.url.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
    const page = PAGE_SEO.find((item) => item.path === leaf.routeConfig?.path);
    const project = leaf.data['project'] as Project | undefined;
    const notFound = leaf.data['notFound'] === true;
    const title = this.buildTitle(snapshot) || 'Página no encontrada | Juan Pablo Rojas';
    const description =
      project?.shortDescription ||
      page?.description ||
      'La página solicitada no está disponible. Consulte los proyectos, servicios y canales de contacto de Juan Pablo Rojas Contreras.';
    const canonical =
      SITE_ORIGIN +
      (page ? '/' + page.path : project ? '/proyectos/' + encodeURIComponent(project.id) : path);
    const socialImage = project?.id === 'vendetico' ? SITE_ORIGIN + project.image : SOCIAL_IMAGE;
    const socialAlt = project?.id === 'vendetico' ? 'VendeTico: punto de venta con datos ficticios de demostración' : SOCIAL_IMAGE_ALT;
    this.title.setTitle(title);
    for (const [name, content] of Object.entries({
      description,
      robots: notFound ? 'noindex, follow' : 'index, follow, max-image-preview:large',
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': socialImage,
      'twitter:image:alt': socialAlt,
    }))
      this.meta.updateTag({ name, content });
    for (const [property, content] of Object.entries({
      'og:type': 'website',
      'og:locale': 'es_CR',
      'og:site_name': SITE_NAME,
      'og:title': title,
      'og:description': description,
      'og:url': canonical,
      'og:image': socialImage,
      'og:image:secure_url': socialImage,
      'og:image:type': project?.id === 'vendetico' ? 'image/webp' : 'image/png',
      'og:image:width': project?.id === 'vendetico' ? '1440' : '1200',
      'og:image:height': project?.id === 'vendetico' ? '900' : '630',
      'og:image:alt': socialAlt,
    }))
      this.meta.updateTag({ property, content });
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = canonical;
    let script = this.document.getElementById('portfolio-structured-data');
    if (notFound) {
      script?.remove();
      return;
    }
    if (!script) {
      script = this.document.createElement('script');
      script.id = 'portfolio-structured-data';
      script.setAttribute('type', 'application/ld+json');
      this.document.head.appendChild(script);
    }
    const personId = SITE_ORIGIN + '/#person';
    const websiteId = SITE_ORIGIN + '/#website';
    const pageId = canonical + '#webpage';
    const graph: object[] = [
      {
        '@type': 'Person',
        '@id': personId,
        name: SITE_NAME,
        url: SITE_ORIGIN + '/',
        jobTitle: 'Desarrollador Full Stack .NET y Angular',
        description:
          'Bachiller en Ingeniería de Sistemas, graduado de la Universidad Americana en 2024.',
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidad Americana (UAM)' },
        address: { '@type': 'PostalAddress', addressCountry: 'CR' },
        sameAs: [PROFESSIONAL_CONTACT.github, PROFESSIONAL_CONTACT.linkedin],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: SITE_ORIGIN + '/',
        name: 'Portafolio profesional de ' + SITE_NAME,
        inLanguage: 'es-CR',
        publisher: { '@id': personId },
      },
      {
        '@type': page?.schemaType || 'WebPage',
        '@id': pageId,
        url: canonical,
        name: title,
        description,
        inLanguage: 'es-CR',
        isPartOf: { '@id': websiteId },
        ...(project
          ? { mainEntity: { '@id': canonical + '#project' } }
          : page?.schemaType === 'ProfilePage'
            ? { mainEntity: { '@id': personId } }
            : { about: { '@id': personId } }),
      },
    ];
    if (project)
      graph.push({
        '@type': 'CreativeWork',
        '@id': canonical + '#project',
        name: project.title,
        description: project.shortDescription,
        url: canonical,
        inLanguage: 'es-CR',
        keywords: project.technologies.join(', '),
      });
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph,
    }).replace(/</g, '\\u003c');
  }
}
