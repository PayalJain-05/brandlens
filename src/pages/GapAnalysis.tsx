import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileText, Linkedin, FolderKanban, Check, Minus, Puzzle, Wrench, AlertCircle, Star } from 'lucide-react';
import PriorityBadge from '@/components/PriorityBadge';
import { mockGaps, mockPlatformPresence } from '@/data/mockData';
import { cn } from '@/lib/utils';

const categoryCounts = [
  { count: 3, label: 'Evidence issues', tone: 'text-coral-700' },
  { count: 2, label: 'Platform mismatches', tone: 'text-mustard-700' },
  { count: 1, label: 'Positioning issue', tone: 'text-sky-700' },
];

const platforms = [
  { key: 'resume', label: 'Resume', Icon: FileText },
  { key: 'linkedin', label: 'LinkedIn', Icon: Linkedin },
  { key: 'portfolio', label: 'Portfolio', Icon: FolderKanban },
] as const;

function Cell({ value }: { value: boolean | 'partial' }) {
  if (value === true) return <Check className="mx-auto h-5 w-5 text-mint-600" aria-label="Present" />;
  if (value === 'partial') return <span className="mx-auto block h-2.5 w-2.5 rounded-full bg-mustard-400" aria-label="Partial" />;
  return <Minus className="mx-auto h-5 w-5 text-coral-300" aria-label="Missing" />;
}

const journey = [
  { label: 'Skill', Icon: Puzzle, tone: 'bg-brand-100 text-brand-700', desc: 'You claim it' },
  { label: 'Evidence', Icon: FileText, tone: 'bg-sky-100 text-sky-700', desc: 'You can prove it' },
  { label: 'Platform', Icon: FolderKanban, tone: 'bg-mustard-100 text-mustard-700', desc: "It's visible" },
  { label: 'Gap', Icon: AlertCircle, tone: 'bg-coral-100 text-coral-700', desc: "Something's missing" },
  { label: 'Fix', Icon: Wrench, tone: 'bg-mint-100 text-mint-700', desc: 'Close it' },
] as const;

const priorityWeight: Record<string, string> = {
  high: 'border-l-4 border-l-coral-500',
  medium: 'border-l-4 border-l-mustard-400',
  low: 'border-l-4 border-l-sky-400',
};

