// BrandLens data architecture — shared types used across the app.
// Structured so mock data can later be replaced with Supabase queries.

export type Priority = 'high' | 'medium' | 'low';
export type SourceType = 'resume' | 'portfolio' | 'projects' | 'linkedin';
export type SourceStatus = 'pending' | 'uploading' | 'processed' | 'failed';
export type StoryStatus = 'unmined' | 'mined' | 'saved';

export interface User {
  id: string;
  name: string;
  role: string;
  email: string;
  avatarInitials: string;
  headline: string;
  about: string;
  location: string;
}

export interface ProfessionalSource {
  id: string;
  type: SourceType;
  name: string;
  status: SourceStatus;
  size?: string;
  addedAt: string;
}

export interface BrandMetric {
  key: 'clarity' | 'consistency' | 'tone' | 'evidence';
  label: string;
  score: number;
  description: string;
}

export interface BrandScore {
  overall: number;
  previousOverall: number;
  delta: number;
  metrics: BrandMetric[];
  insight: string;
}

export interface AnalysisStage {
  id: string;
  label: string;
  status: 'pending' | 'active' | 'done';
}

export interface Analysis {
  id: string;
  createdAt: string;
  status: 'processing' | 'complete' | 'failed';
  sources: ProfessionalSource[];
  brandScore: BrandScore;
  stages: AnalysisStage[];
}

export interface PlatformPresence {
  skill: string;
  resume: boolean | 'partial';
  linkedin: boolean | 'partial';
  portfolio: boolean | 'partial';
}

export interface Strength {
  id: string;
  title: string;
  detail: string;
}

export interface Attention {
  id: string;
  title: string;
  detail: string;
}

export interface Story {
  id: string;
  projectId: string;
  projectTitle: string;
  category: string;
  original: string;
  problem: string;
  action: string;
  insight: string;
  impact: string;
  strongerStory: string;
  status: StoryStatus;
}

export interface Gap {
  id: string;
  index: string;
  title: string;
  category: 'evidence' | 'platform' | 'positioning';
  priority: Priority;
  explanation: string;
  recommendation: string;
}

export interface ActionItem {
  id: string;
  index: string;
  title: string;
  priority: Priority;
  why: string;
  doThis: string;
  effort: string;
  completed: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  tools: string[];
  description: string;
  storyStatus: StoryStatus;
  storyId?: string;
}

export interface BrandJourneyPoint {
  label: string;
  score: number;
  date: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  org: string;
  period: string;
  summary: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  period: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface ProfessionalProfile {
  userId: string;
  headline: string;
  about: string;
  skills: string[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
}

/* ---------- Structured BrandLens Analysis (from Gemini) ---------- */

export interface ProfessionalIdentity {
  title: string;
  summary: string;
  positioning: string;
}

export interface BrandScoreBreakdown {
  overall: number;
  clarity: number;
  consistency: number;
  tone: number;
  evidence: number;
}

export interface AnalysisStrength {
  title: string;
  description: string;
  evidence: string[];
}

export interface AnalysisGap {
  id: string;
  category: string;
  title: string;
  description: string;
  severity: string;
  confidence: string;
  whatExists: string;
  whatIsMissing: string;
  impact: string;
  whyItMatters: string;
}

export interface AnalysisSkill {
  skill: string;
  level: string;
  evidence: string[];
}

export interface Differentiation {
  summary: string;
  uniqueStrengths: string[];
  competitiveEdge: string;
}

export interface TargetPositioning {
  idealRoles: string[];
  industry: string[];
  positioningStatement: string;
}

export interface RecruiterPerception {
  immediateSignal: string;
  strongestVisibleStrength: string;
  hiddenStrength: string;
  mainConfusion: string;
  credibilityGap: string;
}

export interface MinedStory {
  title: string;
  type: string;
  hook: string;
  context: string;
  challenge: string;
  action: string;
  result: string;
  missingInformation: string[];
  storyPotential: number;
}

export interface StoryMiningResult {
  stories: MinedStory[];
}

export interface AnalysisAction {
  id: string;
  priority: string;
  category: string;
  title: string;
  whatToDo: string;
  why: string;
  where: string;
  informationNeeded: string[];
  expectedResult: string;
}

export interface ActionPlanResult {
  summary: string;
  actions: AnalysisAction[];
}

export interface BrandLensAnalysis {
  professionalIdentity: ProfessionalIdentity;
  brandScore: BrandScoreBreakdown;
  strengths: AnalysisStrength[];
  gaps: AnalysisGap[];
  skills: AnalysisSkill[];
  differentiation: Differentiation;
  targetPositioning: TargetPositioning;
  recruiterPerception: RecruiterPerception;
  storyMining: StoryMiningResult;
  actionPlan: ActionPlanResult;
  brandStatement: string;
}
