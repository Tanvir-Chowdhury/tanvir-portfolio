import { useEffect } from 'react';

/**
 * One window-level pointer listener drives every 3D surface on the page.
 * Cards marked `data-tilt` get --tx/--ty (-1..1, pointer position on the card)
 * and --mx/--my (glare position); the hero gets eased --px/--py for layered parallax.
 * CSS turns those numbers into rotation and depth, so React never re-renders.
 */
export function useTilt3D() {
  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let card: HTMLElement | null = null;
    let last: PointerEvent | null = null;
    let raf = 0;
    let px = 0, py = 0, targetX = 0, targetY = 0;

    const release = (el: HTMLElement) => {
      el.style.setProperty('--tx', '0');
      el.style.setProperty('--ty', '0');
      delete el.dataset.tilting;
    };

    const frame = () => {
      raf = 0;
      if (reduced.matches) return;
      if (last) {
        const target = (last.target as Element | null)?.closest?.<HTMLElement>('[data-tilt]') ?? null;
        if (card && card !== target) release(card);
        card = target;
        if (card) {
          const r = card.getBoundingClientRect();
          const x = (last.clientX - r.left) / r.width;
          const y = (last.clientY - r.top) / r.height;
          card.style.setProperty('--tx', (x * 2 - 1).toFixed(3));
          card.style.setProperty('--ty', (y * 2 - 1).toFixed(3));
          card.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
          card.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
          card.dataset.tilting = '';
        }
        targetX = last.clientX / innerWidth * 2 - 1;
        targetY = last.clientY / innerHeight * 2 - 1;
        last = null;
      }
      // Ease the hero parallax so layers drift instead of snapping to the cursor.
      px += (targetX - px) * 0.12;
      py += (targetY - py) * 0.12;
      const hero = document.getElementById('top');
      if (hero && hero.getBoundingClientRect().bottom > 0) {
        hero.style.setProperty('--px', px.toFixed(3));
        hero.style.setProperty('--py', py.toFixed(3));
      }
      if (Math.abs(targetX - px) > 0.002 || Math.abs(targetY - py) > 0.002) raf = requestAnimationFrame(frame);
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      last = e;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const leave = () => {
      if (card) release(card);
      card = null;
      targetX = targetY = 0;
      if (!raf) raf = requestAnimationFrame(frame);
    };

    addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, []);
}
