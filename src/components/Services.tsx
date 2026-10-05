import { ArrowUpRight, Calendar } from 'lucide-react';
import SectionHead from '@/components/SectionHead';
import Reveal from '@/components/Reveal';
import { PROFILE, SERVICES } from '@/data/content';

const Services = () => {
  return (
    <section id="services" className="relative px-4 md:px-8 py-24 md:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          num="02"
          label="Services"
          align="split"
          title={
            <>
              What I can do <span className="serif-accent normal-case">for you.</span>
            </>
          }
          desc="Pick what you need — or bring me a problem and I'll tell you which of these solves it. Every engagement starts with a free call."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {SERVICES.map((service, i) => (
            <Reveal key={service.id} delay={i * 70}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-7 md:p-9 transition-all duration-500 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
                {/* Hover glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="flex items-start justify-between">
                  <span className="font-mono text-sm text-accent">({String(i + 1).padStart(2, '0')})</span>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                </div>

                <h3 className="mt-6 font-wide text-2xl md:text-3xl font-extrabold uppercase tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{service.description}</p>

                <div className="mt-auto pt-7">
                  <div className="mono-label mb-3">Good for</div>
                  <div className="flex flex-wrap gap-2">
                    {service.goodFor.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border bg-background/60 px-3.5 py-1.5 text-xs text-foreground/80 transition-colors group-hover:border-accent/40"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 text-center">
          <a href={PROFILE.calendly} target="_blank" rel="noopener noreferrer" className="pill-outline h-11 px-6">
            <Calendar className="h-4 w-4 text-accent" />
            Not sure what you need? Book a free call
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <span className="mono-label">Free · 30 min · No commitment</span>
        </div>
      </div>
    </section>
  );
};

export default Services;
