import type { Priority } from '@/types';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowRight, ArrowDown } from 'lucide-react';

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

const map = {
  high: { label: 'High priority', classes: 'bg-coral-50 text-coral-700 border-coral-200', Icon: ArrowUp },
  medium: { label: 'Medium priority', classes: 'bg-mustard-50 text-mustard-700 border-mustard-200', Icon: ArrowRight },
  low: { label: 'Low priority', classes: 'bg-sky-50 text-sky-700 border-sky-200', Icon: ArrowDown },
} as const;

export default function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const { label, classes, Icon } = map[priority];
  return (
    <span className={cn('chip border', classes, className)}>
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}
