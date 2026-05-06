import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Zap, Target, Users, CheckCircle2, Star, Building2 } from 'lucide-react';
import Logo from './Logo';

interface LandingPageProps {
  onJoin: () => void;
  onPost: () => void;
  onCompany: () => void;
}

export default function LandingPage({ onJoin, onPost, onCompany }: LandingPageProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsExpanded(prev => !prev);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full max-w-6xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="relative mb-16 flex flex-col items-center w-full"
        >
          <div className="flex flex-col items-center justify-center gap-6">
            <h2 className="text-4xl sm:text-7xl font-display font-black uppercase tracking-tighter text-text-primary flex flex-wrap items-center justify-center gap-4 sm:gap-8">
              <div className="flex items-center gap-4 sm:gap-8">
                <Logo size="lg" className="scale-75 sm:scale-100" />
                <span className="opacity-90">=</span>
              </div> 
              <motion.div 
                layout
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="flex items-center gap-2 sm:gap-4 bg-bg-secondary/40 px-6 sm:px-10 py-2 sm:py-4 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden"
              >
                {/* Visual line separating the fraction */}
                <div className="flex items-center">
                  <motion.span layout className="inline-block">B</motion.span>
                  <AnimatePresence mode="popLayout">
                    {isExpanded && (
                      <motion.span
                        key="etter"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                        className="inline-block lowercase text-text-secondary"
                      >
                        etter
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                
                <motion.span layout className="text-accent-red font-light opacity-50 block mx-1 sm:mx-2">/</motion.span>
                
                <div className="flex items-center">
                  <motion.span layout className="inline-block">H</motion.span>
                  <AnimatePresence mode="popLayout">
                    {isExpanded && (
                      <motion.span
                        key="ired"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                        className="inline-block lowercase text-text-secondary"
                      >
                        ired
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {/* Subtle highlight effect */}
                <motion.div 
                  animate={{ 
                    x: isExpanded ? ['-100%', '200%'] : '-100%',
                    opacity: isExpanded ? [0, 0.5, 0] : 0
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
                />
              </motion.div>
            </h2>
          </div>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl text-xl text-text-secondary mb-16 leading-relaxed"
        >
          The verified skill-portfolio and gig marketplace for university students in India. 
          welcome to the GOAT of portfolios
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          <button 
            onClick={onJoin}
            className="group px-10 py-5 bg-accent-red text-white flex items-center gap-3 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-accent-red/40 cursor-pointer uppercase tracking-tight"
          >
            JOIN AS COSINE
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={onPost}
            className="px-10 py-5 glass border border-text-primary/20 text-text-primary flex items-center gap-3 rounded-2xl font-black text-xl hover:bg-text-primary hover:text-bg-primary transition-all cursor-pointer uppercase tracking-tight"
          >
            POST A GIG
          </button>
        </motion.div>

        {/* Floating Accents */}
        <div className="absolute -z-10 top-0 left-1/4 w-96 h-96 bg-accent-red/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute -z-10 bottom-0 right-1/4 w-[500px] h-[500px] bg-accent-slate/15 blur-[180px] rounded-full" />
      </section>

      {/* Cos Cred Section */}
      <section className="w-full bg-bg-secondary/40 backdrop-blur-sm py-32 border-y border-white/5 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-20">
          <div className="flex-1">
            <h3 className="text-5xl sm:text-7xl font-black italic uppercase mb-8 tracking-tighter">THE <span className="text-accent-red">COS</span> CRED</h3>
            <p className="text-xl text-text-secondary leading-relaxed mb-10 opacity-90">
              No more fake resumes. Every gig you complete on COS impacts your collective Cos Cred. 
              Verified by clients, on-time delivery metrics, and peer reviews.
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-5 p-4 rounded-2xl glass-card max-w-sm">
                <div className="w-14 h-14 rounded-xl bg-accent-deep-green/20 flex items-center justify-center text-accent-deep-green border border-accent-deep-green/20">
                  <CheckCircle2 size={28} />
                </div>
                <div>
                  <span className="block font-mono text-sm font-black tracking-widest text-accent-deep-green">VERIFIED DELIVERY</span>
                  <span className="text-xs text-text-secondary uppercase">30% Weightage</span>
                </div>
              </div>
              <div className="flex items-center gap-5 p-4 rounded-2xl glass-card max-w-sm">
                <div className="w-14 h-14 rounded-xl bg-accent-amber/20 flex items-center justify-center text-accent-amber border border-accent-amber/20">
                  <Star size={28} />
                </div>
                <div>
                  <span className="block font-mono text-sm font-black tracking-widest text-accent-amber">CLIENT RATING</span>
                  <span className="text-xs text-text-secondary uppercase">30% Weightage</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-80 h-80 group">
               <svg className="trust-score-ring w-full h-full drop-shadow-[0_0_20px_rgba(242,0,60,0.3)]" viewBox="0 0 100 100">
                  <circle
                    className="text-bg-surface stroke-current opacity-20"
                    strokeWidth="8"
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                  ></circle>
                  <motion.circle
                    className="text-accent-red stroke-current"
                    initial={{ strokeDashoffset: 282.6 }}
                    animate={{ strokeDashoffset: 28.26 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    strokeWidth="8"
                    strokeDasharray="282.6"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                  ></motion.circle>
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="font-mono text-6xl font-black tracking-tighter">9.0</span>
                 <span className="text-[10px] text-accent-amber font-black tracking-[0.2em] uppercase">CRED TIER</span>
               </div>
               <div className="absolute -inset-4 bg-accent-red/5 rounded-full blur-2xl -z-10 group-hover:bg-accent-red/10 transition-all" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full max-w-6xl mx-auto px-6 py-32">
        <div className="text-center mb-20">
          <h3 className="text-7xl font-black uppercase tracking-tighter italic mb-4">ONE PLATFORM.</h3>
          <h4 className="text-5xl font-black uppercase tracking-tighter opacity-40">THREE PILLARS.</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Zap size={32} className="text-accent-red" />}
            title="GIGS"
            description="Direct hire or marketplace bidding. Real projects, real money, real experience points."
          />
          <FeatureCard 
            icon={<Target size={32} className="text-accent-slate" />}
            title="ACADEMIA"
            description="The progression ladder. From peer-to-peer gigs to high-stakes startup internships."
          />
          <FeatureCard 
            icon={<Users size={32} className="text-accent-amber" />}
            title="ARENAS"
            description="Company-hosted hackathons. Scale your profile by winning against the best talent."
          />
        </div>
      </section>

      {/* Corporate Call to Action */}
      <section className="w-full py-24 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto glass rounded-[40px] p-16 flex flex-col items-center text-center relative z-10 border border-white/10 shadow-2xl">
          <Building2 size={72} className="mb-8 text-accent-slate opacity-80" />
          <h3 className="text-6xl font-black italic uppercase mb-6 tracking-tighter">HIRING PARTNER?</h3>
          <p className="text-xl mb-12 text-text-secondary max-w-xl">
            Access the Academia section. Browse verified portfolios with proof-of-work traction metrics.
          </p>
          <button 
            onClick={onCompany}
            className="px-12 py-5 bg-accent-slate text-white font-black rounded-2xl hover:scale-105 transition-all cursor-pointer uppercase tracking-tight shadow-xl shadow-accent-slate/30"
          >
            PARTNER WITH COS
          </button>
        </div>
        <div className="absolute inset-0 bg-accent-slate/5 -z-10" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent-slate/10 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2" />
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-10 glass-card group">
      <div className="w-16 h-16 rounded-2xl glass border border-white/10 flex items-center justify-center mb-8 group-hover:bg-accent-red group-hover:text-white transition-all shadow-lg">
        {icon}
      </div>
      <h4 className="text-3xl font-black uppercase mb-4 tracking-tight">{title}</h4>
      <p className="text-text-secondary leading-relaxed opacity-80">
        {description}
      </p>
    </div>
  );
}
