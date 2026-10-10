import SectionHead from '@/components/SectionHead';
import Reveal from '@/components/Reveal';
import { EXPERIENCE } from '@/data/content';

const Experience = () => {
  const items = EXPERIENCE;

  return (
    <section id="experience" className="relative px-4 md:px-8 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          num="06"
          label="Experience"
          align="split"
          title={
            <>
              Where I&apos;ve <span className="serif-accent normal-case">worked.</span>
            </>
          }
          desc="Ten roles, one theme: shipping things that grow a business — my own and my clients'."
        />

        <div className="border-t border-border">
          {items.map((work, i) => (
            <Reveal key={`${work.role}-${work.company}`} delay={Math.min(i, 4) * 50}>
              <div className="group grid gap-3 border-b border-border py-7 transition-colors duration-300 hover:bg-secondary/40 md:grid-cols-[150px_1fr] md:gap-8 md:py-8 lg:grid-cols-[170px_1fr_260px]">
                {/* Period */}
                <div className="flex items-start gap-3">
                  <span
                    className={`font-wide text-2xl md:text-3xl font-extrabold leading-none ${
                      work.current ? 'text-accent' : 'text-foreground/85'
                    }`}
                  >
                    {work.period}
                  </span>
                  {work.current && (
                    <span className="mt-1 hidden rounded-full bg-accent/15 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-accent md:inline-block">
                      Now
                    </span>
                  )}
                </div>

                {/* Role */}
                <div>
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight">{work.role}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-medium text-primary">{work.company}</span>
                    <span className="mono-label">{work.location}</span>
                  </div>
                  <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                    {work.line}
                  </p>
                </div>

                {/* Wins */}
                {work.achievements && work.achievements.length > 0 && (
                  <div className="flex flex-wrap content-start items-start gap-1.5 lg:justify-end">
                    {work.achievements.slice(0, 4).map((a) => (
                      <span
                        key={a}
                        className="rounded-full border border-border bg-card/70 px-3 py-1 text-[11px] text-foreground/75"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
