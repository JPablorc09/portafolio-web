import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';

import { Footer } from './footer';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter([])],
      imports: [Footer],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => vi.unstubAllGlobals());

  it('mantiene las ocho páginas, el CV y los enlaces de contacto seguros', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(Array.from(element.querySelectorAll('.footer-navigation a')).map(link => link.getAttribute('href')))
      .toEqual(expect.arrayContaining(['/', '/sobre-mi', '/formacion', '/experiencia', '/proyectos', '/servicios', '/habilidades', '/contacto']));
    expect(element.querySelector('a[download]')?.getAttribute('href')).toBe('/assets/documents/CV_Juan_Pablo_Rojas_Contreras.pdf');
    expect(element.querySelector('a[href="mailto:juanparojasc1999@gmail.com"]')).not.toBeNull();
    expect(element.querySelector('a[href="https://wa.me/50662794709"]')).not.toBeNull();
    for (const link of element.querySelectorAll('a[target="_blank"]')) {
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    }
  });

  it.each([true, false])('respeta movimiento reducido al volver arriba: %s', reducedMotion => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: reducedMotion }));
    const scroll = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    (fixture.nativeElement.querySelector('.footer-top-button') as HTMLButtonElement).click();
    expect(scroll).toHaveBeenCalledWith({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' });
  });
});
