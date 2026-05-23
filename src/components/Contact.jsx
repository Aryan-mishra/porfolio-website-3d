import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Terminal, CheckCircle2 } from 'lucide-react';

const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Github = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Instagram = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    
    setIsSubmitting(true);
    
    // Check if we are running locally or live on Netlify
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    try {
      let response;
      if (isLocal) {
        // Send to local Express backend
        response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formState),
        });
      } else {
        // Send URL-encoded parameters to Netlify's root path
        const encode = (data) => {
          return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
        };
        
        response = await fetch('/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: encode({ 'form-name': 'contact', ...formState }),
        });
      }

      if (response.ok) {
        setSubmitted(true);
        setFormState({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000); // hide success message after 5s
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(`Uplink failed: ${errorData.error || 'Server error'}`);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Network error. Please make sure the uplink is online.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="relative px-6 py-24 max-w-5xl mx-auto w-full">
      {/* Background orbs */}
      <div className="absolute right-1/4 bottom-1/4 w-[350px] h-[350px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute left-1/4 top-1/3 w-[300px] h-[300px] rounded-full bg-teal-500/5 blur-[90px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-xs font-mono text-teal-400 uppercase tracking-widest">
          05 // Contact Interface
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mt-2">
          Secure Portal Uplink
        </h2>
        <p className="text-gray-400 mt-3 max-w-md mx-auto text-sm">
          Send a structured message. Direct access to analytical database integration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        
        {/* Left Info Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8 text-left">
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl border-white/5 space-y-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <Terminal className="w-5 h-5 text-teal-400" />
                <h3 className="font-mono text-xs text-teal-300 tracking-wider">UPLINK_SPECIFICATIONS</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed font-sans">
                You can reach out for internships, project collaborations, data dashboards design, or custom AI accounting systems.
              </p>
              
              <div className="space-y-2 border-t border-white/10 pt-4">
                <span className="text-xs font-mono text-gray-500 block">ENCRYPTION: AES-256</span>
                <span className="text-xs font-mono text-gray-500 block">LOCATION: MISHRA JI // INDIA</span>
                <span className="text-xs font-mono text-gray-500 block">COGNITIVE_LOAD: OPTIMIZED</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs text-gray-500 uppercase tracking-wider">Social Nodes</h4>
            <div className="flex space-x-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-4 rounded-xl glass-panel border-white/5 hover:border-teal-500/30 hover:shadow-[0_0_15px_rgba(45,212,191,0.2)] text-gray-400 hover:text-teal-400 transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>

              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-4 rounded-xl glass-panel border-white/5 hover:border-blue-500/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>

              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-4 rounded-xl glass-panel border-white/5 hover:border-purple-500/30 hover:shadow-[0_0_15px_rgba(167,139,250,0.2)] text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <motion.div 
          className="lg:col-span-7 glass-panel rounded-2xl p-8 border-white/5 relative shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            name="contact"
            data-netlify="true"
          >
            {/* Hidden field required for Netlify Forms detection */}
            <input type="hidden" name="form-name" value="contact" />
            
            {/* Name Input */}
            <div className="text-left space-y-1.5">
              <label htmlFor="name" className="text-xs font-mono text-gray-400 uppercase tracking-widest">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                required
                placeholder="e.g. John Doe"
                className="w-full px-4 py-3 rounded-xl bg-slate-950/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-teal-500/50 focus:shadow-[0_0_12px_rgba(45,212,191,0.15)] transition-all duration-300 text-sm font-sans"
              />
            </div>

            {/* Email Input */}
            <div className="text-left space-y-1.5">
              <label htmlFor="email" className="text-xs font-mono text-gray-400 uppercase tracking-widest">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                required
                placeholder="e.g. john@company.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-950/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:shadow-[0_0_12px_rgba(59,130,246,0.15)] transition-all duration-300 text-sm font-sans"
              />
            </div>

            {/* Subject Input */}
            <div className="text-left space-y-1.5">
              <label htmlFor="subject" className="text-xs font-mono text-gray-400 uppercase tracking-widest">Subject</label>
              <input
                id="subject"
                type="text"
                name="subject"
                value={formState.subject}
                onChange={handleInputChange}
                placeholder="e.g. Internship Proposal"
                className="w-full px-4 py-3 rounded-xl bg-slate-950/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-teal-500/50 focus:shadow-[0_0_12px_rgba(45,212,191,0.15)] transition-all duration-300 text-sm font-sans"
              />
            </div>

            {/* Message Textarea */}
            <div className="text-left space-y-1.5">
              <label htmlFor="message" className="text-xs font-mono text-gray-400 uppercase tracking-widest">Message</label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleInputChange}
                required
                rows="4"
                placeholder="Type your transmission details..."
                className="w-full px-4 py-3 rounded-xl bg-slate-950/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:shadow-[0_0_12px_rgba(167,139,250,0.15)] transition-all duration-300 text-sm font-sans resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 font-medium text-white transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(45,212,191,0.3)] flex items-center justify-center space-x-2 border border-teal-400/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden`}
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span className="font-mono text-xs tracking-wider uppercase">Transmitting Data...</span>
                </>
              ) : (
                <>
                  <span className="font-mono text-sm uppercase tracking-wider">Initialize Transmission</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Success Overlay */}
          <AnimatePresence>
            {submitted && (
              <motion.div 
                className="absolute inset-0 bg-[#030712]/90 rounded-2xl flex flex-col items-center justify-center space-y-4 z-20 border border-teal-500/20"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <CheckCircle2 className="w-16 h-16 text-teal-400 animate-pulse drop-shadow-[0_0_10px_rgba(45,212,191,0.5)]" />
                <div className="text-center space-y-1">
                  <h4 className="text-lg font-bold text-white font-display">Transmission Complete</h4>
                  <p className="text-xs font-mono text-teal-400 uppercase tracking-widest">UPLINK_ESTABLISHED // MESSAGE_SENT</p>
                </div>
                <p className="text-xs text-gray-400 max-w-xs text-center font-sans">
                  The analytical ledger has compiled your submission. Response queue is active.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
