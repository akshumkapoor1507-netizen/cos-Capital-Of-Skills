import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft, User, Building2, Megaphone } from 'lucide-react';
import { UserRole } from '../types';
import Logo from './Logo';
import CosineOnboarding from './auth/CosineOnboarding';
import CompanyOnboarding from './auth/CompanyOnboarding';
import PosterOnboarding from './auth/PosterOnboarding';
import { useUserStore } from '../store/useUserStore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStep: 'signin' | 'cosine_signup' | 'poster_signup' | 'company_signup';
}

export default function AuthModal({ isOpen, onClose, initialStep }: AuthModalProps) {
  const [currentView, setCurrentView] = useState(initialStep);
  const { login, addToast } = useUserStore();

  useEffect(() => {
    setCurrentView(initialStep);
  }, [initialStep, isOpen]);

  if (!isOpen) return null;

  const handleBack = () => {
    setCurrentView('signin');
  };

  const handleComplete = (data: any, type: 'cosine' | 'company' | 'poster') => {
    login(data, type);
    addToast(`INITIALIZATION COMPLETE: ${type.toUpperCase()} IDENTITY ACTIVE`, 'success');
    onClose();
  };

  const renderSignIn = () => (
    <div className="flex flex-col gap-8">
      <div className="text-center mb-6">
        <h3 className="text-5xl font-black italic uppercase tracking-tighter mb-4 text-white">ACCESS PORTAL</h3>
        <p className="text-sm text-text-secondary opacity-70 font-mono tracking-widest uppercase">Select your path to the capital</p>
      </div>

      <div className="grid grid-cols-1 gap-5">
        <button 
          onClick={() => setCurrentView('cosine_signup')}
          className="flex items-center gap-6 p-6 glass border border-white/5 rounded-2xl hover:border-accent-red hover:bg-white/5 transition-all text-left group shadow-2xl relative overflow-hidden"
        >
          <div className="w-14 h-14 rounded-2xl bg-accent-red/10 flex items-center justify-center text-accent-red group-hover:bg-accent-red group-hover:text-white transition-all shadow-inner border border-accent-red/20">
            <User size={28} />
          </div>
          <div className="flex-1 relative z-10">
            <p className="font-black text-xl uppercase tracking-tight">COSINE / STUDENT</p>
            <p className="text-[10px] text-text-secondary uppercase tracking-widest opacity-60">Build verified portfolio</p>
          </div>
          <ArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-red/5 rounded-full blur-2xl -z-10 translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        <button 
          onClick={() => setCurrentView('company_signup')}
          className="flex items-center gap-6 p-6 glass border border-white/5 rounded-2xl hover:border-accent-slate hover:bg-white/5 transition-all text-left group shadow-2xl relative overflow-hidden"
        >
          <div className="w-14 h-14 rounded-2xl bg-accent-slate/10 flex items-center justify-center text-accent-slate group-hover:bg-accent-slate group-hover:text-white transition-all shadow-inner border border-accent-slate/20">
            <Building2 size={28} />
          </div>
          <div className="flex-1 relative z-10">
            <p className="font-black text-xl uppercase tracking-tight">COMPANY / PARTNER</p>
            <p className="text-[10px] text-text-secondary uppercase tracking-widest opacity-60">Hire verified talent</p>
          </div>
          <ArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-slate/5 rounded-full blur-2xl -z-10 translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        <button 
          onClick={() => setCurrentView('poster_signup')}
          className="flex items-center gap-6 p-6 glass border border-white/5 rounded-2xl hover:border-accent-red hover:bg-white/5 transition-all text-left group shadow-2xl relative overflow-hidden"
        >
          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-text-secondary group-hover:bg-white/10 group-hover:text-text-primary transition-all shadow-inner border border-white/5">
            <Megaphone size={28} />
          </div>
          <div className="flex-1 relative z-10">
            <p className="font-black text-xl uppercase tracking-tight">GIG POSTER</p>
            <p className="text-[10px] text-text-secondary uppercase tracking-widest opacity-60">Post basic gigs & tasks</p>
          </div>
          <ArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </button>
      </div>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
        <div className="relative flex justify-center text-[8px] font-black font-mono tracking-[0.4em] uppercase"><span className="bg-bg-primary px-4 text-text-secondary opacity-40">Identity Sync Protocol</span></div>
      </div>

      <div className="text-center">
        <p className="text-xs text-text-secondary">Already have an account? <button onClick={() => {}} className="text-white font-bold hover:underline">Log in</button></p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-bg-primary/95 backdrop-blur-md"
      />
      
      <motion.div 
        initial={{ y: 50, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 50, scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-xl glass border border-white/10 rounded-[48px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] flex flex-col max-h-[95vh]"
      >
        {/* Modal Header Controls */}
        <div className="flex items-center justify-between px-10 pt-10 pb-6 border-b border-white/5 relative z-10 shrink-0">
          <button 
            onClick={handleBack}
            className={`p-3 rounded-full glass hover:bg-white/5 transition-all shadow-lg ${currentView === 'signin' && 'opacity-0 pointer-events-none'}`}
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col items-center">
            <Logo size="sm" />
          </div>
          <button 
            onClick={onClose}
            className="p-3 rounded-full glass hover:bg-accent-red hover:text-white transition-all shadow-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-8 sm:p-12 overflow-y-auto custom-scrollbar flex-1 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              {currentView === 'signin' && renderSignIn()}
              {currentView === 'cosine_signup' && (
                <CosineOnboarding 
                  onComplete={(data) => handleComplete(data, 'cosine')} 
                  onBack={handleBack} 
                />
              )}
              {currentView === 'poster_signup' && (
                <PosterOnboarding 
                  onComplete={(data) => handleComplete(data, 'poster')} 
                  onBack={handleBack} 
                />
              )}
              {currentView === 'company_signup' && (
                <CompanyOnboarding 
                  onComplete={(data) => handleComplete(data, 'company')} 
                  onBack={handleBack} 
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Subtle Bottom Glow */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-bg-primary/80 to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
}
