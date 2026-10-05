export type ProjectType =
  | 'empresarial'
  | 'integracion'
  | 'full-stack'
  | 'datos';

export interface Project {
  id: string;

  title: string;

  category: string;

  type: ProjectType;

  shortDescription: string;

  fullDescription: string;

  image: string;

  technologies: string[];

  features: string[];

  architecture: string[];

  challenges: string[];

  learnings: string[];

  gallery: string[];

  github?: string;

  demo?: string;

  confidential?: boolean;

  professional?: boolean;
}