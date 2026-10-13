import { ArrowUpRight, Calendar, Check, X } from 'lucide-react';
import SectionHead from '@/components/SectionHead';
import Reveal from '@/components/Reveal';
import { EXECUTION_TRAP, MVP_SPRINT, PROFILE, SERVICES } from '@/data/content';

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
          desc="Not just a developer or a marketer. Your interim growth partner, bridging the gap between idea and revenue."
        />

        {/* The problem first: why founders end up here */}
        <Reveal>
          <div className="mono-label mb-5">The execution trap</div>
          <div className="grid gap-3 md:grid-cols-4">
            {EXECUTION_TRAP.map((trap) => (
              <div key={trap.who} className="rounded-2xl border border-border/70 bg-background/40 p-5">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground/60">
                  <X className="h-4 w-4 text-destructive/70" aria-hidden="true" />
                  <span className="line-through decoration-foreground/30">{trap.who}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{trap.pain}</p>
              </div>
            ))}
            <div className="trap-answer rounded-2xl p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Check className="h-4 w-4 text-accent" aria-hidden="true" />
                One growth partner
              </div>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                Tech, brand and automation under one roof, working on autopilot.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Three pillars */}
        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.id} delay={i * 90} className="h-full">
              <article data-tilt className="service-pillar group relative flex h-full flex-col overflow-hidden rounded-3xl p-7 md:p-8">
                <span className="service-numeral text-outline font-wide font-extrabold" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="mono-label text-accent">{service.role}</div>
                <h3 className="mt-4 font-wide text-3xl font-extrabold uppercase leading-none tracking-tight md:text-[2.1rem]">
                  {service.title}
                </h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{service.description}</p>

                <ul className="mt-6 space-y-2.5">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-foreground/85">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10">
                        <Check className="h-3 w-3 text-accent" aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <div className="border-t border-border/70 pt-5">
                    <div className="font-wide text-3xl font-extrabold tracking-tight text-gradient-gold">
                      {service.proof.value}
                    </div>
                    <div className="mt-1 text-xs leading-relaxed text-muted-foreground">{service.proof.label}</div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Signature offer */}
        <Reveal className="mt-6">
          <article data-tilt className="sprint-card relative grid overflow-hidden rounded-3xl lg:grid-cols-[1fr_1.25fr]">
            <div className="relative p-7 md:p-10">
              <div className="mono-label text-accent">Signature offer</div>
              <h3 className="mt-4 font-wide text-3xl font-extrabold uppercase leading-none tracking-tight md:text-4xl">
                {MVP_SPRINT.name}
              </h3>
              <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">{MVP_SPRINT.pitch}</p>
              <div className="mt-7 flex flex-wrap gap-8">
                <div>
                  <div className="font-wide text-2xl font-extrabold text-foreground">{MVP_SPRINT.timeline}</div>
                  <div className="mono-label mt-1">Timeline</div>
                </div>
                <div>
                  <div className="font-wide text-2xl font-extrabold text-gradient-gold">{MVP_SPRINT.price}</div>
                  <div className="mono-label mt-1">Investment</div>
                </div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground/80">{MVP_SPRINT.versus}</p>
              <a href={PROFILE.calendly} target="_blank" rel="noopener noreferrer" className="pill-solid mt-8 h-12 px-7">
                Book a discovery call
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <ol className="sprint-track relative border-t border-border/70 p-7 md:p-10 lg:border-l lg:border-t-0">
              {MVP_SPRINT.steps.map((step, i) => (
                <li key={step.when} className="sprint-step relative grid grid-cols-[auto_1fr] gap-x-5 pb-7 last:pb-0">
                  <span className="sprint-dot relative z-10 grid h-9 w-9 place-items-center rounded-full font-mono text-xs">
                    {i + 1}
                  </span>
                  <div className="pt-1">
                    <div className="mono-label">{step.when}</div>
                    <div className="mt-1.5 font-semibold text-foreground">{step.title}</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      <span className="text-accent">→ </span>{step.result}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </article>
        </Reveal>

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
