import { ArrowDown, ArrowUpRight } from 'lucide-react';
import ParticlePortrait from '@/components/ParticlePortrait';
import { PROFILE } from '@/data/content';

interface HeroProps {
  /** Flips true when the preloader finishes — fades the hero content in. */
  start: boolean;
}

const RollWord = ({ word, className }: { word: string; className: string }) => (
  <span className={`inline-flex ${className}`} aria-label={word}>
    {word.split('').map((ch, i) => (
      <span key={i} className="letter-slot" aria-hidden="true">
        <span
          className="letter-roll"
          style={{ animationDelay: `${i * 55}ms` }}
        >
          {ch}
        </span>
      </span>
    ))}
  </span>
);

const Hero = ({ start }: HeroProps) => {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-4 md:px-8 pt-28 pb-16"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-primary/15 blur-[140px]" />
      </div>

      {/* Particle portrait — right side, behind the text layer */}
      <div className="absolute bottom-0 right-0 z-0 hidden lg:block lg:pr-4 xl:pr-10">
        <ParticlePortrait start={start} className="h-[74vh] xl:h-[80vh]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div
          className={`mb-8 transition-all delay-500 duration-700 ${
            start ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <span className="mono-label">{PROFILE.location} · {PROFILE.timezone}</span>
        </div>

        {/* Giant name — left */}
        <h1
          className={`font-wide font-extrabold uppercase leading-[0.9] tracking-tight max-w-[12ch] ${
            start ? 'letters-in' : ''
          }`}
        >
          <span className="block text-outline-accent text-[clamp(2.6rem,9vw,8.8rem)] lg:text-[7.8vw]">
            <RollWord word={PROFILE.firstName} className="" />
          </span>
          <span className="block text-foreground text-[clamp(2rem,6.8vw,6.4rem)] lg:text-[5.8vw]">
            <RollWord word={PROFILE.lastName} className="" />
          </span>
        </h1>

        {/* Tagline + CTAs */}
        <div
          className={`mt-10 max-w-xl md:mt-14 transition-all delay-700 duration-700 ${
            start ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
            {PROFILE.tagline}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href="#contact" className="pill-solid h-12 px-7 text-base">
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="#work" className="pill-outline h-12 px-7 text-base">
              See my work
              <ArrowDown className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div
          className={`mt-12 flex items-center gap-3 lg:max-w-[50%] transition-all delay-1000 duration-700 ${
            start ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="mono-label shrink-0">(Scroll)</span>
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
          <span className="mono-label shrink-0 whitespace-nowrap">Web · AI · Marketing</span>
        </div>

        {/* Particle portrait in the flow on mobile / tablet */}
        <div className="mt-10 flex justify-end lg:hidden">
          <ParticlePortrait start={start} className="h-[52vh] -mr-4" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
