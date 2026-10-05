import { useEffect, useState } from 'react';
import { ArrowUp, ArrowUpRight, Mail } from 'lucide-react';
import { PROFILE, SOCIALS } from '@/data/content';

/** Circular rotating badge — "open for projects" stamp linking to contact. */
const RotatingBadge = () => (
  <a
    href="#contact"
    aria-label="Open for projects — start a project"
    className="group relative grid h-32 w-32 shrink-0 place-items-center md:h-40 md:w-40"
  >
    <svg viewBox="0 0 100 100" className="art-spin absolute inset-0 h-full w-full">
      <defs>
        <path id="badge-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
      </defs>
      <text className="fill-foreground font-mono text-[8.2px] uppercase" style={{ letterSpacing: '0.24em' }}>
        <textPath href="#badge-circle">Open for projects · say hello ·</textPath>
      </text>
    </svg>
    <span className="grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-foreground transition-transform duration-500 group-hover:scale-110 md:h-16 md:w-16">
      <ArrowUpRight className="h-6 w-6" />
    </span>
  </a>
);

const Footer = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Dhaka',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  const marqueeWords = ['Have an idea?', 'Let\u2019s build it', 'Start a project', 'Say hello'];

  return (
    <footer className="relative overflow-hidden border-t border-border">
      {/* Call-to-action marquee — the whole strip is a link */}
      <a href="#contact" aria-label="Start a project" className="group block select-none border-b border-border py-10 md:py-14">
        <div className="marquee-track items-center">
          {[0, 1, 2, 3].map((row) => (
            <div key={row} className="flex shrink-0 items-center" aria-hidden={row > 0}>
              {marqueeWords.map((word, i) => (
                <span key={`${row}-${i}`} className="flex items-center">
                  <span
                    className={`font-wide font-extrabold uppercase whitespace-nowrap leading-none text-5xl md:text-8xl px-5 md:px-8 transition-colors duration-300 ${
                      i % 4 === 1
                        ? 'text-outline group-hover:text-accent group-hover:[-webkit-text-stroke-width:0px]'
                        : i % 4 === 3
                          ? 'serif-accent normal-case'
                          : 'text-foreground'
                    }`}
                  >
                    {word}
                  </span>
                  <span className="text-accent text-4xl md:text-6xl leading-none select-none">✳</span>
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent" />
      </a>

      {/* Middle: email + badge */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-14 md:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-center md:justify-between">
          <div className="space-y-5">
            <span className="mono-label block">The fastest way to reach me</span>
            <a
              href={`mailto:${PROFILE.email}`}
              className="group inline-flex flex-wrap items-center gap-3 font-wide text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-accent/15 text-accent transition-transform duration-300 group-hover:-rotate-12 md:h-14 md:w-14">
                <Mail className="h-5 w-5 md:h-6 md:w-6" />
              </span>
              <span className="relative">
                {PROFILE.email}
                <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
              </span>
            </a>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              One message is enough — tell me what you&apos;re building and I&apos;ll reply
              within 24 hours with how I&apos;d approach it.
            </p>
          </div>
          <RotatingBadge />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-8">
          <span>© {new Date().getFullYear()} {PROFILE.fullName} · {PROFILE.location}</span>
          <span className="tabular-nums">Dhaka {time} {PROFILE.timezone}</span>
          <span className="hidden gap-4 md:flex">
            {SOCIALS.filter((s) => s.label !== 'Email').map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
                {s.label}
              </a>
            ))}
          </span>
          <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
