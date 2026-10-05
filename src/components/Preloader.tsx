import { useEffect, useRef, useState } from 'react';
import { PROFILE } from '@/data/content';

interface PreloaderProps {
  onDone: () => void;
}

const TICKS = 44;
const AMBER_TICKS = new Set([3, 11, 19, 27, 35, 41]);

/** Boot screen: counter 000→100 inside a radial tick ring, then slides away. */
const Preloader = ({ onDone }: PreloaderProps) => {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.sessionStorage.getItem('tc-loaded') === '1';
  });
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (gone) {
      doneRef.current();
      return;
    }
    document.body.style.overflow = 'hidden';
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduce ? 300 : 2300;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => setExiting(true), 220);
        window.setTimeout(() => {
          window.sessionStorage.setItem('tc-loaded', '1');
          document.body.style.overflow = '';
          setGone(true);
          doneRef.current();
        }, 950);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = '';
    };
  }, [gone]);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] grid place-items-center bg-background transition-transform duration-700 ${
        exiting ? '-translate-y-full' : ''
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)' }}
    >
      <div className="relative w-[250px] h-[250px] md:w-[290px] md:h-[290px]">
        {/* Radial tick ring */}
        {Array.from({ length: TICKS }).map((_, i) => (
          <span
            key={i}
            className="absolute inset-0"
            style={{ transform: `rotate(${(360 / TICKS) * i}deg)` }}
          >
            <span
              className="absolute left-1/2 top-0 -translate-x-1/2 w-[2px] rounded-full transition-[height] duration-200"
              style={{
                height: `${(i % 4 === 0 ? 11 : 7) + (count / 100) * 3}%`,
                background: AMBER_TICKS.has(i)
                  ? 'hsl(var(--accent))'
                  : 'hsl(var(--foreground) / 0.7)',
              }}
            />
          </span>
        ))}
        {/* Inner disc */}
        <div className="absolute inset-[22%] rounded-full border border-border bg-card/60" />
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="font-wide font-extrabold text-6xl md:text-7xl tabular-nums leading-none">
              {String(count).padStart(3, '0')}
            </div>
            <div className="mono-label mt-3">{count >= 100 ? 'Ready' : 'Loading'}</div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 mono-label whitespace-nowrap">
        {PROFILE.fullName} · Portfolio ©2026
      </div>
    </div>
  );
};

export default Preloader;
