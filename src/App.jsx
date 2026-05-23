import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';

const Background3D = lazy(() => import('./components/Background3D'));

export default function App() {
  return (
    <div className="relative text-white min-h-screen bg-[#030712] font-sans selection:bg-teal-500/30 selection:text-white">
      {/* 3D Background canvas & static grid overlay */}
      <Suspense fallback={<div className="fixed inset-0 -z-50 w-full h-full bg-[#030712]" />}>
        <Background3D />
      </Suspense>

      {/* Floating Header */}
      <Navbar />

      {/* Main content sections */}
      <main className="pt-20">
        <Hero />
        
        {/* Visual separator line */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <About />

        <div className="max-w-7xl mx-auto px-6">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <Skills />

        <div className="max-w-7xl mx-auto px-6">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <Projects />

        <div className="max-w-7xl mx-auto px-6">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <Experience />

        <div className="max-w-7xl mx-auto px-6">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <Contact />
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#030712]/60 backdrop-blur-md relative z-10 text-center text-xs font-mono text-gray-500 space-y-3">
        <div>
          <span>RAVANJI &bull; PORTFOLIO 2026 // POWERED_BY_AI</span>
        </div>
        <div className="text-[10px] text-gray-600">
          Built with React &bull; Tailwind CSS &bull; Three.js &bull; Framer Motion
        </div>
        <div className="text-[9px] text-gray-700">
          All systems nominal. Encryption active.
        </div>
      </footer>
    </div>
  );
}
