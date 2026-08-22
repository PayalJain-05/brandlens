import { cn } from '@/lib/utils';

interface IdentityOrbProps {
  size?: number;
  className?: string;
  pulse?: boolean;
  rotate?: boolean;
  /** Show the colorful conic ring around the orb */
  ring?: boolean;
}

/**
 * BrandLens "identity orb" — the recurring visual element across the product.
 * Represents scattered information coming together into one connected identity.
 * A soft gradient sphere with an inner highlight and an optional rotating ring.
 */
export default function IdentityOrb({
  size = 64,
  className,
  pulse = false,
  rotate = false,
  ring = false,
}: IdentityOrbProps) {
  return (
    <span
      className={cn('orb relative inline-block', pulse && 'animate-orb-pulse', className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {ring && (
        <span
          className={cn(
            'absolute -inset-[18%] rounded-full opacity-50 blur-[3px]',
            rotate && 'animate-orb-rotate'
          )}
          style={{
            background:
              'conic-gradient(from 0deg, rgba(167,243,208,0.6), rgba(50,181,240,0.5), rgba(255,216,61,0.55), rgba(240,93,180,0.5), rgba(255,90,95,0.45), rgba(167,243,208,0.6))',
          }}
        />
      )}
    </span>
  );
}
