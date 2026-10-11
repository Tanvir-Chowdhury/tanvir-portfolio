import { useEffect, useRef } from 'react';

/** A sculpted neon arc sweeps across the background and approaches on scroll. */
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
      const sculpture = new THREE.Group();
      scene.add(sculpture);
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-6, -7, -4),
        new THREE.Vector3(-3.8, -3.5, -1),
        new THREE.Vector3(0, -1, 2.5),
        new THREE.Vector3(2.8, 2, 1),
        new THREE.Vector3(1.5, 5.5, -2.5),
        new THREE.Vector3(-2.8, 7, -6),
      ]);
      const geometry = new THREE.TubeGeometry(curve, 240, 0.075, 16, false);
      sculpture.add(new THREE.Mesh(geometry, material));
      // Concentric volumes bloom around the same tube, giving its light depth.
      const glowMaterial = new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        uniforms: { strength: { value: 0.12 } },
        vertexShader: material.vertexShader,
        fragmentShader: `
          varying vec3 vNormal;
          varying float vAlong;
          uniform float strength;
          void main() {
            float face = max(normalize(vNormal).z, 0.0);
            vec3 neon = mix(vec3(0.46, 0.28, 1.0), vec3(1.0, 0.62, 0.2),
              0.5 + 0.5 * sin(vAlong * 6.0));
            gl_FragColor = vec4(neon, pow(face, 2.5) * strength);
          }
        `,
      });
      const glowGeometry = new THREE.TubeGeometry(curve, 240, 0.3, 12, false);
      const auraGeometry = new THREE.TubeGeometry(curve, 160, 0.7, 12, false);
      const auraMaterial = glowMaterial.clone();
      auraMaterial.uniforms.strength.value = 0.035;
      sculpture.add(new THREE.Mesh(glowGeometry, glowMaterial), new THREE.Mesh(auraGeometry, auraMaterial));
      let target = 0, progress = 0, raf = 0;
      let pointerX = 0, pointerY = 0, parallaxX = 0, parallaxY = 0;
      let halfWidth = 1;
      const readProgress = () => {
        const distance = document.documentElement.scrollHeight - innerHeight;
        return reduced.matches || distance <= 0 ? 0 : Math.max(0, Math.min(1, scrollY / distance));
      };
      const draw = () => {
        raf = 0;
        progress += (target - progress) * 0.12;
        parallaxX += (pointerX - parallaxX) * 0.08;
        parallaxY += (pointerY - parallaxY) * 0.08;
        if (Math.abs(target - progress) < 0.00005) progress = target;
        if (Math.abs(pointerX - parallaxX) < 0.001) parallaxX = pointerX;
        if (Math.abs(pointerY - parallaxY) < 0.001) parallaxY = pointerY;
        // Real translation in Z makes the near surface grow through perspective.
        sculpture.position.set(halfWidth * (0.58 - progress * 1.16) + parallaxX * 0.35,
          -0.8 + progress * 1.6 + parallaxY * 0.2, -4 + progress * 8);
        sculpture.rotation.set(0.12 + progress * 0.25 + parallaxY * 0.06,
          -0.65 + progress * 1.3 + parallaxX * 0.1, -0.25 + progress * 0.55);
        renderer.render(scene, camera);
        mount.dataset.progress = progress.toFixed(4);
        if ((progress !== target || parallaxX !== pointerX || parallaxY !== pointerY) && !document.hidden)
          raf = requestAnimationFrame(draw);
      };
      const schedule = () => {
        target = readProgress();
        if (!raf && !document.hidden) raf = requestAnimationFrame(draw);
      };
      const pointer = (event: PointerEvent) => {
        if (reduced.matches || event.pointerType !== 'mouse') return;
        pointerX = event.clientX / innerWidth * 2 - 1;
        pointerY = 1 - event.clientY / innerHeight * 2;
        schedule();
      };
      const resize = () => {
        camera.aspect = innerWidth / innerHeight;
        camera.position.set(0, 0, 14);
        camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
        halfWidth = Math.tan(21 * Math.PI / 180) * 14 * camera.aspect;
        // Narrow screens keep the same depth, with a smaller sculpture footprint.
        sculpture.scale.set(innerWidth < 768 ? 0.58 : 1, 1, 1);
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
      addEventListener('pointermove', pointer, { passive: true });
      document.addEventListener('visibilitychange', visibility);
      reduced.addEventListener('change', schedule);
      mount.dataset.ready = 'true';
      dispose = () => {
        cancelAnimationFrame(raf);
        observer.disconnect();
        removeEventListener('resize', resize);
        removeEventListener('scroll', schedule);
        removeEventListener('pointermove', pointer);
        document.removeEventListener('visibilitychange', visibility);
        reduced.removeEventListener('change', schedule);
        geometry.dispose();
        glowGeometry.dispose();
        auraGeometry.dispose();
        glowMaterial.dispose();
        auraMaterial.dispose();
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
