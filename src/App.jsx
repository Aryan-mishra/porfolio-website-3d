import React, { Suspense, lazy, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';

const Background3D = lazy(() => import('./components/Background3D'));

function SlideNav({ activeSection }) {
  const slides = [
    { id: 'hero', name: 'Profile Start' },
    { id: 'about', name: 'Executive Profile' },
    { id: 'skills', name: 'Skill Matrix' },
    { id: 'projects', name: 'Projects' },
    { id: 'journey', name: 'Timeline' },
    { id: 'contact', name: 'Contact' }
  ];

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col space-y-5 items-center">
      {slides.map((slide) => (
        <a
          key={slide.id}
          href={`#${slide.id}`}
          title={slide.name}
          className={`slide-dot ${activeSection === slide.id ? 'active' : ''}`}
          aria-label={`Scroll to ${slide.name}`}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
      root: null,
      rootMargin: '-45% 0px -45% 0px', // Trigger when section occupies the center of viewport
      threshold: 0.05,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id') || 'hero';
          setActiveSection(id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative text-white min-h-screen bg-[#030712] font-sans selection:bg-teal-500/30 selection:text-white">
      {/* 3D Background canvas & static grid overlay */}
      <Suspense fallback={<div className="fixed inset-0 -z-50 w-full h-full bg-[#030712]" />}>
        <Background3D activeSection={activeSection} />
      </Suspense>

      {/* Floating Header */}
      <Navbar />

      {/* Slide dots indicator navigation */}
      <SlideNav activeSection={activeSection} />

      {/* Main content sections */}
      <main className="md:pt-0 pt-20">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#030712]/60 backdrop-blur-md relative z-10 text-center text-xs font-mono text-gray-500 space-y-3">
        <div>
          <span>MISHRA JI &bull; PORTFOLIO 2026 // POWERED_BY_AI</span>
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
