import { ChangeDetectorRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { vi } from 'vitest';
import { routes } from '../../app.routes';
import { PROJECTS } from '../../data/projects';
import { ProjectDetail } from './project-detail';

describe('Casos de estudio y navegación', () => {
  beforeEach(() => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
  });

  it('abre todos los IDs y mantiene los enlaces anterior y siguiente al reutilizar el detalle', async () => {
    const harness = await RouterTestingHarness.create();
    for (const [index, project] of PROJECTS.entries()) {
      const component = await harness.navigateByUrl(`/proyectos/${project.id}`, ProjectDetail);
      expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(project.title);
      expect(TestBed.inject(Title).getTitle()).toContain(project.title);
      const links = Array.from(
        harness.routeNativeElement!.querySelectorAll('.detail-project-nav a'),
      ).map((link) => link.getAttribute('href'));
      const expected = [PROJECTS[index - 1], PROJECTS[index + 1]]
        .filter(Boolean)
        .map((item) => `/proyectos/${item.id}`);
      expect(links).toEqual(expected);
      if (project.imageKind !== 'capture') {
        expect(component.projectImages).toEqual([]);
        expect(harness.routeNativeElement?.querySelector('.detail-gallery')).toBeNull();
      }
    }
  });

  it('cierra el visor al cambiar de proyecto y protege imágenes, enlaces y arquitectura institucionales', async () => {
    const harness = await RouterTestingHarness.create();
    const sales = await harness.navigateByUrl('/proyectos/vendetico', ProjectDetail);
    harness.routeNativeElement!.querySelector<HTMLButtonElement>('.detail-cover')!.click();
    await harness.fixture.whenStable();
    expect(sales.lightboxOpen).toBe(true);
    const restricted = await harness.navigateByUrl('/proyectos/incidentes', ProjectDetail);
    expect(restricted.lightboxOpen).toBe(false);
    expect(document.body.style.overflow).not.toBe('hidden');
    restricted.project = {
      ...restricted.project!,
      confidential: false,
      image: '/internal-example.png',
      gallery: ['/internal-example.png'],
      architecture: ['INTERNAL_EXAMPLE_ARCHITECTURE'],
      demo: 'https://example.com/internal-demo',
      github: 'https://example.com/internal-code',
    };
    harness.routeDebugElement!.injector.get(ChangeDetectorRef).markForCheck();
    await harness.fixture.whenStable();
    const element = harness.routeNativeElement!;
    expect(restricted.projectImages).toEqual([]);
    expect(element.querySelector('a[target="_blank"]')).toBeNull();
    expect(element.querySelector('img[src="/internal-example.png"]')).toBeNull();
    expect(element.textContent).not.toContain('INTERNAL_EXAMPLE_ARCHITECTURE');
    expect(element.querySelector('figcaption')?.textContent).toContain(
      'No representa la interfaz real',
    );
  });

  it('mantiene la URL y presenta un estado no encontrado para un ID inexistente', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/proyectos/id-inexistente');
    await harness.fixture.whenStable();
    expect(TestBed.inject(Router).url).toBe('/proyectos/id-inexistente');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(
      'Página no encontrada',
    );
  });

  it('permite recorrer la galería con teclado, mantiene el foco dentro y lo devuelve al cerrar', async () => {
    const harness = await RouterTestingHarness.create();
    const component = await harness.navigateByUrl('/proyectos/vendetico', ProjectDetail);
    const cover = harness.routeNativeElement!.querySelector<HTMLButtonElement>('.detail-cover')!;
    cover.click();
    await harness.fixture.whenStable();
    await new Promise((resolve) => setTimeout(resolve, 0));
    const element = harness.routeNativeElement!;
    const close = element.querySelector<HTMLButtonElement>('.project-lightbox__close')!;
    const next = element.querySelector<HTMLButtonElement>('.project-lightbox__arrow--next')!;
    expect(document.activeElement).toBe(close);
    expect(element.querySelector('.detail-content')?.hasAttribute('inert')).toBe(true);
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true }),
    );
    expect(document.activeElement).toBe(next);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    expect(document.activeElement).toBe(close);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await harness.fixture.whenStable();
    expect(component.selectedImageIndex).toBe(1);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    await harness.fixture.whenStable();
    expect(component.selectedImageIndex).toBe(0);
    element.querySelector<HTMLImageElement>('.project-lightbox__image img')!.click();
    await harness.fixture.whenStable();
    expect(component.lightboxOpen).toBe(true);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await harness.fixture.whenStable();
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(component.lightboxOpen).toBe(false);
    expect(element.querySelector('.detail-content')?.hasAttribute('inert')).toBe(false);
    expect(document.activeElement).toBe(cover);
  });

  it('rotula como respaldo la captura que no carga', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/proyectos/vendetico', ProjectDetail);
    const image = harness.routeNativeElement!.querySelector<HTMLImageElement>('.detail-cover img')!;
    image.dispatchEvent(new Event('error'));
    await harness.fixture.whenStable();
    expect(image.getAttribute('src')).toBe(
      PROJECTS.find((project) => project.id === 'vendetico')!.image,
    );
    expect(image.hasAttribute('srcset')).toBe(false);
    image.dispatchEvent(new Event('error'));
    await harness.fixture.whenStable();
    expect(image.getAttribute('src')).toBe('/assets/images/projects/project-placeholder.svg');
    expect(image.hasAttribute('srcset')).toBe(false);
    expect(image.alt).toContain('Ilustración genérica');
    image.dispatchEvent(new Event('error'));
    await harness.fixture.whenStable();
    expect(image.getAttribute('src')).toBe('/assets/images/projects/project-placeholder.svg');
  });

  it.each(['control-financiero', 'incidentes-clean-architecture'])(
    'retira el acceso a la ficha %s',
    async (id) => {
      const harness = await RouterTestingHarness.create();
      await harness.navigateByUrl(`/proyectos/${id}`);
      await harness.fixture.whenStable();
      expect(TestBed.inject(Router).url).toBe(`/proyectos/${id}`);
      expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(
        'Página no encontrada',
      );
    },
  );
});
