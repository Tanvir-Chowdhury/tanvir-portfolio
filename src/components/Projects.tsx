import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import SectionHead from '@/components/SectionHead';
import Reveal from '@/components/Reveal';
import { PROJECTS, type Project, type ProjectArtKey } from '@/data/content';
import ProjectArt from '@/components/ProjectArt';

/* --- Data ----------------------------------------------------------------- */

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'web', label: 'Web' },
  { key: 'ai', label: 'AI & Automation' },
  { key: 'marketing', label: 'Marketing' },
  { key: 'data', label: 'Data' },
] as const;

type FilterKey = (typeof FILTERS)[number]['key'];

/** Highlight reel for the 3D stage, mixed across disciplines; the rest live in the index. */
const HIGHLIGHTS = [0, 4, 6, 1, 7, 2, 12].map((i) => PROJECTS[i]);
const ARCHIVE = PROJECTS.filter((project) => !HIGHLIGHTS.includes(project));

/** Index rows shown before "Show all". */
const INDEX_PREVIEW = 8;
/** How long each highlight holds the stage before the reel advances. */
const AUTOPLAY_MS = 7000;

const pad = (n: number) => String(n).padStart(2, '0');

/* --- Art frame ------------------------------------------------------------ */

const ART_W = 480;
const ART_H = 270;

/**
 * Renders project art on a fixed 480x270 design canvas and scales it to fit
 * whatever box it lands in, so the art never clips on a phone or looks tiny on a wide card.
 */
const ArtFrame = ({ kind }: { kind: ProjectArtKey }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      el.style.setProperty('--art-scale', String(Math.min(width / ART_W, height / ART_H)));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="art-frame absolute inset-0">
      <div className="art-frame-inner" style={{ width: ART_W, height: ART_H }}>
        <ProjectArt kind={kind} />
      </div>
    </div>
  );
};

/* --- Component ------------------------------------------------------------ */

