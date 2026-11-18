import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Education } from './education';

describe('Education', () => {
  let component: Education;
  let fixture: ComponentFixture<Education>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter([])],
      imports: [Education],
    }).compileComponents();

    fixture = TestBed.createComponent(Education);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('presents CCNA 1 as a completed introductory course', () => {
    const course = component.educationItems.find(item => item.title.startsWith('CCNA 1'));
    expect(course?.status).toBe('Completado');
    expect(course?.institution).toBe('Cisco Networking Academy');
    expect(course?.period).toBe('Curso introductorio');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
