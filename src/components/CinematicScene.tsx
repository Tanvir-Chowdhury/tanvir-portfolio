import { useEffect, useRef } from 'react';

/** Continuous neon energy in a curved, scroll-responsive three-dimensional space. */
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
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 60);
      const energy = new THREE.Group();
      scene.add(energy);

      // A closed spatial knot: overlapping loops have genuinely different depths.
      const points = Array.from({ length: 128 }, (_, i) => {
        const angle = i / 128 * Math.PI * 2;
        return new THREE.Vector3(
          (4.8 + Math.cos(angle * 3) * 0.85) * Math.cos(angle * 2),
          (3.2 + Math.cos(angle * 3) * 0.6) * Math.sin(angle * 2),
          Math.sin(angle * 3) * 3.5,
        );
      });
      const curve = new THREE.CatmullRomCurve3(points, true);
      const time = { value: 0 };
      const vertexShader = `
        uniform float time;
        varying vec3 vNormal;
        varying float vAlong;
        varying float vDepth;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vAlong = uv.x;
          vec3 flowing = position;
          flowing.x += sin(position.y * 0.6 + time * 0.45) * 0.36;
          flowing.y += cos(position.z * 0.55 + time * 0.35) * 0.32;
          flowing.z += sin(position.x * 0.5 - time * 0.4) * 0.5;
          vec4 viewPosition = modelViewMatrix * vec4(flowing, 1.0);
          vDepth = -viewPosition.z;
          gl_Position = projectionMatrix * viewPosition;
        }
      `;
      const fragmentShader = `
        uniform float time;
        uniform float strength;
        uniform float halo;
        varying vec3 vNormal;
        varying float vAlong;
        varying float vDepth;
        void main() {
          float face = max(normalize(vNormal).z, 0.0);
          // A seamless traveling crest leaves a dim, continuous trail behind it.
          float wave = 0.5 + 0.5 * cos(vAlong * 18.84956 - time * 1.15);
          float pulse = pow(wave, 14.0);
          float colorWave = 0.5 + 0.5 * sin(vAlong * 6.28318 + time * 0.18);
          vec3 color = mix(vec3(0.48, 0.32, 1.0), vec3(1.0, 0.65, 0.26), colorWave);
          float depthFade = 1.0 - smoothstep(9.0, 25.0, vDepth) * 0.65;
          float roundness = mix(0.28 + pow(face, 3.0) * 0.72, pow(face, 2.5), halo);
          float brightness = 0.3 + pulse * 0.7;
          color += vec3(0.28, 0.2, 0.16) * pulse * (1.0 - halo);
          gl_FragColor = vec4(color, strength * roundness * brightness * depthFade);
        }
      `;
      const resources = [
        { radius: 0.065, strength: 0.95, halo: 0, segments: 360, radial: 12 },
        { radius: 0.23, strength: 0.18, halo: 1, segments: 280, radial: 10 },
        { radius: 0.55, strength: 0.055, halo: 1, segments: 200, radial: 8 },
      ].map(({ radius, strength, halo, segments, radial }) => {
        const geometry = new THREE.TubeGeometry(curve, segments, radius, radial, true);
        const material = new THREE.ShaderMaterial({
          transparent: true, depthWrite: false,
          blending: THREE.AdditiveBlending,
          uniforms: { time, strength: { value: strength }, halo: { value: halo } },
          vertexShader, fragmentShader,
        });
        const mesh = new THREE.Mesh(geometry, material);
        energy.add(mesh);
        return { geometry, material };
      });

      let target = 0, travel = 0, progress = 0, raf = 0;
      let pointerX = 0, pointerY = 0, parallaxX = 0, parallaxY = 0;
      let elapsed = 0, previousFrame = 0, lastDraw = 0;
      let halfWidth = 1;
      const readScroll = () => {
        const total = document.documentElement.scrollHeight - innerHeight;
        progress = total > 0 ? Math.max(0, Math.min(1, scrollY / total)) : 0;
        // Respond within each chapter, rather than waiting for an entire page scroll.
        return reduced.matches ? 0 : scrollY / Math.max(innerHeight, 1) * 0.28;
      };
      const draw = (timestamp: number) => {
        raf = 0;
        if (document.hidden) return;
        if (!reduced.matches && timestamp - lastDraw < 1000 / 30) {
          raf = requestAnimationFrame(draw);
          return;
        }
        const delta = previousFrame ? Math.min((timestamp - previousFrame) / 1000, 0.1) : 1 / 30;
        previousFrame = lastDraw = timestamp;
        if (!reduced.matches) elapsed += delta;
        const easing = 1 - Math.exp(-delta * 7);
        travel += (target - travel) * easing;
        parallaxX += ((reduced.matches ? 0 : pointerX) - parallaxX) * easing;
        parallaxY += ((reduced.matches ? 0 : pointerY) - parallaxY) * easing;
        time.value = reduced.matches ? 0 : elapsed;
        const phase = travel + elapsed * 0.035;
        energy.rotation.set(0.22 + Math.sin(phase * 0.6) * 0.24 + parallaxY * 0.08,
          phase * 0.48 + parallaxX * 0.13, Math.sin(phase * 0.45) * 0.22 - 0.18);
        energy.position.set(Math.cos(phase * 0.8) * halfWidth * 0.24,
          Math.sin(phase * 0.7) * 0.7, -1.5 + Math.sin(phase * 0.9) * 2);
        camera.position.set(parallaxX * 0.3, parallaxY * 0.2, 14 + Math.sin(travel * 0.5) * 0.9);
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
        mount.dataset.progress = progress.toFixed(4);
        mount.dataset.time = time.value.toFixed(2);
        if (!reduced.matches || Math.abs(target - travel) > 0.0001)
          raf = requestAnimationFrame(draw);
      };
      const schedule = () => {
        target = readScroll();
        if (!raf && !document.hidden) raf = requestAnimationFrame(draw);
      };
      const pointer = (event: PointerEvent) => {
        if (reduced.matches || event.pointerType !== 'mouse') return;
        pointerX = event.clientX / innerWidth * 2 - 1;
        pointerY = 1 - event.clientY / innerHeight * 2;
        schedule();
      };
      const leave = () => { pointerX = pointerY = 0; schedule(); };
      const resize = () => {
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
        halfWidth = Math.tan(21 * Math.PI / 180) * 14 * camera.aspect;
        // Taller layouts get narrower loops, while retaining the full depth range.
        energy.scale.set(Math.min(1, Math.max(0.42, camera.aspect / 1.5)), innerWidth < 768 ? 1.1 : 1, 1);
        schedule();
      };
      const visibility = () => {
        cancelAnimationFrame(raf);
        raf = 0;
        previousFrame = lastDraw = 0;
        schedule();
      };
      travel = target = readScroll();
      resize();
      const observer = new ResizeObserver(schedule);
      observer.observe(document.body);
      addEventListener('resize', resize);
      addEventListener('scroll', schedule, { passive: true });
      addEventListener('pointermove', pointer, { passive: true });
      document.documentElement.addEventListener('pointerleave', leave);
      document.addEventListener('visibilitychange', visibility);
      reduced.addEventListener('change', visibility);
      mount.dataset.ready = 'true';
      dispose = () => {
        cancelAnimationFrame(raf);
        observer.disconnect();
        removeEventListener('resize', resize);
        removeEventListener('scroll', schedule);
        removeEventListener('pointermove', pointer);
        document.documentElement.removeEventListener('pointerleave', leave);
        document.removeEventListener('visibilitychange', visibility);
        reduced.removeEventListener('change', visibility);
        resources.forEach(({ geometry, material }) => { geometry.dispose(); material.dispose(); });
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
