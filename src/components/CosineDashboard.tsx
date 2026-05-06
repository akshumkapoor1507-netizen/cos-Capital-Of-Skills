import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, Search, Briefcase, Trophy, Terminal, BarChart3, 
  CheckCircle2, Star, PlusCircle, Filter, ChevronRight, Clock, Banknote, X, Info, Github, User, Settings
} from 'lucide-react';
import { SAMPLE_GIGS, SAMPLE_COSINES } from '../constants/data';
import { Gig } from '../types';
import { useUserStore } from '../store/useUserStore';
import DashboardProfile from './DashboardProfile';

export default function CosineDashboard() {
  const { cosineProfile, theme } = useUserStore();
  const [activeTab, setActiveTab] = useState<'feed' | 'my-gigs' | 'portfolio' | 'academia' | 'builds' | 'profile'>('feed');
  const [selectedGig, setSelectedGig] = useState<Gig | null>(null);
  const [showCredExplainer, setShowCredExplainer] = useState(false);
  const [showGithubBanner, setShowGithubBanner] = useState(true);

  const stats = {
    completed: 12,
    active: 3,
    earnings: '₹14,500'
  };

  const displayName = cosineProfile?.fullName || 'COSINE UNIT';
  const displayCollege = cosineProfile?.university || 'INSTITUTION PENDING';
  const displayYear = cosineProfile ? `Year ${cosineProfile.yearOfStudy}` : 'STATUS PENDING';

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12 min-h-[calc(100vh-120px)]">
      {/* Sidebar */}
      <aside className="w-full lg:w-72 flex flex-col gap-8">
        <div className="glass p-8 rounded-3xl border border-white/5 flex flex-col items-center relative overflow-hidden group">
          <button 
            onClick={() => setShowCredExplainer(true)}
            className="absolute top-5 right-5 text-text-secondary hover:text-accent-red transition-colors z-10"
          >
            <Info size={18} />
          </button>
          <div className="relative w-36 h-36 mb-6">
             <svg className="cred-ring w-full h-full" viewBox="0 0 100 100">
                <circle className="text-white/5 stroke-current" strokeWidth="8" cx="50" cy="50" r="42" fill="transparent" />
                <circle className="text-accent-red stroke-current" strokeWidth="8" strokeDasharray="264" strokeDashoffset="48" strokeLinecap="round" cx="50" cy="50" r="42" fill="transparent" />
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-mono text-3xl font-black tracking-tight">{cosineProfile?.cosCred || '8.2'}</span>
                <span className="text-[10px] text-accent-amber font-bold tracking-widest uppercase mt-0.5">Cred</span>
             </div>
          </div>
          <h4 className="font-black text-2xl uppercase tracking-tight text-center">{displayName}</h4>
          <p className="text-xs text-text-secondary text-center uppercase tracking-widest opacity-60">{displayCollege} • {displayYear}</p>
          
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent-red/5 rounded-full blur-2xl" />
        </div>

        <div className="grid grid-cols-1 gap-3">
          <StatItem label="Gigs Completed" value={stats.completed.toString()} color="text-text-primary" />
          <StatItem label="Active Status" value={stats.active.toString()} color="text-accent-red" />
          <StatItem label="Total Earnings" value={stats.earnings} color="text-accent-deep-green" themeColor="light" />
        </div>

        <nav className="flex flex-col gap-2 p-2 glass rounded-2xl border border-white/5">
          <MenuTab active={activeTab === 'feed'} onClick={() => setActiveTab('feed')} icon={<Search size={18} />} label="Gig Feed" />
          <MenuTab active={activeTab === 'my-gigs'} onClick={() => setActiveTab('my-gigs')} icon={<Briefcase size={18} />} label="My Active" />
          <MenuTab active={activeTab === 'portfolio'} onClick={() => setActiveTab('portfolio')} icon={<CheckCircle2 size={18} />} label="Portfolio" />
          <MenuTab active={activeTab === 'academia'} onClick={() => setActiveTab('academia')} icon={<Trophy size={18} />} label="Academia" />
          <MenuTab active={activeTab === 'builds'} onClick={() => setActiveTab('builds')} icon={<Terminal size={18} />} label="Builds" />
          <MenuTab active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={<Settings size={18} />} label="Identity" />
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full">
        <AnimatePresence>
          {showGithubBanner && activeTab === 'portfolio' && (
            <motion.div 
              initial={{ height: 0, opacity: 0, marginBottom: 0 }}
              animate={{ height: 'auto', opacity: 1, marginBottom: 32 }}
              exit={{ height: 0, opacity: 0, marginBottom: 0 }}
              className="p-8 glass bg-gradient-to-r from-accent-slate/40 to-bg-secondary/40 text-white rounded-3xl flex items-center justify-between gap-8 relative overflow-hidden group border border-white/10"
            >
               <div className="flex items-center gap-6 relative z-10">
                  <div className="p-4 glass-card bg-white/10 rounded-2xl">
                    <Github size={36} className="opacity-90" />
                  </div>
                  <div>
                    <h4 className="font-black text-2xl uppercase tracking-tight">SYNC YOUR PROOF-OF-WORK</h4>
                    <p className="text-sm opacity-70 max-w-sm">We'll auto-import repos where you're a primary contributor and factor them into your Cos Cred.</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 relative z-10">
                 <button className="px-6 py-3 bg-white text-accent-slate text-sm font-black rounded-xl hover:scale-105 transition-all uppercase tracking-tight">CONNECT GITHUB</button>
                 <button onClick={() => setShowGithubBanner(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={20} /></button>
               </div>
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between mb-10">
          <h2 className="text-6xl font-black italic uppercase tracking-tighter">{activeTab.replace('-', ' ')}</h2>
          {activeTab === 'builds' && (
            <button className="flex items-center gap-2 px-6 py-3 bg-text-primary text-bg-primary rounded-xl text-sm font-black hover:scale-105 transition-all uppercase tracking-tight">
              <PlusCircle size={20} /> ADD BUILD
            </button>
          )}
        </div>

        {activeTab === 'feed' && (
          <div className="flex flex-col gap-10">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                <input 
                  type="text" 
                  placeholder="Search live opportunities by skill, budget or keyword..." 
                  className="w-full pl-14 pr-6 py-4 glass bg-bg-surface/30 rounded-2xl border border-white/5 focus:border-accent-red outline-none text-lg"
                />
              </div>
              <button className="p-4 glass rounded-2xl border border-white/5 hover:border-accent-red transition-all group">
                <Filter size={20} className="text-text-secondary group-hover:text-accent-red transition-colors" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {SAMPLE_GIGS.map(gig => (
                <div key={gig.id}>
                  <GigCard gig={gig} onClick={() => setSelectedGig(gig)} />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="space-y-8">
             <div className="p-12 glass border border-white/5 border-dashed rounded-[32px] text-center bg-bg-secondary/20">
               <p className="text-xl text-text-secondary font-medium mb-6 opacity-70">
                 Documenting your journey through verified proof of work.
               </p>
               <button className="text-accent-red text-sm font-black uppercase tracking-widest hover:underline animate-pulse">Syncing Active Gigs...</button>
             </div>
             
             <div className="grid grid-cols-1 gap-4">
               {[
                 { title: 'UI Kit for Fintech Startup', skill: 'Figma', client: 'Razorpay', delta: '+0.3 ✦', date: 'Oct ' + 12 },
                 { title: 'Video Editing for Gaming Channel', skill: 'Premiere Pro', client: 'CarryMinati', delta: '+0.2 ✦', date: 'Sept ' + 30 },
                 { title: 'Backend API for Hackathon', skill: 'Python', client: 'DevsInc', delta: '+0.4 ✦', date: 'Sept ' + 15 }
               ].map((item, idx) => (
                 <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-8 glass-card flex items-center justify-between group hover:border-accent-red transition-all cursor-pointer shadow-xl hover:shadow-accent-red/5"
                 >
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl glass bg-bg-secondary/40 flex items-center justify-center font-black text-xl text-accent-red border border-white/5">
                        {item.skill[0]}
                      </div>
                      <div>
                        <h4 className="font-black text-2xl uppercase tracking-tight flex items-center gap-3">
                          {item.title}
                          <CheckCircle2 size={16} className="text-accent-mint" />
                        </h4>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-[10px] font-mono font-bold text-accent-red tracking-widest uppercase">{item.skill}</span>
                          <span className="w-1 h-1 bg-white/20 rounded-full" />
                          <span className="text-xs text-text-secondary italic opacity-60">Client: {item.client}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="block font-mono text-lg text-accent-deep-green font-bold tracking-tighter">{item.delta}</span>
                      <span className="text-[10px] text-text-secondary uppercase tracking-widest opacity-60 font-bold">{item.date}</span>
                    </div>
                 </motion.div>
               ))}
             </div>
          </div>
        )}

        {activeTab === 'academia' && (
           <div className="flex flex-col items-center justify-center py-32 text-center">
              <Trophy size={96} className="text-accent-amber mb-10 opacity-20" />
              <h3 className="text-5xl font-black italic uppercase mb-6">THE LADDER</h3>
              <p className="text-xl text-text-secondary max-w-lg leading-relaxed mb-8">
                Unlock high-stakes startup internships and placement opportunities by growing your Cos Cred. 
              </p>
              <div className="px-8 py-3 glass rounded-full border border-accent-red/20 text-accent-red font-black text-sm uppercase tracking-widest">
                Target Score: 8.5+ ✦
              </div>
           </div>
        )}

        {activeTab === 'profile' && (
          <DashboardProfile />
        )}

        {activeTab === 'builds' && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-12 glass-card border-2 border-dashed border-white/5 flex flex-col items-center justify-center gap-6 hover:border-accent-red hover:bg-bg-surface/40 cursor-pointer text-center group shadow-2xl">
                 <div className="w-20 h-20 rounded-3xl bg-accent-red/10 flex items-center justify-center text-accent-red group-hover:scale-110 transition-transform shadow-inner">
                   <PlusCircle size={40} />
                 </div>
                 <div className="space-y-2">
                  <p className="text-2xl font-black uppercase tracking-tight">Document Project</p>
                  <p className="text-sm text-text-secondary max-w-[200px] mx-auto opacity-70">GitHub repo traction, live links, and performance metrics.</p>
                 </div>
              </div>
           </div>
        )}
      </main>

      {/* Gig Detail Modal */}
      <AnimatePresence>
        {selectedGig && (
          <GigDetailModal gig={selectedGig} onClose={() => setSelectedGig(null)} />
        )}
      </AnimatePresence>

      {/* Cos Cred Explainer Modal */}
      <AnimatePresence>
        {showCredExplainer && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-bg-primary/95 backdrop-blur-md" 
               onClick={() => setShowCredExplainer(false)} 
             />
             <motion.div 
               initial={{ scale: 0.9, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 20 }}
               className="relative w-full max-w-xl glass p-12 rounded-[40px] border border-white/10 shadow-3xl overflow-hidden"
             >
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <BarChart3 size={200} />
                </div>
                <button onClick={() => setShowCredExplainer(false)} className="absolute top-8 right-8 p-3 rounded-full glass hover:bg-accent-red hover:text-white transition-all shadow-lg">
                  <X size={20} />
                </button>
                <h3 className="text-5xl font-black italic uppercase mb-8 tracking-tighter">CRED FORMULA</h3>
                <p className="text-text-secondary text-lg mb-12 opacity-80 leading-relaxed">
                  Your Cos Cred is a dynamic composite of 5 verified signals. It's not a rating — it's your <span className="text-accent-red font-bold underline decoration-accent-red/30">proof of capability</span>.
                </p>
                
                <div className="space-y-6">
                   <FormulaItem label="On-time Delivery" percentage="30%" color="bg-accent-red" />
                   <FormulaItem label="Client Rating" percentage="30%" color="bg-accent-slate" />
                   <FormulaItem label="Repeat Client Rate" percentage="20%" color="bg-accent-amber" />
                   <FormulaItem label="Gig Volume (Diversity)" percentage="10%" color="bg-accent-deep-green" />
                   <FormulaItem label="Completion Rate" percentage="10%" color="bg-accent-blue" />
                </div>

                <div className="mt-12 p-6 rounded-2xl glass-card bg-accent-red/5 text-center">
                  <p className="font-black text-xs text-accent-red uppercase tracking-widest">
                    Elite Partner Threshold: 8.5+ ✦
                  </p>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FormulaItem({ label, percentage, color }: { label: string, percentage: string, color: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-[10px] font-mono font-bold">
        <span>{label.toUpperCase()}</span>
        <span>{percentage}</span>
      </div>
      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: percentage }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${color}`}
        />
      </div>
    </div>
  );
}

function StatItem({ label, value, color, themeColor }: { label: string, value: string, color?: string, themeColor?: 'light' | 'dark' }) {
  return (
    <div className={`p-6 glass-card border border-white/5 flex flex-col gap-1 ${themeColor === 'light' ? 'bg-white/5 border-white/10 shadow-xl' : ''}`}>
      <p className="text-[10px] font-black font-mono text-text-secondary uppercase tracking-[0.2em] opacity-60">{label}</p>
      <p className={`text-3xl font-black font-mono tracking-tight ${color || ''}`}>{value}</p>
    </div>
  );
}

function MenuTab({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 relative group overflow-hidden ${
        active 
          ? 'bg-accent-red text-white shadow-xl shadow-accent-red/30' 
          : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
      }`}
    >
      <div className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
        {icon}
      </div>
      <span className="font-black text-sm uppercase tracking-widest">{label}</span>
      {active && (
        <motion.div 
          layoutId="activeTabIndicator"
          className="absolute left-0 w-1 h-1/2 bg-white rounded-full translate-y-[-50%] top-1/2"
        />
      )}
    </button>
  );
}

function GigCard({ gig, onClick }: { gig: Gig, onClick: () => void }) {
  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.01 }}
      className="p-8 glass-card border border-white/5 cursor-pointer group shadow-2xl relative overflow-hidden"
      onClick={onClick}
    >
       <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
         <Briefcase size={120} />
       </div>
       <div className="flex justify-between items-start mb-6 relative z-10">
         <div className="flex flex-wrap gap-2">
            {gig.skills.slice(0, 2).map(skill => (
              <span key={skill} className="px-3 py-1 glass bg-white/5 text-[9px] font-black uppercase tracking-widest text-text-secondary rounded-lg border border-white/5 transition-colors group-hover:border-accent-red/20">
                #{skill}
              </span>
            ))}
         </div>
         <span className="font-mono text-xl font-black text-accent-red tracking-tighter drop-shadow-sm">{gig.budget}</span>
       </div>
       <h4 className="text-3xl font-black uppercase tracking-tighter leading-tight mb-6 group-hover:text-accent-red transition-colors relative z-10">{gig.title}</h4>
       <div className="flex items-center justify-between pt-6 border-t border-white/5 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl glass border border-white/5 flex items-center justify-center text-accent-slate shadow-inner">
               <User size={20} />
            </div>
            <span className="text-sm text-text-primary font-black uppercase tracking-tight opacity-80">{gig.posterName}</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-text-secondary font-black uppercase tracking-widest opacity-60">
             <Clock size={14} className="text-accent-amber" /> {gig.deadline}
          </div>
       </div>
    </motion.div>
  );
}

function GigDetailModal({ gig, onClose }: { gig: Gig, onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [counter, setCounter] = useState('');

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-bg-primary/95 backdrop-blur-md" 
        onClick={onClose} 
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        className="relative w-full max-w-2xl glass p-12 sm:p-16 rounded-[40px] overflow-hidden border border-white/10 shadow-3xl"
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-3 rounded-full glass hover:bg-accent-red hover:text-white transition-all shadow-lg">
          <X size={24} />
        </button>

        <div className="flex flex-wrap gap-2 mb-6">
          {gig.skills.map(s => <span key={s} className="px-3 py-1 glass bg-white/5 text-[10px] font-black uppercase tracking-widest border border-white/5 rounded-lg">{s}</span>)}
        </div>
        <h3 className="text-6xl font-black italic uppercase italic tracking-tighter mb-4 leading-[0.9]">{gig.title}</h3>
        <p className="text-xl text-text-secondary mb-12 leading-relaxed opacity-80 mt-6">
          {gig.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <div className="p-6 glass-card bg-white/5 border border-white/5">
            <p className="text-[10px] font-black font-mono text-text-secondary uppercase tracking-widest mb-3 opacity-60">Listing Poster</p>
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl glass border border-white/5 flex items-center justify-center shadow-lg">
                  <User size={24} className="text-accent-slate" />
               </div>
               <span className="font-black text-lg uppercase tracking-tight">{gig.posterName}</span>
            </div>
          </div>
          <div className="p-6 glass-card bg-accent-red/5 border border-accent-red/10">
            <p className="text-[10px] font-black font-mono text-accent-red uppercase tracking-widest mb-3">Project Budget</p>
            <p className="text-4xl font-black font-mono text-accent-red tracking-tighter">{gig.budget}</p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {step === 1 ? (
             <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setStep(2)}
                  className="flex-1 min-w-[200px] py-5 glass border border-white/10 font-black rounded-2xl hover:bg-white/5 transition-all text-sm uppercase tracking-widest"
                >
                  NEGOTIATE OFFER
                </button>
                <button className="flex-1 min-w-[200px] py-5 bg-accent-red text-white font-black rounded-2xl hover:scale-[1.02] transition-all shadow-2xl shadow-accent-red/40 text-sm uppercase tracking-widest">
                  ACCEPT & ESCROW
                </button>
             </div>
          ) : (
            <div className="flex flex-col gap-6 p-2">
               <div className="flex justify-between items-center text-[10px] font-black font-mono text-text-secondary uppercase tracking-[0.2em]">
                 <span>Negotiation Phase</span>
                 <span className="text-accent-red">Round 1 / 2</span>
               </div>
               <div className="flex gap-4">
                 <input 
                   type="text" 
                   value={counter}
                   onChange={e => setCounter(e.target.value)}
                   placeholder="Your counter budget (e.g. ₹1000)" 
                   className="flex-1 p-5 glass bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-accent-red text-lg font-mono placeholder:text-text-secondary/40"
                 />
                 <button className="px-10 py-5 bg-accent-red text-white font-black rounded-2xl hover:scale-105 transition-all shadow-xl shadow-accent-red/30">
                    SUBMIT
                 </button>
               </div>
               <button onClick={() => setStep(1)} className="text-center text-xs font-black uppercase tracking-widest text-text-secondary hover:text-accent-red transition-colors">Abort counter-offer</button>
            </div>
          )}

          <div className="p-6 glass bg-accent-deep-green/10 rounded-3xl flex items-center gap-5 border border-accent-deep-green/10">
             <div className="shrink-0 w-12 h-12 rounded-2xl bg-accent-deep-green/20 flex items-center justify-center text-accent-deep-green">
               <Banknote size={24} />
             </div>
             <p className="text-[10px] text-accent-deep-green font-black uppercase tracking-widest leading-normal">
               IDENTITY-LOCKED ESCROW: Your payment is held securely in the COS treasury. Funds are only triggered for release upon successful receipt of the verified deliverables.
             </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
