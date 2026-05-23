import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileSpreadsheet, 
  BookOpen, 
  BarChart3, 
  Cpu, 
  MessageSquare 
} from 'lucide-react';

export default function Skills() {
  const skillsData = [
    {
      title: "Advanced Excel",
      icon: <FileSpreadsheet className="w-7 h-7 text-emerald-400" />,
      glowColor: "shadow-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-emerald-500/20",
      textColor: "text-emerald-400",
      subSkills: ["Power Query", "XLOOKUP & Logic", "VBA & Macros", "Financial Modeling"],
      progress: 95,
      floatClass: "animate-float"
    },
    {
      title: "Tally Prime",
      icon: <BookOpen className="w-7 h-7 text-blue-400" />,
      glowColor: "shadow-blue-500/10 border-blue-500/20 hover:border-blue-500/40 hover:shadow-blue-500/20",
      textColor: "text-blue-400",
      subSkills: ["GST Compliance", "Voucher Entry", "Ledger Audit", "Statement prep"],
      progress: 90,
      floatClass: "animate-float-delayed"
    },
    {
      title: "Data Analytics",
      icon: <BarChart3 className="w-7 h-7 text-teal-400" />,
      glowColor: "shadow-teal-500/10 border-teal-500/20 hover:border-teal-500/40 hover:shadow-teal-500/20",
      textColor: "text-teal-400",
      subSkills: ["SQL Queries", "Python (Pandas)", "Data Cleaning", "Power BI"],
      progress: 85,
      floatClass: "animate-float-slow"
    },
    {
      title: "AI Tools",
      icon: <Cpu className="w-7 h-7 text-purple-400" />,
      glowColor: "shadow-purple-500/10 border-purple-500/20 hover:border-purple-500/40 hover:shadow-purple-500/20",
      textColor: "text-purple-400",
      subSkills: ["Prompt Engineering", "Custom GPT building", "AI Automation", "API Integration"],
      progress: 88,
      floatClass: "animate-float-slow-delayed"
    },
    {
      title: "Business Communication",
      icon: <MessageSquare className="w-7 h-7 text-amber-400" />,
      glowColor: "shadow-amber-500/10 border-amber-500/20 hover:border-amber-500/40 hover:shadow-amber-500/20",
      textColor: "text-amber-400",
      subSkills: ["Executive Reporting", "Stakeholder Pitches", "Technical Writing", "Collaboration"],
      progress: 90,
      floatClass: "animate-float-slow"
    }
  ];

  return (
    <section id="skills" className="relative px-6 py-24 max-w-7xl mx-auto w-full overflow-hidden">
      {/* Background neon orb */}
      <div className="absolute left-1/3 bottom-10 w-[250px] h-[250px] rounded-full bg-teal-500/5 blur-[80px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-xs font-mono text-teal-400 uppercase tracking-widest">
          02 // Core Competencies
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mt-2">
          Holographic Skill Matrix
        </h2>
        <p className="text-gray-400 mt-3 max-w-md mx-auto text-sm">
          Hover over each holographic card to load database stats and specific toolsets in 3D perspective.
        </p>
      </div>

      {/* Grid of Interactive Holographic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-center">
        {skillsData.map((skill, idx) => (
          <motion.div
            key={idx}
            style={{ transformStyle: 'preserve-3d' }}
            className={`glass-panel rounded-2xl p-6 border-white/5 shadow-md flex flex-col justify-between text-left transition-all duration-500 group ${skill.floatClass} ${skill.glowColor}`}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              transition: { duration: 0.3 }
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
          >
            {/* Top section */}
            <div 
              style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                {/* 3D icon container */}
                <div 
                  style={{ transform: 'translateZ(35px)' }}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors duration-300"
                >
                  {skill.icon}
                </div>
                
                {/* Tech bar progress */}
                <div 
                  style={{ transform: 'translateZ(20px)' }}
                  className="flex items-center space-x-2"
                >
                  <span className={`text-[10px] font-mono font-semibold ${skill.textColor}`}>
                    {skill.progress}%
                  </span>
                  <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full bg-current ${skill.textColor}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.5 }}
                    />
                  </div>
                </div>
              </div>

              {/* Title */}
              <h3 
                style={{ transform: 'translateZ(30px)' }}
                className="text-lg font-bold font-display text-white transition-colors duration-300"
              >
                {skill.title}
              </h3>

              {/* Sub-skills list */}
              <ul 
                style={{ transform: 'translateZ(15px)' }}
                className="space-y-2 border-t border-white/10 pt-4"
              >
                {skill.subSkills.map((sub, sIdx) => (
                  <li key={sIdx} className="flex items-center space-x-2">
                    <span className={`w-1.5 h-1.5 rounded-full bg-current opacity-70 ${skill.textColor}`} />
                    <span className="text-xs sm:text-sm text-gray-400 font-sans">{sub}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Micro scanlines overlay */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px]" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
