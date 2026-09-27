export type ProjectCategory = 'frontend' | 'fullstack';

export interface ProjectLink {
  live?: string;
  github?: string;
  demo?: string;
  article?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  description?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  categoryLabel: string;
  year: number | string;
  summary: string;
  description: string;
  overview: string;
  challenge: string;
  solution: string;
  highlights: string[];
  architectureHighlights: string[];
  impact: string;
  stack: string[];
  techStack: string[];
  tags: string[];
  featured: boolean;
  image: string;
  accentColor: string;
  liveUrl?: string;
  githubUrl?: string;
  links: ProjectLink;
  metrics: ProjectMetric[];
}
