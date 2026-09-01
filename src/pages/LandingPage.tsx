import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, FileText, Linkedin, FolderKanban, Boxes, Code,
  ScanSearch, Sparkles, AlertTriangle, ListChecks,
} from 'lucide-react';
import IdentityOrb from '@/components/IdentityOrb';
import BrandScoreRing from '@/components/BrandScoreRing';
import PortraitIllustration from '@/components/PortraitIllustration';
import { cn } from '@/lib/utils';

/* ---------- shared fragments ---------- */

const heroFragments = [
  { label: 'Resume', Icon: FileText, accent: 'mint', pos: 'top-[4%] left-[1%] -rotate-6', size: 'w-40' },
  { label: 'LinkedIn', Icon: Linkedin, accent: 'sky', pos: 'top-[2%] right-[5%] rotate-6', size: 'w-36' },
  { label: 'GitHub', Icon: Code, accent: 'mustard', pos: 'top-[42%] left-[0%] rotate-3', size: 'w-32' },
  { label: 'Portfolio', Icon: FolderKanban, accent: 'pink', pos: 'top-[36%] right-[0%] -rotate-3', size: 'w-40' },
  { label: 'Projects', Icon: Boxes, accent: 'mint', pos: 'bottom-[7%] left-[7%] rotate-2', size: 'w-36' },
  { label: 'Skills', Icon: Sparkles, accent: 'sky', pos: 'bottom-[5%] right-[3%] -rotate-6', size: 'w-32' },
];

