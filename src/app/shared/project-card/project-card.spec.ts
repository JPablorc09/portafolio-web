import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PROJECTS } from '../../data/projects';
import { ProjectCard } from './project-card';

describe('Confidencialidad de las tarjetas', () => {
  it('bloquea demos y sustituye imágenes institucionales aunque los flags sean incoherentes', async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCard],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(ProjectCard);
    fixture.componentRef.setInput('project', {
      ...PROJECTS.find((project) => project.id === 'incidentes')!,
      confidential: false,
      image: '/internal-example.png',
      demo: 'https://example.com/internal-demo',
    });
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('img')).toBeNull();
    expect(element.querySelector('[role="img"]')?.getAttribute('aria-label')).toContain(
      'No es una captura real',
    );
    expect(element.querySelector('a[target="_blank"]')).toBeNull();
    expect(element.textContent).toContain('Mockup genérico');
  });

  it('reserves dimensions, serves responsive variants and prioritizes only an explicit LCP candidate', async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCard],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(ProjectCard);
    fixture.componentRef.setInput(
      'project',
      PROJECTS.find((project) => project.id === 'vendetico'),
    );
    await fixture.whenStable();
    const img = (fixture.nativeElement as HTMLElement).querySelector('img')!;
    expect(img.getAttribute('src')).toContain('/assets/images/vendetico/');
    expect(img.getAttribute('srcset')).toContain('480w');
    expect(Number(img.getAttribute('width'))).toBeGreaterThan(0);
    expect(Number(img.getAttribute('height'))).toBeGreaterThan(0);
    expect(img.getAttribute('loading')).toBe('lazy');
    fixture.componentRef.setInput('priority', true);
    await fixture.whenStable();
    expect(img.getAttribute('loading')).toBe('eager');
    expect(img.getAttribute('fetchpriority')).toBe('high');
  });

  it('sustituye una imagen fallida por un respaldo rotulado y lo reinicia al cambiar de proyecto', async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCard],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(ProjectCard);
    fixture.componentRef.setInput(
      'project',
      PROJECTS.find((project) => project.id === 'vendetico'),
    );
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    element.querySelector('img')!.dispatchEvent(new Event('error'));
    await fixture.whenStable();
    expect(element.querySelector('img')?.getAttribute('src')).toBe(
      PROJECTS.find((project) => project.id === 'vendetico')!.image,
    );
    expect(element.querySelector('img')?.hasAttribute('srcset')).toBe(false);
    element.querySelector('img')!.dispatchEvent(new Event('error'));
    await fixture.whenStable();
    expect(element.querySelector('img')).toBeNull();
    expect(element.textContent).toContain('Sin captura disponible');
    fixture.componentRef.setInput(
      'project',
      PROJECTS.find((project) => project.id === 'escaneatodo'),
    );
    await fixture.whenStable();
    expect(element.querySelector('img')?.getAttribute('alt')).toContain('EscaneaTodo');
  });
});
