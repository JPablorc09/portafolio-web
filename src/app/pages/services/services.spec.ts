import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Services } from './services';

describe('Services', () => {
  it('preserves the three existing offers and carries the selected plan to Contact', async () => {
    await TestBed.configureTestingModule({
      imports: [Services],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(Services);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const plans = [...element.querySelectorAll('.plan-card')];
    expect(plans).toHaveLength(3);
    expect(plans.map((plan) => plan.querySelector('strong')?.textContent?.trim())).toEqual([
      '₡75.000',
      '₡120.000',
      '₡180.000',
    ]);
    expect(plans.map((plan) => plan.querySelectorAll('li').length)).toEqual([6, 7, 6]);
    const links = plans.map((plan) => plan.querySelector('a')!.getAttribute('href'));
    expect(links).toEqual([
      '/contacto?plan=emprendedor#cotizar',
      '/contacto?plan=profesional#cotizar',
      '/contacto?plan=personalizado#cotizar',
    ]);
    expect(element.querySelectorAll('.service-item')).toHaveLength(8);
    expect(element.textContent).toContain('catálogos digitales');
    expect(element.textContent).toContain('Los precios son de referencia');
  });
});
