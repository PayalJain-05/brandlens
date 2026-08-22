import type {
  Analysis,
  BrandScore,
  Gap,
  Project,
  Story,
  ActionItem,
  Strength,
  Attention,
  PlatformPresence,
} from '@/types';
import {
  mockAnalysis,
  mockBrandScore,
  mockGaps,
  mockProjects,
  mockStories,
  mockActionItems,
  mockStrengths,
  mockAttentions,
  mockPlatformPresence,
} from '@/data/mockData';

/**
 * AIService — abstraction layer over BrandLens analysis.
 *
 * Today every method resolves to deterministic mock data so the product
 * works end-to-end without an API key. Each method returns a Promise to
 * mirror the async shape of a future Gemini-backed implementation.
 *
 * To go live later, replace the bodies of these methods with calls to a
 * secure backend / Supabase Edge Function that holds the Gemini API key.
 * The function signatures and return types are intentionally stable so
 * the frontend does not need to change.
 */

export interface AIService {
  analyzeProfile(): Promise<Analysis>;
  runBrandAudit(): Promise<{
    score: BrandScore;
    strengths: Strength[];
    attentions: Attention[];
    platformPresence: PlatformPresence[];
  }>;
  mineStories(): Promise<Story[]>;
  analyzeGaps(): Promise<Gap[]>;
  generateActionPlan(): Promise<ActionItem[]>;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class MockAIService implements AIService {
  async analyzeProfile(): Promise<Analysis> {
    await delay(300);
    return mockAnalysis;
  }

  async runBrandAudit() {
    await delay(300);
    return {
      score: mockBrandScore,
      strengths: mockStrengths,
      attentions: mockAttentions,
      platformPresence: mockPlatformPresence,
    };
  }

  async mineStories(): Promise<Story[]> {
    await delay(300);
    return mockStories;
  }

  async analyzeGaps(): Promise<Gap[]> {
    await delay(300);
    return mockGaps;
  }

  async generateActionPlan(): Promise<ActionItem[]> {
    await delay(300);
    return mockActionItems;
  }
}

// A real implementation would call a Supabase Edge Function here:
//
// class GeminiAIService implements AIService {
//   async runBrandAudit() {
//     const { data } = await supabase.functions.invoke('brand-audit', { body: { sources } });
//     return validateAudit(data);
//   }
//   ...
// }
//
// The function holds GEMINI_API_KEY in Supabase secrets and never exposes it
// to the client. AI output is returned as structured JSON and validated
// before it reaches the UI. The model is instructed never to invent
// achievements, metrics, projects, skills or experience; missing evidence
// is reported as "Evidence not provided." rather than fabricated.

const useMock = true; // flip to wire up the real service

export const aiService: AIService = useMock
  ? new MockAIService()
  : new MockAIService(); // placeholder until Gemini service is connected
