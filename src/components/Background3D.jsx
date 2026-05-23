import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
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

function OrbitingRings() {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.x = time * 0.04;
    groupRef.current.rotation.y = time * 0.06;
  });

  return (
    <group ref={groupRef}>
      {/* Primary Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.015, 8, 100]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.2} />
      </mesh>
      
      {/* Secondary Outer Ring */}
      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[4.5, 0.008, 6, 80]} />
        <meshBasicMaterial color="#2dd4bf" transparent opacity={0.15} />
      </mesh>
      
      {/* Tertiary Inner Ring */}
      <mesh rotation={[-Math.PI / 6, -Math.PI / 3, 0]}>
        <torusGeometry args={[2.0, 0.01, 8, 60]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function FloatingShapes() {
  return (
    <group>
      {/* Floating Tetrahedron */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={0.8} position={[-4, 2, -2]}>
        <mesh>
          <tetrahedronGeometry args={[0.5]} />
          <meshPhysicalMaterial
            color="#2dd4bf"
            emissive="#0d9488"
            emissiveIntensity={0.15}
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.25}
            transmission={0.6}
            thickness={0.5}
          />
        </mesh>
      </Float>

      {/* Floating Octahedron */}
      <Float speed={1.2} rotationIntensity={1.5} floatIntensity={1} position={[4.5, -2, -1]}>
        <mesh>
          <octahedronGeometry args={[0.4]} />
          <meshPhysicalMaterial
            color="#60a5fa"
            emissive="#2563eb"
            emissiveIntensity={0.15}
            roughness={0.2}
            metalness={0.9}
            transparent
            opacity={0.2}
            transmission={0.7}
            thickness={0.8}
          />
        </mesh>
      </Float>

      {/* Floating Icosahedron */}
      <Float speed={2} rotationIntensity={0.8} floatIntensity={1.2} position={[-2.5, -3, -3]}>
        <mesh>
          <icosahedronGeometry args={[0.35]} />
          <meshPhysicalMaterial
            color="#a78bfa"
            emissive="#7c3aed"
            emissiveIntensity={0.2}
            roughness={0.15}
            transparent
            opacity={0.25}
            transmission={0.8}
          />
        </mesh>
      </Float>
    </group>
  );
}

function SceneContent() {
  const sceneRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });

  // Capture mouse movement at window level for parallax calculation
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (!sceneRef.current) return;
    const targetX = mouseRef.current.x * 0.3;
    const targetY = mouseRef.current.y * 0.3;
    
    // Smooth transition
    sceneRef.current.rotation.y = THREE.MathUtils.lerp(sceneRef.current.rotation.y, targetX, 0.04);
    sceneRef.current.rotation.x = THREE.MathUtils.lerp(sceneRef.current.rotation.x, -targetY, 0.04);
  });

  return (
    <group ref={sceneRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} color="#60a5fa" />
      <pointLight position={[-8, -8, -5]} intensity={0.6} color="#2dd4bf" />
      
      <OrbitingRings />
      <FloatingShapes />
      <Particles count={120} />
      <Stars radius={100} depth={50} count={1200} factor={4} saturation={0.5} fade speed={0.8} />
    </group>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-50 w-full h-full bg-[#030712] overflow-hidden pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
      >
        <SceneContent />
      </Canvas>
      {/* Background glow overlay */}
      <div className="absolute inset-0 bg-mesh opacity-80 pointer-events-none" />
    </div>
  );
}
