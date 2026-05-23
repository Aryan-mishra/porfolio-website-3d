import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Send } from 'lucide-react';

const HolographicDashboard = lazy(() => import('./HolographicDashboard'));

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom premium ease-out
      },
    },
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 py-20 overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-teal-500/10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left Content Column */}
        <motion.div
          className="lg:col-span-7 flex flex-col text-left space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Futuristic pill badge */}
          <motion.div 
            variants={itemVariants}
            className="self-start glass-panel px-3 py-1.5 rounded-full border-teal-500/20 text-teal-400 font-mono text-xs tracking-wider flex items-center space-x-1.5 shadow-[0_0_15px_rgba(13,148,136,0.1)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
            <span>PORTFOLIO v2.0 // FUTURE BUSINESS ANALYST</span>
          </motion.div>

          {/* Name Header */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight text-white leading-[1.1] select-none"
          >
            Hey.. <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-400 text-glow-teal">Ravanji</span>
          </motion.h1>

          {/* Persona Subheading */}
          <motion.h2 
            variants={itemVariants}
            className="text-lg sm:text-xl font-mono text-teal-300/90 tracking-wide font-normal"
          >
            Commerce Student &bull; Excel Expert &bull; AI Enthusiast &bull; Future Data Analyst
          </motion.h2>

          {/* Animated Tagline */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-wide leading-snug">
              “Transforming Data into Decisions”
            </h3>
            <p className="text-gray-400 max-w-xl text-base sm:text-lg leading-relaxed font-sans">
              Bridging the gap between traditional financial intelligence and bleeding-edge artificial intelligence to deliver predictive commercial analytics.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4 pt-4"
          >
            <a 
              href="#projects" 
              className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] flex items-center space-x-2 border border-teal-400/20 overflow-hidden"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a 
              href="#contact" 
              className="glass-panel px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 hover:bg-white/5 hover:border-white/20 hover:scale-105 flex items-center space-x-2 border-white/10"
            >
              <span>Contact Me</span>
              <Send className="w-4 h-4 text-blue-400" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right 3D Column */}
        <motion.div
          className="lg:col-span-5 w-full flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Suspense fallback={
            <div className="relative w-full h-[320px] md:h-[400px] glass-panel rounded-2xl overflow-hidden flex flex-col items-center justify-center border border-teal-500/10 bg-[#030712]/40 backdrop-blur-sm">
              <span className="w-8 h-8 rounded-full border-2 border-teal-500/30 border-t-teal-400 animate-spin mb-3" />
              <span className="text-[10px] font-mono text-teal-400/70 uppercase tracking-widest animate-pulse">Initializing Hologram...</span>
            </div>
          }>
            <HolographicDashboard />
          </Suspense>
        </motion.div>

      </div>

      {/* Downward scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">Scroll to Explore</span>
        <motion.div 
          className="w-1.5 h-6 rounded-full border border-gray-600 flex justify-center p-[2px]"
        >
          <motion.div 
            className="w-1 h-1.5 rounded-full bg-teal-400"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
