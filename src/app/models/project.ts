export interface Project {
  id: string;
  title: string;
  category: string;
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
}