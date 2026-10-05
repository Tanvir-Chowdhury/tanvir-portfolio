import { useEffect, useMemo, useRef, useState } from 'react';
import SectionHead from '@/components/SectionHead';
import { SKILL_GROUPS } from '@/data/content';

interface SphereTag {
  name: string;
  area: string;
  weight: number;
  x: number;
  y: number;
  z: number;
}

const Toolkit = () => {
  const [activeArea, setActiveArea] = useState<string>('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const tagRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const rotation = useRef({ ry: 0, vel: 0.0022, dragging: false, lastX: 0 });
  const radiusRef = useRef(200);

  const tags = useMemo<SphereTag[]>(() => {
    const all = SKILL_GROUPS.flatMap((g) => g.skills.map((s) => ({ ...s, area: g.area })));
    // Fibonacci sphere distribution
    return all.map((tag, i) => {
      const n = all.length;
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = i * 2.399963; // golden angle
      return { ...tag, x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
    });
  }, []);

  const totalSkills = tags.length;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resize = () => {
      radiusRef.current = Math.max(120, Math.min(container.clientWidth, container.clientHeight) / 2 - 50);
    };
    resize();
    window.addEventListener('resize', resize);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;

    const step = () => {
      const rot = rotation.current;
      if (!rot.dragging) {
        rot.vel += (0.0022 - rot.vel) * 0.02; // ease back to base speed
        rot.ry += reduce ? 0 : rot.vel;
      }
      const R = radiusRef.current;
      const cos = Math.cos(rot.ry);
      const sin = Math.sin(rot.ry);

      tags.forEach((tag, i) => {
        const el = tagRefs.current[i];
        if (!el) return;
        const x = tag.x * cos + tag.z * sin;
        const z = -tag.x * sin + tag.z * cos;
        const y = tag.y;
        const depth = (z + 1) / 2; // 0 back → 1 front
        let opacity = 0.3 + depth * 0.7;
        if (activeArea !== 'all' && tag.area !== activeArea) opacity *= 0.14;
        const scale = 0.62 + depth * 0.55 * tag.weight;
        el.style.transform = `translate(-50%, -50%) translate3d(${x * R}px, ${y * R}px, 0) scale(${scale})`;
        el.style.opacity = String(opacity);
        el.style.zIndex = String(Math.round(depth * 100));
      });
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [tags, activeArea]);

  const onPointerDown = (e: React.PointerEvent) => {
    const rot = rotation.current;
    rot.dragging = true;
    rot.lastX = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const rot = rotation.current;
    if (!rot.dragging) return;
    const dx = e.clientX - rot.lastX;
    rot.lastX = e.clientX;
    rot.ry += dx * 0.006;
    rot.vel = dx * 0.004;
  };

  const onPointerUp = () => {
    rotation.current.dragging = false;
  };

  const areaCount = (area: string) => SKILL_GROUPS.find((g) => g.area === area)?.skills.length ?? 0;

  return (
    <section id="toolkit" className="relative px-4 md:px-8 py-24 md:py-32 bg-secondary/30 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          num="05"
          label="Toolkit"
          title={
            <>
              The <span className="serif-accent normal-case">toolkit.</span>
            </>
          }
        />

        <div className="grid gap-10 lg:grid-cols-[360px_1fr] items-center">
          {/* Left: filters + helper card */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveArea('all')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeArea === 'all'
                    ? 'bg-foreground text-background'
                    : 'border border-border bg-card/60 hover:border-primary/40 hover:text-primary'
                }`}
              >
                All <sup className="font-mono text-[10px] opacity-70">{totalSkills}</sup>
              </button>
              {SKILL_GROUPS.map((g) => (
                <button
                  key={g.area}
                  onClick={() => setActiveArea(activeArea === g.area ? 'all' : g.area)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    activeArea === g.area
                      ? 'bg-foreground text-background'
                      : 'border border-border bg-card/60 hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {g.area} <sup className="font-mono text-[10px] opacity-70">{areaCount(g.area)}</sup>
                </button>
              ))}
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 md:p-7">
              <div className="mono-label">
                {totalSkills} tools · {SKILL_GROUPS.length} areas
              </div>
              <p className="mt-3 text-lg font-medium leading-snug">
                Pick an area — or tap any tag in the sphere — to bring it to the front.
              </p>
              <div className="mt-5">
                {SKILL_GROUPS.map((g) => (
                  <button
                    key={g.area}
                    onClick={() => setActiveArea(activeArea === g.area ? 'all' : g.area)}
                    className={`flex w-full items-center justify-between border-t border-border py-3 text-left text-sm transition-colors ${
                      activeArea === g.area ? 'text-accent' : 'text-foreground/85 hover:text-primary'
                    }`}
                  >
                    <span className="font-medium">{g.area}</span>
                    <span className="font-mono text-xs text-muted-foreground">{g.skills.length}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: the sphere */}
          <div
            ref={containerRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            className="relative h-[420px] md:h-[520px] cursor-grab touch-none active:cursor-grabbing select-none"
            aria-label="Rotating sphere of tools — drag to spin, tap a tag to filter"
          >
            {tags.map((tag, i) => (
              <button
                key={tag.name}
                ref={(el) => (tagRefs.current[i] = el)}
                onClick={() => setActiveArea(activeArea === tag.area ? 'all' : tag.area)}
                className="absolute left-1/2 top-1/2 whitespace-nowrap rounded-full border border-border bg-card px-3 py-1.5 font-mono text-[11px] md:text-xs text-foreground shadow-sm transition-colors hover:border-accent hover:text-accent will-change-transform"
                style={{ transform: 'translate(-50%, -50%)' }}
              >
                {tag.name}
              </button>
            ))}
            <div className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 mono-label">
              Drag to spin
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Toolkit;
