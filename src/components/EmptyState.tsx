import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export default function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center rounded-3xl border border-dashed border-ink-300 bg-white/60 px-6 py-12 text-center', className)}>
      {icon && (
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-ink-100 text-ink-500">
          {icon}
        </div>
      )}
      <h3 className="font-display text-lg font-semibold text-ink-800">{title}</h3>
      {description && <p className="mt-1.5 max-w-sm text-sm text-ink-500 text-pretty">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
