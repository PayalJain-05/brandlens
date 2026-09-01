import { useNavigate } from 'react-router-dom';
import {
  FileText, Linkedin, FolderKanban, Boxes, Code, Briefcase,
  AlertTriangle, ArrowRight,
  Check, Minus,
} from 'lucide-react';
import IdentityOrb from '@/components/IdentityOrb';
import { mockBrandScore } from '@/data/mockData';
import { cn } from '@/lib/utils';

/* ---------- data ---------- */

const accentMap = {
  mint: { bg: 'bg-mint-50', text: 'text-mint-700', border: 'border-mint-200', dot: 'bg-mint-500' },
  sky: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200', dot: 'bg-sky-500' },
  pink: { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200', dot: 'bg-pink-500' },
  mustard: { bg: 'bg-mustard-50', text: 'text-mustard-700', border: 'border-mustard-200', dot: 'bg-mustard-500' },
  coral: { bg: 'bg-coral-50', text: 'text-coral-700', border: 'border-coral-200', dot: 'bg-coral-500' },
} as const;

type AccentKey = keyof typeof accentMap;

const evidenceFragments: {
  id: string;
  label: string;
  desc: string;
  Icon: typeof FileText;
  accent: AccentKey;
  position: Record<string, string>;
  size: string;
}[] = [
  { id: 'resume', label: 'RESUME', desc: 'Python · SQL · Internship', Icon: FileText, accent: 'mint', position: { top: '4%', left: '2%' }, size: 'w-52' },
  { id: 'linkedin', label: 'LINKEDIN', desc: 'Leadership · Volunteering', Icon: Linkedin, accent: 'sky', position: { top: '8%', right: '4%' }, size: 'w-44' },
  { id: 'portfolio', label: 'PORTFOLIO', desc: 'Case Studies · Visual Work', Icon: FolderKanban, accent: 'pink', position: { top: '44%', left: '0%' }, size: 'w-48' },
  { id: 'projects', label: 'PROJECTS', desc: '5 AI Projects', Icon: Boxes, accent: 'mustard', position: { top: '36%', right: '1%' }, size: 'w-56' },
  { id: 'skills', label: 'SKILLS', desc: 'Data Science · Analytics', Icon: Code, accent: 'mint', position: { bottom: '4%', left: '6%' }, size: 'w-44' },
  { id: 'experience', label: 'EXPERIENCE', desc: 'Internships · Leadership', Icon: Briefcase, accent: 'sky', position: { bottom: '7%', right: '3%' }, size: 'w-52' },
];

const connections = [
  { id: 'resume', d: 'M 140,80 Q 260,140 500,320', stroke: '#10b981', width: 2, opacity: 0.5, dash: '' },
  { id: 'linkedin', d: 'M 860,100 Q 740,150 500,320', stroke: '#0ea5e9', width: 1.5, opacity: 0.35, dash: '6 8' },
  { id: 'portfolio', d: 'M 80,320 Q 250,380 500,320', stroke: '#ec4899', width: 2, opacity: 0.45, dash: '' },
  { id: 'projects', d: 'M 900,280 Q 740,250 500,320', stroke: '#f59e0b', width: 1.5, opacity: 0.4, dash: '6 8', warning: true },
  { id: 'skills', d: 'M 200,560 Q 300,500 500,320', stroke: '#10b981', width: 1.5, opacity: 0.4, dash: '' },
  { id: 'experience', d: 'M 820,540 Q 720,490 500,320', stroke: '#0ea5e9', width: 1.5, opacity: 0.35, dash: '6 8' },
];

const findingsData = [
  { key: 'clarity', label: 'CLARITY', status: 'STRONG', statusTone: 'mint' as const, desc: 'Your technical direction is easy to identify.' },
  { key: 'consistency', label: 'CONSISTENCY', status: 'WATCH', statusTone: 'sky' as const, desc: "Your platforms don't communicate exactly the same story." },
  { key: 'tone', label: 'TONE', status: 'NEEDS ATTENTION', statusTone: 'coral' as const, desc: 'Your writing sounds professional, but slightly generic.' },
  { key: 'evidence', label: 'EVIDENCE', status: 'STRONG', statusTone: 'mint' as const, desc: 'Your projects strongly support your technical skills.' },
];

const statusToneMap: Record<string, string> = {
  mint: 'bg-mint-100 text-mint-700',
  sky: 'bg-sky-100 text-sky-700',
  coral: 'bg-coral-100 text-coral-700',
};

const barToneMap: Record<string, string> = {
  mint: 'bg-mint-500',
  sky: 'bg-sky-500',
  coral: 'bg-coral-500',
};

const clues = [
  {
    num: '01',
    text: 'Python appears in 3 places',
    marks: [{ label: 'Resume', state: 'yes' as const }, { label: 'Projects', state: 'yes' as const }, { label: 'LinkedIn', state: 'yes' as const }],
    note: 'Strong skill signal',
    signal: 'Strong',
    signalTone: 'mint' as const,
  },
  {
    num: '02',
    text: 'Leadership appears on LinkedIn',
    marks: [{ label: 'LinkedIn', state: 'yes' as const }, { label: 'Resume', state: 'no' as const }],
    note: 'Limited supporting project or experience evidence.',
    signal: 'Weak',
    signalTone: 'coral' as const,
  },
  {
    num: '03',
    text: 'Five AI projects detected',
    marks: [],
    note: 'Only two currently have detailed explanations.',
    signal: 'Opportunity',
    signalTone: 'mustard' as const,
  },
];

const signalToneMap: Record<string, string> = {
  mint: 'bg-mint-100 text-mint-700',
  coral: 'bg-coral-100 text-coral-700',
  mustard: 'bg-mustard-100 text-mustard-700',
};

/* ---------- helpers ---------- */

function EvidenceMark({ label, state }: { label: string; state: 'yes' | 'no' }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs">
      <span className="font-medium text-ink-600">{label}</span>
      {state === 'yes' ? (
        <Check className="h-3.5 w-3.5 text-mint-600" />
      ) : (
        <Minus className="h-3.5 w-3.5 text-ink-300" />
      )}
    </span>
  );
}

