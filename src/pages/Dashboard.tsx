import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ScanSearch,
  Sparkles,
  AlertTriangle,
  ListChecks,
  ChevronDown,
  Quote,
} from 'lucide-react';
import BrandScoreRing from '@/components/BrandScoreRing';
import IdentityOrb from '@/components/IdentityOrb';
import { useAnalysis } from '@/context/AnalysisContext';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const featureNav = [
  {
    to: '/brand-audit',
    label: 'Brand Audit',
    desc: 'Why is your profile showing up this way?',
    Icon: ScanSearch,
    accent: 'text-brand-600',
    dot: 'bg-brand-500',
  },
  {
    to: '/story-mining',
    label: 'Story Mining',
    desc: 'What stories are hidden in your work?',
    Icon: Sparkles,
    accent: 'text-pink-600',
    dot: 'bg-pink-500',
  },
  {
    to: '/gap-analysis',
    label: 'Gap Analysis',
    desc: 'Where does your professional story break?',
    Icon: AlertTriangle,
    accent: 'text-coral-600',
    dot: 'bg-coral-500',
  },
  {
    to: '/action-plan',
    label: 'Action Plan',
    desc: 'What should you do next?',
    Icon: ListChecks,
    accent: 'text-mustard-600',
    dot: 'bg-mustard-500',
  },
];

const scoreMetrics = [
  { key: 'clarity', label: 'Clarity' },
  { key: 'consistency', label: 'Consistency' },
  { key: 'tone', label: 'Tone' },
  { key: 'evidence', label: 'Evidence' },
] as const;

function severityTone(severity: string): string {
  const s = severity.toLowerCase();
  if (s.includes('high')) return 'text-coral-600 bg-coral-50 border-coral-200';
  if (s.includes('medium')) return 'text-mustard-600 bg-mustard-50 border-mustard-200';
  if (s.includes('low')) return 'text-sky-600 bg-sky-50 border-sky-200';
  return 'text-ink-500 bg-ink-50 border-ink-200';
}

