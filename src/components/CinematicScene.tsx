import { useEffect, useRef } from 'react';

/** An original, locally rendered world shared by every portfolio chapter. */
export default function CinematicScene() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = host.current;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const compact = matchMedia('(max-width: 767px)');
    if (!mount) return;
    let cancelled = false;
    let generation = 0;
    let dispose = () => {};

    // The mobile/reduced-motion composition uses the CSS atmosphere, without WebGL.
    const start = async () => {
      const run = ++generation;
      if (reduced.matches || compact.matches || cancelled) return;
      const THREE = await import('three');
      if (cancelled || run !== generation || compact.matches || reduced.matches) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
      } catch { return; }
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
      renderer.setClearColor(0x080a10, 0);
      mount.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x090b12, 0.043);
      const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 0.1, 70);
      const world = new THREE.Group();
      scene.add(world);

      // Three offset arcs form a sculptural aperture around the portrait.
      const aperture = new THREE.Group();
      aperture.position.set(3.3, 0.2, -2);
      world.add(aperture);
      const amber = new THREE.MeshBasicMaterial({ color: 0xfaaf2e, transparent: true, opacity: 0.42 });
      const violet = new THREE.MeshBasicMaterial({ color: 0x8c78ed, transparent: true, opacity: 0.3 });
      [3.1, 3.6, 4.2].forEach((radius, i) => {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, i === 0 ? 0.015 : 0.009, 5, 160, Math.PI * 1.65), i === 1 ? violet : amber);
        ring.rotation.set(0.25 + i * 0.25, -0.4 + i * 0.3, i * 1.9);
        aperture.add(ring);
      });
      const grid = new THREE.GridHelper(65, 55, 0x625182, 0x262535);
      grid.position.set(0, -3.8, -15);
      const gridMaterial = grid.material as InstanceType<typeof THREE.Material>;
      gridMaterial.transparent = true;
      gridMaterial.opacity = 0.2;
      world.add(grid);

      // Deterministic points: a small quiet field, not a full-screen particle storm.
      const positions = new Float32Array(180 * 3);
      for (let i = 0; i < 180; i++) {
        const seed = Math.sin(i * 127.1 + 311.7) * 43758.5453;
        const a = seed - Math.floor(seed);
        positions[i * 3] = (a - 0.5) * 34;
        positions[i * 3 + 1] = Math.sin(i * 17.3) * 7;
        positions[i * 3 + 2] = -((i * 7.31) % 35);
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const dust = new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0xe9bc72, size: 0.025, transparent: true, opacity: 0.48, sizeAttenuation: true }));
      world.add(dust);
      let target = scrollY / innerHeight;
      let progress = target;
      let pointerX = 0, pointerY = 0;
      let raf = 0, last = 0;
      const resize = () => {
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
      };
      const onScroll = () => { target = scrollY / innerHeight; };
      const onPointer = (event: PointerEvent) => {
        pointerX = event.clientX / innerWidth - 0.5;
        pointerY = event.clientY / innerHeight - 0.5;
      };
      const draw = (time: number) => {
        raf = requestAnimationFrame(draw);
        if (time - last < 32) return;
        last = time;
        progress += (target - progress) * 0.075;
        const entrance = Math.min(progress, 1.7);
        camera.position.set(Math.sin(progress * 0.22) * 1.8 + pointerX * 0.15, 0.5 + Math.sin(progress * 0.16) * 0.8 - pointerY * 0.12, 10 - entrance * 2.4);
        camera.lookAt(1.2, 0, -4);
        aperture.rotation.z = progress * 0.12 + time * 0.000014;
        aperture.rotation.y = Math.sin(progress * 0.2) * 0.35;
        dust.position.z = (progress * 0.4) % 6;
        renderer.render(scene, camera);
      };
      const visibility = () => {
        cancelAnimationFrame(raf);
        if (!document.hidden) raf = requestAnimationFrame(draw);
      };
      resize();
      addEventListener('resize', resize);
      addEventListener('scroll', onScroll, { passive: true });
      addEventListener('pointermove', onPointer, { passive: true });
      document.addEventListener('visibilitychange', visibility);
      raf = requestAnimationFrame(draw);
      mount.dataset.ready = 'true';
      dispose = () => {
        cancelAnimationFrame(raf);
        removeEventListener('resize', resize);
        removeEventListener('scroll', onScroll);
        removeEventListener('pointermove', onPointer);
        document.removeEventListener('visibilitychange', visibility);
        scene.traverse(object => {
          if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.LineSegments) {
            object.geometry.dispose();
            const materials = Array.isArray(object.material) ? object.material : [object.material];
            materials.forEach(material => material.dispose());
          }
        });
        renderer.dispose();
        renderer.domElement.remove();
        delete mount.dataset.ready;
      };
    };
    const restart = () => { dispose(); dispose = () => {}; void start().catch(() => { /* CSS atmosphere remains available if the chunk cannot load. */ }); };
    void start().catch(() => { /* CSS atmosphere remains available if the chunk cannot load. */ });
    reduced.addEventListener('change', restart);
    compact.addEventListener('change', restart);
    return () => {
      cancelled = true;
      dispose();
      reduced.removeEventListener('change', restart);
      compact.removeEventListener('change', restart);
    };
  }, []);

  return <div ref={host} className="cinema-world" aria-hidden="true"><div className="cinema-atmosphere" /></div>;
}
