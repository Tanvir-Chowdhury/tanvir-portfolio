import { useEffect, useRef, useState } from 'react';
import profilePic from '@/assets/profile.png';
import { PROFILE } from '@/data/content';

/**
 * An ID badge on a lanyard. Tap to flip, drag to fling —
 * the card springs back with a little physics.
 */
const IdCard = () => {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const state = useRef({ x: 0, y: 0, vx: 0, vy: 0, dragging: false, lastX: 0, lastY: 0 });
  const raf = useRef(0);

  // Spring-back physics loop
  useEffect(() => {
    const step = () => {
      const s = state.current;
      if (!s.dragging) {
        s.vx += -0.09 * s.x - 0.12 * s.vx;
        s.vy += -0.09 * s.y - 0.12 * s.vy;
        s.x += s.vx;
        s.y += s.vy;
      }
      if (cardRef.current) {
        const tilt = Math.max(-10, Math.min(10, s.vx * 1.4));
        cardRef.current.style.transform = `translate(${s.x}px, ${s.y}px) rotate(${tilt}deg)`;
      }
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    const s = state.current;
    s.dragging = true;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    s.vx = 0;
    s.vy = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const s = state.current;
    if (!s.dragging) return;
    const dx = e.clientX - s.lastX;
    const dy = e.clientY - s.lastY;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    s.x += dx;
    s.y += dy;
    s.vx = dx;
    s.vy = dy;
  };

  const onPointerUp = () => {
    state.current.dragging = false;
  };

  const onClick = () => {
    const s = state.current;
    // A real drag shouldn't flip the card
    if (Math.abs(s.x) + Math.abs(s.y) > 14 && (Math.abs(s.vx) > 3 || Math.abs(s.vy) > 3)) return;
    setFlipped((v) => !v);
  };

  return (
    <div className="relative mx-auto w-fit select-none">
      {/* Hanging swing — the lanyard + card sway slowly side to side */}
      <div className="idcard-swing">
        {/* Lanyard strap */}
        <div className="relative mx-auto flex w-14 flex-col items-center" aria-hidden="true">
          <div className="flex h-28 md:h-32 w-10 items-start justify-center bg-accent rounded-b-md shadow-md">
            <span
              className="mt-3 font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-accent-foreground"
              style={{ writingMode: 'vertical-rl' }}
            >
              Tanvir · 2026
            </span>
          </div>
          {/* Clip */}
          <div className="h-5 w-7 rounded-sm border-2 border-foreground/60 bg-muted" />
          <div className="h-1.5 w-12 rounded-full bg-foreground/50" />
        </div>

        {/* Card */}
        <div
          ref={cardRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onClick={onClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setFlipped((v) => !v)}
          aria-label="Identity card — activate to flip"
          className="mt-1 h-[470px] w-[340px] cursor-grab active:cursor-grabbing [perspective:1200px]"
        >
          <div className={`card-flipper relative h-full w-full ${flipped ? 'card-flipped' : ''}`}>
            {/* Front */}
            <div className="card-face absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-black/10">
              <div className="flex items-center justify-between px-5 pt-4">
                <span className="rounded-lg bg-foreground px-2.5 py-1 font-wide text-xs font-extrabold text-background">
                  TC<span className="text-accent">.</span>
                </span>
                <span className="rounded-full border border-border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                  Pass · 2026
                </span>
              </div>
              <div className="relative mx-5 mt-4 flex-1 overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-secondary via-foreground/85 to-foreground">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,hsl(var(--primary)/0.35),transparent_70%)]" />
                <img
                  src={profilePic}
                  alt={PROFILE.fullName}
                  className="relative h-full w-full object-cover object-top"
                  draggable={false}
                />
              </div>
              <div className="px-5 pb-4 pt-3">
                <div className="font-wide text-2xl font-extrabold uppercase leading-none">
                  Tanvir <span className="text-accent">Chowdhury</span>
                </div>
                <div className="mt-1.5 text-sm font-medium text-muted-foreground">
                  Developer · Automation · Marketing
                </div>
                <div className="mt-3 flex items-end justify-between">
                  <div className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground leading-relaxed">
                    Founder · Ask for Branding
                    <br />
                    Dhaka, Bangladesh
                  </div>
                  <div className="barcode h-8 w-24 text-foreground" aria-hidden="true" />
                </div>
              </div>
            </div>

          {/* Back */}
          <div className="card-face card-face-back absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-black/10">
            <div className="flex items-center justify-between px-5 pt-4">
              <span className="rounded-lg bg-foreground px-2.5 py-1 font-wide text-xs font-extrabold text-background">
                TC<span className="text-accent">.</span>
              </span>
              <span className="rounded-full border border-border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                Pass · 2026
              </span>
            </div>
            <div className="flex-1 space-y-4 px-5 pt-6 font-mono text-[10px] uppercase tracking-[0.14em]">
              {[
                ['Name', 'Md. Tanvir Chowdhury'],
                ['Role', 'Full-stack & growth'],
                ['Founded', 'Ask for Branding'],
                ['Studying', 'CSE @ NSU · 2026'],
                ['Based in', 'Dhaka, Bangladesh'],
                ['Speaks', 'English · বাংলা'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-border/70 pb-2">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="text-right text-foreground">{v}</span>
                </div>
              ))}
            </div>
            <div className="px-5 pb-5">
              <div className="barcode h-12 w-full text-foreground" aria-hidden="true" />
              <div className="mt-2 flex justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                <span>№ 0417 · BD</span>
                <span>Tap to flip back</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      <div className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        Tap to flip · Drag to play
      </div>
    </div>
  );
};

export default IdCard;
