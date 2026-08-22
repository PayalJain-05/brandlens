import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  Loader2,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import IdentityOrb from '@/components/IdentityOrb';
import { analysisStageLabels } from '@/data/mockData';
import { useAnalysis } from '@/context/AnalysisContext';
import { getSetupData } from '@/pages/AnalysisSetup';
import { cn } from '@/lib/utils';
import type { BrandLensAnalysis } from '@/types';

const FUNCTION_URL =
  'https://rladbfgiwijbarcgwogl.supabase.co/functions/v1/hyper-responder';

interface StoredFile {
  name: string;
  type: 'resume' | 'portfolio' | 'projects';
  text: string;
}

interface StoredSources {
  files: StoredFile[];
  linkedinUrl: string;
  linkedinText: string;
  savedAt: string;
}

function safeArray<T>(val: unknown): T[] {
  return Array.isArray(val) ? (val as T[]) : [];
}

function safeStr(val: unknown): string {
  return typeof val === 'string' ? val : '';
}

function safeNum(val: unknown): number {
  const n = Number(val);
  return Number.isFinite(n) ? n : 0;
}

function normalizeAnalysis(raw: Record<string, unknown>): BrandLensAnalysis {
  const pi = (raw.professionalIdentity ?? {}) as Record<string, unknown>;
  const bs = (raw.brandScore ?? {}) as Record<string, unknown>;
  const diff = (raw.differentiation ?? {}) as Record<string, unknown>;
  const tp = (raw.targetPositioning ?? {}) as Record<string, unknown>;
  const rp = (raw.recruiterPerception ?? {}) as Record<string, unknown>;
  const sm = (raw.storyMining ?? {}) as Record<string, unknown>;
  const ap = (raw.actionPlan ?? {}) as Record<string, unknown>;

  return {
    professionalIdentity: {
      title: safeStr(pi.title),
      summary: safeStr(pi.summary),
      positioning: safeStr(pi.positioning),
    },
    brandScore: {
      overall: safeNum(bs.overall),
      clarity: safeNum(bs.clarity),
      consistency: safeNum(bs.consistency),
      tone: safeNum(bs.tone),
      evidence: safeNum(bs.evidence),
    },
    strengths: safeArray(raw.strengths).map((s) => {
      const item = s as Record<string, unknown>;
      return {
        title: safeStr(item.title),
        description: safeStr(item.description),
        evidence: safeArray<string>(item.evidence),
      };
    }),
    gaps: safeArray(raw.gaps).map((g, i) => {
      const item = g as Record<string, unknown>;
      return {
        id: safeStr(item.id) || `gap-${i + 1}`,
        category: safeStr(item.category),
        title: safeStr(item.title),
        description: safeStr(item.description),
        severity: safeStr(item.severity),
        confidence: safeStr(item.confidence),
        whatExists: safeStr(item.whatExists),
        whatIsMissing: safeStr(item.whatIsMissing),
        impact: safeStr(item.impact),
        whyItMatters: safeStr(item.whyItMatters),
      };
    }),
    skills: safeArray(raw.skills).map((s) => {
      const item = s as Record<string, unknown>;
      return {
        skill: safeStr(item.skill),
        level: safeStr(item.level),
        evidence: safeArray<string>(item.evidence),
      };
    }),
    differentiation: {
      summary: safeStr(diff.summary),
      uniqueStrengths: safeArray<string>(diff.uniqueStrengths),
      competitiveEdge: safeStr(diff.competitiveEdge),
    },
    targetPositioning: {
      idealRoles: safeArray<string>(tp.idealRoles),
      industry: safeArray<string>(tp.industry),
      positioningStatement: safeStr(tp.positioningStatement),
    },
    recruiterPerception: {
      immediateSignal: safeStr(rp.immediateSignal),
      strongestVisibleStrength: safeStr(rp.strongestVisibleStrength),
      hiddenStrength: safeStr(rp.hiddenStrength),
      mainConfusion: safeStr(rp.mainConfusion),
      credibilityGap: safeStr(rp.credibilityGap),
    },
    storyMining: {
      stories: safeArray(sm.stories).map((st) => {
        const item = st as Record<string, unknown>;

        const strongerStory =
          (item.strongerStory ?? item.stronger_story ?? {}) as Record<string, unknown>;

        return {
          title:
            safeStr(item.title) ||
            safeStr(item.project_or_experience),

          type:
            safeStr(item.type),

          hook:
            safeStr(item.hook),

          context:
            safeStr(item.context) ||
            safeStr(
              (item.context as Record<string, unknown> | undefined)?.content,
            ),

          challenge:
            safeStr(item.challenge) ||
            safeStr(
              (item.problem as Record<string, unknown> | undefined)?.content,
            ),

          action:
            safeStr(item.action) ||
            safeArray<Record<string, unknown>>(item.actions)
              .map((a) => safeStr(a.action))
              .filter(Boolean)
              .join(' '),

          result:
            safeStr(item.result) ||
            safeStr(
              (item.outcome as Record<string, unknown> | undefined)?.content,
            ),

          missingInformation:
            safeArray<string>(
              item.missingInformation ?? item.missing_story_elements,
            ),

          storyPotential:
            safeNum(
              item.storyPotential ??
                (item.story_potential as Record<string, unknown> | undefined)?.score,
            ),

          goal:
            safeStr(item.goal) ||
            safeStr(
              (item.goal as Record<string, unknown> | undefined)?.content,
            ),

          personalContribution:
            safeStr(item.personalContribution) ||
            safeStr(
              (
                item.personal_contribution as
                  | Record<string, unknown>
                  | undefined
              )?.content,
            ),

          strongerStory: {
            storyDriven:
              safeStr(
                strongerStory.storyDriven ??
                  strongerStory.story_driven,
              ),

            professional:
              safeStr(
                strongerStory.professional,
              ),

            casual:
              safeStr(
                strongerStory.casual,
              ),
          },
        };
      }),
    },
    actionPlan: {
      summary: safeStr(ap.summary),
      actions: safeArray(ap.actions).map((a, i) => {
        const item = a as Record<string, unknown>;
        return {
          id: safeStr(item.id) || `action-${i + 1}`,
          priority: safeStr(item.priority),
          category: safeStr(item.category),
          title: safeStr(item.title),
          whatToDo: safeStr(item.whatToDo),
          why: safeStr(item.why),
          where: safeStr(item.where),
          informationNeeded: safeArray<string>(
            item.informationNeeded ?? item.information_needed,
          ),
          expectedResult: safeStr(
            item.expectedResult ?? item.expected_result,
          ),
        };
      }),
    },
    brandStatement: safeStr(raw.brandStatement),
  };
}

