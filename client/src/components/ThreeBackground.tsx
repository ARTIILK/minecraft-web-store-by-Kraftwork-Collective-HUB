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

    // Create Particles/Cubes
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const particlesCount = density;
    const material = new THREE.MeshPhongMaterial({
      color: config?.theme?.primary || '#8b5cf6',
      transparent: true,
      opacity: 0.6,
      shininess: 100,
    });

    const instancedMesh = new THREE.InstancedMesh(geometry, material, particlesCount);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < particlesCount; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40
      );
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);
    }
    scene.add(instancedMesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(config?.theme?.primary || '#8b5cf6', 2);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime() * speedMultiplier;
      
      instancedMesh.rotation.y = elapsedTime * 0.05;
      instancedMesh.rotation.x = elapsedTime * 0.03;

      // Parallax
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

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
      window.removeEventListener('mousemove', handleMouseMove);
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
