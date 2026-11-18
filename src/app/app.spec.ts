import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';
import { vi } from 'vitest';

describe('App', () => {
  beforeEach(async () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('renders the home page inside the application shell', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/');
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('main h1')?.textContent).toContain('.NET y Angular.');
    expect(compiled.querySelector('main')?.textContent).toContain('Juan Pablo Rojas Contreras');
    expect(compiled.querySelector('app-navbar nav')).not.toBeNull();
    expect(compiled.querySelector('app-footer')).not.toBeNull();
  });

  it('loads a project detail through the configured lazy route', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/proyectos/vendetico');
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('main h1')?.textContent).toContain(
      'VendeTico — Sistema de Punto de Venta y Gestión Comercial',
    );
    expect(compiled.querySelector('a[href="/proyectos"]')).not.toBeNull();
  });

  it('mantiene un único contenido principal en todas las páginas generales', async () => {
    const fixture = TestBed.createComponent(App);
    for (const path of ['/', '/sobre-mi', '/formacion', '/experiencia', '/proyectos', '/servicios', '/habilidades', '/contacto']) {
      await TestBed.inject(Router).navigateByUrl(path);
      await fixture.whenStable();
      const element = fixture.nativeElement as HTMLElement;
      expect(element.querySelectorAll('main').length, path).toBe(1);
      expect(element.querySelector('main h1'), path).not.toBeNull();
    }
  });

  it('salta al contenido sin cambiar la URL de la página actual', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/proyectos');
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    element.querySelector<HTMLAnchorElement>('.skip-link')!.click();
    expect(document.activeElement).toBe(element.querySelector('#contenido-principal'));
    expect(router.url).toBe('/proyectos');
  });
});
