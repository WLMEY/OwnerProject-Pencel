import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const SolarSystem = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Set camera position
    camera.position.z = 30;
    camera.position.y = 10;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Add directional light (sun)
    const sunLight = new THREE.PointLight(0xffffff, 2, 100);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // Create sun
    const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      wireframe: false
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Create planets
    const planets = [
      { name: 'mercury', size: 0.5, distance: 5, color: 0x8B8B8B, speed: 0.04 },
      { name: 'venus', size: 0.8, distance: 8, color: 0xE6C229, speed: 0.015 },
      { name: 'earth', size: 0.9, distance: 12, color: 0x6B93D6, speed: 0.01 },
      { name: 'mars', size: 0.7, distance: 15, color: 0x993D00, speed: 0.008 },
      { name: 'jupiter', size: 1.8, distance: 20, color: 0xB07F35, speed: 0.002 },
      { name: 'saturn', size: 1.5, distance: 25, color: 0xD5C9B1, speed: 0.0009, hasRing: true },
      { name: 'uranus', size: 1.2, distance: 30, color: 0x4FD0E7, speed: 0.0004 },
      { name: 'neptune', size: 1.2, distance: 35, color: 0x4B70DD, speed: 0.0001 }
    ];

    const planetMeshes = planets.map(planet => {
      const geometry = new THREE.SphereGeometry(planet.size, 32, 32);
      const material = new THREE.MeshPhongMaterial({ color: planet.color });
      const mesh = new THREE.Mesh(geometry, material);
      
      // Position planet in orbit
      mesh.position.x = planet.distance;
      
      // Add ring for Saturn
      if (planet.hasRing) {
        const ringGeometry = new THREE.RingGeometry(planet.size + 0.5, planet.size + 1.5, 32);
        const ringMaterial = new THREE.MeshPhongMaterial({ 
          color: 0xD5C9B1, 
          side: THREE.DoubleSide 
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        mesh.add(ring);
      }
      
      scene.add(mesh);
      return { ...planet, mesh };
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate sun
      sun.rotation.y += 0.005;

      // Move planets in their orbits
      planetMeshes.forEach(planet => {
        planet.mesh.position.x = Math.cos(planet.speed * Date.now()) * planet.distance;
        planet.mesh.position.z = Math.sin(planet.speed * Date.now()) * planet.distance;
        planet.mesh.rotation.y += 0.01;
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default SolarSystem;