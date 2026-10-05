import { useEffect, useRef, useState } from 'react';
import SectionHead from '@/components/SectionHead';
import IdCard from '@/components/IdCard';
import Marquee from '@/components/Marquee';
import { useReveal } from '@/hooks/use-reveal';
import { MARQUEE_ITEMS, STATS } from '@/data/content';

/* --- Scroll-highlight paragraph ------------------------------------------ */

interface Seg {
  t: string;
  em?: boolean;
}

const BIO: Seg[] = [
  { t: 'I started with a' },
  { t: 'WordPress theme', em: true },
  { t: "on Fiverr in 2019 — and got hooked on making things that grow real businesses. Since then I've built streaming platforms and AI assistants, run campaigns that reached" },
  { t: 'half a million people', em: true },
  { t: 'organically, and founded' },
  { t: 'Ask for Branding', em: true },
  { t: 'along the way, serving' },
  { t: '20+ clients.', em: true },
  { t: 'Now I put the whole stack — code, automation and marketing — behind your idea, from first sketch to launched product.' },
];

const HighlightParagraph = () => {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLSpanElement>('.hl-word'));
    let raf = 0;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = (vh * 0.85 - rect.top) / (vh * 0.55);
      const progress = Math.max(0, Math.min(1, raw));
      const onCount = Math.round(progress * words.length);
      words.forEach((w, i) => w.classList.toggle('hl-on', i < onCount));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  let key = 0;
  return (
    <p ref={ref} className="text-xl md:text-2xl leading-relaxed font-medium">
      {BIO.map((seg, si) =>
        seg.t.split(' ').filter(Boolean).map((word, wi) => {
          const cls = `hl-word${seg.em ? ' hl-em' : ''}`;
          return (
            <span key={key++} className={cls}>
              {word}
              {si < BIO.length - 1 || wi < seg.t.split(' ').length - 1 ? ' ' : ''}
            </span>
          );
        })
      )}
    </p>
  );
};

/* --- Stats row ------------------------------------------------------------ */

const StatCell = ({ value, suffix, label, started }: { value: number; suffix: string; label: string; started: boolean }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!started) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1300;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setDisplay(Math.round((1 - Math.pow(1 - t, 3)) * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, value]);

  return (
    <div className="bg-background p-6 md:p-8">
      <div className="font-wide text-4xl md:text-5xl font-extrabold tabular-nums leading-none">
        {display}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="mono-label mt-3 normal-case tracking-[0.12em]">{label}</div>
    </div>
  );
};

/* --- Section -------------------------------------------------------------- */

const About = () => {
  const { ref, inView } = useReveal<HTMLDivElement>(0.3);

  return (
    <section id="about" className="relative px-4 md:px-8 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          num="01"
          label="About"
          title={
            <>
              Hi, I&apos;m <span className="serif-accent normal-case">Tanvir.</span>
            </>
          }
        />

        <div className="grid gap-14 lg:grid-cols-[1fr_340px] lg:gap-10 items-start">
          <div className="space-y-8">
            <p className="text-2xl md:text-3xl font-wide font-semibold leading-snug tracking-tight max-w-2xl">
              I help founders and small businesses turn ideas into working products and growing
              brands — one person for the whole stack.
            </p>
            <div className="max-w-2xl pt-2">
              <HighlightParagraph />
            </div>
            <div className="mono-label pt-2">Speaks · English &amp; বাংলা</div>
          </div>

          <IdCard />
        </div>

        {/* Stats */}
        <div
          ref={ref}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl border border-border bg-border overflow-hidden"
        >
          {STATS.map((s) => (
            <StatCell key={s.label} {...s} started={inView} />
          ))}
        </div>
      </div>

      <div className="mt-20 md:mt-28">
        <Marquee items={MARQUEE_ITEMS} />
      </div>
    </section>
  );
};

export default About;
