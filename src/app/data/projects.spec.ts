import { PROJECTS } from './projects';
import { CONFIDENTIAL_PROJECT_IMAGE } from '../models/project';

describe('Catálogo público de proyectos', () => {
  it('conserva las URLs existentes y utiliza identificadores únicos', () => {
    const ids = PROJECTS.map(project => project.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual(expect.arrayContaining([
      'brasa-oliva', 'urbancut', 'incidentes', 'fallapp', 'asms', 'vendetico', 'prtg',
    ]));
    for (const id of ids) {
      expect(id).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it('mantiene los proyectos institucionales sin enlaces, galerías ni arquitectura interna', () => {
    const institutional = PROJECTS.filter(project => project.context === 'institutional');
    expect(institutional.map(project => project.id)).toEqual(
      expect.arrayContaining(['incidentes', 'fallapp', 'asms', 'prtg']),
    );
    for (const project of institutional) {
      expect(project.confidential).toBe(true);
      expect(project.imageKind).toBe('confidential-mockup');
      expect(project.image).toBe(CONFIDENTIAL_PROJECT_IMAGE);
      expect(project.demo).toBeUndefined();
      expect(project.github).toBeUndefined();
      expect(project.gallery).toEqual([]);
      expect(project.architecture).toEqual([]);
    }
  });

  it('no presenta proyectos en desarrollo como publicados ni ilustraciones como capturas', () => {
    for (const project of PROJECTS) {
      if (project.status === 'published') {
        expect(project.demo).toMatch(/^https:\/\//);
      }
      if (project.imageKind === 'placeholder') {
        expect(project.gallery).toEqual([]);
      }
    }
    expect(PROJECTS.find(project => project.id === 'radiomusicalapp')?.status).toBe('testing');
    expect(PROJECTS.some(project => project.id === 'control-financiero')).toBe(false);
    expect(PROJECTS.some(project => project.id === 'incidentes-clean-architecture')).toBe(false);
    expect(PROJECTS.find(project => project.id === 'escaneatodo')?.pendingFeatures.length).toBeGreaterThan(0);
  });
});
