import { GraduationCap, Trophy, BadgeCheck } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { AWARDS, CERTIFICATES, EDUCATION } from '@/data/content';

/** Compact credibility strip: education, awards, certificates. */
const Credentials = () => {
  return (
    <section className="relative px-4 md:px-8 pb-24 md:pb-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center gap-4">
          <span className="font-mono text-xs tracking-[0.2em] text-accent">(07)</span>
          <span className="h-px w-14 bg-border" aria-hidden="true" />
          <span className="mono-label">Credentials</span>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {/* Education */}
          <Reveal>
            <div>
              <div className="mb-5 flex items-center gap-2.5">
                <GraduationCap className="h-4 w-4 text-primary" />
                <h3 className="font-wide text-sm font-extrabold uppercase tracking-[0.15em]">Education</h3>
              </div>
              <div className="space-y-5">
                {EDUCATION.map((edu) => (
                  <div key={edu.degree} className="border-l-2 border-border pl-4 transition-colors hover:border-primary">
                    <div className="font-semibold leading-snug">{edu.degree}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{edu.institution}</div>
                    <div className="mono-label mt-1.5">
                      {edu.period} · {edu.extra}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Awards */}
          <Reveal delay={80}>
            <div>
              <div className="mb-5 flex items-center gap-2.5">
                <Trophy className="h-4 w-4 text-accent" />
                <h3 className="font-wide text-sm font-extrabold uppercase tracking-[0.15em]">Awards</h3>
              </div>
              <div className="space-y-5">
                {AWARDS.map((award) => (
                  <div key={award.title} className="border-l-2 border-border pl-4 transition-colors hover:border-accent">
                    <div className="font-semibold leading-snug">{award.title}</div>
                    <div className="mono-label mt-1.5">
                      {award.year}
                      {award.note ? ` · ${award.note}` : ''}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Certificates */}
          <Reveal delay={160}>
            <div>
              <div className="mb-5 flex items-center gap-2.5">
                <BadgeCheck className="h-4 w-4 text-primary" />
                <h3 className="font-wide text-sm font-extrabold uppercase tracking-[0.15em]">
                  Certificates
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {CERTIFICATES.map((cert) => (
                  <span
                    key={cert.title}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-xs text-foreground/85 transition-colors hover:border-primary/40"
                  >
                    {cert.title}
                    <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                      {cert.issuer}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Credentials;
