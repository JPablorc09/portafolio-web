
export type ProjectType =
  | 'empresarial'
  | 'integracion'
  | 'full-stack'
  | 'datos'
  | 'web-comercial'
  | 'movil'
  | 'herramienta-web'
  | 'backend';

export type ProjectContext = 'institutional' | 'personal' | 'demo';
export type ProjectStatus = 'professional' | 'published' | 'documented' | 'development' | 'testing';
export type ProjectImageKind = 'capture' | 'placeholder' | 'confidential-mockup' | 'promotional';

export const CONFIDENTIAL_PROJECT_IMAGE = '/assets/images/projects/confidencial.png';

export const PROJECT_CONTEXT_LABELS: Record<ProjectContext, string> = {
  institutional: 'Proyecto institucional',
  personal: 'Proyecto personal',
  demo: 'Demo comercial',
};

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  professional: 'Experiencia profesional · Acceso restringido',
  published: 'Publicado',
  documented: 'Desarrollado · Sin demo pública',
  development: 'En desarrollo',
  testing: 'En desarrollo y pruebas de publicación',
};

export interface Project {
  id: string;
  title: string;
  category: string;
  type: ProjectType;
  context: ProjectContext;
  status: ProjectStatus;
  problem: string;
  verificationNote: string;
  featuresHeading: string;
  pendingFeatures: string[];
  shortDescription: string;
  fullDescription: string;
  image: string;
  imageKind: ProjectImageKind;
  technologies: string[];
  features: string[];
  architecture: string[];
  challenges: string[];
  learnings: string[];
  gallery: string[];
  aiAssisted?: boolean;
  methodology?: string[];
  imageTitles?: Record<string, string>;
  statusNote?: string;
  demoLabel?: string;
  github?: string;
  demo?: string;
  confidential?: boolean;
  professional?: boolean;
}

export function isRestrictedProject(project: Project): boolean {
  return project.context === 'institutional' || project.confidential === true;
}
