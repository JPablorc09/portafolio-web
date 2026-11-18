import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Projects } from './projects';

describe('Filtros del catálogo', () => {
  it('combina contexto y categoría y permite volver al catálogo completo', async () => {
    await TestBed.configureTestingModule({
      imports: [Projects],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(Projects);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const click = async (label: string) => {
      const button = Array.from(element.querySelectorAll('button')).find(
        item => item.textContent?.trim() === label,
      );
      expect(button, label).toBeDefined();
      button!.click();
      await fixture.whenStable();
    };
    const total = element.querySelectorAll('app-project-card').length;
    await click('Institucionales');
    expect(element.querySelectorAll('app-project-card').length).toBe(4);
    const category = element.querySelector<HTMLSelectElement>('#project-category')!;
    category.value = 'movil';
    category.dispatchEvent(new Event('change', { bubbles: true }));
    await fixture.whenStable();
    expect(element.textContent).toContain('No hay proyectos en esta categoría');
    await click('Ver todos los proyectos');
    expect(element.querySelectorAll('app-project-card').length).toBe(total);
    await click('Personales');
    category.value = 'movil';
    category.dispatchEvent(new Event('change', { bubbles: true }));
    await fixture.whenStable();
    expect(element.querySelectorAll('app-project-card').length).toBe(1);
    expect(fixture.componentInstance.getFilterCount('movil')).toBe(1);
    expect(category.value).toBe('movil');
    expect(element.querySelectorAll('button[aria-pressed="true"]').length).toBe(1);
  });
});
