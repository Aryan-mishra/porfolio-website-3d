import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// An animated 3D bar chart
function BarChart3D({ isMobile }) {
  const groupRef = useRef();
  const bars = useRef([]);

  // Setup heights for 5 bars
  const barData = [
    { x: -1.2, color: '#2dd4bf', delay: 0 },
    { x: -0.6, color: '#3b82f6', delay: 0.3 },
    { x: 0, color: '#2dd4bf', delay: 0.6 },
    { x: 0.6, color: '#60a5fa', delay: 0.9 },
    { x: 1.2, color: '#a78bfa', delay: 1.2 },
  ];

  useFrame((state) => {
    if (!groupRef.current || !bars.current) return;
    const time = state.clock.getElapsedTime();
    bars.current.forEach((bar, idx) => {
      if (bar) {
        // Animate heights using sine waves
        const scaleY = 1 + Math.sin(time * 2 + barData[idx].delay) * 0.5;
        bar.scale.y = scaleY;
        // Adjust position so they scale upwards from the base
        bar.position.y = scaleY / 2 - 1;
      }
    });
    groupRef.current.rotation.y = time * 0.2;
  });

  return (
    <group ref={groupRef}>
      {/* Grid floor */}
      <gridHelper args={[4, 10, '#3b82f6', '#1e293b']} position={[0, -1, 0]} rotation={[0, 0, 0]} />

      {/* Floating Bars */}
      {barData.map((data, idx) => (
        <mesh
          key={idx}
          ref={(el) => (bars.current[idx] = el)}
          position={[data.x, 0, 0]}
        >
          <boxGeometry args={[0.3, 2, 0.3]} />
          {isMobile ? (
            <meshStandardMaterial
              color={data.color}
              emissive={data.color}
              emissiveIntensity={0.3}
              roughness={0.2}
              metalness={0.7}
              transparent
              opacity={0.85}
            />
          ) : (
            <meshPhysicalMaterial
              color={data.color}
              emissive={data.color}
              emissiveIntensity={0.2}
              roughness={0.1}
              metalness={0.8}
              transparent
              opacity={0.7}
              transmission={0.5}
            />
          )}
        </mesh>
      ))}

      {/* Grid outline borders */}
      <mesh position={[0, -1.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.2, 4.2]} />
        <meshBasicMaterial color="#0d9488" wireframe transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

// Glowing line chart connecting nodes
function LineChart3D({ isMobile }) {
  const points = useMemo(() => {
    const pts = [];
    pts.push(new THREE.Vector3(-1.8, -0.8, 0.5));
    pts.push(new THREE.Vector3(-1.2, -0.4, 0.8));
    pts.push(new THREE.Vector3(-0.6, 0.2, 0.4));
    pts.push(new THREE.Vector3(0, -0.2, 0.6));
    pts.push(new THREE.Vector3(0.6, 0.8, 0.2));
    pts.push(new THREE.Vector3(1.2, 0.3, 0.7));
    pts.push(new THREE.Vector3(1.8, 1.2, 0.3));
    return pts;
  }, []);

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(points);
  }, [points]);

  const lineRef = useRef();

  useFrame((state) => {
    if (!lineRef.current) return;
    const time = state.clock.getElapsedTime();
    lineRef.current.rotation.y = time * 0.15;
  });

  return (
    <group ref={lineRef}>
      {/* Curved tube line - less detailed segments on mobile */}
      <mesh>
        <tubeGeometry args={[curve, isMobile ? 32 : 64, 0.04, isMobile ? 5 : 8, false]} />
        {isMobile ? (
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#2563eb"
            emissiveIntensity={0.8}
            roughness={0.2}
            transparent
            opacity={0.9}
          />
        ) : (
          <meshPhysicalMaterial
            color="#3b82f6"
            emissive="#2563eb"
            emissiveIntensity={0.8}
            roughness={0.1}
            transparent
            opacity={0.8}
          />
        )}
      </mesh>

      {/* Nodes on the line - less detailed spheres on mobile */}
      {points.map((pt, idx) => (
        <mesh key={idx} position={pt}>
          <sphereGeometry args={[0.08, isMobile ? 8 : 16, isMobile ? 8 : 16]} />
          <meshBasicMaterial color="#2dd4bf" />
        </mesh>
      ))}
    </group>
  );
}

export default function HolographicDashboard() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    setIsMobile(media.matches);
    const listener = (e) => setIsMobile(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  return (
    <div className="relative w-full h-[320px] md:h-[400px] glass-panel rounded-2xl overflow-hidden glass-panel-glow border-teal-500/20">
      {/* Hologram scanlines effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] z-10 opacity-70" />
      
      {/* Floating 3D scene */}
      <Canvas
        camera={{ position: [0, 1.2, 4.5], fov: 50 }}
        gl={{ 
          antialias: !isMobile, 
          alpha: true, 
          powerPreference: 'high-performance' 
        }}
        dpr={isMobile ? [1, 1.2] : [1, 1.5]}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#60a5fa" />
        {/* Secondary point light disabled on mobile to conserve performance */}
        {!isMobile && <pointLight position={[-5, 5, -5]} intensity={0.5} color="#2dd4bf" />}
        <directionalLight position={[0, -5, 2]} intensity={0.4} color="#a78bfa" />
        
        <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.6}>
          <group position={[0, 0.2, 0]}>
            <BarChart3D isMobile={isMobile} />
            <LineChart3D isMobile={isMobile} />
          </group>
        </Float>
      </Canvas>

      {/* Glowing glass overlay labels */}
      <div className="absolute top-4 left-4 glass-panel px-3 py-1.5 rounded-lg border-white/5 flex items-center space-x-2">
        <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
        <span className="text-[10px] font-mono text-teal-300 uppercase tracking-widest">System Live // AI_ANALYST</span>
      </div>

      <div className="absolute bottom-4 right-4 glass-panel px-3 py-1.5 rounded-lg border-white/5">
        <span className="text-[10px] font-mono text-blue-300 uppercase tracking-widest block">Accuracy: 99.4%</span>
        <span className="text-[9px] font-mono text-teal-400 block mt-0.5">Latency: 14ms</span>
      </div>
    </div>
  );
}
