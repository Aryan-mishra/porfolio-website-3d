import React from 'react';
import { motion } from 'framer-motion';
import { Award, Compass, Search, Terminal, Zap } from 'lucide-react';

export default function Experience() {
  const timelineData = [
    {
      title: "Learning Excel",
      subtitle: "The Foundation of Modeling",
      period: "Q1 2025",
      description: "Mastered high-performance modeling. Developed proficiency in advanced lookups, conditional formatting, index formulas, nested arrays, and clean data organization practices.",
      icon: <Award className="w-5 h-5 text-teal-400" />
    },
    {
      title: "Building Projects",
      subtitle: "From Theory to Applications",
      period: "Q2-Q3 2025",
      description: "Designed multi-tab business tools and trackers. Built VBA-assisted automation models, sorting mechanisms, and dynamic visual slicer dashboards using real-world CSV outputs.",
      icon: <Compass className="w-5 h-5 text-blue-400" />
    },
    {
      title: "Learning Tally Prime",
      subtitle: "Corporate Ledger & Tax Compliance",
      period: "Q4 2025",
      description: "Gained core corporate skills: handling voucher registries, ledger balancing, accounting statements, GST reconciliation processes, and auditing rules within the Tally system.",
      icon: <Search className="w-5 h-5 text-indigo-400" />
    },
    {
      title: "AI Exploration",
      subtitle: "Cognitive Business Analysis",
      period: "Q1 2026",
      description: "Integrated language models with accounting records. Designed prompt workflows to summarize transactions, categorize accounts, and write clean SQL queries from plain English inputs.",
      icon: <Terminal className="w-5 h-5 text-purple-400" />
    },
    {
      title: "Internship Preparation",
      subtitle: "Industry Integration",
      period: "Present",
      description: "Polishing valuation metrics, database structures, and dynamic BI dashboard capabilities. Ready to contribute analytical insights as an aspiring business analyst.",
      icon: <Zap className="w-5 h-5 text-amber-400" />
    }
  ];

  return (
    <section id="journey" className="relative px-6 py-24 max-w-5xl mx-auto w-full">
      {/* Background blur highlight */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full bg-teal-500/5 blur-[90px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-20">
        <p className="text-xs font-mono text-teal-400 uppercase tracking-widest">
          04 // Timeline & Growth
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mt-2">
          Futuristic Growth Path
        </h2>
        <p className="text-gray-400 mt-3 max-w-md mx-auto text-sm">
          A chronologically mapped trajectory illustrating milestones in commerce, analytics, and software logic.
        </p>
      </div>

      {/* Timeline Layout */}
      <div className="relative border-l border-white/10 ml-4 md:ml-0 md:left-1/2 md:border-l md:border-white/10 md:-translate-x-1/2 space-y-16">
        
        {/* Glow Line Indicator */}
        <div className="absolute top-0 bottom-0 left-0 md:left-1/2 md:-translate-x-1/2 w-[2px] bg-gradient-to-b from-teal-400 via-blue-500 to-indigo-500 opacity-60" />

        {timelineData.map((item, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <div key={idx} className="relative flex flex-col md:flex-row md:items-center">
              
              {/* Timeline dot/node */}
              <div className="absolute -left-[9px] md:left-1/2 md:-translate-x-1/2 top-1.5 md:top-auto z-10 w-[18px] h-[18px] rounded-full bg-[#030712] border-2 border-teal-400 flex items-center justify-center shadow-[0_0_10px_rgba(45,212,191,0.6)]">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              </div>

              {/* Box Content Panel */}
              <div className={`w-full md:w-1/2 pl-8 md:pl-0 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                <motion.div
                  className="glass-panel p-6 rounded-2xl border-white/5 relative group hover:border-teal-500/20 transition-all duration-300 hover:shadow-[0_0_20px_rgba(45,212,191,0.05)]"
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {/* Floating Date/Period tag */}
                  <div className={`absolute top-4 ${isLeft ? 'md:left-4' : 'md:right-4'} right-4 glass-panel px-2.5 py-1 rounded-md border-white/5`}>
                    <span className="text-[10px] font-mono text-teal-300 font-semibold tracking-wider">{item.period}</span>
                  </div>

                  {/* Icon + Titles */}
                  <div className={`flex items-center space-x-3 mb-3 ${isLeft ? 'md:flex-row-reverse md:space-x-reverse' : ''}`}>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-display text-white">{item.title}</h3>
                      <p className="text-xs text-gray-500 font-sans">{item.subtitle}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </motion.div>
              </div>

              {/* Empty spacer for grid alignment */}
              <div className="hidden md:block w-1/2" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
