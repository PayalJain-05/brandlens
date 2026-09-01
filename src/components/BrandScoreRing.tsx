import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface BrandScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showLabel?: boolean;
  label?: string;
  sublabel?: string;
}

export default function BrandScoreRing({
  score,
  size = 200,
  strokeWidth = 14,
  className,
  showLabel = true,
  label = 'Brand Score',
  sublabel,
}: BrandScoreRingProps) {
  const [displayed, setDisplayed] = useState(0);
  const [arcOffset, setArcOffset] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, score));
  const targetOffset = circumference - (clamped / 100) * circumference;

  useEffect(() => {
    setDisplayed(0);
    setArcOffset(circumference);
    let raf = 0;
    const start = performance.now();
    const duration = 1200;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayed(Math.round(eased * clamped));
      setArcOffset(circumference - eased * (circumference - targetOffset));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [clamped, circumference, targetOffset]);

  const gradientId = 'brandScoreGradient';
  const fontSize = Math.round(size * 0.28);

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b5a6ff" />
            <stop offset="55%" stopColor="#7658f5" />
            <stop offset="100%" stopColor="#5236b8" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e8e3d8"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={arcOffset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center" style={{ pointerEvents: 'none' }}>
        <span
          className="font-display font-bold leading-none text-ink-950 tabular-nums"
          style={{ fontSize: `${fontSize}px` }}
        >
          {displayed}
        </span>
        <span className="mt-1 text-xs font-medium text-ink-400 tabular-nums">/ 100</span>
        {showLabel && <span className="mt-2 text-[11px] uppercase tracking-[0.14em] text-ink-400">{label}</span>}
        {sublabel && <span className="mt-1 text-sm font-medium text-ink-700">{sublabel}</span>}
      </div>
    </div>
  );
}
