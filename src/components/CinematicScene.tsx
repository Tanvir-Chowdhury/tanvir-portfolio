import { useEffect, useRef } from 'react';

/** One continuous neon thread, followed from the first screen to the footer. */
export default function CinematicScene() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = host.current;
    if (!mount) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let cancelled = false;
    let dispose = () => {};
    const start = async () => {
      const THREE = await import('three');
      if (cancelled) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
      } catch { return; }
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
      const material = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        vertexShader: `
          varying vec3 vNormal;
          varying float vAlong;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vAlong = uv.x;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          varying float vAlong;
          void main() {
            float face = max(normalize(vNormal).z, 0.0);
            vec3 violet = vec3(0.57, 0.43, 0.95);
            vec3 amber = vec3(1.0, 0.73, 0.38);
            vec3 neon = mix(violet, amber, 0.5 + 0.5 * sin(vAlong * 12.0));
            neon = mix(neon * 0.6, neon + vec3(0.16), pow(face, 3.0));
            gl_FragColor = vec4(neon, 0.5 + face * 0.5);
          }
        `,
      });
      let thread: InstanceType<typeof THREE.Mesh> | undefined;
      let target = 0, progress = 0, raf = 0;
      const readProgress = () => {
        const distance = document.documentElement.scrollHeight - innerHeight;
        return reduced.matches || distance <= 0 ? 0 : Math.max(0, Math.min(1, scrollY / distance));
      };
      const draw = () => {
        raf = 0;
        progress += (target - progress) * 0.16;
        if (Math.abs(target - progress) < 0.00005) progress = target;
        camera.position.set(0, -progress * 120, 14);
        camera.lookAt(0, -progress * 120, 0);
        renderer.render(scene, camera);
        mount.dataset.progress = progress.toFixed(4);
        if (progress !== target && !document.hidden) raf = requestAnimationFrame(draw);
      };
      const schedule = () => {
        target = readProgress();
        if (!raf && !document.hidden) raf = requestAnimationFrame(draw);
      };
      const resize = () => {
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
        const halfWidth = Math.tan(21 * Math.PI / 180) * 14 * camera.aspect;
        const points = Array.from({ length: 81 }, (_, i) => {
          const t = i / 80;
          return new THREE.Vector3(
            Math.sin(t * Math.PI * 7 + 0.65) * halfWidth * 0.72,
            6 - t * 132,
            Math.sin(t * Math.PI * 5) * 1.25,
          );
        });
        const geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 1000, innerWidth < 768 ? 0.014 : 0.018, 8, false);
        if (thread) {
          thread.geometry.dispose();
          thread.geometry = geometry;
        } else {
          thread = new THREE.Mesh(geometry, material);
          scene.add(thread);
        }
        schedule();
      };
      const visibility = () => {
        cancelAnimationFrame(raf);
        raf = 0;
        schedule();
      };
      progress = target = readProgress();
      resize();
      const observer = new ResizeObserver(schedule);
      observer.observe(document.body);
      addEventListener('resize', resize);
      addEventListener('scroll', schedule, { passive: true });
      document.addEventListener('visibilitychange', visibility);
      reduced.addEventListener('change', schedule);
      mount.dataset.ready = 'true';
      dispose = () => {
        cancelAnimationFrame(raf);
        observer.disconnect();
        removeEventListener('resize', resize);
        removeEventListener('scroll', schedule);
        document.removeEventListener('visibilitychange', visibility);
        reduced.removeEventListener('change', schedule);
        thread?.geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
        delete mount.dataset.ready;
      };
    };
    void start().catch(() => { /* The static atmosphere remains if WebGL is unavailable. */ });
    return () => { cancelled = true; dispose(); };
  }, []);

  return <>
    <div className="cinema-world" aria-hidden="true"><div className="cinema-atmosphere" /></div>
    <div ref={host} className="neon-thread" aria-hidden="true" />
  </>;
}
