import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Database, BarChart3, Mail, LineChart, ShieldCheck } from 'lucide-react';

const Github = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

function ProjectCard({ project, idx }) {
  const cardRef = useRef(null);

  // High-performance 3D tilt hover effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Cursor position relative to card boundaries
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Deviation from card center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Increased tilt calculations (max 18 degrees)
    const rotateX = ((centerY - y) / centerY) * 18;
    const rotateY = ((x - centerX) / centerX) * 18;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;
    card.style.transition = 'transform 0.1s ease-out';

    // Spotlight overlay movement
    const spotlight = card.querySelector('.card-spotlight');
    if (spotlight) {
      spotlight.style.background = `radial-gradient(300px circle at ${x}px ${y}px, rgba(45, 212, 191, 0.15), transparent 80%)`;
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.transition = 'transform 0.5s ease-out';

    const spotlight = card.querySelector('.card-spotlight');
    if (spotlight) {
      spotlight.style.background = 'transparent';
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
      className={`glass-panel rounded-2xl overflow-hidden border-white/5 flex flex-col h-full transition-all duration-300 hover:border-teal-500/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] relative`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
    >
      {/* Spotlight layer */}
      <div className="card-spotlight absolute inset-0 pointer-events-none transition-all duration-300 z-30" />

      {/* Schematic Graphic Header */}
      <div 
        style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
        className={`h-48 relative flex items-center justify-center overflow-hidden border-b border-white/5 bg-gradient-to-br ${project.headerBg}`}
      >
        {/* Abstract grids */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] opacity-40" />
        
        {/* Holographic glowing orb in the card header */}
        <div className="absolute w-24 h-24 rounded-full bg-white/5 blur-xl group-hover:scale-125 transition-transform duration-500" />
        
        {/* Custom project schema display */}
        <div 
          style={{ transform: 'translateZ(45px)' }}
          className="relative z-10 scale-110"
        >
          {project.headerVisual}
        </div>

        {/* Project Tag */}
        <div 
          style={{ transform: 'translateZ(20px)' }}
          className="absolute bottom-4 left-4 glass-panel px-2.5 py-1 rounded-md border-white/5"
        >
          <span className="text-[10px] font-mono tracking-widest text-teal-300 uppercase">{project.category}</span>
        </div>
      </div>

      {/* Content Body */}
      <div 
        style={{ transform: 'translateZ(25px)' }}
        className="p-6 flex flex-col flex-grow justify-between text-left space-y-4"
      >
        <div className="space-y-2">
          <h3 className="text-xl font-bold font-display text-white group-hover:text-teal-400 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans min-h-[60px]">
            {project.description}
          </p>
        </div>

        {/* Tech tags */}
        <div 
          style={{ transform: 'translateZ(15px)' }}
          className="space-y-4"
        >
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag, tIdx) => (
              <span key={tIdx} className="glass-panel px-2.5 py-1 rounded text-[10px] font-mono text-gray-300 border-white/5">
                {tag}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-2">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 text-xs font-mono text-gray-400 hover:text-white transition-colors duration-200"
            >
              <Github className="w-4 h-4" />
              <span>Repository</span>
            </a>

            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 text-xs font-mono text-teal-400 hover:text-teal-300 transition-colors duration-200"
            >
              <span>Live Preview</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const projectsData = [
    {
      title: "AI Inventory Management System",
      category: "AI & Auditing",
      description: "AI-driven supply chain modeling tool using neural networks for forecasting inventory demands, preventing stockouts, and scheduling automated order dispatch protocols.",
      tags: ["React.js", "Python", "FastAPI", "OpenAI API", "Pandas"],
      headerBg: "from-teal-900/40 to-slate-900/60",
      githubLink: "https://github.com",
      liveLink: "https://github.com",
      headerVisual: (
        <div className="flex flex-col items-center space-y-2">
          <Database className="w-12 h-12 text-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]" />
          <div className="text-[10px] font-mono text-teal-300 tracking-wider">PREDICTIVE_SUPPLY_CHAIN</div>
        </div>
      )
    },
    {
      title: "Advanced Excel Sales Dashboard",
      category: "Excel & Data Modelling",
      description: "Tactical performance dashboard mapping over 50,000 retail sales invoices. Implements full Power Query ETL pipelines, complex DAX parameters, and automated VBA sorting macros.",
      tags: ["MS Excel", "Power Query", "VBA Macros", "DAX", "Data Viz"],
      headerBg: "from-emerald-900/40 to-slate-900/60",
      githubLink: "https://github.com",
      liveLink: "https://github.com",
      headerVisual: (
        <div className="flex flex-col items-center space-y-2">
          <BarChart3 className="w-12 h-12 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
          <div className="text-[10px] font-mono text-emerald-300 tracking-wider">50K_RECORD_PERFORMANCE</div>
        </div>
      )
    },
    {
      title: "Automated Reporting System",
      category: "Automation & Audit",
      description: "Corporate ledger reporting automation. Script parses transactions, executes audits against compliance rules, compiles PDF/Excel balance sheets, and issues SMTP updates.",
      tags: ["Python", "OpenPyXL", "SMTP Protocol", "ReportLab", "Automated Task"],
      headerBg: "from-blue-900/40 to-slate-900/60",
      githubLink: "https://github.com",
      liveLink: "https://github.com",
      headerVisual: (
        <div className="flex flex-col items-center space-y-2">
          <Mail className="w-12 h-12 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
          <div className="text-[10px] font-mono text-blue-300 tracking-wider">LEDGER_COMPLIANCE_CRON</div>
        </div>
      )
    },
    {
      title: "Business Analytics Dashboard",
      category: "BI & Corporate Stats",
      description: "A real-time executive dashboard offering key commercial KPIs: Revenue CAGR tracking, cost-center overhead assessments, and predictive customer lifetime value ratios.",
      tags: ["React.js", "Tailwind CSS", "Recharts", "Webhooks", "JSON Schema"],
      headerBg: "from-indigo-900/40 to-slate-900/60",
      githubLink: "https://github.com",
      liveLink: "https://github.com",
      headerVisual: (
        <div className="flex flex-col items-center space-y-2">
          <LineChart className="w-12 h-12 text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.5)]" />
          <div className="text-[10px] font-mono text-indigo-300 tracking-wider">OVERHEAD_CAGR_ANALYZER</div>
        </div>
      )
    },
    {
      title: "Finance Tracking System",
      category: "Personal Finance",
      description: "Secured local ledger analyzing portfolio asset allocations, budget deviation indexes, and compound returns projection matrices. Stores data in locally encrypted client schemas.",
      tags: ["React.js", "Framer Motion", "LocalStorage", "Client Encrypted"],
      headerBg: "from-purple-900/40 to-slate-900/60",
      githubLink: "https://github.com",
      liveLink: "https://github.com",
      headerVisual: (
        <div className="flex flex-col items-center space-y-2">
          <ShieldCheck className="w-12 h-12 text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.5)]" />
          <div className="text-[10px] font-mono text-purple-300 tracking-wider">CLIENT_LEDGER_ENCRYPT</div>
        </div>
      )
    }
  ];

  return (
    <section id="projects" className="relative px-6 py-24 max-w-7xl mx-auto w-full">
      {/* Background neon highlight */}
      <div className="absolute right-10 top-10 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-xs font-mono text-teal-400 uppercase tracking-widest">
          03 // Creative Work
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mt-2">
          Featured Analytics Projects
        </h2>
        <p className="text-gray-400 mt-3 max-w-md mx-auto text-sm">
          A showcase of systems solving commercial, auditing, and financial bottlenecks using technology.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-stretch">
        {projectsData.map((project, idx) => (
          <div key={idx} className="group">
            <ProjectCard project={project} idx={idx} />
          </div>
        ))}
      </div>
    </section>
  );
}
