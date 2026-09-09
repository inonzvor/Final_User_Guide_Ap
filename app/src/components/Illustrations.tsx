import { cn } from '../lib/utils';

export function StepIllustration({ stepId, className }: { stepId: string, className?: string }) {
  if (stepId.includes('cable') || stepId.includes('poe')) {
    return (
      <div className={cn("hidden md:flex w-full justify-center p-6 bg-surface-raised rounded-2xl border border-line", className)}>
        <svg viewBox="0 0 200 100" className="w-48 h-auto text-ink-soft">
          <g stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <rect x="20" y="30" width="40" height="40" rx="4" className="fill-surface" />
            <path d="M40 50 L160 50" className="stroke-accent stroke-[3px]" />
            <path d="M160 30 L160 70 L180 60 L180 40 Z" className="fill-surface text-accent" />
            <circle cx="170" cy="50" r="3" className="fill-accent" />
          </g>
        </svg>
      </div>
    );
  }

  if (stepId.includes('mount') || stepId.includes('bracket')) {
    return (
      <div className={cn("hidden md:flex w-full justify-center p-6 bg-surface-raised rounded-2xl border border-line", className)}>
        <svg viewBox="0 0 200 100" className="w-48 h-auto text-ink-soft">
          <g stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <rect x="40" y="20" width="120" height="10" rx="2" className="fill-surface text-secondary" />
            <path d="M60 30 L60 80 M140 30 L140 80" className="stroke-line" strokeDasharray="4 4" />
            <rect x="50" y="60" width="100" height="20" rx="4" className="fill-surface text-accent" />
          </g>
        </svg>
      </div>
    );
  }
  
  if (stepId.includes('indicator') || stepId.includes('led')) {
    return (
      <div className={cn("hidden md:flex w-full justify-center p-6 bg-surface-raised rounded-2xl border border-line", className)}>
        <svg viewBox="0 0 200 100" className="w-48 h-auto text-ink-soft">
          <g stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <rect x="60" y="30" width="80" height="40" rx="8" className="fill-surface" />
            <circle cx="100" cy="50" r="8" className="fill-success text-success" />
            <path d="M100 30 A 20 20 0 0 1 120 50" className="stroke-success opacity-50" />
            <path d="M100 20 A 30 30 0 0 1 130 50" className="stroke-success opacity-25" />
          </g>
        </svg>
      </div>
    );
  }

  return null;
}
