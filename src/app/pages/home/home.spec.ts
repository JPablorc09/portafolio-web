import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Home } from './home';
import { PROJECTS } from '../../data/projects';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter([])],
      imports: [Home],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('presenta el perfil, los destacados actuales, la experiencia y los accesos profesionales', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h1')?.textContent).toContain('Desarrollo Full Stack.');
    expect(element.textContent).toContain('Juan Pablo Rojas Contreras');
    expect(element.textContent).toContain('Grupo Alega Costa Rica');
    expect(element.textContent).toContain('Actualmente en formación y práctica');
    expect(element.querySelectorAll('app-project-card').length).toBe(3);
    for (const id of ['vendetico', 'escaneatodo', 'incidentes']) {
      expect(element.querySelector(`a[href="/proyectos/${id}"]`)).not.toBeNull();
    }
    expect(element.textContent).toContain(`Ver los ${PROJECTS.length} proyectos`);
    expect(element.querySelector('a[download]')?.getAttribute('href')).toBe('/assets/documents/CV_Juan_Pablo_Rojas_Contreras.pdf');
    expect(element.querySelector('a[href="/contacto"]')).not.toBeNull();
    expect(element.querySelector('a[href="/servicios"]')).not.toBeNull();
  });
});
