export type SkillCategory = 'Frontend & Motion' | 'Backend & Cloud' | 'Languages & Runtimes' | 'DevOps & Tooling';

export interface SkillItem {
  name: string;
  category: SkillCategory;
  proficiency: number; // 0 - 100
  experienceYears: string;
  iconName?: string;
  featured?: boolean;
  description?: string;
}

export interface SkillGroup {
  category: SkillCategory;
  description: string;
  skills: SkillItem[];
}