export default function GapAnalysis() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      {/* Header */}
      <section className="relative">
        <div className="flex items-center gap-3">
          <span className="section-number">01</span>
          <span className="section-label">Gap Analysis</span>
        </div>
        <h1 className="mt-3 editorial-h1">
          Your profile has {mockGaps.length} gaps.
        </h1>
        <p className="mt-3 max-w-xl text-lg text-ink-600 text-pretty">
          Here's what's stopping your professional story from being as strong as it could be.
        </p>
      </section>

      {/* Gap summary — categories, not a total */}
      <section className="relative">
        <div className="flex items-center gap-3 mb-4">
          <span className="section-number">02</span>
          <span className="section-label">Gap categories</span>
        </div>

        <div className="relative overflow-hidden rounded-4xl bg-warm-coral p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-coral-200/40 blur-3xl" aria-hidden="true" />
          <div className="relative">
            <p className="font-display text-5xl font-bold text-ink-950 tabular-nums">{mockGaps.length}</p>
            <p className="font-display text-xl font-semibold text-coral-800">priority gaps found</p>
            <p className="mt-2 text-sm text-ink-500">Some issues may overlap across categories.</p>

            <div className="mt-6 flex flex-wrap gap-6">
              {categoryCounts.map((c) => (
                <div key={c.label} className="flex items-baseline gap-2">
                  <span className={cn('font-display text-3xl font-bold tabular-nums', c.tone)}>{c.count}</span>
                  <span className="text-sm font-medium text-ink-600">{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gap journey visual */}
      <section className="relative">
        <div className="flex items-center gap-3 mb-4">
          <span className="section-number">03</span>
          <span className="section-label">Here's the missing piece</span>
        </div>

        <div className="relative overflow-hidden rounded-4xl border border-ink-200/60 bg-white p-8 sm:p-12">
          <p className="text-sm text-ink-500">How a skill becomes a gap — and how to fix it.</p>

          <div className="mt-8">
            {/* Desktop horizontal journey */}
            <div className="hidden items-stretch justify-between sm:flex">
              {journey.map((step, i) => (
                <div key={step.label} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center gap-2">
                    <span className={cn('flex h-14 w-14 items-center justify-center rounded-2xl transition-transform hover:scale-110', step.tone)}>
                      <step.Icon className="h-6 w-6" />
                    </span>
                    <span className="text-sm font-bold text-ink-800">{step.label}</span>
                    <span className="text-xs text-ink-400">{step.desc}</span>
                  </div>
                  {i < journey.length - 1 && (
                    <div className="mx-2 flex-1">
                      <svg width="100%" height="20" viewBox="0 0 100 20" fill="none" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M 2 10 L 90 10" stroke="#ffc6c7" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
                        <path d="M 86 5 L 94 10 L 86 15" stroke="#ff5a5f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile vertical journey */}
            <div className="flex flex-col gap-2 sm:hidden">
              {journey.map((step, i) => (
                <div key={step.label}>
                  <div className="flex items-center gap-3">
                    <span className={cn('flex h-12 w-12 items-center justify-center rounded-2xl', step.tone)}>
                      <step.Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="text-sm font-bold text-ink-800">{step.label}</span>
                      <p className="text-xs text-ink-400">{step.desc}</p>
                    </div>
                  </div>
                  {i < journey.length - 1 && <div className="ml-6 h-4 w-px bg-coral-200" aria-hidden="true" />}
                </div>
              ))}
            </div>

            {/* Example */}
            <div className="mt-8 rounded-2xl border border-coral-200 bg-warm-coral p-5">
              <p className="section-label text-coral-700">Example</p>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                <div>
                  <p className="font-display text-lg font-bold text-ink-950">Python</p>
                  <div className="mt-1.5 flex items-center gap-3 text-sm">
                    <span className="flex items-center gap-1 text-mint-600"><Check className="h-4 w-4" /> Resume</span>
                    <span className="flex items-center gap-1 text-mint-600"><Check className="h-4 w-4" /> LinkedIn</span>
                    <span className="flex items-center gap-1 text-coral-600"><Minus className="h-4 w-4" /> Portfolio</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:ml-auto">
                  <span className="chip border border-coral-200 bg-white text-coral-700">Evidence gap</span>
                  <ArrowRight className="h-4 w-4 text-coral-400" />
                  <span className="font-medium text-mint-700">Add a Python project</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gap cards — visual weight by priority */}
      <section className="relative">
        <div className="flex items-center gap-3 mb-4">
          <span className="section-number">04</span>
          <span className="section-label">Your gaps</span>
        </div>

        <div className="space-y-4">
          {mockGaps.map((gap) => (
            <article
              key={gap.id}
              className={cn(
                'relative overflow-hidden rounded-4xl border border-ink-200/60 bg-white p-6 sm:p-8 transition-all hover:shadow-soft',
                priorityWeight[gap.priority]
              )}
            >
              {gap.priority === 'high' && (
                <Star className="pointer-events-none absolute right-6 top-6 h-4 w-4 fill-coral-400 text-coral-400" aria-hidden="true" />
              )}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-4">
                  <span className="font-display text-3xl font-bold text-coral-300">{gap.index}</span>
                  <div>
                    <h2 className="font-display text-xl font-bold text-ink-950 text-balance">{gap.title}</h2>
                    <p className="mt-2 text-sm text-ink-600 text-pretty">{gap.explanation}</p>
                    <div className="mt-4 rounded-xl bg-ink-50 px-4 py-3">
                      <p className="section-label">Recommendation</p>
                      <p className="mt-1 text-sm font-medium text-ink-800 text-pretty">{gap.recommendation}</p>
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
                  <PriorityBadge priority={gap.priority} />
                  <button onClick={() => navigate('/action-plan')} className="btn-secondary btn-sm">
                    Fix this <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Platform comparison */}
      <section className="relative">
        <div className="flex items-center gap-3 mb-4">
          <span className="section-number">05</span>
          <span className="section-label">Platform comparison</span>
        </div>

        <div className="rounded-4xl border border-ink-200/60 bg-white p-8 sm:p-12">
          <p className="text-sm text-ink-500">Where your skills appear — and where they don't.</p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[520px] border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="w-1/3 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.1em] text-ink-400">Skill</th>
                  {platforms.map(({ key, label, Icon }) => (
                    <th key={key} className="px-4 py-3 text-center">
                      <span className="inline-flex flex-col items-center gap-1 text-xs font-semibold uppercase tracking-[0.1em] text-ink-400">
                        <Icon className="h-4 w-4" />
                        {label}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockPlatformPresence.map((row, i) => (
                  <tr key={row.skill} className={cn(i % 2 === 0 ? 'bg-ink-50/60' : '')}>
                    <td className="rounded-l-xl px-4 py-3 text-sm font-medium text-ink-800">{row.skill}</td>
                    <td className="px-4 py-3 text-center"><Cell value={row.resume} /></td>
                    <td className="px-4 py-3 text-center"><Cell value={row.linkedin} /></td>
                    <td className="rounded-r-xl px-4 py-3 text-center"><Cell value={row.portfolio} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden rounded-4xl bg-ink-950 p-8 sm:p-12 text-white">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-coral-500/30 blur-3xl" aria-hidden="true" />
        <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-balance lg:text-3xl">Turn these gaps into an action plan</h2>
            <p className="mt-2 text-ink-300 text-pretty">Three focused moves can make your identity noticeably stronger.</p>
          </div>
          <button onClick={() => navigate('/action-plan')} className="relative shrink-0 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-ink-950 transition-all hover:scale-[1.03] active:scale-[0.98]">
            View Action Plan
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
