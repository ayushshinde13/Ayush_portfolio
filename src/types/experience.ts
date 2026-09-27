export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  period: string;
  status?: string; // e.g. "Current"
  current?: boolean;
  location?: string;
  description?: string;
  bulletPoints: string[];
  techTags?: string[];
}