function formatDate(iso: string | null): string {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

/* ---------- Section Header ---------- */

function SectionHeader({
  label,
  accentClass,
}: {
  label: string;
  accentClass: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className={cn('h-2 w-2 rounded-full', accentClass)} />
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-400">
        {label}
      </p>
    </div>
  );
}

/* ---------- Expandable Insight Entry ---------- */

function ExpandableEntry({
  number,
  numberColor,
  title,
  children,
  collapsible,
  defaultOpen = false,
}: {
  number: string;
  numberColor: string;
  title: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  if (!collapsible) {
    return (
      <div className="group grid gap-4 py-7 sm:grid-cols-[2.5rem_1fr] sm:gap-8">
        <span
          className={cn(
            'font-display text-3xl font-bold leading-none tabular-nums transition-colors duration-300',
            numberColor,
          )}
        >
          {number}
        </span>
        <div className="space-y-3 transition-transform duration-300 group-hover:sm:translate-x-1">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="group">
      <button
        onClick={() => setOpen((v) => !v)}
        className="grid w-full cursor-pointer gap-4 py-7 text-left sm:grid-cols-[2.5rem_1fr_auto] sm:gap-8"
      >
        <span
          className={cn(
            'font-display text-3xl font-bold leading-none tabular-nums transition-colors duration-300',
            numberColor,
          )}
        >
          {number}
        </span>
        <div className="flex-1">
          <h3 className="font-display text-xl font-semibold text-ink-950 text-pretty">
            {title}
          </h3>
        </div>
        <ChevronDown
          className={cn(
            'mt-1 h-5 w-5 shrink-0 text-ink-300 transition-transform duration-300',
            open && 'rotate-180',
          )}
        />
      </button>
      <div
        className={cn(
          'grid overflow-hidden transition-all duration-500 sm:grid-cols-[2.5rem_1fr] sm:gap-8',
          open ? 'max-h-96 pb-7 opacity-100' : 'max-h-0 pb-0 opacity-0',
        )}
      >
        <span />
        <div className="space-y-3">{children}</div>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function Dashboard() {
  const navigate = useNavigate();
  const { analysis, analyzedAt } = useAnalysis();
  const { profile, user } = useAuth();

  const hasAnalysis = !!analysis;

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const displayName = profile?.name || user?.email?.split('@')[0] || 'there';
  const firstName = displayName.split(' ')[0];
  const score = analysis?.brandScore?.overall ?? 0;
  const identity = analysis?.professionalIdentity;
  const strengths = analysis?.strengths ?? [];
  const gaps = analysis?.gaps ?? [];
  const actions = analysis?.actionPlan?.actions ?? [];
  const firstAction = actions[0];

  return (
    <div className="mx-auto max-w-5xl">
      {/* ===== HERO ===== */}
      <section className="pt-4">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-brand-500" />
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-400">
            Your Professional Identity
          </p>
        </div>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink-950 text-balance sm:text-5xl lg:text-6xl">
              {greeting}, {firstName}.
            </h1>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-500 text-pretty">
              {hasAnalysis
                ? 'BrandLens read across everything you gave it. Here is what it found.'
                : 'Once you connect your sources, BrandLens will read across them and tell you what it sees.'}
            </p>
          </div>

          {/* Small orb as hero accent */}
          <div className="hidden lg:flex lg:justify-end">
            <IdentityOrb size={72} pulse ring rotate />
          </div>
        </div>
      </section>

      {/* ===== BRAND SCORE (ANCHOR — preserved) ===== */}
      <section className="mt-20 border-t border-ink-200/50 pt-12 sm:mt-28">
        <SectionHeader label="Brand Signal" accentClass="bg-brand-500" />

        <div className="mt-10 grid gap-12 lg:grid-cols-[auto_1fr] lg:gap-20">
          {/* Score ring — preserved exactly */}
          <div className="flex flex-col items-center lg:border-r lg:border-ink-200/50 lg:pr-16">
            <BrandScoreRing score={score} size={200} strokeWidth={16} />
            <p className="mt-5 max-w-xs text-center text-sm leading-relaxed text-ink-500 text-pretty">
              {hasAnalysis
                ? 'How clearly your professional identity comes across — at a glance.'
                : 'Complete an analysis to receive your brand signal.'}
            </p>
          </div>

          {/* Sub-scores — thin interactive indicators */}
          <div className="space-y-7 lg:pt-4">
            {scoreMetrics.map((metric) => {
              const val = analysis?.brandScore?.[metric.key] ?? 0;
              return (
                <div key={metric.key} className="group">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-medium uppercase tracking-[0.12em] text-ink-500">
                      {metric.label}
                    </span>
                    <span className="font-display text-lg font-bold tabular-nums text-ink-800 transition-colors duration-300 group-hover:text-brand-600">
                      {val}
                    </span>
                  </div>
                  <div className="mt-2 h-px w-full bg-ink-200">
                    <div
                      className="h-px bg-brand-500 transition-all duration-1000 ease-out group-hover:bg-brand-600"
                      style={{ width: `${Math.max(0, Math.min(100, val))}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== WHAT BRANDLENS SEES ===== */}
      <section className="mt-20 border-t border-ink-200/50 pt-12 sm:mt-28">
        <SectionHeader label="What BrandLens Sees" accentClass="bg-brand-500" />

        {identity ? (
          <div className="mt-10 max-w-3xl">
            <h2 className="font-display text-3xl font-bold leading-[1.1] text-ink-950 text-balance sm:text-4xl lg:text-5xl">
              {identity.title || 'Your professional identity'}
            </h2>
            {identity.summary && (
              <p className="mt-6 text-xl leading-relaxed text-ink-700 text-pretty">
                {identity.summary}
              </p>
            )}
            {identity.positioning && (
              <div className="mt-8 flex gap-4 border-l-2 border-brand-300 pl-5">
                <Quote className="hidden h-6 w-6 shrink-0 text-brand-300 sm:block" />
                <p className="text-lg italic leading-relaxed text-ink-500 text-pretty">
                  {identity.positioning}
                </p>
              </div>
            )}
          </div>
        ) : (
          <p className="mt-10 max-w-2xl text-xl leading-relaxed text-ink-400 text-pretty">
            Complete an analysis and BrandLens will tell you what it sees when it reads across your sources.
          </p>
        )}
      </section>

      {/* ===== WHAT STANDS OUT ===== */}
      <section className="mt-20 border-t border-ink-200/50 pt-12 sm:mt-28">
        <SectionHeader label="What Stands Out" accentClass="bg-mint-500" />

        <div className="mt-6 max-w-2xl">
          {strengths.length > 0 ? (
            <div className="divide-y divide-ink-200/40">
              {strengths.slice(0, 3).map((strength, index) => (
                <ExpandableEntry
                  key={`${strength.title}-${index}`}
                  number={String(index + 1).padStart(2, '0')}
                  numberColor="text-mint-400"
                  title={strength.title}
                  collapsible={strength.evidence.length > 0}
                  defaultOpen={index === 0}
                >
                  {strength.description && (
                    <p className="text-base leading-relaxed text-ink-600 text-pretty">
                      {strength.description}
                    </p>
                  )}
                  {strength.evidence.length > 0 && (
                    <div className="pt-2">
                      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-mint-500">
                        Evidence
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {strength.evidence.map((ev, ei) => (
                          <li
                            key={ei}
                            className="text-sm leading-relaxed text-ink-500 text-pretty"
                          >
                            {ev}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </ExpandableEntry>
              ))}
            </div>
          ) : (
            <p className="py-7 text-ink-400">
              After your analysis, BrandLens will highlight what it notices first.
            </p>
          )}
        </div>
      </section>

      {/* ===== WHERE YOUR STORY GETS BLURRY ===== */}
      <section className="mt-20 border-t border-ink-200/50 pt-12 sm:mt-28">
        <SectionHeader label="Where Your Story Gets Blurry" accentClass="bg-coral-500" />

        <div className="mt-6 max-w-2xl">
          {gaps.length > 0 ? (
            <>
              <div className="divide-y divide-ink-200/40">
                {gaps.slice(0, 3).map((gap, index) => (
                  <ExpandableEntry
                    key={gap.id || `gap-${index}`}
                    number={String(index + 1).padStart(2, '0')}
                    numberColor="text-coral-400"
                    title={gap.title}
                    collapsible={!!gap.impact || !!gap.description}
                    defaultOpen={index === 0}
                  >
                    {gap.severity && (
                      <span
                        className={cn(
                          'inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide',
                          severityTone(gap.severity),
                        )}
                      >
                        {gap.severity}
                      </span>
                    )}
                    {gap.description && (
                      <p className="text-base leading-relaxed text-ink-600 text-pretty">
                        {gap.description}
                      </p>
                    )}
                    {gap.impact && (
                      <p className="pt-1 text-sm leading-relaxed text-ink-400 text-pretty">
                        <span className="font-bold uppercase tracking-[0.12em] text-coral-500">
                          Impact
                        </span>{' '}
                        — {gap.impact}
                      </p>
                    )}
                  </ExpandableEntry>
                ))}
              </div>

              <button
                onClick={() => navigate('/gap-analysis')}
                className="group mt-8 inline-flex items-center gap-1.5 text-sm font-bold text-coral-600 transition-colors hover:text-coral-700"
              >
                Explore all {gaps.length} gaps
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </>
          ) : (
            <p className="py-7 text-ink-400">
              BrandLens will point out where your professional story loses clarity.
            </p>
          )}
        </div>
      </section>

      {/* ===== THE STORIES INSIDE YOUR WORK ===== */}
      <section className="mt-20 border-t border-ink-200/50 pt-12 sm:mt-28">
        <SectionHeader label="The Stories Inside Your Work" accentClass="bg-pink-500" />

        <div className="mt-10 max-w-2xl">
          <p className="text-xl leading-relaxed text-ink-700 text-pretty">
            BrandLens found narrative threads in your projects and experience —
            stories that could show what you actually bring to the table, if
            they were told more deliberately.
          </p>
          <button
            onClick={() => navigate('/story-mining')}
            className="group mt-8 inline-flex items-center gap-1.5 text-sm font-bold text-pink-600 transition-colors hover:text-pink-700"
          >
            Mine your stories
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </section>

      {/* ===== WHAT I'D CHANGE NEXT ===== */}
      <section className="mt-20 border-t border-ink-200/50 pt-12 sm:mt-28">
        <SectionHeader label="What I'd Change Next" accentClass="bg-mustard-500" />

        <div className="mt-6 max-w-2xl">
          {firstAction ? (
            <>
              <div className="divide-y divide-ink-200/40">
                <ExpandableEntry
                  number="01"
                  numberColor="text-mustard-400"
                  title={firstAction.title}
                  collapsible={!!firstAction.whatToDo}
                  defaultOpen
                >
                  {firstAction.whatToDo && (
                    <p className="text-base leading-relaxed text-ink-600 text-pretty">
                      {firstAction.whatToDo}
                    </p>
                  )}
                  {firstAction.priority && (
                    <span className="inline-block rounded-full border border-mustard-200 bg-mustard-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-mustard-600">
                      {firstAction.priority} priority
                    </span>
                  )}
                </ExpandableEntry>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <button
                  onClick={() => navigate('/action-plan')}
                  className="group inline-flex items-center gap-1.5 text-sm font-bold text-mustard-600 transition-colors hover:text-mustard-700"
                >
                  View Action Plan
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                <span className="text-xs text-ink-400">
                  {actions.length} recommended actions
                </span>
              </div>
            </>
          ) : (
            <p className="py-7 text-ink-400">
              Run an analysis and BrandLens will suggest where to start.
            </p>
          )}
        </div>
      </section>

      {/* ===== YOUR BRAND AT A GLANCE ===== */}
      <section className="mt-20 border-t border-ink-200/50 pt-12 sm:mt-28">
        <SectionHeader label="Your Brand at a Glance" accentClass="bg-sky-500" />

        <div className="mt-10 grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-6xl font-bold leading-none tabular-nums text-ink-950">
              {hasAnalysis ? score : '—'}
            </p>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.12em] text-ink-400">
              Brand Signal
            </p>
          </div>
          <div>
            <p className="font-display text-6xl font-bold leading-none tabular-nums text-ink-950">
              {strengths.length || '—'}
            </p>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.12em] text-ink-400">
              Strengths Found
            </p>
          </div>
          <div>
            <p className="font-display text-6xl font-bold leading-none tabular-nums text-ink-950">
              {gaps.length || '—'}
            </p>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.12em] text-ink-400">
              Gaps Identified
            </p>
          </div>
        </div>
        {analyzedAt && (
          <p className="mt-10 text-xs text-ink-400">
            Latest analysis: {formatDate(analyzedAt)}
          </p>
        )}
      </section>

      {/* ===== EXPLORE YOUR ANALYSIS ===== */}
      <section className="mt-20 border-t border-ink-200/50 pt-12 pb-8 sm:mt-28">
        <SectionHeader label="Explore Your Analysis" accentClass="bg-ink-400" />

        <div className="mt-8 divide-y divide-ink-200/60">
          {featureNav.map(({ to, label, desc, Icon, accent, dot }) => (
            <button
              key={to}
              onClick={() => navigate(to)}
              className="group flex w-full items-center gap-4 py-6 text-left transition-colors hover:bg-ink-50/50"
            >
              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink-50 transition-transform duration-300 group-hover:scale-105">
                <Icon className={cn('h-5 w-5', accent)} />
                <span
                  className={cn(
                    'absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-ink-50',
                    dot,
                  )}
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-lg font-bold text-ink-950">
                  {label}
                </p>
                <p className="text-sm text-ink-500">{desc}</p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-ink-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink-600" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