function FragmentCard({ fragment, className }: { fragment: typeof evidenceFragments[number]; className?: string }) {
  const a = accentMap[fragment.accent];
  return (
    <div className={cn('rounded-2xl border bg-white p-4 shadow-soft', a.border, className)}>
      <div className="flex items-center gap-2">
        <span className={cn('flex h-8 w-8 items-center justify-center rounded-lg', a.bg)}>
          <fragment.Icon className={cn('h-4 w-4', a.text)} />
        </span>
        <span className="text-xs font-bold uppercase tracking-wider text-ink-500">{fragment.label}</span>
      </div>
      <p className="mt-2 text-sm font-medium text-ink-800">{fragment.desc}</p>
    </div>
  );
}

/* ---------- page ---------- */

export default function BrandAudit() {
  const navigate = useNavigate();

  const findings = findingsData.map((f, i) => {
    const metric = mockBrandScore.metrics.find((m) => m.key === f.key)!;
    return { ...f, num: String(i + 1).padStart(2, '0'), score: metric.score };
  });

  return (
    <div className="mx-auto max-w-5xl space-y-20">
      {/* 01 — THE INVESTIGATION */}
      <section>
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="section-label">01 — The Investigation</p>
            <h1 className="mt-3 editorial-h1">How do you actually come across?</h1>
            <p className="mt-4 max-w-xl text-lg text-ink-600 text-pretty">
              BrandLens examined your Resume, LinkedIn, Portfolio and Projects to understand the professional identity you're communicating.
            </p>
          </div>
          <div className="hidden shrink-0 text-right sm:block">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">Case Status</p>
            <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-mint-100 px-3 py-1.5 text-sm font-bold text-mint-700">
              <span className="h-2 w-2 rounded-full bg-mint-500" />
              Analysis Complete
            </span>
          </div>
        </div>
      </section>

      {/* EVIDENCE BOARD */}
      <section className="relative">
        <div className="mb-4 flex items-baseline gap-4">
          <span className="font-display text-5xl font-bold leading-none text-ink-200">02</span>
          <p className="section-label">Evidence Board</p>
        </div>

        {/* Desktop investigation canvas */}
        <div className="relative hidden h-[640px] overflow-hidden rounded-4xl border border-ink-200/60 bg-white bg-dots md:block">
          {/* SVG connections */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 640" preserveAspectRatio="none" aria-hidden="true">
            {connections.map((c) => (
              <g key={c.id}>
                <path d={c.d} fill="none" stroke={c.stroke} strokeWidth={c.width} opacity={c.opacity} strokeDasharray={c.dash || undefined} strokeLinecap="round" />
                {c.warning && (
                  <g transform="translate(720, 250)">
                    <circle r="10" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
                    <AlertTriangle className="h-3 w-3" x="-3" y="-3" fill="#f59e0b" />
                  </g>
                )}
                {/* endpoint dots */}
                <circle cx={parseFloat(c.d.split('M ')[1].split(',')[0])} cy={parseFloat(c.d.split('M ')[1].split(',')[1].split(' ')[0])} r="3" fill={c.stroke} opacity={c.opacity + 0.2} />
                <circle cx="500" cy="320" r="3" fill={c.stroke} opacity={c.opacity + 0.2} />
              </g>
            ))}
          </svg>

          {/* Central orb */}
          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="relative">
              <IdentityOrb size={160} ring rotate />
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <span className="font-display text-3xl font-bold text-white drop-shadow-lg">YOU</span>
              </div>
            </div>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">Professional Identity</p>
          </div>

          {/* Evidence fragments */}
          {evidenceFragments.map((frag, i) => (
            <div
              key={frag.id}
              className="absolute z-10 animate-fade-in"
              style={{ ...frag.position, animationDelay: `${i * 120}ms` }}
            >
              <FragmentCard fragment={frag} className={frag.size} />
            </div>
          ))}

          {/* Evidence tag: PYTHON */}
          <div className="absolute z-30 rounded-xl border border-mint-200 bg-mint-50/90 px-3 py-2 shadow-soft backdrop-blur-sm" style={{ top: '27%', left: '14%' }}>
            <p className="text-xs font-bold uppercase tracking-wider text-mint-700">Python</p>
            <div className="mt-1 flex items-center gap-3">
              <EvidenceMark label="Resume" state="yes" />
              <EvidenceMark label="Projects" state="yes" />
              <EvidenceMark label="LinkedIn" state="no" />
            </div>
            <p className="mt-1 text-xs font-medium text-mint-600">Strong skill signal</p>
          </div>

          {/* Evidence tag: LEADERSHIP */}
          <div className="absolute z-30 rounded-xl border border-coral-200 bg-coral-50/90 px-3 py-2 shadow-soft backdrop-blur-sm" style={{ top: '25%', right: '12%' }}>
            <p className="text-xs font-bold uppercase tracking-wider text-coral-700">Leadership</p>
            <div className="mt-1 flex items-center gap-3">
              <EvidenceMark label="LinkedIn" state="yes" />
              <EvidenceMark label="Resume" state="no" />
            </div>
            <p className="mt-1 text-xs font-medium text-coral-600">Weak supporting evidence</p>
          </div>
        </div>

        {/* Mobile evidence board */}
        <div className="md:hidden">
          <div className="rounded-4xl border border-ink-200/60 bg-white bg-dots p-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <IdentityOrb size={120} ring rotate />
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <span className="font-display text-2xl font-bold text-white drop-shadow-lg">YOU</span>
                </div>
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">Professional Identity</p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {evidenceFragments.map((frag, i) => (
                <div key={frag.id} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                  <FragmentCard fragment={frag} />
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              <div className="rounded-xl border border-mint-200 bg-mint-50 px-3 py-2">
                <p className="text-xs font-bold uppercase tracking-wider text-mint-700">Python</p>
                <div className="mt-1 flex flex-wrap items-center gap-3">
                  <EvidenceMark label="Resume" state="yes" />
                  <EvidenceMark label="Projects" state="yes" />
                  <EvidenceMark label="LinkedIn" state="no" />
                </div>
                <p className="mt-1 text-xs font-medium text-mint-600">Strong skill signal</p>
              </div>
              <div className="rounded-xl border border-coral-200 bg-coral-50 px-3 py-2">
                <p className="text-xs font-bold uppercase tracking-wider text-coral-700">Leadership</p>
                <div className="mt-1 flex items-center gap-3">
                  <EvidenceMark label="LinkedIn" state="yes" />
                  <EvidenceMark label="Resume" state="no" />
                </div>
                <p className="mt-1 text-xs font-medium text-coral-600">Weak supporting evidence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — FINDINGS */}
      <section>
        <div className="mb-6 flex items-baseline gap-4">
          <span className="font-display text-5xl font-bold leading-none text-ink-200">04</span>
          <div>
            <p className="section-label">Findings</p>
            <h2 className="font-display text-2xl font-bold text-ink-950">What BrandLens discovered</h2>
          </div>
        </div>

        <div className="overflow-hidden rounded-4xl border border-ink-200/60 bg-white">
          {findings.map((f, i) => (
            <div
              key={f.key}
              className={cn(
                'flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8',
                i !== findings.length - 1 && 'border-b border-ink-100',
                i % 2 === 1 && 'bg-ink-50/40',
              )}
            >
              <span className="font-display text-4xl font-bold leading-none text-ink-200 sm:w-16 sm:shrink-0">{f.num}</span>

              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-display text-lg font-bold text-ink-950">{f.label}</span>
                  <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-bold', statusToneMap[f.statusTone])}>
                    {f.status}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-ink-600 text-pretty">{f.desc}</p>
                <div className="mt-3 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-ink-200">
                  <div
                    className={cn('h-full rounded-full', barToneMap[f.statusTone])}
                    style={{ width: `${f.score}%` }}
                  />
                </div>
              </div>

              <span className="font-display text-5xl font-bold tabular-nums text-ink-950 sm:text-6xl">
                {f.score}
                <span className="text-lg text-ink-300">/100</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CLUES WE FOUND */}
      <section>
        <div className="mb-6 flex items-baseline gap-4">
          <span className="font-display text-5xl font-bold leading-none text-ink-200">05</span>
          <div>
            <p className="section-label">Clues We Found</p>
            <h2 className="font-display text-2xl font-bold text-ink-950">Small details that changed the bigger picture</h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {clues.map((clue) => (
            <div key={clue.num} className="rounded-3xl border border-ink-200/60 bg-white p-6">
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-bold text-ink-300">CLUE {clue.num}</span>
                <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-bold', signalToneMap[clue.signalTone])}>
                  {clue.signal}
                </span>
              </div>
              <p className="mt-3 font-display text-base font-semibold text-ink-950 text-pretty">{clue.text}</p>
              {clue.marks.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
                  {clue.marks.map((m) => (
                    <EvidenceMark key={m.label} label={m.label} state={m.state} />
                  ))}
                </div>
              )}
              <p className="mt-3 text-sm text-ink-500 text-pretty">{clue.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RECRUITER LENS */}
      <section>
        <div className="mb-6 flex items-baseline gap-4">
          <span className="font-display text-5xl font-bold leading-none text-ink-200">06</span>
          <div>
            <p className="section-label">Recruiter Lens</p>
            <h2 className="font-display text-2xl font-bold text-ink-950">What someone might understand in 10 seconds</h2>
          </div>
        </div>

        <div className="overflow-hidden rounded-4xl bg-ink-950 p-8 text-white sm:p-12">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-500/20 blur-3xl" aria-hidden="true" />
          <div className="relative">
            <p className="font-display text-2xl font-bold text-balance sm:text-3xl">
              "Data Science student with a strong technical foundation and hands-on projects."
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-mint-400">First Impression</p>
                <p className="mt-2 text-sm text-ink-200">Strong technical foundation</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-400">What's Unclear</p>
                <p className="mt-2 text-sm text-ink-200">Professional positioning isn't fully consistent yet.</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-coral-400">What's Missing</p>
                <p className="mt-2 text-sm text-ink-200">A stronger connection between skills and career direction.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CASE SUMMARY */}
      <section>
        <div className="mb-6 flex items-baseline gap-4">
          <span className="font-display text-5xl font-bold leading-none text-ink-200">07</span>
          <div>
            <p className="section-label">Case Summary</p>
            <h2 className="font-display text-2xl font-bold text-ink-950">Where the investigation stands</h2>
          </div>
        </div>

        <div className="rounded-4xl border border-ink-200/60 bg-white p-8 sm:p-12">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl bg-mint-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-mint-700">What We Know</p>
              <p className="mt-2 text-sm font-medium text-ink-800">Strong technical foundation</p>
            </div>
            <div className="rounded-2xl bg-coral-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-coral-700">What Doesn't Connect</p>
              <p className="mt-2 text-sm font-medium text-ink-800">Some skills aren't consistently backed by evidence</p>
            </div>
            <div className="rounded-2xl bg-mustard-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-mustard-700">What Needs Investigation</p>
              <p className="mt-2 text-sm font-medium text-ink-800">LinkedIn positioning</p>
            </div>
            <div className="flex flex-col justify-between rounded-2xl bg-ink-950 p-5 text-white">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">What To Do Next</p>
                <p className="mt-2 text-sm font-medium">Explore Gap Analysis</p>
              </div>
              <button
                onClick={() => navigate('/gap-analysis')}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-ink-950 transition-all hover:scale-[1.03] active:scale-[0.98]"
              >
                Explore Gap Analysis
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
