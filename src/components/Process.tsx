import { ArrowUpRight, Calendar } from 'lucide-react';
import SectionHead from '@/components/SectionHead';
import Reveal from '@/components/Reveal';
import { PROFILE, PROCESS_STEPS } from '@/data/content';

const Process = () => {
  return (
    <section id="process" className="relative px-4 md:px-8 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          num="04"
          label="Process"
          align="split"
          title={
            <>
              How we&apos;ll <span className="serif-accent normal-case">work.</span>
            </>
          }
          desc="No jargon, no black box. Four plain steps from first message to launch — and you always know what's happening."
        />

        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.step} delay={i * 80}>
              <div className="group relative border-t-2 border-border pt-6 transition-colors duration-500 hover:border-accent">
                <span className="absolute -top-[7px] left-0 h-3 w-3 rounded-full border-2 border-background bg-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="font-wide text-6xl md:text-7xl font-extrabold leading-none text-outline">
                  {step.step}
                </div>
                <h3 className="mt-5 font-wide text-xl font-extrabold uppercase tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <a href={PROFILE.calendly} target="_blank" rel="noopener noreferrer" className="pill-solid h-12 px-7 text-base">
            <Calendar className="h-4 w-4" />
            Book a free discovery call
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <span className="mono-label">Step one takes 30 minutes — and it&apos;s free</span>
        </div>
      </div>
    </section>
  );
};

export default Process;
