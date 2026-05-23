import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Database } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Profile", href: "#about" },
    { name: "Matrix", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Journey", href: "#journey" },
    { name: "Uplink", href: "#contact" }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4 glass-panel border-b border-white/5 shadow-lg bg-[#030712]/70' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center space-x-2 text-white hover:opacity-90 transition-opacity duration-200">
          <Database className="w-5 h-5 text-teal-400 drop-shadow-[0_0_6px_rgba(45,212,191,0.5)] animate-pulse" />
          <span className="font-display font-bold text-sm sm:text-base tracking-widest text-glow-teal uppercase">
            Ravanji <span className="text-teal-400 font-mono font-medium text-xs">// ANALYST</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="text-xs font-mono tracking-wider text-gray-400 hover:text-white uppercase transition-colors duration-200 relative group py-1"
            >
              {link.name}
              {/* Animated underline */}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-teal-400 to-blue-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-white transition-colors duration-200"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Links Overlay */}
      {isOpen && (
        <motion.div 
          className="md:hidden fixed inset-0 top-[60px] bg-[#030712] glass-panel border-t border-white/5 flex flex-col items-center justify-center space-y-8 z-40"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-mono tracking-widest text-gray-300 hover:text-teal-400 uppercase transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
