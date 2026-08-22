import { cn } from '@/lib/utils';

interface PortraitIllustrationProps {
  className?: string;
}

/**
 * Stylized editorial portrait of "Sarah" — a young, early-career professional.
 * Abstract SVG illustration with soft fades, not a corporate headshot.
 * Designed to sit behind evidence fragments as a subtle human anchor.
 */
export default function PortraitIllustration({ className }: PortraitIllustrationProps) {
  return (
    <svg
      viewBox="0 0 320 400"
      fill="none"
      className={cn('h-full w-full', className)}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="portraitSkin" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f4e4d4" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#e8d4c0" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="portraitHair" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4a4538" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#2a2620" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="portraitShirt" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7658f5" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#5236b8" stopOpacity="0.06" />
        </linearGradient>
        <radialGradient id="portraitGlow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#f3f1ff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#f3f1ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Soft background glow */}
      <ellipse cx="160" cy="180" rx="130" ry="160" fill="url(#portraitGlow)" />

      {/* Shoulders / shirt */}
      <path
        d="M 60,400 Q 70,300 100,270 Q 130,255 160,255 Q 190,255 220,270 Q 250,300 260,400 Z"
        fill="url(#portraitShirt)"
      />

      {/* Neck */}
      <path
        d="M 140,250 Q 140,275 135,290 L 185,290 Q 180,275 180,250 Z"
        fill="url(#portraitSkin)"
      />

      {/* Hair back layer */}
      <path
        d="M 95,140 Q 85,80 160,65 Q 235,80 225,145 Q 230,200 215,240 Q 200,260 190,255 L 185,230 Q 200,180 195,140 Q 190,100 160,95 Q 130,100 125,140 Q 120,180 135,230 L 130,255 Q 120,260 105,240 Q 90,200 95,140 Z"
        fill="url(#portraitHair)"
      />

      {/* Face */}
      <ellipse cx="160" cy="170" rx="52" ry="62" fill="url(#portraitSkin)" />

      {/* Hair front — soft side sweep */}
      <path
        d="M 112,155 Q 108,110 160,100 Q 210,108 208,150 Q 205,135 185,128 Q 175,125 168,130 Q 160,125 148,128 Q 128,135 120,150 Q 115,158 112,155 Z"
        fill="url(#portraitHair)"
      />

      {/* Subtle feature suggestions — minimal, editorial */}
      {/* Eyes */}
      <ellipse cx="142" cy="172" rx="5" ry="3" fill="#4a4538" opacity="0.18" />
      <ellipse cx="178" cy="172" rx="5" ry="3" fill="#4a4538" opacity="0.18" />
      {/* Brows */}
      <path d="M 134,162 Q 142,159 150,162" stroke="#4a4538" strokeWidth="1.5" opacity="0.15" strokeLinecap="round" fill="none" />
      <path d="M 170,162 Q 178,159 186,162" stroke="#4a4538" strokeWidth="1.5" opacity="0.15" strokeLinecap="round" fill="none" />
      {/* Nose suggestion */}
      <path d="M 160,178 Q 158,190 162,198" stroke="#c6bda9" strokeWidth="1.5" opacity="0.2" strokeLinecap="round" fill="none" />
      {/* Soft smile */}
      <path d="M 148,205 Q 160,212 172,205" stroke="#4a4538" strokeWidth="2" opacity="0.15" strokeLinecap="round" fill="none" />

      {/* Earring — small editorial detail */}
      <circle cx="113" cy="185" r="2.5" fill="#f5c014" opacity="0.4" />
    </svg>
  );
}
