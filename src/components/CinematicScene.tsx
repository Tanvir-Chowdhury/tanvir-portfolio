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
      // The final straight segment points along +Z, directly out of the tube.
      // The whole sculpture is aimed at the camera so the visitor sees its end cap.
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-7, 5, -15),
        new THREE.Vector3(-5, 1, -11),
        new THREE.Vector3(-2.8, -2, -8),
        new THREE.Vector3(-0.6, -1, -5),
        new THREE.Vector3(0, 0, -3),
        new THREE.Vector3(0, 0, -1.5),
        new THREE.Vector3(0, 0, 0),
      ]);
      const geometry = new THREE.TubeGeometry(curve, 240, 0.14, 20, false);
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
      const capGeometry = new THREE.CircleGeometry(0.14, 40);
      const capMaterial = new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, depthTest: false,
        blending: THREE.AdditiveBlending,
        vertexShader: `varying vec2 vUv; void main() { vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: `varying vec2 vUv; void main() {
          float radius = length(vUv - 0.5) * 2.0;
          vec3 color = mix(vec3(1.0, 0.88, 0.64), vec3(0.64, 0.42, 1.0), radius);
          gl_FragColor = vec4(color, 1.0 - smoothstep(0.2, 1.0, radius));
        }`,
      });
      const cap = new THREE.Mesh(capGeometry, capMaterial);
      cap.position.z = 0.005;
      cap.renderOrder = 3;
      sculpture.add(cap);
      const rimGeometry = new THREE.RingGeometry(0.14, 0.19, 40);
      const rimMaterial = new THREE.MeshBasicMaterial({ color: 0xb596ff, transparent: true, opacity: 0.9 });
      const rim = new THREE.Mesh(rimGeometry, rimMaterial);
      rim.renderOrder = 4;
      sculpture.add(rim);
      const glowCanvas = document.createElement('canvas');
      glowCanvas.width = glowCanvas.height = 128;
      const context = glowCanvas.getContext('2d')!;
      const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, '#fff0d5c0');
      gradient.addColorStop(0.2, '#d8baff90');
      gradient.addColorStop(0.5, '#a878ff30');
      gradient.addColorStop(1, '#a878ff00');
      context.fillStyle = gradient;
      context.fillRect(0, 0, 128, 128);
      const tipTexture = new THREE.CanvasTexture(glowCanvas);
      const tipMaterial = new THREE.SpriteMaterial({ map: tipTexture, transparent: true,
        depthWrite: false, blending: THREE.AdditiveBlending });
      const tipGlow = new THREE.Sprite(tipMaterial);
      tipGlow.position.z = 0.03;
      tipGlow.renderOrder = 5;
      tipGlow.scale.setScalar(1.6);
      sculpture.add(tipGlow);
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
        // The tip travels from twenty units away to two units from the camera.
        // Keep its screen position inside the viewport as perspective magnifies it.
        const approach = 1 - Math.pow(1 - progress, 2);
        const tipZ = -6 + approach * 18;
        const distance = 14 - tipZ;
        sculpture.position.set(halfWidth * distance / 14 * (0.5 - progress) + parallaxX * distance * 0.015,
          distance * (0.035 + parallaxY * 0.01), tipZ);
        sculpture.lookAt(camera.position);
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
        sculpture.scale.setScalar(innerWidth < 768 ? 0.8 : 1);
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
        capGeometry.dispose();
        capMaterial.dispose();
        rimGeometry.dispose();
        rimMaterial.dispose();
        tipTexture.dispose();
        tipMaterial.dispose();
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
