
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, User, Zap, Target, Users } from 'lucide-react';
import LandingPage from './components/LandingPage';
import AuthModal from './components/AuthModal';
import CosineDashboard from './components/CosineDashboard';
import CompanyDashboard from './components/CompanyDashboard';
import PosterDashboard from './components/PosterDashboard';
import ThemeToggle from './components/ThemeToggle';
import Logo from './components/Logo';
import ToastContainer from './components/ToastContainer';
import { useUserStore } from './store/useUserStore';
import { PipelineProvider } from './contexts/PipelineContext';

export default function App() {
  const { isLoggedIn, userType, logout, theme } = useUserStore();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authStep, setAuthStep] = useState<'signin' | 'cosine_signup' | 'poster_signup' | 'company_signup'>('signin');
  const [featureInfo, setFeatureInfo] = useState<{ title: string; description: string; icon: string; color: string } | null>(null);
  
  useEffect(() => {
    // Sync theme with body class and storage
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const openAuth = (type: 'signin' | 'cosine_signup' | 'poster_signup' | 'company_signup') => {
    setAuthStep(type);
    setIsAuthModalOpen(true);
    setFeatureInfo(null);
  };

  const handleFeatureClick = (feature: 'gigs' | 'academia' | 'arenas') => {
    const data = {
      gigs: {
        title: 'GIGS MARKETPLACE',
        description: 'Access real-world projects, earn competitive pay, and build your Cos Cred through verified proof-of-work.',
        icon: 'Zap',
        color: 'text-accent-red'
      },
      academia: {
        title: 'ACADEMIA PROGRESSION',
        description: 'The ultimate professional ladder for students. Moving from peer-to-peer gigs to exclusive high-stakes startup internships and placement opportunities.',
        icon: 'Target',
        color: 'text-accent-slate'
      },
      arenas: {
        title: 'ARENAS & HACKATHONS',
        description: 'Company-hosted competitive arenas. Win hackathons, solve bounties, and scale your global profile by competing against top-tier talent.',
        icon: 'Users',
        color: 'text-accent-amber'
      }
    };
    setFeatureInfo(data[feature]);
  };

  return (
    <PipelineProvider>
      <div className="min-h-screen selection-red">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border-custom px-6 py-4 flex items-center justify-between">
        <div 
          className="flex items-center gap-4 cursor-pointer group"
          onClick={() => {}}
        >
          <Logo size="sm" />
          <span className="font-display text-xl font-bold tracking-tight hidden sm:block">
            CAPITAL OF SKILLS
          </span>
        </div>

        <div className="flex items-center gap-6">
          {!isLoggedIn && (
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <button 
                onClick={() => handleFeatureClick('gigs')} 
                className="hover:text-accent-red transition-colors cursor-pointer uppercase font-black tracking-widest text-[10px]"
              >
                GIGS
              </button>
              <button 
                onClick={() => handleFeatureClick('academia')} 
                className="hover:text-accent-red transition-colors cursor-pointer uppercase font-black tracking-widest text-[10px]"
              >
                ACADEMIA
              </button>
              <button 
                onClick={() => handleFeatureClick('arenas')} 
                className="hover:text-accent-red transition-colors cursor-pointer uppercase font-black tracking-widest text-[10px]"
              >
                ARENAS
              </button>
            </div>
          )}
          
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {!isLoggedIn ? (
              <button 
                onClick={() => openAuth('signin')}
                className="px-5 py-2 rounded-full bg-accent-red text-white font-medium text-sm hover:scale-105 transition-all shadow-lg shadow-accent-red/20"
              >
                Log In
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <button 
                  onClick={logout}
                  className="text-sm font-medium text-text-secondary hover:text-text-primary"
                >
                  Log Out
                </button>
                <div className="w-10 h-10 rounded-full border-2 border-accent-red overflow-hidden bg-bg-surface flex items-center justify-center">
                  <User className="text-text-secondary" size={20} />
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <ToastContainer />

      {/* Main Content */}
      <main className="pt-20">
        <AnimatePresence mode="wait">
          {!isLoggedIn ? (
            <LandingPage 
              onJoin={() => openAuth('cosine_signup')} 
              onPost={() => openAuth('poster_signup')} 
              onCompany={() => openAuth('company_signup')} 
            />
          ) : (
            <motion.div
              key={userType}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {userType === 'cosine' && <CosineDashboard />}
              {userType === 'company' && <CompanyDashboard />}
              {userType === 'poster' && <PosterDashboard />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialStep={authStep}
      />

      {/* Feature Info Modal */}
      <AnimatePresence>
        {featureInfo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFeatureInfo(null)}
              className="absolute inset-0 bg-bg-primary/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg glass-card p-12 border border-white/10 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6">
                <button 
                  onClick={() => setFeatureInfo(null)}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                >
                  ESC
                </button>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className={`w-20 h-20 rounded-3xl glass border border-white/10 mb-8 flex items-center justify-center ${featureInfo.color}`}>
                  {featureInfo.icon === 'Zap' && <Zap size={40} />}
                  {featureInfo.icon === 'Target' && <Target size={40} />}
                  {featureInfo.icon === 'Users' && <Users size={40} />}
                </div>
                
                <h3 className="text-4xl font-black italic uppercase mb-6 tracking-tighter">
                  {featureInfo.title}
                </h3>
                
                <p className="text-lg text-text-secondary leading-relaxed mb-10">
                  {featureInfo.description}
                </p>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

                <div className="space-y-4 w-full">
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-accent-red">
                    Authentication Required
                  </p>
                  <button
                    onClick={() => openAuth('signin')}
                    className="w-full py-5 bg-text-primary text-bg-primary rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] transition-all shadow-xl"
                  >
                    Login to Access Feature
                  </button>
                  <button
                    onClick={() => setFeatureInfo(null)}
                    className="w-full py-4 text-text-secondary hover:text-text-primary text-xs font-bold uppercase tracking-widest transition-colors"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>

              {/* Decorative Background Elements */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent-red/10 blur-[100px] rounded-full -z-10" />
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent-slate/10 blur-[100px] rounded-full -z-10" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ToastContainer />

      {/* Footer (Simple) */}
      <footer className="border-t border-border-custom py-12 px-6 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <Logo size="sm" />
              <span className="text-xs text-text-secondary font-mono">v1.0.0</span>
            </div>
            <p className="text-sm text-text-secondary">cos = better / hired</p>
          </div>
        </div>
      </footer>
    </div>
    </PipelineProvider>
  );
}
