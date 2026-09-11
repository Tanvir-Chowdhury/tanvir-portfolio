import { ReactNode } from 'react';

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: 'center' | 'left';
}

const SectionHeading = ({ index, eyebrow, title, description, align = 'center' }: SectionHeadingProps) => {
  const isCenter = align === 'center';

  return (
    <div className={`space-y-5 mb-12 md:mb-16 ${isCenter ? 'text-center mx-auto' : 'text-left'}`}>
      <div className={`flex items-center gap-3 ${isCenter ? 'justify-center' : 'justify-start'}`}>
        <span className="font-mono text-sm text-primary/70">{index}</span>
        <span className="h-px w-8 bg-border" />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-semibold tracking-tight leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className={`text-lg text-muted-foreground leading-relaxed ${isCenter ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
