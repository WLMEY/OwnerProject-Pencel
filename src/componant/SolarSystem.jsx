import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const SolarSystem = ({ width = '100%', height = '100%' }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);

    const mount = mountRef.current;
    mount.appendChild(renderer.domElement);

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.enableZoom = false;
    controls.maxPolarAngle = Math.PI / 2;

    // Set camera position
    camera.position.set(0, 5, 20);

    // Lighting
    scene.add(new THREE.AmbientLight(0x404040));

const sunLight = new THREE.PointLight(0xffffff, 50.0, 200, 2); // زيادة الشدة والمدى مع تقليل التلاشي
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

    // Create sun
    const sunGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Define planets with proper speed ratios
    const planets = [
      { name: 'mercury', size: 0.25, distance: 3, color: 0x8B8B8B, yearRatio: 0.24 }, // Mercury takes 0.24 Earth years
      { name: 'venus', size: 0.4, distance: 5, color: 0xE6C229, yearRatio: 0.62 },
      { name: 'earth', size: 0.45, distance: 7, color: 0x6B93D6, yearRatio: 1 }, // Earth takes 1 year
      { name: 'mars', size: 0.35, distance: 9, color: 0x993D00, yearRatio: 1.88 },
      { name: 'jupiter', size: 0.9, distance: 12, color: 0xB07F35, yearRatio: 11.86 },
      { name: 'saturn', size: 0.75, distance: 15, color: 0xD5C9B1, yearRatio: 29.46, hasRing: true },
      { name: 'uranus', size: 0.6, distance: 18, color: 0x4FD0E7, yearRatio: 84.01 },
      { name: 'neptune', size: 0.6, distance: 21, color: 0x4B70DD, yearRatio: 164.8 }
    ];

    // Base speed (Earth completes one orbit per minute)
    const baseSpeed = (2 * Math.PI) / 6000; // Earth moves 360° per minute

    const planetMeshes = planets.map(planet => {
      const geometry = new THREE.SphereGeometry(planet.size, 32, 32);
      const material = new THREE.MeshPhongMaterial({ color: planet.color });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = planet.distance;
      
      // Adjust speed proportionally
      planet.speed = baseSpeed / planet.yearRatio;

      if (planet.hasRing) {
        const ringGeometry = new THREE.RingGeometry(planet.size + 0.25, planet.size + 0.75, 32);
        const ringMaterial = new THREE.MeshPhongMaterial({ 
          color: 0xD5C9B1, 
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.8
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        mesh.add(ring);
      }
      
      scene.add(mesh);
      return { ...planet, mesh };
    });

    // Animation loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      sun.rotation.y += 0.0005; // Slower sun rotation

      const currentTime = Date.now();

      planetMeshes.forEach(planet => {
        const angle = planet.speed * currentTime;
        planet.mesh.position.x = Math.cos(angle) * planet.distance;
        planet.mesh.position.z = Math.sin(angle) * planet.distance;
        planet.mesh.rotation.y += 0.001; // Slow self-rotation
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = mount.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mount);

    return () => {
      resizeObserver.unobserve(mount);
      cancelAnimationFrame(animationFrameId);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
      planetMeshes.forEach(planet => {
        planet.mesh.geometry.dispose();
        planet.mesh.material.dispose();
        if (planet.hasRing) {
          planet.mesh.children[0].geometry.dispose();
          planet.mesh.children[0].material.dispose();
        }
      });
      sunGeometry.dispose();
      sunMaterial.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width, height, margin: '0 auto' }} />;
};

export default SolarSystem;
