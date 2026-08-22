import { useToasts } from '@/lib/toast';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ToastViewport() {
  const items = useToasts();
  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
      {items.map((t) => (
        <div
          key={t.id}
          className={cn(
            'pointer-events-auto flex items-center gap-2.5 rounded-2xl border px-4 py-3 text-sm shadow-float animate-fade-in',
            t.tone === 'success' && 'border-mint-200 bg-mint-50 text-mint-800',
            t.tone === 'error' && 'border-coral-200 bg-coral-50 text-coral-800',
            t.tone === 'default' && 'border-ink-200 bg-white text-ink-800'
          )}
          role="status"
        >
          {t.tone === 'success' && <CheckCircle2 className="h-4 w-4 text-mint-600" />}
          {t.tone === 'error' && <AlertCircle className="h-4 w-4 text-coral-600" />}
          {t.tone === 'default' && <Info className="h-4 w-4 text-brand-600" />}
          <span className="font-medium">{t.message}</span>
        </div>
      ))}
    </div>
  );
}
