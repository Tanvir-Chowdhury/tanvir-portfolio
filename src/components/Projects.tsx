import { useMemo, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowDown, ArrowUpRight, Github } from 'lucide-react';
import SectionHead from '@/components/SectionHead';
import Reveal from '@/components/Reveal';
import { PROJECTS, STATS, type Project } from '@/data/content';
import ProjectArt from '@/components/ProjectArt';

/* --- Filters -------------------------------------------------------------- */

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'web', label: 'Web' },
  { key: 'ai', label: 'AI & Automation' },
  { key: 'marketing', label: 'Marketing' },
  { key: 'data', label: 'Data' },
] as const;

type FilterKey = (typeof FILTERS)[number]['key'];

/** The three stories told in the spotlight; everything else lives in the index. */
const SPOTLIGHT = [PROJECTS[0], PROJECTS[4], PROJECTS[6]];
const ARCHIVE = PROJECTS.filter((project) => !SPOTLIGHT.includes(project));

/** Index rows shown before "Show all", so the section stays one confident screen of work. */
const INDEX_PREVIEW = 8;

const pad = (n: number) => String(n).padStart(2, '0');

/* --- Component ------------------------------------------------------------ */

const Projects = () => {
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState<FilterKey>('all');
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [hovered, setHovered] = useState<Project | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: ARCHIVE.length };
    ARCHIVE.forEach((p) => {
      map[p.category] = (map[p.category] || 0) + 1;
    });
    return map;
  }, []);

  const filtered = filter === 'all' ? ARCHIVE : ARCHIVE.filter((p) => p.category === filter);
  const rows = showAll ? filtered : filtered.slice(0, INDEX_PREVIEW);
  const story = SPOTLIGHT[active];

  // The floating preview follows the cursor without re-rendering React.
  const movePreview = (e: React.PointerEvent) => {
    const el = previewRef.current;
    if (!el || e.pointerType !== 'mouse') return;
    el.style.setProperty('--x', `${e.clientX}px`);
    el.style.setProperty('--y', `${e.clientY}px`);
    el.style.setProperty('--lean', `${Math.max(-1, Math.min(1, e.movementX / 12))}`);
    el.style.setProperty('--flip', e.clientX > innerWidth - 400 ? '1' : '0');
  };

  return (
    <section id="work" className="relative px-4 md:px-8 py-24 md:py-32">
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
          desc="Real products and campaigns: the problem they solve and what they did. Open any project for the full story."
        />

        {/* Spotlight: three stories, one stage */}
        <Reveal>
          <div className="spotlight grid gap-5 lg:grid-cols-[0.85fr_1.4fr]">
            <div className="flex flex-col justify-between gap-8">
            <ol className="flex flex-col gap-2" aria-label="Featured projects">
              {SPOTLIGHT.map((project, i) => (
                <li key={project.title}>
                  <button
                    onClick={() => setActive(i)}
                    aria-current={active === i ? 'true' : undefined}
                    className="spotlight-tab group w-full rounded-2xl p-5 text-left"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-accent">{pad(i + 1)}</span>
                      <div className="min-w-0 flex-1">
                        <div className="mono-label">{project.categoryLabel}</div>
                        <div className="mt-1.5 font-wide text-lg font-extrabold uppercase leading-tight tracking-tight">
                          {project.title}
                        </div>
                        <div className="spotlight-outcome text-sm text-muted-foreground">
                          <span className="text-accent">→ </span>{project.outcome}
                        </div>
                      </div>
                    </div>
                    {active === i && (
                      <span
                        className="spotlight-progress"
                        onAnimationEnd={() => setActive((active + 1) % SPOTLIGHT.length)}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </li>
              ))}
            </ol>

            <div className="spotlight-cta hidden rounded-2xl p-6 lg:block">
              <div className="grid grid-cols-3 gap-4">
                {[[`${PROJECTS.length}`, 'Projects'], ['4', 'Disciplines'], [`${STATS[0].value}${STATS[0].suffix}`, 'Clients']].map(([value, label]) => (
                  <div key={label}>
                    <div className="font-wide text-2xl font-extrabold text-gradient-gold">{value}</div>
                    <div className="mono-label mt-1">{label}</div>
                  </div>
                ))}
              </div>
              <a href="#contact" className="pill-outline mt-6 h-11 w-full px-5 text-sm">
                Have something like this in mind? <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            </div>

            <article
              data-tilt
              key={story.title}
              onClick={() => setSelected(story)}
              className="spotlight-stage group relative cursor-pointer overflow-hidden rounded-3xl"
            >
              <div className="project-art relative aspect-[16/9] overflow-hidden border-b border-border/70">
                <div className="tilt-depth absolute inset-0">
                  <ProjectArt kind={story.art} />
                </div>
                <span className="absolute left-5 top-4 z-10 font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                  {pad(active + 1)} / {pad(SPOTLIGHT.length)}
                </span>
              </div>
              <div className="spotlight-copy p-6 md:p-8">
                <div className="mono-label">{story.categoryLabel} · {story.type}</div>
                <h3 className="mt-3 font-wide text-2xl font-extrabold uppercase leading-tight tracking-tight md:text-3xl">
                  {story.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">{story.description}</p>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {story.technologies.slice(0, 5).map((tech) => (
                      <span key={tech} className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="pill-solid h-10 px-5 text-sm">
                    Read the story <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </article>
          </div>
        </Reveal>

        {/* Index: the rest of the archive as an editorial list */}
        <div className="mt-20 md:mt-24">
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
      </div>

      {/* Cursor-following preview for the index (desktop pointers only) */}
      <div ref={previewRef} className={`index-preview ${hovered ? 'is-on' : ''}`} aria-hidden="true">
        {hovered && (
          <div className="index-preview-card overflow-hidden rounded-2xl">
            <div className="relative aspect-[16/10] overflow-hidden">
              <ProjectArt kind={hovered.art} />
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
                <ProjectArt kind={selected.art} />
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
