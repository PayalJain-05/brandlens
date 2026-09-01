import { useEffect, useState } from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricBarProps {
  label: string;
  score: number;
  description?: string;
  tone?: 'brand' | 'mint' | 'coral' | 'mustard' | 'sky' | 'pink';
  trend?: { delta: number; label: string };
  delay?: number;
}

const toneMap = {
  brand: { fill: 'bg-brand-500', text: 'text-brand-600', light: 'bg-brand-50' },
  mint: { fill: 'bg-mint-500', text: 'text-mint-600', light: 'bg-mint-50' },
  coral: { fill: 'bg-coral-500', text: 'text-coral-600', light: 'bg-coral-50' },
  mustard: { fill: 'bg-mustard-500', text: 'text-mustard-600', light: 'bg-mustard-50' },
  sky: { fill: 'bg-sky-500', text: 'text-sky-600', light: 'bg-sky-50' },
  pink: { fill: 'bg-pink-500', text: 'text-pink-600', light: 'bg-pink-50' },
} as const;

export default function MetricBar({ label, score, description, tone = 'brand', trend, delay = 0 }: MetricBarProps) {
  const [width, setWidth] = useState(0);
  const clamped = Math.max(0, Math.min(100, score));

  useEffect(() => {
    const t = setTimeout(() => setWidth(clamped), 150 + delay);
    return () => clearTimeout(t);
  }, [clamped, delay]);

  const c = toneMap[tone];

  const trendUp = trend && trend.delta > 0;
  const trendDown = trend && trend.delta < 0;
  const trendNeutral = trend && trend.delta === 0;
  const trendColor = trendUp ? 'text-mint-600' : trendDown ? 'text-coral-600' : 'text-ink-400';
  const TrendIcon = trendUp ? ArrowUp : trendDown ? ArrowDown : Minus;

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-ink-700">{label}</span>
        <span className="font-display text-lg font-bold text-ink-950 tabular-nums">{clamped}</span>
      </div>
      <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-ink-200">
        <div
          className={cn('h-full rounded-full transition-all duration-1000 ease-out', c.fill)}
          style={{ width: `${width}%` }}
        />
      </div>
      <div className="mt-2 flex items-center justify-between">
        {trend ? (
          <span className={cn('flex items-center gap-1 text-xs font-semibold', trendColor)}>
            <TrendIcon className="h-3.5 w-3.5" />
            {trendUp ? `+${trend.delta}` : trend.delta}
            <span className={cn('ml-0.5 font-medium', trendColor)}>{trend.label}</span>
          </span>
        ) : (
          <span />
        )}
        {description && <span className="text-xs text-ink-400 text-right">{description}</span>}
      </div>
    </div>
  );
}
