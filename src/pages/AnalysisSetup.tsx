import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  FileText,
  Linkedin,
  FolderOpen,
  Boxes,
  Sparkles,
  BookOpen,
  Briefcase,
  Coffee,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type AnalysisScope = 'resume' | 'linkedin' | 'portfolio' | 'project' | 'everything';
type StoryMode = 'story_driven' | 'professional' | 'casual';

interface SetupData {
  analysisScope: AnalysisScope;
  userContext: string;
  storyMode: StoryMode;
}

const SETUP_KEY = 'brandlens_setup';

interface ScopeOption {
  value: AnalysisScope;
  label: string;
  desc: string;
  Icon: LucideIcon;
  theme: {
    chip: string;
    chipHover: string;
    selectedBorder: string;
    selectedBg: string;
    selectedChip: string;
    check: string;
    glow: string;
  };
}

const SCOPE_OPTIONS: ScopeOption[] = [
  {
    value: 'resume',
    label: 'Resume',
    desc: 'Your CV and work history',
    Icon: FileText,
    theme: {
      chip: 'bg-sky-50 text-sky-600',
      chipHover: 'group-hover:bg-sky-100',
      selectedBorder: 'border-sky-400',
      selectedBg: 'bg-sky-50/70',
      selectedChip: 'bg-sky-500 text-white',
      check: 'bg-sky-500',
      glow: 'bg-sky-200/40',
    },
  },
  {
    value: 'linkedin',
    label: 'LinkedIn',
    desc: 'Your professional presence',
    Icon: Linkedin,
    theme: {
      chip: 'bg-mint-50 text-mint-600',
      chipHover: 'group-hover:bg-mint-100',
      selectedBorder: 'border-mint-300',
      selectedBg: 'bg-mint-50/70',
      selectedChip: 'bg-mint-500 text-white',
      check: 'bg-mint-500',
      glow: 'bg-mint-200/40',
    },
  },
  {
    value: 'portfolio',
    label: 'Portfolio',
    desc: 'Your showcased work',
    Icon: FolderOpen,
    theme: {
      chip: 'bg-coral-50 text-coral-600',
      chipHover: 'group-hover:bg-coral-100',
      selectedBorder: 'border-coral-300',
      selectedBg: 'bg-coral-50/70',
      selectedChip: 'bg-coral-500 text-white',
      check: 'bg-coral-500',
      glow: 'bg-coral-200/40',
    },
  },
  {
    value: 'project',
    label: 'Project',
    desc: 'A specific thing you built',
    Icon: Boxes,
    theme: {
      chip: 'bg-pink-50 text-pink-600',
      chipHover: 'group-hover:bg-pink-100',
      selectedBorder: 'border-pink-300',
      selectedBg: 'bg-pink-50/70',
      selectedChip: 'bg-pink-500 text-white',
      check: 'bg-pink-500',
      glow: 'bg-pink-200/40',
    },
  },
  {
    value: 'everything',
    label: 'Everything',
    desc: 'The full picture',
    Icon: Sparkles,
    theme: {
      chip: 'bg-mustard-50 text-mustard-600',
      chipHover: 'group-hover:bg-mustard-100',
      selectedBorder: 'border-mustard-300',
      selectedBg: 'bg-mustard-50/70',
      selectedChip: 'bg-mustard-500 text-white',
      check: 'bg-mustard-500',
      glow: 'bg-mustard-200/40',
    },
  },
];

interface StoryOption {
  value: StoryMode;
  label: string;
  desc: string;
  Icon: LucideIcon;
  theme: {
    chip: string;
    selectedBorder: string;
    selectedBg: string;
    selectedChip: string;
    check: string;
    glow: string;
  };
}

const STORY_OPTIONS: StoryOption[] = [
  {
    value: 'story_driven',
    label: 'Story-driven',
    desc: 'Human, narrative and convincing.',
    Icon: BookOpen,
    theme: {
      chip: 'bg-coral-50 text-coral-600',
      selectedBorder: 'border-coral-300',
      selectedBg: 'bg-coral-50/70',
      selectedChip: 'bg-coral-500 text-white',
      check: 'bg-coral-500',
      glow: 'bg-coral-200/40',
    },
  },
  {
    value: 'professional',
    label: 'Professional',
    desc: 'Clear, structured and recruiter-ready.',
    Icon: Briefcase,
    theme: {
      chip: 'bg-sky-50 text-sky-600',
      selectedBorder: 'border-sky-400',
      selectedBg: 'bg-sky-50/70',
      selectedChip: 'bg-sky-500 text-white',
      check: 'bg-sky-500',
      glow: 'bg-sky-200/40',
    },
  },
  {
    value: 'casual',
    label: 'Casual',
    desc: 'Natural, conversational and relatable.',
    Icon: Coffee,
    theme: {
      chip: 'bg-mint-50 text-mint-600',
      selectedBorder: 'border-mint-300',
      selectedBg: 'bg-mint-50/70',
      selectedChip: 'bg-mint-500 text-white',
      check: 'bg-mint-500',
      glow: 'bg-mint-200/40',
    },
  },
];

