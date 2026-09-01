import { useEffect, useState } from 'react';
import { Copy, Bookmark, ExternalLink, Check, Sparkles, ArrowRight, Wand2, Quote, Star } from 'lucide-react';
import IdentityOrb from '@/components/IdentityOrb';
import { mockProjects, mockStories } from '@/data/mockData';
import { toast } from '@/lib/toast';
import { cn } from '@/lib/utils';
import type { Story } from '@/types';

const stages = [
  { key: 'problem', label: 'Problem', tone: 'bg-coral-500', ring: 'ring-coral-200', bg: 'bg-warm-coral' },
  { key: 'action', label: 'Action', tone: 'bg-sky-500', ring: 'ring-sky-200', bg: 'bg-warm-sky' },
  { key: 'insight', label: 'Insight', tone: 'bg-mint-500', ring: 'ring-mint-200', bg: 'bg-warm-mint' },
  { key: 'impact', label: 'Impact', tone: 'bg-mustard-500', ring: 'ring-mustard-200', bg: 'bg-warm-mustard' },
] as const;

export default function StoryMining() {
  const [activeId, setActiveId] = useState(mockProjects[0].id);
  const [savedStories, setSavedStories] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);

  const project = mockProjects.find((p) => p.id === activeId)!;
  const story: Story | undefined = mockStories.find((s) => s.projectId === activeId);

  useEffect(() => {
    setCopied(false);
  }, [activeId]);

  const handleCopy = async () => {
    if (!story) return;
    try {
      await navigator.clipboard.writeText(story.strongerStory);
      setCopied(true);
      toast('Copied to clipboard', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast("Couldn't copy — try selecting manually", 'error');
    }
  };

  const handleSave = () => {
    if (!story) return;
    setSavedStories((prev) => {
      const next = new Set(prev);
      if (next.has(story.id)) {
        next.delete(story.id);
        toast('Story unsaved', 'default');
      } else {
        next.add(story.id);
        toast('Story saved', 'success');
      }
      return next;
    });
  };

  const isSaved = story ? savedStories.has(story.id) : false;

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      {/* Header */}
      <section className="relative">
        <div className="flex items-center gap-3">
          <span className="section-number">01</span>
          <span className="section-label">Story Mining</span>
        </div>
        <h1 className="mt-3 editorial-h1">
          What story is hidden inside your work?
        </h1>
        <p className="mt-3 max-w-xl text-lg text-ink-600 text-pretty">
          Turn projects and experiences into stories that show what you actually bring to the table.
        </p>
      </section>

      {/* Project selector */}
      <section>
        <p className="section-label mb-3">Select a project</p>
        <div className="flex flex-wrap gap-2.5">
          {mockProjects.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveId(p.id)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-all',
                p.id === activeId
                  ? 'border-pink-500 bg-pink-500 text-white shadow-soft'
                  : 'border-ink-200 bg-white text-ink-700 hover:border-pink-300 hover:text-pink-700'
              )}
            >
              {p.title}
            </button>
          ))}
        </div>
      </section>

      {!story ? (
        <section className="rounded-4xl border-2 border-dashed border-ink-300 bg-white/60 p-12 text-center">
          <Sparkles className="mx-auto h-8 w-8 text-ink-300" />
          <p className="mt-3 font-display text-lg font-semibold text-ink-800">No story mined yet</p>
          <p className="mt-1 text-sm text-ink-500">Mine this project to uncover a stronger story.</p>
        </section>
      ) : (
        <>
          {/* ORIGINAL — faded, quoted */}
          <section className="relative overflow-hidden rounded-4xl bg-ink-100 p-8 sm:p-12">
            <div className="flex items-center gap-2">
              <Quote className="h-5 w-5 text-ink-400" />
              <p className="section-label">Original — what you currently say</p>
            </div>
            <p className="mt-4 font-display text-xl font-medium leading-relaxed text-ink-500 text-pretty lg:text-2xl">
              "{story.original}"
            </p>
          </section>

          {/* Transformation arrow */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-1">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-pink-600 shadow-soft">
                <Wand2 className="h-6 w-6" />
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-pink-500">BrandLens transforms it</span>
              <ArrowRight className="h-5 w-5 rotate-90 animate-bounce text-pink-300" />
            </div>
          </div>

          {/* Story mining workspace: horizontal story path */}
          <section className="relative">
            <div className="flex items-center gap-3 mb-6">
              <span className="section-number">02</span>
              <span className="section-label">What BrandLens found</span>
            </div>

            <div className="relative overflow-hidden rounded-4xl bg-white p-8 sm:p-12">
              {/* Center orb decoration */}
              <div className="pointer-events-none absolute right-8 top-8 opacity-40" aria-hidden="true">
                <IdentityOrb size={64} ring rotate />
              </div>

              {/* Desktop: horizontal path */}
              <div className="hidden md:block">
                {/* Connecting line */}
                <svg className="absolute left-12 right-12 top-[5.5rem] w-[calc(100%-6rem)]" height="4" aria-hidden="true">
                  <line x1="0" y1="2" x2="100%" y2="2" stroke="#ffd6e8" strokeWidth="3" strokeDasharray="6 6" strokeLinecap="round" />
                </svg>

                <div className="relative grid grid-cols-4 gap-4">
                  {stages.map((stage, i) => {
                    const text = story[stage.key as keyof Pick<Story, 'problem' | 'action' | 'insight' | 'impact'>];
                    return (
                      <div key={stage.key} className="flex flex-col items-center animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
                        <span className={cn('flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white shadow-soft', stage.tone)}>
                          {stage.label[0]}
                        </span>
                        <span className="mt-2 text-xs font-bold uppercase tracking-[0.1em] text-ink-700">{stage.label}</span>
                        <div className={cn('mt-3 w-full rounded-2xl border border-ink-200/60 p-4 ring-1', stage.ring, stage.bg)}>
                          <p className="text-sm leading-relaxed text-ink-700 text-pretty">{text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile: vertical path */}
              <div className="flex flex-col gap-4 md:hidden">
                {stages.map((stage, i) => {
                  const text = story[stage.key as keyof Pick<Story, 'problem' | 'action' | 'insight' | 'impact'>];
                  return (
                    <div key={stage.key} className="flex gap-3 animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
                      <div className="flex flex-col items-center">
                        <span className={cn('flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white shadow-soft', stage.tone)}>
                          {stage.label[0]}
                        </span>
                        {i < stages.length - 1 && <div className="mt-2 h-8 w-px bg-ink-200" />}
                      </div>
                      <div className={cn('flex-1 rounded-2xl border border-ink-200/60 p-4 ring-1', stage.ring, stage.bg)}>
                        <span className="text-xs font-bold uppercase tracking-[0.1em] text-ink-700">{stage.label}</span>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink-700 text-pretty">{text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Arrow to stronger story */}
          <div className="flex justify-center">
            <ArrowRight className="h-6 w-6 rotate-90 animate-bounce text-pink-400" />
          </div>

          {/* STRONGER STORY — vibrant result */}
          <section className="relative overflow-hidden rounded-4xl bg-warm-pink p-8 sm:p-12">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-pink-200/50 blur-3xl" aria-hidden="true" />
            <Star className="pointer-events-none absolute right-12 top-10 h-5 w-5 fill-mustard-400 text-mustard-400" aria-hidden="true" />
            <div className="relative">
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-6 w-6 text-pink-600" />
                <h2 className="font-display text-2xl font-bold text-ink-950">A stronger story</h2>
              </div>
              <blockquote className="mt-5 border-l-4 border-pink-500 pl-6 font-display text-2xl font-medium leading-relaxed text-ink-950 text-pretty sm:text-3xl">
                "{story.strongerStory}"
              </blockquote>

              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={handleCopy} className="btn-primary">
                  {copied ? <><Check className="h-4 w-4" /> Copied</> : <><Copy className="h-4 w-4" /> Copy for LinkedIn</>}
                </button>
                <button className="btn-secondary">
                  <ExternalLink className="h-4 w-4" /> Use in Portfolio
                </button>
                <button onClick={handleSave} className={isSaved ? 'btn-secondary border-mint-300 text-mint-700' : 'btn-secondary'}>
                  {isSaved ? <><Check className="h-4 w-4" /> Saved</> : <><Bookmark className="h-4 w-4" /> Save Story</>}
                </button>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
