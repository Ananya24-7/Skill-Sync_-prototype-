export enum Page {
  DASHBOARD = 'Dashboard',
  GAP_ANALYSIS = 'Gap Analysis',
  ROADMAP = 'Roadmap',
  CALENDAR = 'Calendar',
  COMMUNITY = 'Community'
}

export interface Skill {
  name: string;
  type: 'technical' | 'soft' | 'tool';
}

export enum RecommendationType {
    COURSE = 'Course',
    CERTIFICATION = 'Certification',
    PROJECT = 'Project',
    INTERNSHIP = 'Internship'
}

export interface Recommendation {
  type: RecommendationType;
  title: string;
  description: string;
  platform: string;
  url?: string;
}

export interface AnalysisResult {
  requiredSkills: Skill[];
  matchedSkills: Skill[];
  gapSkills: Skill[];
  careerReadinessScore: number;
  summary: string;
  recommendations: Recommendation[];
}