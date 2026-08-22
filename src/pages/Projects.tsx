import { useNavigate } from 'react-router-dom';
import { ArrowRight, FolderKanban, CheckCircle2, Sparkles } from 'lucide-react';
import { mockProjects } from '@/data/mockData';
import { cn } from '@/lib/utils';

const statusMap = {
  mined: { label: 'Story mined', tone: 'text-mint-700 bg-mint-50 border-mint-200', Icon: CheckCircle2 },
  unmined: { label: 'Not mined', tone: 'text-ink-600 bg-ink-100 border-ink-200', Icon: Sparkles },
  saved: { label: 'Saved', tone: 'text-pink-700 bg-pink-50 border-pink-200', Icon: CheckCircle2 },
} as const;

const categoryTones: Record<string, string> = {
  'Business Analytics': 'text-brand-600',
  'Data Visualization': 'text-pink-600',
  'Public Health Analytics': 'text-coral-600',
};

export default function Projects() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      {/* Header */}
      <section>
        <p className="section-label">Projects</p>
        <h1 className="mt-2 editorial-h1">Your project library</h1>
        <p className="mt-3 max-w-xl text-lg text-ink-600 text-pretty">
          Each project is a potential story. Mine any of them into something stronger.
        </p>
      </section>

      {/* Project list — editorial, not card grid */}
      <div className="space-y-4">
        {mockProjects.map((p, i) => {
          const status = statusMap[p.storyStatus];
          return (
            <article
              key={p.id}
              className="group relative flex flex-col gap-4 rounded-4xl border border-ink-200/60 bg-white p-6 transition-all hover:border-ink-300 hover:shadow-soft sm:flex-row sm:items-center sm:justify-between sm:p-8"
            >
              {/* Oversized number */}
              <span className="absolute right-6 top-4 font-display text-5xl font-bold leading-none text-ink-100 select-none">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="flex gap-5 sm:max-w-xl">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ink-50 text-ink-600">
                  <FolderKanban className="h-5 w-5" />
                </span>
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="font-display text-lg font-bold leading-snug text-ink-950 text-balance">{p.title}</h2>
                    <span className={cn('chip border', status.tone)}>
                      <status.Icon className="h-3.5 w-3.5" /> {status.label}
                    </span>
                  </div>
                  <p className={cn('mt-1 text-xs font-semibold', categoryTones[p.category] || 'text-ink-500')}>{p.category}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600 text-pretty">{p.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tools.map((t) => (
                      <span key={t} className="chip bg-ink-100 text-ink-600">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 gap-2 sm:flex-col">
                <button className="btn-ghost btn-sm flex-1 sm:flex-none">View</button>
                <button
                  onClick={() => navigate('/story-mining')}
                  className="btn-primary btn-sm flex-1 sm:flex-none"
                >
                  Mine Story <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
