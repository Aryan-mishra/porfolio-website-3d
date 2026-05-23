import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, TrendingUp, LineChart } from 'lucide-react';

export default function About() {
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const features = [
    {
      icon: <LineChart className="w-6 h-6 text-teal-400" />,
      title: "Commercial Intelligence",
      description: "Rooted in corporate accounting, tax frameworks, and financial operations. Fluent in business processes."
    },
    {
      icon: <Cpu className="w-6 h-6 text-blue-400" />,
      title: "AI Integration Mindset",
      description: "Leveraging LLMs and analytical agents to automate auditing, forecast demands, and structure data workflows."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-indigo-400" />,
      title: "Predictive Analytics",
      description: "Moving from retrospective data (what happened) to predictive foresight (what will happen) using advanced Excel modeling."
    }
  ];

  return (
    <section id="about" className="relative px-6 py-24 max-w-7xl mx-auto w-full">
      {/* Subtle backdrop highlight */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[90px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-mono text-teal-400 uppercase tracking-widest"
        >
          01 // Executive Profile
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold font-display text-white mt-2"
        >
          Bridging Commerce & AI
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Bio Card */}
        <motion.div 
          className="lg:col-span-7 glass-panel rounded-2xl p-8 sm:p-10 border-white/5 flex flex-col justify-between animate-float"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="space-y-6 text-left">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-teal-400" />
              <h3 className="font-mono text-xs tracking-wider text-teal-300">ABOUT_ME // EXECUTIVE_SUMMARY</h3>
            </div>
            
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-sans">
              As a commerce student, I realized that traditional finance and accounting are undergoing a radical shift. The future belongs to analysts who can read spreadsheets, write prompt engines, structure databases, and build AI workflows.
            </p>

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              My core competence is **analytical problem-solving**. I specialize in converting messy commercial transactions into clean financial dashboards. By blending business acumen with technological toolsets, I help companies turn numbers into strategy.
            </p>

            <div className="border-t border-white/10 pt-6">
              <h4 className="font-mono text-xs text-blue-300 uppercase tracking-wider mb-3">Core Pillars:</h4>
              <div className="flex flex-wrap gap-3">
                <span className="glass-panel px-3 py-1.5 rounded-lg border-teal-500/20 text-xs font-mono text-teal-400">Data Modeling</span>
                <span className="glass-panel px-3 py-1.5 rounded-lg border-blue-500/20 text-xs font-mono text-blue-400">Financial Reporting</span>
                <span className="glass-panel px-3 py-1.5 rounded-lg border-indigo-500/20 text-xs font-mono text-indigo-400">AI Automation</span>
                <span className="glass-panel px-3 py-1.5 rounded-lg border-teal-500/20 text-xs font-mono text-teal-400">Risk Assessment</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature Cards Column */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              className="glass-panel rounded-2xl p-6 border-white/5 flex items-start space-x-4 text-left transition-all duration-300 hover:border-teal-500/20 group hover:shadow-[0_0_15px_rgba(13,148,136,0.05)]"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-teal-500/10 group-hover:border-teal-500/20 transition-all duration-300">
                {feat.icon}
              </div>
              <div className="space-y-1.5">
                <h4 className="text-base font-semibold text-white group-hover:text-teal-300 transition-colors duration-300 font-display">
                  {feat.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                  {feat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
