import type { IconName } from "@/components/ui/icon";

/** Skill proficiency for portfolio display (replaces generic Expert/Intermediate labels) */
export type SkillProficiency = "Learning" | "Comfortable" | "Production";

export interface SkillItem {
  name: string;
  icon: IconName;
  iconClassName: string;
  proficiency: SkillProficiency;
}

export interface SkillCategory {
  title: string;
  icon: IconName;
  color: string;
  skills: SkillItem[];
}

export interface Project {
  id: number;
  slug: string;
  name: string;
  images: string[];
  description: string;
  challenge: string;
  metrics: string[];
  highlights: string[];
  technologies: string[];
  liveLink?: string;
  githubClient?: string;
  githubServer?: string;
  comingSoon?: boolean;
}

export type EducationIcon = "code" | "book" | "school";

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  status: "Ongoing" | "Completed";
  description: string;
  color: string;
  dotColor: string;
  icon: EducationIcon;
}

export type ExperienceIcon = "briefcase" | "code" | "rocket";

export interface WorkExperienceItem {
  role: string;
  company: string;
  period: string;
  status: "Current" | "Past";
  description: string;
  highlights: string[];
  technologies: string[];
  icon: ExperienceIcon;
}

export interface AboutContent {
  role: string;
  paragraphs: string[];
  techTags: string[];
  experienceLabel: string;
}
