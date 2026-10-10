import { useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowUpRight, Github } from 'lucide-react';
import SectionHead from '@/components/SectionHead';
import Reveal from '@/components/Reveal';
import { PROJECTS, type Project } from '@/data/content';
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

/* --- Component ------------------------------------------------------------ */

const Projects = () => {
  const projects = PROJECTS;
  const [filter, setFilter] = useState<FilterKey>('all');
  const [selected, setSelected] = useState<Project | null>(null);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: projects.length };
    projects.forEach((p) => {
      map[p.category] = (map[p.category] || 0) + 1;
    });
    return map;
  }, [projects]);

  const visible = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

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
          desc="Real products and campaigns — the problem they solve and what they did. Open a card for the full story."
        />

        {/* Filter pills */}
        <div className="mb-12 flex flex-wrap gap-2.5">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                filter === f.key
                  ? 'bg-foreground text-background'
                  : 'border border-border bg-card/60 text-foreground/75 hover:border-primary/40 hover:text-primary'
              }`}
            >
              {f.label}
              <sup className="ml-1.5 font-mono text-[10px] opacity-70">{counts[f.key] || 0}</sup>
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {visible.map((project, i) => (
            <Reveal key={project.title} delay={Math.min(i, 4) * 60} className={i % 2 === 1 ? 'md:translate-y-10' : ''}>
              <article
                onClick={() => setSelected(project)}
                className="group cursor-pointer overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:border-foreground/25 hover:shadow-xl hover:shadow-black/5"
              >
                <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-secondary/40">
                  <span className="absolute left-5 top-4 z-10 font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <ProjectArt kind={project.art} />
                </div>
                <div className="p-6 md:p-7">
                  <div className="mono-label">
                    {project.categoryLabel} · {project.type}
                  </div>
                  <h3 className="mt-3 font-wide text-2xl md:text-[1.7rem] font-extrabold uppercase leading-tight tracking-tight transition-colors group-hover:text-primary">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                  {project.outcome && (
                    <p className="mt-3 text-sm font-medium text-foreground">
                      <span className="text-accent">→ </span>
                      {project.outcome}
                    </p>
                  )}
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors group-hover:text-accent">
                      Open <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
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
