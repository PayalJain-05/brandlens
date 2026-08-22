import { useState } from 'react';
import { Check, Clock, ArrowRight, Sparkles, ListChecks, Star } from 'lucide-react';
import PriorityBadge from '@/components/PriorityBadge';
import { mockActionItems } from '@/data/mockData';
import { toast } from '@/lib/toast';
import { cn } from '@/lib/utils';
import type { ActionItem } from '@/types';

export default function ActionPlan() {
  const [items, setItems] = useState<ActionItem[]>(mockActionItems);
  const completed = items.filter((i) => i.completed).length;
  const total = items.length;
  const progress = Math.round((completed / total) * 100);

  const toggle = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const next = { ...item, completed: !item.completed };
        toast(next.completed ? 'Action marked complete' : 'Action reopened', next.completed ? 'success' : 'default');
        return next;
      })
    );
  };

  return (
    <div className="mx-auto max-w-4xl space-y-12">
      {/* Header */}
      <section>
        <p className="section-label">Action Plan</p>
        <h1 className="mt-2 editorial-h1">
          What should you do next?
        </h1>
        <p className="mt-3 max-w-xl text-lg text-ink-600 text-pretty">
          Three focused improvements can make your professional identity significantly stronger.
        </p>
      </section>

      {/* Progress strip */}
      <section className="relative overflow-hidden rounded-4xl bg-warm-mustard p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-mustard-200/40 blur-3xl" aria-hidden="true" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="section-label">Your progress</p>
            <p className="font-display text-3xl font-bold text-ink-950">{completed} / {total} completed</p>
          </div>
          <span className="font-display text-4xl font-bold text-mustard-600 tabular-nums">{progress}%</span>
        </div>
        <div className="relative mt-5 h-3 w-full overflow-hidden rounded-full bg-ink-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-mustard-300 via-mustard-400 to-mustard-500 transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </section>

      {/* Visual roadmap */}
      <section className="space-y-6">
        {items.map((item, i) => (
          <div key={item.id}>
            {/* Connecting line between items */}
            {i > 0 && (
              <div className="ml-8 flex h-8 items-center justify-center" aria-hidden="true">
                <svg width="2" height="32" viewBox="0 0 2 32" fill="none">
                  <line x1="1" y1="0" x2="1" y2="32" stroke="#ffd83d" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
                </svg>
              </div>
            )}

            <article
              className={cn(
                'relative overflow-hidden rounded-4xl border border-ink-200/60 bg-white p-6 transition-all sm:p-8',
                item.completed && 'border-mint-200 bg-mint-50/40'
              )}
            >
              {/* Oversized number */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-5">
                  <span className={cn(
                    'font-display text-6xl font-bold leading-none',
                    item.completed ? 'text-mint-300' : 'text-mustard-300'
                  )}>
                    {item.index}
                  </span>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <h2 className={cn(
                        'font-display text-xl font-bold text-balance',
                        item.completed ? 'text-mint-800 line-through decoration-2' : 'text-ink-950'
                      )}>
                        {item.completed ? (
                          <span className="inline-flex items-center gap-2">
                            <Check className="h-5 w-5 text-mint-600" /> {item.title}
                          </span>
                        ) : item.title}
                      </h2>
                    </div>

                    {/* Why — editorial annotation */}
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral-400" />
                      <div>
                        <p className="section-label text-coral-600">Why</p>
                        <p className="mt-0.5 text-sm text-ink-600 text-pretty">{item.why}</p>
                      </div>
                    </div>

                    {/* Do this — editorial annotation */}
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mint-400" />
                      <div>
                        <p className="section-label text-mint-600">Do this</p>
                        <p className="mt-0.5 text-sm font-medium text-ink-800 text-pretty">{item.doThis}</p>
                      </div>
                    </div>

                    {/* Effort */}
                    <div className="flex items-center gap-1.5 text-xs text-ink-500">
                      <Clock className="h-3.5 w-3.5" />
                      Estimated effort: {item.effort}
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
                  <PriorityBadge priority={item.priority} />
                  <button
                    onClick={() => toggle(item.id)}
                    className={item.completed ? 'btn-secondary btn-sm' : 'btn-primary btn-sm'}
                  >
                    {item.completed ? <><ArrowRight className="h-3.5 w-3.5" /> Reopen</> : <><Check className="h-3.5 w-3.5" /> Mark as complete</>}
                  </button>
                </div>
              </div>
            </article>
          </div>
        ))}
      </section>

      {/* Done state */}
      {completed === total && (
        <section className="relative overflow-hidden rounded-4xl bg-warm-mint p-8 text-center animate-fade-in">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-mint-200/40 blur-3xl" aria-hidden="true" />
          <Star className="relative mx-auto h-8 w-8 fill-mint-400 text-mint-400" />
          <h2 className="relative mt-3 font-display text-2xl font-bold text-ink-950">All done — your brand is stronger.</h2>
          <p className="relative mt-1 text-sm text-ink-600">Run another analysis to see how your score has moved.</p>
        </section>
      )}
    </div>
  );
}
