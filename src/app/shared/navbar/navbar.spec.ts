import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { routes } from '../../app.routes';

import { Navbar } from './navbar';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
      imports: [Navbar],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('abre el menú y lo cierra con Escape devolviendo el foco al botón', async () => {
    const toggle = fixture.nativeElement.querySelector('.navbar__toggle') as HTMLButtonElement;
    toggle.click();
    await fixture.whenStable();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(toggle.getAttribute('aria-label')).toBe('Cerrar menú principal');
    expect(fixture.nativeElement.querySelector('#site-navigation').classList).toContain('navbar__links--open');
    (fixture.nativeElement.querySelector('a[href="/proyectos"]') as HTMLAnchorElement).focus();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await fixture.whenStable();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(toggle);
  });

  it('controla el submenú Perfil con Escape y clic fuera', async () => {
    const toggle = fixture.nativeElement.querySelector('.navbar__profile-toggle') as HTMLButtonElement;
    toggle.click();
    await fixture.whenStable();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await fixture.whenStable();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(toggle);
    toggle.click();
    await fixture.whenStable();
    document.body.click();
    await fixture.whenStable();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  it('cierra la navegación al cambiar de ruta y anuncia la página activa', async () => {
    const toggle = fixture.nativeElement.querySelector('.navbar__toggle') as HTMLButtonElement;
    toggle.click();
    await fixture.whenStable();
    await TestBed.inject(Router).navigateByUrl('/contacto');
    await fixture.whenStable();
    expect(component.menuOpen()).toBe(false);
    expect(fixture.nativeElement.querySelector('a[href="/contacto"]').getAttribute('aria-current')).toBe('page');
    expect(fixture.nativeElement.querySelector('.navbar__cv').getAttribute('href')).toBe('/assets/documents/CV_Juan_Pablo_Rojas_Contreras.pdf');
  });
});
