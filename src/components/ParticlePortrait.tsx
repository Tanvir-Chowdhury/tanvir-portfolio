import { useEffect, useRef, useState } from 'react';
import profilePic from '@/assets/profile.webp';

interface ParticlePortraitProps {
  className?: string;
}

interface Dot {
  x: number;
  y: number;
  sizeMul: number; // dot radius as a fraction of the sampling pitch, from luminance
  hue: number;     // 0-3 luminance ink levels · 4 amber edge · 5 purple edge
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

const isFinePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/**
 * The hero figure.
 * Desktop (fine pointer): an ink-dot field that shimmers and assembles
 * into the real photo on hover.
 * Touch devices: the original photo, completely static — no canvas.
 */
const ParticlePortrait = ({ className = '' }: ParticlePortraitProps) => {
  const [fine] = useState(isFinePointer);
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const progress = useRef({ v: 0, target: 0 });

  const figureClass =
    'relative aspect-square max-w-full mx-auto lg:mx-0 pointer-events-none';

  useEffect(() => {
    if (!fine) return; // touch devices render the plain photo — nothing to animate

    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const N = 1080; // natural size of the source cutout
    const step = 9;
    const cx = N / 2;
    let dots: Dot[] = [];
    let bounds = [0, 0, 0, 0, 0, 0, 0];
    let raf = 0;
    let disposed = false;
    let visible = true;
    let onMove: ((e: PointerEvent) => void) | null = null;

    const drawFrame = (pV: number, t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (pV > 0.995 || dots.length === 0) return;
      const scale = canvas.height / N;
      const pitch = step * scale;
      const jitterScale = 2.4 * scale * (1 - pV);
      const scatterScale = 0.45 * pV * scale;

      let start = 0;
      for (let hue = 0; hue <= 5; hue++) {
        const stop = bounds[hue + 1];
        ctx.fillStyle = COLORS[hue];
        ctx.beginPath();
        for (let i = start; i < stop; i++) {
          const dot = dots[i];
          const jx = Math.sin(t * dot.speed + dot.phase) * jitterScale;
          const jy = Math.cos(t * dot.speed * 0.9 + dot.phase) * jitterScale;
          const r = pitch * dot.sizeMul * (1 - pV * 0.92);
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

    const setPhoto = (o: number) => {
      if (photoRef.current) {
        photoRef.current.style.opacity = String(o);
        photoRef.current.style.transform = `scale(${1.035 - o * 0.035})`;
      }
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      drawFrame(progress.v, performance.now() / 1000);
    };

    // Sample the cutout into ink dots once the photo decodes
    const img = new Image();
    img.src = profilePic;
    img.onload = () => {
      if (disposed) return;
      const off = document.createElement('canvas');
      off.width = N;
      off.height = N;
      const octx = off.getContext('2d')!;
      octx.drawImage(img, 0, 0);
      const data = octx.getImageData(0, 0, N, N).data;
      const alphaAt = (x: number, y: number) =>
        x < 0 || y < 0 || x >= N || y >= N ? 0 : data[(y * N + x) * 4 + 3];
      const all: Dot[] = [];
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
          all.push({
            x,
            y,
            sizeMul: 0.1 + level * 0.075 + Math.random() * 0.06,
            hue: edge ? (x < cx ? 4 : 5) : level,
            phase: Math.random() * Math.PI * 2,
            speed: 0.6 + Math.random() * 1.2,
          });
        }
      }
      // Group by color for batched drawing
      all.sort((a, b) => a.hue - b.hue);
      bounds = [0, 0, 0, 0, 0, 0, all.length];
      for (let i = 0; i < all.length; i++) {
        bounds[all[i].hue + 1] = i + 1;
      }
      for (let h = 1; h <= 5; h++) bounds[h] = Math.max(bounds[h], bounds[h - 1]);
      dots = all;

      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(wrap);
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      io.observe(wrap);

      if (reduce) {
        // Reduced motion: show the assembled photo directly
        progress.current.v = 1;
        progress.current.target = 1;
        setPhoto(1);
        drawFrame(1, 0);
        return;
      }

      // Desktop: pointer over the figure assembles the photo.
      // Window-level tracking — the hero's text layer sits above the figure,
      // so element-level pointerenter would never fire.
      onMove = (e: PointerEvent) => {
        const r = wrap.getBoundingClientRect();
        const inside =
          e.clientX >= r.left && e.clientX <= r.right &&
          e.clientY >= r.top && e.clientY <= r.bottom;
        progress.current.target = inside ? 1 : 0;
      };
      window.addEventListener('pointermove', onMove);

      const t0 = performance.now();
      const render = (now: number) => {
        raf = requestAnimationFrame(render);
        if (!visible) return;
        const p = progress.current;
        p.v += (p.target - p.v) * 0.055;
        setPhoto(p.v);
        drawFrame(p.v, now / 1000);
      };
      raf = requestAnimationFrame(render);
    };

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      if (onMove) window.removeEventListener('pointermove', onMove);
      ro.disconnect();
      io.disconnect();
    };
  }, [fine]);

    // ---- Touch devices: the original photo, completely static ----
  if (!fine) {
    return (
      <div className={`${figureClass} ${className}`}>
        <img
          src={profilePic}
          alt=""
          fetchpriority="high"
          decoding="async"
          className="h-full w-auto object-contain object-bottom"
          draggable={false}
        />
      </div>
    );
  }

  // ---- Desktop: the ink-dot field with hover reveal ----
  return (
    <div ref={wrapRef} className={`pointer-events-none ${figureClass} ${className}`}>
      {/* The real photo — revealed over the dots */}
      <img
        ref={photoRef}
        src={profilePic}
        alt=""
        fetchpriority="high"
        className="absolute inset-0 z-0 h-full w-full object-contain object-bottom opacity-0"
        draggable={false}
      />
      {/* The ink-dot field */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 h-full w-full" />
    </div>
  );
};

export default ParticlePortrait;
