import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useSiteConfig } from '@/hooks/use-store-data';

export function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { data: config } = useSiteConfig();

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Check config if animation is enabled
    const isEnabled = config?.backgroundAnimation?.enabled ?? true;
    if (!isEnabled) return;

    const density = config?.backgroundAnimation?.density || 100;
    const speedMultiplier = config?.backgroundAnimation?.speed || 1;

    // Setup Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create Particles
    const geometry = new THREE.BufferGeometry();
    const particlesCount = density * 2;
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);

    for(let i = 0; i < particlesCount * 3; i+=3) {
      // Spread particles widely
      posArray[i] = (Math.random() - 0.5) * 100;     // x
      posArray[i+1] = (Math.random() - 0.5) * 100;   // y
      posArray[i+2] = (Math.random() - 0.5) * 50;    // z
      scaleArray[i/3] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1));

    // Custom Shader Material for glowing dots
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(config?.theme?.primary || '#8b5cf6') }
      },
      vertexShader: `
        uniform float time;
        attribute float aScale;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 pos = position;
          pos.y += sin(time * 0.5 + pos.x) * aScale * 2.0;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = (10.0 * aScale) * (30.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        void main() {
          float strength = distance(gl_PointCoord, vec2(0.5));
          strength = 1.0 - strength;
          strength = pow(strength, 3.0);
          if(strength < 0.1) discard;
          gl_FragColor = vec4(color, strength * 0.8);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);

    // Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime() * speedMultiplier;
      material.uniforms.time.value = elapsedTime;
      
      particlesMesh.rotation.y = elapsedTime * 0.05;
      particlesMesh.rotation.x = elapsedTime * 0.02;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [config]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-[-1] opacity-60"
    />
  );
}
