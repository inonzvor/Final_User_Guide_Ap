import type { ReactNode } from 'react';

/**
 * Spec-sheet style section header: a small mono eyebrow tag, a large uppercase
 * title, an optional description pinned to the far edge, and a hairline rule
 * closing the block off from the content below.
 */
export function SectionHead({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="section-head md:flex-row md:items-end md:justify-between">
      <div className="space-y-3 min-w-0">
        <p className="label-tag">{eyebrow}</p>
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-ink leading-[0.95] max-w-3xl break-words">
          {title}
        </h2>
        {action && <div className="pt-1">{action}</div>}
      </div>
      {description && (
        <p className="text-sm md:text-base text-ink-soft max-w-xs md:text-end shrink-0">
          {description}
        </p>
      )}
    </div>
  );
}
