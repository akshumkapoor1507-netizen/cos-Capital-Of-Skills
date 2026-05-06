import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Megaphone, Plus, Search, Filter, Clock, CheckCircle2, 
  X, Send, User, ChevronRight, Zap, Target, MoreVertical,
  Briefcase, BarChart3, MessageSquare, ShieldCheck
} from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { SAMPLE_COSINES, SKILL_CATEGORIES } from '../constants/data';
import Logo from './Logo';

export default function PosterDashboard() {
  const { posterProfile, postedGigs, postGig, addToast } = useUserStore();
  const [activeTab, setActiveTab] = useState<'my-gigs' | 'find-talent' | 'analytics'>('my-gigs');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form state for new gig
  const [newGig, setNewGig] = useState({
    title: '',
    budget: '',
    deadline: '',
    skills: [] as string[],
    description: ''
  });

  const handlePostGig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGig.title || !newGig.budget) {
      addToast("Please fill in required fields", "error");
      return;
    }
    postGig({
      ...newGig,
      status: 'open',
      posterName: posterProfile?.fullName || 'Anonymous Poster',
      applications: []
    });
    addToast("GIG BROADCASTED TO CAPITAL NETWORK", "success");
    setIsPostModalOpen(false);
    setNewGig({ title: '', budget: '', deadline: '', skills: [], description: '' });
  };

  const toggleSkill = (skill: string) => {
    setNewGig(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) 
        ? prev.skills.filter(s => s !== skill) 
        : [...prev.skills, skill]
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <header className="mb-12 flex flex-col md:flex-row items-center justify-between gap-8 glass-card p-10 border-white/5 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-accent-red/10 flex items-center justify-center text-accent-red border border-accent-red/20">
              <Megaphone size={24} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">
              POSTER <span className="text-accent-red">HUB</span>
            </h2>
          </div>
          <p className="text-text-secondary font-mono text-xs uppercase tracking-widest opacity-60">
            Welcome back, {posterProfile?.fullName || 'Collaborator'}. Your influence is scaling.
          </p>
        </div>

        <button 
          onClick={() => setIsPostModalOpen(true)}
          className="relative z-10 px-8 py-4 bg-accent-red text-white flex items-center gap-3 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(255,31,31,0.2)]"
        >
          <Plus size={20} />
          POST NEW GIG
        </button>

        {/* Decorative Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-red/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="glass-card p-4 space-y-2 border-white/5">
            <NavButton 
              active={activeTab === 'my-gigs'} 
              onClick={() => setActiveTab('my-gigs')}
              icon={<Briefcase size={18} />}
              label="My Listings"
              count={postedGigs.length}
            />
            <NavButton 
              active={activeTab === 'find-talent'} 
              onClick={() => setActiveTab('find-talent')}
              icon={<Search size={18} />}
              label="Find Talent"
            />
            <NavButton 
              active={activeTab === 'analytics'} 
              onClick={() => setActiveTab('analytics')}
              icon={<BarChart3 size={18} />}
              label="Engagement"
            />
          </div>

          <div className="glass-card p-6 border-white/5 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-red">Quick Stats</h4>
            <div className="space-y-4">
              <StatItem label="Total Gigs" value={postedGigs.length.toString()} />
              <StatItem label="Total Applicants" value="12" />
              <StatItem label="Avg. Response" value="4.2h" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-9">
          <AnimatePresence mode="wait">
            {activeTab === 'my-gigs' && (
              <motion.div 
                key="my-gigs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {postedGigs.length === 0 ? (
                  <div className="h-96 flex flex-col items-center justify-center text-center glass-card border-dashed border-white/10 opacity-60">
                    <Zap size={48} className="text-text-secondary mb-4 opacity-20" />
                    <p className="font-black uppercase tracking-widest text-sm mb-2">No active broadcasts</p>
                    <p className="text-xs text-text-secondary">Start hiring top student talent by creating your first gig.</p>
                  </div>
                ) : (
                  postedGigs.map((gig: any) => (
                    <GigEntry key={gig.id} gig={gig} />
                  ))
                )}
              </motion.div>
            )}

            {activeTab === 'find-talent' && (
              <motion.div 
                key="find-talent"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                    <input 
                      type="text"
                      placeholder="Search top verified 'Cosines'..." 
                      className="w-full bg-bg-surface border border-white/5 rounded-2xl pl-12 pr-6 py-4 text-sm font-medium outline-none focus:border-accent-red/30 transition-all"
                    />
                  </div>
                  <button className="px-6 py-4 glass border border-white/5 rounded-2xl text-text-secondary hover:text-white transition-all">
                    <Filter size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {SAMPLE_COSINES.map((cosine) => (
                    <div key={cosine.id} className="glass-card p-6 border-white/5 hover:border-accent-red/20 group transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-bg-primary border border-white/5 flex items-center justify-center font-black text-xs">
                            {cosine.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h5 className="font-black uppercase text-sm group-hover:text-accent-red transition-colors">{cosine.name}</h5>
                            <p className="text-[10px] text-text-secondary uppercase font-mono tracking-tighter opacity-60">{cosine.university}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] font-black uppercase text-accent-red mb-1">COS CRED</div>
                          <div className="text-xl font-mono font-black">{cosine.cosCred}</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {cosine.skills.slice(0, 3).map((skill, i) => (
                          <span key={i} className="px-2 py-1 bg-white/5 rounded text-[8px] font-black uppercase tracking-widest text-text-secondary">
                            {typeof skill === 'string' ? skill : skill.name}
                          </span>
                        ))}
                      </div>
                      <button className="w-full py-3 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-accent-red hover:text-white transition-all">
                        View Full Dossier
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Post Gig Modal */}
      <AnimatePresence>
        {isPostModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPostModalOpen(false)}
              className="absolute inset-0 bg-bg-primary/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative w-full max-w-2xl glass border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <Zap size={20} className="text-accent-red" />
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter">NEW GIG BROADCAST</h3>
                </div>
                <button 
                  onClick={() => setIsPostModalOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-lg text-text-secondary hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handlePostGig} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Gig Title *</label>
                    <input 
                      required
                      value={newGig.title}
                      onChange={e => setNewGig({ ...newGig, title: e.target.value })}
                      placeholder="e.g. Edit 3 Reels for Tech Channel"
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-accent-red/30 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Budget (₹) *</label>
                    <input 
                      required
                      value={newGig.budget}
                      onChange={e => setNewGig({ ...newGig, budget: e.target.value })}
                      placeholder="e.g. 1500"
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-accent-red/30 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Expected Deadline</label>
                    <input 
                      value={newGig.deadline}
                      onChange={e => setNewGig({ ...newGig, deadline: e.target.value })}
                      placeholder="e.g. 3 Days"
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-accent-red/30 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Required Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {SKILL_CATEGORIES.flatMap(cat => cat.tags).slice(0, 15).map(skill => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`px-3 py-1.5 rounded-lg border text-[9px] font-black uppercase tracking-widest transition-all ${
                          newGig.skills.includes(skill)
                          ? 'bg-accent-red border-accent-red text-white'
                          : 'bg-white/5 border-white/5 text-text-secondary hover:border-white/20'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Brief Description</label>
                  <textarea 
                    rows={4}
                    value={newGig.description}
                    onChange={e => setNewGig({ ...newGig, description: e.target.value })}
                    placeholder="Describe the deliverables, constraints, and expectations..."
                    className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-accent-red/30 transition-all resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-5 bg-accent-red text-white rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-accent-red/20 flex items-center justify-center gap-3"
                >
                  <Send size={18} />
                  BROADCAST NOW
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavButton({ active, onClick, icon, label, count }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all group ${
        active 
        ? 'bg-accent-red text-white shadow-lg shadow-accent-red/20' 
        : 'text-text-secondary hover:bg-white/5 hover:text-white border border-transparent hover:border-white/5'
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </div>
      {count !== undefined && (
        <span className={`text-[8px] font-mono font-black px-2 py-0.5 rounded ${active ? 'bg-white/20' : 'bg-white/5'}`}>
          {count}
        </span>
      )}
    </button>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-60">{label}</span>
      <span className="text-sm font-mono font-black text-text-primary">{value}</span>
    </div>
  );
}

function GigEntry({ gig }: { gig: any }) {
  return (
    <div className="glass-card p-8 border-white/5 group hover:border-accent-red/30 transition-all">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h4 className="text-xl font-black uppercase group-hover:text-accent-red transition-colors">{gig.title}</h4>
            <span className="px-2 py-1 bg-accent-deep-green/10 text-accent-deep-green rounded text-[8px] font-black uppercase tracking-widest border border-accent-deep-green/20">
              {gig.status}
            </span>
          </div>
          <p className="text-xs text-text-secondary font-mono flex items-center gap-4">
            <span className="flex items-center gap-1.5"><Clock size={12} /> {gig.deadline}</span>
            <span className="flex items-center gap-1.5 text-white/80 font-black tracking-tighter">₹ {gig.budget}</span>
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[8px] font-black uppercase tracking-widest text-text-secondary mb-1">Applications</p>
            <div className="flex -space-x-2">
              {[1, 2].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-bg-primary bg-bg-surface flex items-center justify-center text-[10px] font-black uppercase">
                  U{i}
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-bg-primary bg-accent-red flex items-center justify-center text-[6px] font-black text-white">
                +4
              </div>
            </div>
          </div>
          <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-text-secondary hover:text-white transition-all">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {gig.skills.map((skill: string) => (
          <span key={skill} className="px-3 py-1 bg-bg-primary border border-white/5 rounded-lg text-[9px] font-black uppercase tracking-widest text-text-secondary">
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-white/5">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-secondary">
          <MessageSquare size={12} />
          3 UNREAD MESSAGES
        </div>
        <button className="px-6 py-3 bg-white/5 hover:bg-accent-red hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
          Manage Applicants
        </button>
      </div>
    </div>
  );
}
