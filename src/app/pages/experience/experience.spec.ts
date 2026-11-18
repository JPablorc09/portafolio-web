import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Experience } from './experience';

describe('Experience', () => {
  let component: Experience;
  let fixture: ComponentFixture<Experience>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter([])],
      imports: [Experience],
    }).compileComponents();

    fixture = TestBed.createComponent(Experience);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('identifies the contractor and links only institutional summaries', () => {
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('.experience-relationship')?.textContent).toContain('Grupo Alega Costa Rica');
    expect(page.querySelector('.experience-relationship')?.textContent).toContain('Poder Judicial de Costa Rica');
    expect(component.relatedProjects).toHaveLength(4);
    expect(component.relatedProjects.every(project => project.context === 'institutional')).toBe(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