const SCOPE_HELPER: Record<AnalysisScope, string> = {
  resume: "Tell us about yourself, your career direction, or anything you feel your resume doesn't show.",
  linkedin: 'Tell us how you see yourself professionally and how you want to be perceived.',
  portfolio: "Tell us about your work, what you're most proud of, and what you want your portfolio to communicate.",
  project: 'Tell us about yourself and this project — what you built, why you built it, and what part you worked on.',
  everything: 'Tell us about yourself, your goals, and anything you want BrandLens to understand before analysing your profile.',
};

const SHOW_STORY_STEP: AnalysisScope[] = ['project', 'portfolio', 'everything'];

export function saveSetupData(data: SetupData) {
  sessionStorage.setItem(SETUP_KEY, JSON.stringify(data));
}

export function getSetupData(): SetupData | null {
  try {
    const raw = sessionStorage.getItem(SETUP_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SetupData;
  } catch {
    return null;
  }
}

export default function AnalysisSetup() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [analysisScope, setAnalysisScope] = useState<AnalysisScope | null>(null);
  const [userContext, setUserContext] = useState('');
  const [storyMode, setStoryMode] = useState<StoryMode>('professional');

  const showStoryStep = analysisScope ? SHOW_STORY_STEP.includes(analysisScope) : false;
  const totalSteps = showStoryStep ? 3 : 2;

  const canProceedStep1 = analysisScope !== null;

  const finishSetup = () => {
    saveSetupData({
      analysisScope: analysisScope ?? 'resume',
      userContext: userContext.trim(),
      storyMode,
    });
    navigate('/upload');
  };

  const handleNext = () => {
    if (step === 1 && !canProceedStep1) return;
    if (step === 2) {
      if (showStoryStep) setStep(3);
      else finishSetup();
      return;
    }
    if (step === 3) {
      finishSetup();
      return;
    }
    setStep(step + 1);
  };

  const handleSkip = () => {
    setUserContext('');
    if (showStoryStep) setStep(3);
    else finishSetup();
  };

  const handleBack = () => {
    if (step === 1) {
      navigate('/dashboard');
      return;
    }
    setStep(step - 1);
  };

  const selectedScope = SCOPE_OPTIONS.find((o) => o.value === analysisScope);

  return (
    <div className="relative min-h-[calc(100vh-8rem)] overflow-hidden">
      {/* Soft organic decorative shapes */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 -top-16 h-72 w-72 rounded-full bg-sky-100/50 blur-3xl" />
        <div className="absolute -right-20 top-24 h-80 w-80 rounded-full bg-coral-100/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-mint-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-2xl px-1 py-8">
        {/* Back */}
        <button onClick={handleBack} className="btn-ghost -ml-2">
          <ArrowLeft className="h-4 w-4" />
          {step === 1 ? 'Back to Dashboard' : 'Back'}
        </button>

        {/* Step indicator */}
        <div className="mt-8 flex items-center gap-2">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
            <div key={s} className="flex flex-1 items-center gap-2">
              <div
                className={cn(
                  'h-1.5 flex-1 rounded-full transition-all duration-500',
                  s < step
                    ? 'bg-mint-400'
                    : s === step
                      ? 'bg-brand-500'
                      : 'bg-ink-200',
                )}
              />
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
          Step {step} of {totalSteps}
        </p>

        {/* STEP 1 — Analysis Scope */}
        {step === 1 && (
          <section key="step-1" className="mt-6 animate-fade-in space-y-6">
            <div>
              <h1 className="editorial-h2">
                What do you want to analyse?
              </h1>
              <p className="mt-2 text-base text-ink-500 text-pretty">
                Pick the lens you want BrandLens to look through.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {SCOPE_OPTIONS.map((opt) => {
                const selected = analysisScope === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setAnalysisScope(opt.value)}
                    className={cn(
                      'group relative flex items-center gap-4 overflow-hidden rounded-3xl border-2 px-5 py-4 text-left transition-all duration-200',
                      selected
                        ? cn(opt.theme.selectedBorder, opt.theme.selectedBg, 'shadow-soft')
                        : 'border-ink-200/80 bg-white hover:border-ink-300 hover:bg-ink-50',
                    )}
                  >
                    {selected && (
                      <span
                        className={cn(
                          'pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full blur-2xl',
                          opt.theme.glow,
                        )}
                      />
                    )}
                    <span
                      className={cn(
                        'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-colors',
                        selected ? opt.theme.selectedChip : cn(opt.theme.chip, opt.theme.chipHover),
                      )}
                    >
                      <opt.Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-base font-semibold text-ink-950">
                        {opt.label}
                      </p>
                      <p className="mt-0.5 text-xs text-ink-500">{opt.desc}</p>
                    </div>
                    {selected && (
                      <span
                        className={cn(
                          'flex h-6 w-6 shrink-0 animate-check-pop items-center justify-center rounded-full text-white',
                          opt.theme.check,
                        )}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* STEP 2 — User Context */}
        {step === 2 && analysisScope && (
          <section key="step-2" className="mt-6 animate-fade-in space-y-6">
            <div>
              <h1 className="editorial-h2">
                Tell us a little about it{' '}
                <span className="text-ink-400">💬</span>
              </h1>
              <p className="mt-2 text-base text-ink-500 text-pretty">
                No need to make it professional. Just tell us what you feel, in your own words.
              </p>
            </div>

            {selectedScope && (
              <div
                className={cn(
                  'flex items-start gap-3 rounded-2xl border px-4 py-3.5',
                  selectedScope.theme.selectedBorder,
                  selectedScope.theme.selectedBg,
                )}
              >
                <span
                  className={cn(
                    'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl',
                    selectedScope.theme.selectedChip,
                  )}
                >
                  <selectedScope.Icon className="h-4 w-4" />
                </span>
                <p className="text-sm leading-relaxed text-ink-700 text-pretty">
                  {SCOPE_HELPER[analysisScope]}
                </p>
              </div>
            )}

            <div>
              <textarea
                rows={6}
                value={userContext}
                onChange={(e) => setUserContext(e.target.value)}
                placeholder="Tell us who you are, what you've done, why you did it, what you're proud of, or anything you think we should know..."
                className="input resize-none text-base leading-relaxed"
              />
              <p className="mt-2 text-xs text-ink-400">
                Optional — skip if you'd rather let your sources speak for themselves.
              </p>
            </div>
          </section>
        )}

        {/* STEP 3 — Story Mode */}
        {step === 3 && (
          <section key="step-3" className="mt-6 animate-fade-in space-y-6">
            <div>
              <h1 className="editorial-h2">
                How do you want your story told?
              </h1>
              <p className="mt-2 text-base text-ink-500 text-pretty">
                This shapes the voice BrandLens writes in.
              </p>
            </div>

            <div className="space-y-3">
              {STORY_OPTIONS.map((opt) => {
                const selected = storyMode === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setStoryMode(opt.value)}
                    className={cn(
                      'group relative flex items-center gap-4 overflow-hidden rounded-3xl border-2 px-5 py-4 text-left transition-all duration-200',
                      selected
                        ? cn(opt.theme.selectedBorder, opt.theme.selectedBg, 'shadow-soft')
                        : 'border-ink-200/80 bg-white hover:border-ink-300 hover:bg-ink-50',
                    )}
                  >
                    {selected && (
                      <span
                        className={cn(
                          'pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full blur-2xl',
                          opt.theme.glow,
                        )}
                      />
                    )}
                    <span
                      className={cn(
                        'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-colors',
                        selected ? opt.theme.selectedChip : opt.theme.chip,
                      )}
                    >
                      <opt.Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-base font-semibold text-ink-950">
                        {opt.label}
                      </p>
                      <p className="mt-0.5 text-xs text-ink-500">{opt.desc}</p>
                    </div>
                    {selected && (
                      <span
                        className={cn(
                          'flex h-6 w-6 shrink-0 animate-check-pop items-center justify-center rounded-full text-white',
                          opt.theme.check,
                        )}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between border-t border-ink-200/70 pt-6">
          <div className="flex items-center gap-3">
            {step === 2 && (
              <button onClick={handleSkip} className="btn-ghost">
                Skip
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
            {step === 1 && !canProceedStep1 && (
              <p className="text-sm text-ink-400">Select an option to continue.</p>
            )}
            {(step !== 1 || canProceedStep1) && step !== 2 && (
              <p className="text-sm text-ink-500">Ready when you are.</p>
            )}
          </div>
          <button
            onClick={handleNext}
            disabled={step === 1 && !canProceedStep1}
            className="btn-primary px-6 py-3 text-base"
          >
            {step === totalSteps ? (
              <>
                Continue to Upload
                <ArrowRight className="h-5 w-5" />
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}