export default function AnalysisPage() {
  const navigate = useNavigate();
  const { setAnalysis } = useAnalysis();

  const [activeStage, setActiveStage] = useState(0);
  const [error, setError] = useState('');
  const [analyzing, setAnalyzing] = useState(true);

  const [setup] = useState(() => getSetupData());
  const analysisScope = setup?.analysisScope ?? 'resume';
  const userContext = setup?.userContext ?? '';
  const storyMode = setup?.storyMode ?? 'story_driven';

  const total = analysisStageLabels.length;
  void analysisScope; void userContext; void storyMode;

  useEffect(() => {
    let cancelled = false;

    async function runAnalysis() {
      try {
        setAnalyzing(true);
        setError('');

        const stored = sessionStorage.getItem('brandlens_sources');
        if (!stored) {
          throw new Error(
            'No uploaded information was found. Please go back and add a source.',
          );
        }

        const sources: StoredSources = JSON.parse(stored);

        const sourceSections: string[] = [];

        for (const file of sources.files || []) {
          if (file.text?.trim()) {
            sourceSections.push(
              `SOURCE TYPE: ${file.type.toUpperCase()}
FILE NAME: ${file.name}

${file.text.trim()}`,
            );
          }
        }

        if (sources.linkedinText?.trim()) {
          sourceSections.push(
            `SOURCE TYPE: LINKEDIN PROFILE TEXT

${sources.linkedinText.trim()}`,
          );
        }

        if (sources.linkedinUrl?.trim()) {
          sourceSections.push(
            `LINKEDIN PROFILE URL:
${sources.linkedinUrl.trim()}

Note: Do not scrape or invent information from this URL. Use only information provided in the uploaded sources and LinkedIn text.`,
          );
        }

        if (sourceSections.length === 0) {
          throw new Error(
            'No readable content was found in your uploaded sources.',
          );
        }

        const professionalInformation = sourceSections.join('\n\n---\n\n');

        const response = await fetch(FUNCTION_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: professionalInformation,
            analysisScope,
            userContext,
            storyMode,
          }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data?.details?.message ||
              data?.error ||
              'BrandLens analysis failed.',
          );
        }

        const aiResult = data.analysis;

        if (!aiResult || typeof aiResult !== 'object') {
          throw new Error('Invalid BrandLens analysis returned.');
        }

        const normalized = normalizeAnalysis(aiResult as Record<string, unknown>);

        if (cancelled) return;

        setAnalysis(normalized);
        setAnalyzing(false);
        setActiveStage(total);
      } catch (err) {
        if (cancelled) return;
        console.error('BrandLens analysis error:', err);
        setError(
          err instanceof Error
            ? err.message
            : 'Something went wrong while analyzing your profile.',
        );
        setAnalyzing(false);
      }
    }

    runAnalysis();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  useEffect(() => {
    if (!analyzing || activeStage >= total) return;
    const timer = setTimeout(() => {
      setActiveStage((current) => Math.min(current + 1, total));
    }, 950);
    return () => clearTimeout(timer);
  }, [activeStage, analyzing, total]);

  const done = !analyzing && !error && activeStage >= total;

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-4xl flex-col items-center justify-center py-8">
      {/* Orb */}
      <div className="relative mb-10">
        <div
          className="absolute -inset-8 rounded-full bg-brand-200/40 blur-2xl"
          aria-hidden="true"
        />
        <IdentityOrb size={140} pulse={analyzing} rotate />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-white/90">
            {error ? 'Error' : done ? 'Ready' : 'Analyzing'}
          </span>
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-center font-display text-3xl font-bold tracking-tight text-ink-950 text-balance lg:text-4xl">
        {error
          ? 'BrandLens hit a snag.'
          : done
            ? 'Your analysis is ready.'
            : 'BrandLens is connecting the dots…'}
      </h1>

      <p className="mt-2 text-center text-ink-500">
        {error
          ? 'Something went wrong while processing your sources.'
          : done
            ? 'Your professional identity has been analyzed.'
            : 'We\u2019re reading across your sources to understand how your brand comes across.'}
      </p>

      {/* Analysis stages */}
      {!error && (
        <ol className="mt-10 w-full max-w-md space-y-3">
          {analysisStageLabels.map((label, i) => {
            const isDone = i < activeStage;
            const isActive = i === activeStage && analyzing;

            return (
              <li
                key={label}
                className={cn(
                  'flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-500',
                  isDone
                    ? 'border-mint-200 bg-mint-50/60'
                    : isActive
                      ? 'border-brand-200 bg-brand-50'
                      : 'border-ink-200 bg-white opacity-60',
                )}
              >
                <span
                  className={cn(
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors',
                    isDone
                      ? 'bg-mint-500 text-white'
                      : isActive
                        ? 'bg-brand-600 text-white'
                        : 'bg-ink-200 text-ink-400',
                  )}
                >
                  {isDone ? (
                    <Check className="h-4 w-4 animate-check-pop" />
                  ) : isActive ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <span className="text-xs font-semibold">{i + 1}</span>
                  )}
                </span>

                <span
                  className={cn(
                    'text-sm font-medium transition-colors',
                    isDone
                      ? 'text-mint-800'
                      : isActive
                        ? 'text-brand-800'
                        : 'text-ink-500',
                  )}
                >
                  {label}
                  {isActive && <span className="ml-1 text-ink-400">…</span>}
                </span>
              </li>
            );
          })}
        </ol>
      )}

      {/* Error */}
      {error && (
        <div className="mt-8 w-full rounded-2xl border border-coral-200 bg-coral-50 p-5">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-coral-600" />
            <div>
              <p className="font-semibold text-coral-800">Analysis failed</p>
              <p className="mt-1 break-words text-sm text-coral-700">{error}</p>
              <button
                onClick={() => navigate('/upload')}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-coral-700 underline-offset-2 hover:underline"
              >
                Try again
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Continue */}
      {done && (
        <div className="mt-10 animate-fade-in">
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-primary px-6 py-3 text-base"
          >
            View My Brand Score
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}