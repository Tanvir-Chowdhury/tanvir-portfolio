import { ReactNode } from 'react';

interface SectionHeadProps {
  num: string;
  label: string;
  title: ReactNode;
  desc?: ReactNode;
  align?: 'left' | 'split';
}

/** Consistent section opener: "(01) — LABEL" eyebrow + giant wide heading. */
const SectionHead = ({ num, label, title, desc, align = 'left' }: SectionHeadProps) => {
  return (
    <div className="mb-12 md:mb-16">
      <div className="flex items-center gap-4 mb-6">
        <span className="font-mono text-xs tracking-[0.2em] text-accent">({num})</span>
        <span className="h-px w-14 bg-border" aria-hidden="true" />
        <span className="mono-label">{label}</span>
      </div>
      <div className={align === 'split' ? 'flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6' : ''}>
        <h2 className="font-wide font-extrabold uppercase leading-[0.95] tracking-tight text-[clamp(2.5rem,6.5vw,5.25rem)]">
          {title}
        </h2>
        {desc && (
          <p className="max-w-sm text-sm md:text-base leading-relaxed text-muted-foreground lg:text-right lg:pb-2">
            {desc}
          </p>
        )}
      </div>
    </div>
  );
};

export default SectionHead;
