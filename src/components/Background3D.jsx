import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

function Particles({ count = 100 }) {
  const points = useRef();

  // Initialize random particle positions
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    const time = state.clock.getElapsedTime();
    const pos = points.current.geometry?.attributes?.position;
    if (!pos) return;
    
    // Slow anti-gravity upward drift
    for (let i = 0; i < count; i++) {
      let y = pos.getY(i);
      y += 0.003;
      if (y > 8) y = -8; // wrap around boundary
      
      let x = pos.getX(i);
      x += Math.sin(time * 0.5 + i) * 0.001; // subtle wave drift
      
      pos.setY(i, y);
      pos.setX(i, x);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#2dd4bf"
        sizeAttenuation
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function DNAHelix({ isMobile }) {
  const helixRef = useRef();

  // Procedural double helix generation
  const { points1, points2, rungs } = useMemo(() => {
    const p1 = [];
    const p2 = [];
    const r = [];
    
    const numPoints = isMobile ? 50 : 80;
    const radius = 1.5;
    const height = 12;
    const turns = 3.5;

    for (let i = 0; i < numPoints; i++) {
      const fraction = i / numPoints;
      const t = fraction * Math.PI * 2 * turns;
      const y = fraction * height - height / 2;
      
      // Strand 1 position
      const x1 = Math.sin(t) * radius;
      const z1 = Math.cos(t) * radius;
      p1.push(new THREE.Vector3(x1, y, z1));
      
      // Strand 2 position (offset by 180 degrees)
      const x2 = Math.sin(t + Math.PI) * radius;
      const z2 = Math.cos(t + Math.PI) * radius;
      p2.push(new THREE.Vector3(x2, y, z2));

      // Connect every second node with a horizontal base-pair rung
      if (i % 2 === 0) {
        r.push({
          start: new THREE.Vector3(x1, y, z1),
          end: new THREE.Vector3(x2, y, z2),
        });
      }
    }
    return { points1: p1, points2: p2, rungs: r };
  }, [isMobile]);

  useFrame((state) => {
    if (!helixRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Slow, premium rotation over time (4D effect)
    helixRef.current.rotation.y = time * 0.15;
    helixRef.current.rotation.z = Math.sin(time * 0.2) * 0.05; // Gentle rocking
  });

  return (
    <group ref={helixRef}>
      {/* Helix Strand 1 (Teal Nodes) */}
      {points1.map((pos, idx) => (
        <mesh key={`s1-${idx}`} position={pos}>
          <sphereGeometry args={[isMobile ? 0.06 : 0.08, 8, 8]} />
          <meshBasicMaterial color="#2dd4bf" transparent opacity={0.65} />
        </mesh>
      ))}

      {/* Helix Strand 2 (Indigo/Purple Nodes) */}
      {points2.map((pos, idx) => (
        <mesh key={`s2-${idx}`} position={pos}>
          <sphereGeometry args={[isMobile ? 0.06 : 0.08, 8, 8]} />
          <meshBasicMaterial color="#818cf8" transparent opacity={0.65} />
        </mesh>
      ))}

      {/* Rungs (Base Connections) */}
      {rungs.map((rung, idx) => {
        const distance = rung.start.distanceTo(rung.end);
        const position = new THREE.Vector3()
          .addVectors(rung.start, rung.end)
          .multiplyScalar(0.5);
        
        const direction = new THREE.Vector3()
          .subVectors(rung.end, rung.start)
          .normalize();
          
        const quaternion = new THREE.Quaternion()
          .setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

        return (
          <mesh 
            key={`r-${idx}`} 
            position={position}
            quaternion={quaternion}
          >
            <cylinderGeometry args={[0.012, 0.012, distance, 6]} />
            <meshBasicMaterial color="#60a5fa" transparent opacity={0.25} />
          </mesh>
        );
      })}
    </group>
  );
}

function SceneContent({ isMobile, activeSection }) {
  const sceneRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetLookRef = useRef(new THREE.Vector3(0, 0, 0));

  // Dynamic camera configurations for viewport snapping
  const sectionConfig = {
    hero: { pos: [0, 0.5, 6], look: [0, 0, 0] },
    about: { pos: [-3.2, 0.8, 4.8], look: [-1.2, 0.2, 0] },
    skills: { pos: [3.2, -0.8, 4.8], look: [1.2, -0.2, 0] },
    projects: { pos: [0, -2.5, 4.5], look: [0, -2.0, 0] },
    journey: { pos: [-2.2, -3.2, 5.0], look: [-1.2, -2.5, 0] },
    contact: { pos: [0, 0, 9.0], look: [0, 0, 0] },
  };

  // Capture mouse movement at window level for parallax calculation
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    const config = sectionConfig[activeSection] || sectionConfig.hero;
    
    // Smoothly interpolate camera position
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, config.pos[0], 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, config.pos[1], 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, config.pos[2], 0.05);

    // Smoothly interpolate lookAt target
    targetLookRef.current.x = THREE.MathUtils.lerp(targetLookRef.current.x, config.look[0], 0.05);
    targetLookRef.current.y = THREE.MathUtils.lerp(targetLookRef.current.y, config.look[1], 0.05);
    targetLookRef.current.z = THREE.MathUtils.lerp(targetLookRef.current.z, config.look[2], 0.05);
    state.camera.lookAt(targetLookRef.current);

    if (sceneRef.current) {
      const targetX = mouseRef.current.x * 0.35;
      const targetY = mouseRef.current.y * 0.35;
      sceneRef.current.rotation.y = THREE.MathUtils.lerp(sceneRef.current.rotation.y, targetX, 0.04);
      sceneRef.current.rotation.x = THREE.MathUtils.lerp(sceneRef.current.rotation.x, -targetY, 0.04);
    }
  });

  return (
    <group ref={sceneRef}>
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#2dd4bf" />
      {/* Secondary light disabled on mobile to conserve performance */}
      {!isMobile && <pointLight position={[-8, -8, -5]} intensity={0.8} color="#818cf8" />}
      
      <DNAHelix isMobile={isMobile} />
      <Particles count={isMobile ? 35 : 120} />
      <Stars radius={100} depth={50} count={isMobile ? 250 : 1200} factor={isMobile ? 3 : 4} saturation={0.5} fade speed={isMobile ? 0.4 : 0.8} />
    </group>
  );
}

export default function Background3D({ activeSection }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    setIsMobile(media.matches);
    const listener = (e) => setIsMobile(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  return (
    <div className="fixed inset-0 -z-50 w-full h-full bg-[#030712] overflow-hidden pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        gl={{ 
          antialias: !isMobile, 
          alpha: false, 
          powerPreference: 'high-performance'
        }}
        dpr={isMobile ? [1, 1.2] : [1, 1.5]}
      >
        <SceneContent isMobile={isMobile} activeSection={activeSection} />
      </Canvas>
      {/* Background glow overlay */}
      <div className="absolute inset-0 bg-mesh opacity-80 pointer-events-none" />
    </div>
  );
}
