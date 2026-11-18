import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Skills } from './skills';

describe('Skills', () => {
  let component: Skills;
  let fixture: ComponentFixture<Skills>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter([])],
      imports: [Skills],
    }).compileComponents();

    fixture = TestBed.createComponent(Skills);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('distinguishes professional use, practice and learning', () => {
    expect(new Set(component.categories.flatMap(category => category.skills.map(skill => skill.context)))).toEqual(new Set(['professional', 'practice', 'learning']));
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelectorAll('details summary').length).toBeGreaterThan(20);
    expect(page.querySelector('#desarrollo-asistido-ia')?.textContent).toContain('Actualmente en formación y práctica.');
    expect(page.textContent).toContain('código institucional confidencial');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