const Projects = () => {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [inView, setInView] = useState(false);
  const [filter, setFilter] = useState<FilterKey>('all');
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [hovered, setHovered] = useState<Project | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ x: 0, moved: false });

  const N = HIGHLIGHTS.length;
  const story = HIGHLIGHTS[active];

  // Any deliberate input hands control to the visitor and stops the reel.
  const go = (index: number, byUser = true) => {
    setActive(((index % N) + N) % N);
    if (byUser) setAutoplay(false);
  };

  // Only run the reel while the stage is on screen.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: ARCHIVE.length };
    ARCHIVE.forEach((p) => {
      map[p.category] = (map[p.category] || 0) + 1;
    });
    return map;
  }, []);

  const filtered = filter === 'all' ? ARCHIVE : ARCHIVE.filter((p) => p.category === filter);
  const rows = showAll ? filtered : filtered.slice(0, INDEX_PREVIEW);

  /** Signed distance from the active card, wrapped so the reel loops both ways. */
  const offsetOf = (i: number) => {
    let d = i - active;
    if (d > N / 2) d -= N;
    if (d < -N / 2) d += N;
    return d;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, moved: false };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 45) {
      drag.current.moved = true;
      go(active + (dx < 0 ? 1 : -1));
    }
  };
  const onCardClick = (i: number, project: Project) => {
    if (drag.current.moved) return;
    if (i === active) setSelected(project);
    else go(i);
  };

  // The floating index preview follows the cursor without re-rendering React.
  const movePreview = (e: React.PointerEvent) => {
    const el = previewRef.current;
    if (!el || e.pointerType !== 'mouse') return;
    el.style.setProperty('--x', `${e.clientX}px`);
    el.style.setProperty('--y', `${e.clientY}px`);
    el.style.setProperty('--lean', `${Math.max(-1, Math.min(1, e.movementX / 12))}`);
    el.style.setProperty('--flip', e.clientX > innerWidth - 400 ? '1' : '0');
  };

  return (
    <section id="work" className="relative overflow-x-clip px-4 md:px-8 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          num="03"
          label="Selected work"
          align="split"
          title={
            <>
              Things I&apos;ve <span className="serif-accent normal-case">built.</span>
            </>
          }
          desc="Real products and campaigns: the problem they solve and what they did. Swipe through the highlights, then dig into the archive."
        />
      </div>

      {/* 3D highlight reel */}
      <Reveal>
        <div
          ref={stageRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Highlighted projects"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') go(active + 1);
            if (e.key === 'ArrowLeft') go(active - 1);
          }}
          className="reel relative outline-none"
          data-playing={autoplay && inView ? '' : undefined}
        >
          <div className="reel-ghost" key={story.title} aria-hidden="true">
            {story.title}
          </div>

          <div className="reel-stage" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
            {HIGHLIGHTS.map((project, i) => {
              const d = offsetOf(i);
              const isActive = d === 0;
              return (
                <div
                  key={project.title}
                  className="reel-card"
                  style={{ '--d': d, '--ad': Math.abs(d) } as CSSProperties}
                  data-active={isActive ? '' : undefined}
                  data-far={Math.abs(d) > 2 ? '' : undefined}
                  aria-hidden={!isActive}
                  onClick={() => onCardClick(i, project)}
                >
                  <article data-tilt={isActive ? '' : undefined} className="reel-face relative overflow-hidden rounded-3xl">
                    <div className="reel-art relative aspect-[16/9] overflow-hidden">
                      <div className="tilt-depth absolute inset-0">
                        <ArtFrame kind={project.art} />
                      </div>
                      <span className="absolute left-5 top-4 z-10 rounded-full border border-border/70 bg-background/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/80 backdrop-blur">
                        {project.categoryLabel}
                      </span>
                    </div>
                    <div className="reel-copy p-5 md:p-7">
                      <div className="mono-label">{project.type}</div>
                      <h3 className="mt-2 font-wide text-xl font-extrabold uppercase leading-tight tracking-tight sm:text-2xl md:text-3xl">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm font-medium text-foreground/90 md:text-base">
                        <span className="text-accent">→ </span>{project.outcome}
                      </p>
                      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                        <div className="hidden flex-wrap gap-1.5 sm:flex">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span key={tech} className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <button
                          tabIndex={isActive ? 0 : -1}
                          onClick={(e) => { e.stopPropagation(); if (!drag.current.moved) setSelected(project); }}
                          className="pill-solid h-10 px-5 text-sm"
                        >
                          Read the story <ArrowUpRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          {/* Controls: arrows, counter and a segmented progress track */}
          <div className="mx-auto mt-10 flex max-w-3xl items-center gap-4 px-4 md:mt-14">
            <button onClick={() => go(active - 1)} className="reel-arrow" aria-label="Previous project">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="min-w-0 flex-1">
              <div className="mb-3 flex items-baseline justify-between gap-3">
                <span className="shrink-0 whitespace-nowrap font-mono text-xs text-accent">
                  {pad(active + 1)} <span className="text-muted-foreground">/ {pad(N)}</span>
                </span>
                <span className="truncate mono-label">{story.title}</span>
              </div>
              <div className="flex gap-1.5">
                {HIGHLIGHTS.map((project, i) => (
                  <button
                    key={project.title}
                    onClick={() => go(i)}
                    aria-label={`Show ${project.title}`}
                    className="reel-segment"
                    data-done={i < active ? '' : undefined}
                  >
                    {i === active && (
                      <span
                        className="reel-segment-fill"
                        style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                        onAnimationEnd={() => go(active + 1, false)}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={() => go(active + 1)} className="reel-arrow" aria-label="Next project">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-4 text-center mono-label md:hidden">Swipe to explore</p>
        </div>
      </Reveal>

      {/* Index: the rest of the archive as an editorial list */}
      <div className="mx-auto mt-24 max-w-7xl md:mt-32">
        <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <p className="mono-label">The archive / {ARCHIVE.length} more projects</p>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => { setFilter(f.key); setShowAll(false); }}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${
                  filter === f.key
                    ? 'bg-foreground text-background'
                    : 'border border-border bg-card/60 text-foreground/75 hover:border-primary/40 hover:text-primary'
                }`}
              >
                {f.label}
                <sup className="ml-1 font-mono text-[9px] opacity-70">{counts[f.key] || 0}</sup>
              </button>
            ))}
          </div>
        </div>

        <ul
          className="project-index border-t border-border/70"
          onPointerMove={movePreview}
          onPointerLeave={() => setHovered(null)}
        >
          {rows.map((project, i) => (
            <li key={project.title}>
              <button
                onClick={() => setSelected(project)}
                onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(project)}
                className="index-row group grid w-full grid-cols-[2.25rem_1fr_auto] items-center gap-4 border-b border-border/70 py-5 text-left md:grid-cols-[3rem_1.4fr_1fr_1fr_auto] md:py-6"
              >
                <span className="font-mono text-xs text-muted-foreground">{pad(i + 1)}</span>
                <span className="min-w-0">
                  <span className="index-title block font-wide text-base font-extrabold uppercase tracking-tight md:text-xl">
                    {project.title}
                  </span>
                  <span className="mt-1 block text-xs text-muted-foreground md:hidden">{project.categoryLabel}</span>
                </span>
                <span className="hidden text-sm text-muted-foreground md:block">{project.type}</span>
                <span className="hidden font-mono text-[10px] uppercase tracking-wide text-muted-foreground md:block">
                  {project.technologies.slice(0, 2).join(' · ')}
                </span>
                <span className="index-arrow grid h-9 w-9 place-items-center rounded-full border border-border">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </button>
            </li>
          ))}
        </ul>

        {filtered.length > rows.length && (
          <div className="mt-10 flex justify-center">
            <button onClick={() => setShowAll(true)} className="pill-outline h-12 px-7">
              Show all {filtered.length} projects
              <ArrowDown className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Cursor-following preview for the index (desktop pointers only) */}
      <div ref={previewRef} className={`index-preview ${hovered ? 'is-on' : ''}`} aria-hidden="true">
        {hovered && (
          <div className="index-preview-card overflow-hidden rounded-2xl">
            <div className="relative aspect-[16/10] overflow-hidden">
              <ArtFrame kind={hovered.art} />
            </div>
            <div className="border-t border-border/70 px-4 py-3 text-xs text-foreground/85">
              <span className="text-accent">→ </span>{hovered.outcome}
            </div>
          </div>
        )}
      </div>

      {/* Detail dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] w-[92vw] overflow-y-auto rounded-3xl border-border bg-card p-0">
          {selected && (
            <div>
              <div className="relative aspect-[16/8] overflow-hidden border-b border-border bg-secondary/40">
                <ArtFrame kind={selected.art} />
              </div>
              <div className="p-6 md:p-8">
                <DialogHeader className="space-y-3 text-left">
                  <div className="mono-label">
                    {selected.categoryLabel} · {selected.type}
                  </div>
                  <DialogTitle className="font-wide text-2xl md:text-3xl font-extrabold uppercase tracking-tight">
                    {selected.title}
                  </DialogTitle>
                </DialogHeader>
                <p className="mt-4 leading-relaxed text-foreground/90">{selected.description}</p>
                {selected.outcome && (
                  <p className="mt-3 text-sm font-medium">
                    <span className="text-accent">→ </span>
                    {selected.outcome}
                  </p>
                )}
                {selected.details && (
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{selected.details}</p>
                )}
                <div className="mt-6">
                  <div className="mono-label mb-3">Built with</div>
                  <div className="flex flex-wrap gap-2">
                    {selected.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row">
                  {selected.demo && selected.demo !== '#' ? (
                    <a href={selected.demo} target="_blank" rel="noopener noreferrer" className="pill-solid flex-1 h-12">
                      Live demo
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <span className="pill flex-1 h-12 cursor-not-allowed border border-border text-muted-foreground/50">
                      Live demo — private
                    </span>
                  )}
                  {selected.github && selected.github !== '#' ? (
                    <a href={selected.github} target="_blank" rel="noopener noreferrer" className="pill-outline flex-1 h-12">
                      <Github className="h-4 w-4" />
                      Source code
                    </a>
                  ) : (
                    <span className="pill flex-1 h-12 cursor-not-allowed border border-border text-muted-foreground/50">
                      Source — client work
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;
