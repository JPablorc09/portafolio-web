import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { provideRouter, TitleStrategy } from '@angular/router';
import { Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { vi } from 'vitest';
import { PROJECTS } from '../data/projects';
import { routes } from '../app.routes';
import { SeoTitleStrategy } from './seo-title-strategy';
import { PAGE_SEO, SITE_ORIGIN, SOCIAL_IMAGE } from './site';

describe('SEO across navigation', () => {
  beforeEach(() => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    document.head
      .querySelectorAll('link[rel="canonical"], #portfolio-structured-data')
      .forEach((node) => node.remove());
    TestBed.configureTestingModule({
      providers: [provideRouter(routes), { provide: TitleStrategy, useClass: SeoTitleStrategy }],
    });
  });

  it('updates unique titles, descriptions, sharing metadata and canonical URLs for all general pages', async () => {
    const harness = await RouterTestingHarness.create();
    const meta = TestBed.inject(Meta);
    for (const page of PAGE_SEO) {
      await harness.navigateByUrl('/' + page.path);
      expect(TestBed.inject(Title).getTitle()).toBe(page.title);
      expect(meta.getTag('name="description"')?.content).toBe(page.description);
      expect(meta.getTag('property="og:title"')?.content).toBe(page.title);
      expect(meta.getTag('name="twitter:title"')?.content).toBe(page.title);
      expect(meta.getTag('property="og:image"')?.content).toBe(SOCIAL_IMAGE);
      expect(meta.getTag('property="og:url"')?.content).toBe(SITE_ORIGIN + '/' + page.path);
      expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
      expect(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toBe(
        SITE_ORIGIN + '/' + page.path,
      );
      expect(meta.getTags('name="description"')).toHaveLength(1);
      const graph = JSON.parse(document.getElementById('portfolio-structured-data')!.textContent!)[
        '@graph'
      ];
      expect(
        graph.find((node: Record<string, unknown>) => node['@type'] === page.schemaType),
      ).toBeTruthy();
    }
  });

  it('omits quotation parameters, filters and fragments from canonical URLs', async () => {
    const harness = await RouterTestingHarness.create();
    for (const path of ['/contacto?plan=profesional#cotizar', '/proyectos?contexto=personal']) {
      await harness.navigateByUrl(path);
      expect(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toBe(
        SITE_ORIGIN + path.split('?')[0],
      );
    }
  });

  it('updates project metadata on reused detail routes and does not publish institutional assets', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/proyectos/ventas');
    expect(TestBed.inject(Router).url).toBe('/proyectos/vendetico');
    expect(TestBed.inject(Meta).getTag('property="og:image"')?.content).toContain('/vendetico/');
    expect(TestBed.inject(Title).getTitle()).toContain('VendeTico');
    await harness.navigateByUrl('/proyectos/incidentes');
    const json = document.getElementById('portfolio-structured-data')!.textContent!;
    const graph = JSON.parse(json)['@graph'];
    const work = graph.find((node: Record<string, unknown>) => node['@type'] === 'CreativeWork');
    expect(work.url).toBe(SITE_ORIGIN + '/proyectos/incidentes');
    expect(work.image).toBeUndefined();
    expect(work.codeRepository).toBeUndefined();
    expect(json).not.toContain('VendeTico');
  });

  it('escapes closing script tags while preserving the structured description', async () => {
    const project = PROJECTS.find((item) => item.id === 'vendetico')!;
    const original = project.shortDescription;
    const description = '</script><script>UNTRUSTED_DESCRIPTION</script>';
    try {
      project.shortDescription = description;
      const harness = await RouterTestingHarness.create();
      await harness.navigateByUrl('/proyectos/vendetico');
      const text = document.getElementById('portfolio-structured-data')!.textContent!;
      expect(text).not.toContain('</script>');
      const graph = JSON.parse(text)['@graph'];
      expect(
        graph.find((node: Record<string, unknown>) => node['@type'] === 'CreativeWork').description,
      ).toBe(description);
    } finally {
      project.shortDescription = original;
    }
  });

  it('marks unknown pages noindex and restores indexing after returning to a valid page', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/proyectos/no-existe');
    expect(TestBed.inject(Meta).getTag('name="robots"')?.content).toBe('noindex, follow');
    expect(document.getElementById('portfolio-structured-data')).toBeNull();
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(
      'Página no encontrada',
    );
    await harness.navigateByUrl('/');
    expect(TestBed.inject(Meta).getTag('name="robots"')?.content).toBe(
      'index, follow, max-image-preview:large',
    );
    expect(document.getElementById('portfolio-structured-data')).not.toBeNull();
  });
});
