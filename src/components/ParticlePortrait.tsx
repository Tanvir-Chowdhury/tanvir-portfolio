import { useEffect, useRef } from 'react';
import profilePic from '@/assets/profile.png';

interface ParticlePortraitProps {
  start: boolean;
  className?: string;
}

interface Dot {
  x: number;
  y: number;
  r: number;   // radius multiplier from the pixel's luminance
  hue: number; // 0-3 luminance ink levels · 4 amber edge · 5 purple edge
  phase: number;
  speed: number;
}

const COLORS = [
  'rgba(210, 214, 224, 0.34)',  // darkest tone of the photo
  'rgba(222, 226, 235, 0.48)',
  'rgba(233, 237, 245, 0.66)',
  'rgba(248, 249, 252, 0.92)',  // brightest tone of the photo
  'rgba(240, 166, 13, 0.95)',   // amber edge
  'rgba(167, 139, 250, 0.95)',  // purple edge
];

/**
 * The portrait as a field of ink dots (omikhan-style).
 * Desktop: hovering assembles the real photo. Touch: it auto-reveals in a loop.
 */
const ParticlePortrait = ({ start, className = '' }: ParticlePortraitProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const progress = useRef({ v: 0, target: 0 });

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let dots: Dot[] = [];
    let raf = 0;
    let autoTimer = 0;
    let disposed = false;
    let visible = true;

    const img = new Image();
    img.src = profilePic;
    img.onload = () => {
      if (disposed) return;

      // Sample the cutout into ink dots
      const N = img.naturalWidth;
      const off = document.createElement('canvas');
      off.width = N;
      off.height = N;
      const octx = off.getContext('2d')!;
      octx.drawImage(img, 0, 0);
      const data = octx.getImageData(0, 0, N, N).data;
      const alphaAt = (x: number, y: number) =>
        x < 0 || y < 0 || x >= N || y >= N ? 0 : data[(y * N + x) * 4 + 3];
      const step = 9;
      const cx = N / 2;
      for (let y = step; y < N; y += step) {
        for (let x = step; x < N; x += step) {
          const i = (y * N + x) * 4;
          if (data[i + 3] < 60) continue;
          // Luminance drives the dot: bright pixels (face, shirt) draw bigger,
          // brighter dots so the photo reads through the field — dark pixels shrink away.
          const lum = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
          const level = Math.min(3, Math.floor(lum * 4));
          const edge =
            alphaAt(x - step, y) < 60 ||
            alphaAt(x + step, y) < 60 ||
            alphaAt(x, y - step) < 60 ||
            alphaAt(x, y + step) < 60;
          dots.push({
            x,
            y,
            r: 0.5 + level * 0.85 + Math.random() * 0.5,
            hue: edge ? (x < cx ? 4 : 5) : level,
            phase: Math.random() * Math.PI * 2,
            speed: 0.6 + Math.random() * 1.2,
          });
        }
      }
      // Group by color for batched drawing
      dots.sort((a, b) => a.hue - b.hue);
      const bounds = [0, 0, 0, 0, 0, 0, dots.length];
      for (let i = 0; i < dots.length; i++) {
        bounds[dots[i].hue + 1] = i + 1;
      }
      for (let h = 1; h <= 5; h++) bounds[h] = Math.max(bounds[h], bounds[h - 1]);

      const resize = () => {
        const rect = wrap.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.max(1, Math.round(rect.width * dpr));
        canvas.height = Math.max(1, Math.round(rect.height * dpr));
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(wrap);
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      io.observe(wrap);

      // Desktop: hover reveals. Touch: auto reveal loop.
      // (Window-level tracking — the hero's text layer sits above the figure,
      // so element-level pointerenter would never fire.)
      const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      let onMove: ((e: PointerEvent) => void) | null = null;
      if (fine) {
        onMove = (e: PointerEvent) => {
          const r = wrap.getBoundingClientRect();
          const inside =
            e.clientX >= r.left && e.clientX <= r.right &&
            e.clientY >= r.top && e.clientY <= r.bottom;
          progress.current.target = inside ? 1 : 0;
        };
        window.addEventListener('pointermove', onMove);
      } else {
        window.setTimeout(() => {
          progress.current.target = 1;
        }, 1600);
        autoTimer = window.setInterval(() => {
          progress.current.target = progress.current.target > 0.5 ? 0 : 1;
        }, 4800);
      }
      if (reduce) progress.current.target = 1;

      const t0 = performance.now();
      const render = (now: number) => {
        raf = requestAnimationFrame(render);
        if (!visible || dots.length === 0) return;
        const p = progress.current;
        p.v += (p.target - p.v) * 0.055;
        if (photoRef.current) {
          photoRef.current.style.opacity = String(p.v);
          photoRef.current.style.transform = `scale(${1.035 - p.v * 0.035})`;
        }
        if (p.v > 0.995) {
          // Fully revealed — the ink dots are gone
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const scale = canvas.height / N;
        const t = (now - t0) / 1000;
        const jitterScale = 2.4 * scale * (1 - p.v);
        const scatterScale = 0.45 * p.v * scale;

        let start = 0;
        for (let hue = 0; hue <= 5; hue++) {
          const stop = bounds[hue + 1];
          ctx.fillStyle = COLORS[hue];
          ctx.beginPath();
          for (let i = start; i < stop; i++) {
            const dot = dots[i];
            const jx = Math.sin(t * dot.speed + dot.phase) * jitterScale;
            const jy = Math.cos(t * dot.speed * 0.9 + dot.phase) * jitterScale;
            const r = dot.r * scale * (1 - p.v * 0.92);
            if (r < 0.08) continue;
            const px = (dot.x + jx + (dot.x - cx) * scatterScale) * scale;
            const py = (dot.y + jy) * scale;
            ctx.moveTo(px + r, py);
            ctx.arc(px, py, r, 0, Math.PI * 2);
          }
          ctx.fill();
          start = stop;
        }
      };
      raf = requestAnimationFrame(render);
    };

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      if (autoTimer) window.clearInterval(autoTimer);
      if (onMove) window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`relative aspect-square max-w-full transition-opacity duration-1000 ${start ? 'opacity-100' : 'opacity-0'} ${className}`}
    >
      {/* The real photo — revealed over the dots */}
      <img
        ref={photoRef}
        src={profilePic}
        alt=""
        className="absolute inset-0 z-0 h-full w-full object-contain object-bottom opacity-0"
        draggable={false}
      />
      {/* The ink-dot portrait */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 h-full w-full" />
    </div>
  );
};

export default ParticlePortrait;