const accentMap = {
  mint: { bg: 'bg-mint-50', text: 'text-mint-700', border: 'border-mint-300', iconBg: 'bg-mint-100', dot: 'bg-mint-500', stroke: '#39d9a0' },
  sky: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-300', iconBg: 'bg-sky-100', dot: 'bg-sky-500', stroke: '#48bde8' },
  mustard: { bg: 'bg-mustard-50', text: 'text-mustard-700', border: 'border-mustard-300', iconBg: 'bg-mustard-100', dot: 'bg-mustard-500', stroke: '#f4c936' },
  pink: { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-300', iconBg: 'bg-pink-100', dot: 'bg-pink-500', stroke: '#f06bb5' },
  coral: { bg: 'bg-coral-50', text: 'text-coral-700', border: 'border-coral-300', iconBg: 'bg-coral-100', dot: 'bg-coral-500', stroke: '#ff5b61' },
  brand: { bg: 'bg-brand-50', text: 'text-brand-700', border: 'border-brand-300', iconBg: 'bg-brand-100', dot: 'bg-brand-500', stroke: '#7658f5' },
} as const;

type AccentKey = keyof typeof accentMap;

const achievementFragments: { label: string; accent: AccentKey; pos: string; size: string }[] = [
  { label: 'Python', accent: 'mint', pos: 'top-[8%] left-[4%]', size: 'text-base px-4 py-2.5' },
  { label: 'SQL', accent: 'sky', pos: 'top-[2%] left-[34%]', size: 'text-sm px-3.5 py-2' },
  { label: '5 AI Projects', accent: 'mustard', pos: 'top-[12%] right-[6%]', size: 'text-base px-4 py-2.5' },
  { label: 'Internship', accent: 'pink', pos: 'top-[44%] left-[2%]', size: 'text-sm px-3.5 py-2' },
  { label: 'Leadership', accent: 'mint', pos: 'top-[38%] right-[2%]', size: 'text-base px-4 py-2.5' },
  { label: 'Case Studies', accent: 'coral', pos: 'bottom-[10%] left-[22%]', size: 'text-sm px-3.5 py-2' },
  { label: 'Certifications', accent: 'sky', pos: 'bottom-[6%] right-[12%]', size: 'text-base px-4 py-2.5' },
];

const sources: { label: string; value: string; accent: AccentKey }[] = [
  { label: 'RESUME', value: 'Data Science', accent: 'mint' },
  { label: 'LINKEDIN', value: 'Leadership', accent: 'sky' },
  { label: 'GITHUB', value: 'AI Projects', accent: 'mustard' },
  { label: 'PORTFOLIO', value: 'Design + Case Studies', accent: 'pink' },
];

const transformSources: { label: string; accent: AccentKey }[] = [
  { label: 'Resume', accent: 'mint' },
  { label: 'LinkedIn', accent: 'sky' },
  { label: 'Projects', accent: 'mustard' },
  { label: 'Portfolio', accent: 'pink' },
  { label: 'Skills', accent: 'sky' },
  { label: 'Experience', accent: 'mint' },
];

const metrics = [
  { label: 'Clarity', score: 82, tone: 'mint' as const },
  { label: 'Consistency', score: 76, tone: 'sky' as const },
  { label: 'Tone', score: 71, tone: 'coral' as const },
  { label: 'Evidence', score: 83, tone: 'mustard' as const },
];

const barTone: Record<string, string> = {
  mint: 'bg-mint-500',
  sky: 'bg-sky-500',
  coral: 'bg-coral-500',
  mustard: 'bg-mustard-500',
};

const fourQuestions = [
  {
    num: '01', label: 'BRAND AUDIT', question: 'How am I coming across?',
    desc: 'See how your professional identity appears across your platforms.',
    Icon: ScanSearch, accent: 'brand' as const, span: 'sm:col-span-2',
  },
  {
    num: '02', label: 'STORY MINING', question: "What's interesting about my experience?",
    desc: 'Turn ordinary projects into stronger professional stories.',
    Icon: Sparkles, accent: 'pink' as const, span: '',
  },
  {
    num: '03', label: 'GAP ANALYSIS', question: "What's missing?",
    desc: 'Find missing evidence, inconsistencies and weak signals.',
    Icon: AlertTriangle, accent: 'coral' as const, span: '',
  },
  {
    num: '04', label: 'ACTION PLAN', question: 'What should I do next?',
    desc: 'Get practical priorities instead of vague advice.',
    Icon: ListChecks, accent: 'mustard' as const, span: 'sm:col-span-2',
  },
];

const beforePieces: { label: string; accent: AccentKey }[] = [
  { label: 'Resume', accent: 'mint' },
  { label: 'LinkedIn', accent: 'sky' },
  { label: 'Projects', accent: 'mustard' },
  { label: 'Skills', accent: 'sky' },
  { label: 'Experience', accent: 'mint' },
  { label: 'Portfolio', accent: 'pink' },
];

/* ---------- page ---------- */

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-ink-50">
      {/* Nav */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <div className="flex items-center gap-2.5">
          <IdentityOrb size={32} />
          <span className="font-display text-xl font-bold tracking-tight text-ink-950">
            BRAND<span className="text-brand-600">LENS</span>
          </span>
        </div>
        <nav className="hidden items-center gap-8 text-sm font-medium text-ink-600 md:flex">
          <a href="#story" className="transition-colors hover:text-brand-700">The Story</a>
          <a href="#discover" className="transition-colors hover:text-brand-700">What It Sees</a>
          <a href="#questions" className="transition-colors hover:text-brand-700">Questions</a>
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/auth')} className="btn-ghost hidden sm:inline-flex">
            Sign in
          </button>
          <button onClick={() => navigate('/upload')} className="btn-primary">
            Discover My Brand
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* 1. HERO — MEET SARAH */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-dots opacity-40" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-32 -top-20 h-80 w-80 rounded-full bg-mint-200/30 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-24 top-60 h-72 w-72 rounded-full bg-sky-200/30 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 pb-16 pt-8 lg:grid-cols-2 lg:gap-6 lg:px-10 lg:pb-24 lg:pt-12">
          {/* Copy */}
          <div className="animate-fade-in">
            <p className="section-label">Meet Sarah.</p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.04] tracking-tight text-ink-950 text-balance lg:text-6xl">
              She's done more than she thinks.
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-600 text-pretty">
              Projects. Skills. Experience. Leadership. A portfolio full of work.
            </p>
            <p className="mt-3 max-w-md text-base text-ink-500 text-pretty">
              Sarah has built a lot. The question is whether anyone can see the whole picture.
            </p>
            <div className="mt-8 flex items-center gap-2 text-sm text-ink-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500" />
              Scroll to follow her story
            </div>
          </div>

          {/* Scattered evidence canvas with portrait */}
          <div className="relative mx-auto h-[480px] w-full max-w-md lg:h-[560px]">
            {/* Portrait — faded background layer */}
            <div className="absolute left-1/2 top-[18%] h-[70%] w-[60%] -translate-x-1/2 opacity-60">
              <PortraitIllustration className="h-full w-full" />
            </div>

            {/* Connecting lines from fragments to portrait center */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 560" fill="none" preserveAspectRatio="none" aria-hidden="true">
              {[
                { d: 'M 30,30 Q 120,140 200,280', c: '#39d9a0' },
                { d: 'M 370,20 Q 280,140 200,280', c: '#48bde8' },
                { d: 'M 10,230 Q 100,270 200,290', c: '#f4c936' },
                { d: 'M 390,210 Q 300,260 200,290', c: '#f06bb5' },
                { d: 'M 40,520 Q 120,420 200,320', c: '#39d9a0' },
                { d: 'M 360,520 Q 280,420 200,320', c: '#48bde8' },
              ].map((l, i) => (
                <path key={i} d={l.d} stroke={l.c} strokeWidth="1.5" opacity="0.3" strokeDasharray="2 6" strokeLinecap="round" />
              ))}
              {/* Connection dots at portrait center */}
              <circle cx="200" cy="290" r="4" fill="#7658f5" opacity="0.25" />
              <circle cx="200" cy="290" r="8" fill="none" stroke="#7658f5" strokeWidth="1" opacity="0.15" />
            </svg>

            {heroFragments.map(({ label, Icon, accent, pos, size }, i) => {
              const a = accentMap[accent];
              return (
                <div
                  key={label}
                  className={cn(
                    'absolute flex items-center gap-2 rounded-2xl border bg-white px-3.5 py-2.5 shadow-float animate-float-up',
                    a.border, a.bg, pos, size,
                  )}
                  style={{ animationDelay: `${i * 0.4}s` }}
                >
                  <span className={cn('flex h-7 w-7 items-center justify-center rounded-lg', a.iconBg)}>
                    <Icon className={cn('h-4 w-4', a.text)} />
                  </span>
                  <span className={cn('text-sm font-bold', a.text)}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. SARAH'S ACHIEVEMENTS */}
      <section id="story" className="border-t border-ink-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-label">What she's accomplished</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink-950 text-balance lg:text-5xl">
              She's actually done a lot.
            </h2>
          </div>

          {/* Scattered achievement fragments */}
          <div className="relative mx-auto mt-14 h-[340px] max-w-3xl">
            {achievementFragments.map(({ label, accent, pos, size }, i) => {
              const a = accentMap[accent];
              return (
                <span
                  key={label}
                  className={cn(
                    'absolute inline-flex items-center gap-1.5 rounded-full font-bold shadow-soft animate-float-up',
                    a.iconBg, a.text, pos, size,
                  )}
                  style={{ animationDelay: `${i * 0.3}s` }}
                >
                  <span className={cn('h-2 w-2 rounded-full', a.dot)} />
                  {label}
                </span>
              );
            })}
            {/* subtle lines */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 340" fill="none" aria-hidden="true" preserveAspectRatio="none">
              <path d="M 80,60 Q 200,120 320,40" stroke="#c6bda9" strokeWidth="1" strokeDasharray="3 6" opacity="0.35" />
              <path d="M 480,80 Q 380,180 240,280" stroke="#c6bda9" strokeWidth="1" strokeDasharray="3 6" opacity="0.35" />
              <path d="M 120,200 Q 300,260 460,220" stroke="#c6bda9" strokeWidth="1" strokeDasharray="3 6" opacity="0.3" />
            </svg>
          </div>
        </div>
      </section>

      {/* 3. THE TURNING POINT */}
      <section className="relative overflow-hidden bg-ink-50">
        <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-coral-200/40 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-16 bottom-10 h-64 w-64 rounded-full bg-coral-100/50 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 lg:px-10">
          <h2 className="text-center font-display text-4xl font-bold leading-tight tracking-tight text-ink-950 text-balance lg:text-5xl">
            Individually, everything looks good.
          </h2>

          {/* Sources shown separately — with slight misalignment to hint at fragmentation */}
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sources.map((s, i) => {
              const a = accentMap[s.accent];
              const offsets = ['translate-y-0', 'translate-y-3', '-translate-y-2', 'translate-y-4'];
              return (
                <div
                  key={s.label}
                  className={cn(
                    'animate-fade-in rounded-2xl border p-5 text-center shadow-soft',
                    a.bg, a.border, offsets[i],
                  )}
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  <span className={cn('mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg', a.iconBg)}>
                    <span className={cn('h-2.5 w-2.5 rounded-full', a.dot)} />
                  </span>
                  <p className={cn('text-xs font-bold uppercase tracking-wider', a.text)}>{s.label}</p>
                  <p className="mt-1.5 font-display text-base font-bold text-ink-950">{s.value}</p>
                </div>
              );
            })}
          </div>

          {/* The reveal — strongest moment */}
          <div className="mt-20 text-center">
            <p className="font-display text-2xl font-semibold text-ink-400 lg:text-3xl">But together...</p>
            <h3 className="mt-4 font-display text-5xl font-bold leading-tight tracking-tight text-coral-600 text-balance lg:text-7xl">
              the story gets blurry.
            </h3>
          </div>

          {/* Fragmented evidence pieces — visualizing disconnection */}
          <div className="mx-auto mt-16 flex max-w-lg flex-wrap items-center justify-center gap-2">
            {['Resume', 'LinkedIn', 'GitHub', 'Portfolio', 'Projects', 'Skills'].map((p, i) => {
              const rotations = ['-rotate-12', 'rotate-6', '-rotate-3', 'rotate-9', '-rotate-6', 'rotate-3'];
              const offsets = ['-translate-y-2', 'translate-y-1', '-translate-y-3', 'translate-y-2', '-translate-y-1', 'translate-y-3'];
              return (
                <span
                  key={p}
                  className={cn(
                    'inline-flex items-center rounded-full border border-coral-200 bg-coral-50 px-3.5 py-1.5 text-sm font-semibold text-coral-700 shadow-soft animate-fade-in',
                    rotations[i], offsets[i],
                  )}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {p}
                </span>
              );
            })}
          </div>

          <div className="mx-auto mt-14 max-w-xl space-y-2 text-center">
            <p className="text-lg text-ink-700 text-pretty">The problem isn't that Sarah lacks experience.</p>
            <p className="text-lg font-bold text-coral-700 text-pretty">The problem is that nobody can see the whole picture.</p>
          </div>
        </div>
      </section>

      {/* 4. VISUAL TRANSFORMATION */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-100/30 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 lg:px-10">
          <div className="text-center">
            <p className="section-label">The transformation</p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink-950 text-balance lg:text-4xl">
              Scattered becomes connected.
            </h2>
          </div>

          {/* Scattered sources row — colored */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            {transformSources.map(({ label, accent }, i) => {
              const a = accentMap[accent];
              return (
                <span
                  key={label}
                  className={cn(
                    'animate-fade-in inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-bold shadow-soft',
                    a.bg, a.border, a.text,
                  )}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <span className={cn('h-2 w-2 rounded-full', a.dot)} />
                  {label}
                </span>
              );
            })}
          </div>

          {/* Curved converging lines — more dramatic, colored */}
          <div className="relative mx-auto mt-6 h-48 max-w-xl">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 500 180" fill="none" aria-hidden="true">
              {[
                { d: 'M 30,10 Q 180,30 250,100', c: '#39d9a0' },
                { d: 'M 110,10 Q 200,60 250,100', c: '#48bde8' },
                { d: 'M 190,10 Q 230,60 250,100', c: '#f4c936' },
                { d: 'M 310,10 Q 270,60 250,100', c: '#f06bb5' },
                { d: 'M 390,10 Q 300,60 250,100', c: '#48bde8' },
                { d: 'M 470,10 Q 320,30 250,100', c: '#39d9a0' },
              ].map((l, i) => (
                <path key={i} d={l.d} stroke={l.c} strokeWidth="2" opacity="0.45" strokeDasharray="4 6" strokeLinecap="round" />
              ))}
              {/* Convergence dots along paths */}
              {[
                { cx: 180, cy: 50 }, { cx: 220, cy: 70 }, { cx: 280, cy: 70 }, { cx: 320, cy: 50 },
              ].map((d, i) => (
                <circle key={i} cx={d.cx} cy={d.cy} r="2.5" fill="#7658f5" opacity="0.3" />
              ))}
              {/* Central convergence point */}
              <circle cx="250" cy="100" r="5" fill="#7658f5" opacity="0.4" />
              <circle cx="250" cy="100" r="10" fill="none" stroke="#7658f5" strokeWidth="1" opacity="0.2" />
            </svg>
          </div>

          {/* Central orb — the BrandLens moment */}
          <div className="mt-2 flex flex-col items-center">
            <div className="relative">
              <IdentityOrb size={160} ring rotate pulse />
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <span className="font-display text-2xl font-bold text-white drop-shadow-lg">BRANDLENS</span>
              </div>
            </div>
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center gap-2 text-brand-400">
                <span className="h-px w-10 bg-brand-300" />
                <ArrowRight className="h-4 w-4 rotate-90" />
                <span className="h-px w-10 bg-brand-300" />
              </div>
              <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-brand-700 text-balance lg:text-4xl">
                One clear professional identity.
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTRODUCE BRANDLENS */}
      <section className="relative overflow-hidden border-y border-ink-200 bg-warm-brand">
        <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-mint-200/30 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-brand-200/40 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center lg:px-10">
          <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-brand-600">BrandLens</p>
          <h2 className="mt-5 font-display text-5xl font-bold leading-tight tracking-tight text-ink-950 text-balance lg:text-6xl">
            See the whole picture.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-600 text-pretty">
            BrandLens connects the scattered pieces of your professional presence, shows you how you're coming across, finds what's missing, and tells you what to improve next.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button onClick={() => navigate('/upload')} className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-base font-bold text-white shadow-float transition-all hover:scale-[1.03] hover:bg-brand-700 active:scale-[0.98]">
              Discover My Brand
              <ArrowRight className="h-4 w-4" />
            </button>
            <a href="#discover" className="btn-secondary text-base px-6 py-3.5">
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* 6. WHAT BRANDLENS SEES */}
      <section id="discover" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">A glimpse of the output</p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink-950 text-balance lg:text-5xl">
            Here's what BrandLens sees.
          </h2>
        </div>

        {/* Product preview card */}
        <div className="mx-auto mt-14 max-w-2xl">
          <div className="rounded-4xl border border-ink-200/70 bg-white p-8 shadow-card sm:p-10">
            <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:gap-10">
              <div className="flex flex-col items-center">
                <BrandScoreRing score={78} size={140} strokeWidth={11} showLabel={false} />
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">Brand Score</p>
              </div>
              <div className="flex-1 space-y-4">
                {metrics.map((m, i) => (
                  <div key={m.label} className="animate-fade-in" style={{ animationDelay: `${i * 120}ms` }}>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-medium text-ink-700">{m.label}</span>
                      <span className="font-display text-lg font-bold tabular-nums text-ink-950">{m.score}</span>
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-ink-200">
                      <div className={cn('h-full rounded-full', barTone[m.tone])} style={{ width: `${m.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 flex items-start gap-3 rounded-2xl bg-brand-50 p-4">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
              <p className="text-sm font-medium text-ink-800 text-pretty">
                "Strong technical foundation. Your story needs more consistency."
              </p>
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-ink-400">A small glimpse. The full picture unfolds inside BrandLens.</p>
        </div>
      </section>

      {/* 7. FOUR QUESTIONS */}
      <section id="questions" className="border-y border-ink-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-label">Not features. Questions.</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink-950 text-balance lg:text-5xl">
              Four questions BrandLens answers.
            </h2>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {fourQuestions.map((q, i) => {
              const a = accentMap[q.accent];
              return (
                <div
                  key={q.num}
                  className={cn(
                    'group animate-fade-in rounded-4xl border bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-card',
                    a.border, q.span,
                  )}
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  <div className="flex items-start gap-5">
                    <span className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl', a.iconBg)}>
                      <q.Icon className={cn('h-6 w-6', a.text)} />
                    </span>
                    <div>
                      <p className={cn('text-xs font-bold uppercase tracking-wider', a.text)}>{q.label}</p>
                      <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-ink-950 text-balance">
                        "{q.question}"
                      </h3>
                      <p className="mt-3 text-sm text-ink-500 text-pretty">{q.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. BEFORE → AFTER — one continuous composition */}
      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-10">
        <div className="text-center">
          <p className="section-label">The transformation</p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink-950 text-balance lg:text-5xl">
            From scattered pieces...
          </h2>
        </div>

        {/* Continuous three-stage composition */}
        <div className="relative mt-16 grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-4">
          {/* LEFT — Scattered */}
          <div className="relative">
            <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.14em] text-coral-600">Scattered</p>
            <div className="flex min-h-[120px] flex-wrap items-center justify-center gap-2">
              {beforePieces.map(({ label, accent }, i) => {
                const a = accentMap[accent];
                const rotations = ['-rotate-6', 'rotate-3', '-rotate-3', 'rotate-6', '-rotate-6', 'rotate-3'];
                return (
                  <span
                    key={label}
                    className={cn(
                      'inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-bold shadow-soft',
                      a.bg, a.border, a.text, rotations[i],
                    )}
                  >
                    {label}
                  </span>
                );
              })}
            </div>
          </div>

          {/* CENTER — BrandLens Orb with connecting lines */}
          <div className="flex flex-col items-center">
            {/* Connecting lines — left to orb */}
            <svg className="absolute left-0 top-1/2 hidden h-12 w-1/3 lg:block" viewBox="0 0 120 48" fill="none" aria-hidden="true">
              <path d="M 0,24 Q 60,10 120,24" stroke="#7658f5" strokeWidth="1.5" strokeDasharray="3 5" opacity="0.3" strokeLinecap="round" />
            </svg>
            <div className="relative">
              <IdentityOrb size={96} ring rotate pulse />
            </div>
            <p className="mt-3 font-display text-xs font-bold uppercase tracking-wider text-brand-600">BrandLens</p>
            {/* Connecting lines — orb to right */}
            <svg className="absolute right-0 top-1/2 hidden h-12 w-1/3 lg:block" viewBox="0 0 120 48" fill="none" aria-hidden="true">
              <path d="M 0,24 Q 60,38 120,24" stroke="#7658f5" strokeWidth="1.5" strokeDasharray="3 5" opacity="0.3" strokeLinecap="round" />
            </svg>
          </div>

          {/* RIGHT — One clear story */}
          <div className="relative">
            <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.14em] text-mint-600">Connected</p>
            <div className="rounded-3xl bg-ink-950 p-6 text-center shadow-card">
              <p className="font-display text-base font-medium leading-relaxed text-white text-pretty sm:text-lg">
                "Data Science student who builds practical data products and turns complex information into useful insights."
              </p>
            </div>
          </div>
        </div>

        <h2 className="mt-12 text-center font-display text-4xl font-bold tracking-tight text-ink-950 text-balance lg:text-5xl">
          ...to one clear story.
        </h2>

        {/* Outcome indicators */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { value: '3', label: 'gaps found', tone: 'text-coral-600' },
            { value: '2', label: 'stories strengthened', tone: 'text-pink-600' },
            { value: '1', label: 'clearer direction', tone: 'text-mint-600' },
          ].map((o) => (
            <div key={o.label} className="rounded-2xl border border-ink-200/60 bg-white p-5 text-center shadow-soft">
              <p className={cn('font-display text-4xl font-bold tabular-nums', o.tone)}>{o.value}</p>
              <p className="mt-1 text-sm text-ink-500">{o.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. RECRUITER LENS */}
      <section className="border-y border-ink-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-20 lg:px-10">
          <div className="text-center">
            <p className="section-label">Recruiter Lens</p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink-950 text-balance lg:text-4xl">
              What does someone understand about you in 10 seconds?
            </h2>
          </div>

          <div className="mx-auto mt-10 max-w-xl rounded-3xl bg-ink-50 p-8 text-center">
            <p className="font-display text-lg font-medium leading-relaxed text-ink-800 text-pretty">
              "Data Science student with strong technical projects and hands-on experience."
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <div className="rounded-2xl border border-mint-200 bg-mint-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-mint-700">What's working</p>
              <p className="mt-2 text-sm font-medium text-ink-800">Strong technical foundation</p>
            </div>
            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">What's unclear</p>
              <p className="mt-2 text-sm font-medium text-ink-800">Your professional positioning isn't fully consistent yet.</p>
            </div>
            <div className="rounded-2xl border border-coral-200 bg-coral-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-coral-700">What's missing</p>
              <p className="mt-2 text-sm font-medium text-ink-800">A stronger connection between skills and career direction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. THE STORY REVEAL */}
      <section className="relative overflow-hidden bg-ink-50">
        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-brand-200/30 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center lg:px-10">
          <p className="font-display text-2xl font-semibold text-ink-400">Sarah isn't the point.</p>
          <h2 className="mt-6 font-display text-6xl font-bold leading-none tracking-tight text-ink-950 lg:text-7xl">
            You are.
          </h2>

          <div className="mt-12 space-y-2">
            <p className="text-lg text-ink-500 text-pretty">Your resume isn't your story.</p>
            <p className="text-lg text-ink-500 text-pretty">Your LinkedIn isn't your story.</p>
            <p className="text-lg text-ink-500 text-pretty">Your projects aren't your story.</p>
          </div>

          <h3 className="mt-10 font-display text-4xl font-bold tracking-tight text-brand-600 text-balance lg:text-5xl">
            They're pieces of it.
          </h3>
          <p className="mt-6 text-lg text-ink-600 text-pretty">
            BrandLens helps you see the whole picture.
          </p>
        </div>
      </section>

      {/* 11. FINAL CTA */}
      <section className="relative overflow-hidden border-t border-ink-200 bg-ink-50">
        <div className="pointer-events-none absolute inset-0 bg-dots opacity-40" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-10 top-10 h-40 w-40 rounded-full bg-mint-200/40 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute right-10 bottom-10 h-40 w-40 rounded-full bg-sky-200/40 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center lg:px-10">
          {/* Converging fragments around orb — same colors as hero */}
          <div className="relative mx-auto mb-10 h-32 w-48">
            {[
              { pos: 'top-0 left-0', accent: 'mint' as const },
              { pos: 'top-0 right-0', accent: 'sky' as const },
              { pos: 'bottom-0 left-0', accent: 'mustard' as const },
              { pos: 'bottom-0 right-0', accent: 'pink' as const },
            ].map((f, i) => {
              const a = accentMap[f.accent];
              return (
                <span
                  key={i}
                  className={cn('absolute h-3 w-3 rounded-full animate-float-up', f.pos, a.dot)}
                  style={{ animationDelay: `${i * 0.5}s` }}
                />
              );
            })}
            {/* Curved connecting lines to orb */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 192 128" fill="none" aria-hidden="true">
              {[
                { d: 'M 4,4 Q 50,30 96,64', c: '#39d9a0' },
                { d: 'M 188,4 Q 140,30 96,64', c: '#48bde8' },
                { d: 'M 4,124 Q 50,90 96,64', c: '#f4c936' },
                { d: 'M 188,124 Q 140,90 96,64', c: '#f06bb5' },
              ].map((l, i) => (
                <path key={i} d={l.d} stroke={l.c} strokeWidth="1.5" opacity="0.35" strokeDasharray="2 4" strokeLinecap="round" />
              ))}
            </svg>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <IdentityOrb size={64} ring rotate />
            </div>
          </div>

          <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-ink-950 text-balance lg:text-5xl">
            Ready to connect the dots?
          </h2>
          <p className="mx-auto mt-5 max-w-md text-lg text-ink-600 text-pretty">
            Bring your professional pieces together and discover how your story actually comes across.
          </p>
          <button
            onClick={() => navigate('/upload')}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink-950 px-7 py-3.5 text-base font-bold text-ink-50 shadow-float transition-all hover:scale-[1.03] active:scale-[0.98]"
          >
            Discover My Brand
            <ArrowRight className="h-5 w-5" />
          </button>
          <p className="mt-5 text-sm text-ink-400">
            No perfect profile required. Start with what you already have.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink-200 bg-ink-50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-ink-500 sm:flex-row lg:px-10">
          <div className="flex items-center gap-2.5">
            <IdentityOrb size={24} />
            <span className="font-display font-semibold text-ink-700">BRANDLENS</span>
          </div>
          <p>© 2025 BrandLens. Connect your professional story.</p>
        </div>
      </footer>
    </div>
  );
}
