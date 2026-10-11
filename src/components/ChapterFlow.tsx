import { useEffect, useRef, useState } from 'react';

const chapters = [
  ['top', 'Introduction'], ['about', 'The person'], ['services', 'The craft'],
  ['work', 'Selected work'], ['process', 'The process'], ['toolkit', 'The toolkit'],
  ['experience', 'The journey'], ['credentials', 'Credentials'], ['contact', 'What comes next'],
] as const;

export default function ChapterFlow() {
  const [active, setActive] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;
    const update = () => {
      raf = 0;
      const height = innerHeight;
      const top = document.getElementById('top');
      if (top) {
        const rect = top.getBoundingClientRect();
        const p = reduced.matches ? 0 : Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - height)));
        top.style.setProperty('--departure', String(p));
      }
      let next = 0;
      chapters.forEach(([id], i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < height * 0.5) next = i;
      });
      setActive(previous => previous === next ? previous : next);
      const max = document.documentElement.scrollHeight - height;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      const cards = [...document.querySelectorAll<HTMLElement>('.featured-project')];
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        const distance = next ? next.getBoundingClientRect().top - (100 + i * 20) : height;
        const covered = reduced.matches ? 0 : Math.max(0, Math.min(1, 1 - distance / height));
        card.style.setProperty('--covered', String(covered));
      });

    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(update); };
    const observer = new ResizeObserver(queue);
    observer.observe(document.body);
    addEventListener('scroll', queue, { passive: true });
    addEventListener('resize', queue);
    reduced.addEventListener('change', queue);
    update();
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      removeEventListener('scroll', queue);
      removeEventListener('resize', queue);
      reduced.removeEventListener('change', queue);
    };
  }, []);
  return <>
    <div ref={progressRef} className="reading-progress" aria-hidden="true" />
    <nav className="chapter-rail" aria-label="Portfolio chapters">
      {chapters.map(([id, label], i) => <a key={id} href={`#${id}`} aria-label={label} aria-current={active === i ? 'location' : undefined}>
        <span className="chapter-rail-label">{label}</span><span className="chapter-rail-tick" />
      </a>)}
    </nav>
    <div className="chapter-caption" aria-hidden="true"><span>{String(active).padStart(2, '0')}</span><span className="chapter-caption-line" />{chapters[active][1]}</div>
  </>;
}
