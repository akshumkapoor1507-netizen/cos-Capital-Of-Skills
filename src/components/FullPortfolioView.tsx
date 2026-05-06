import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, GraduationCap, Trophy, Briefcase, Zap, Star, Activity, 
  Github, Code2, Award, ExternalLink, ShieldCheck, CheckCircle2,
  Terminal, BarChart3, Globe, Mail, MessageSquare, Palette, TrendingUp,
  PieChart as PieChartIcon, User, ChevronLeft, ChevronRight, PenTool, Layout, Rocket, Info, Users,
  CircleDollarSign, Maximize2, Minimize2, Clock, PlusCircle
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend,
  BarChart, Bar, XAxis, YAxis, LineChart, Line, CartesianGrid,
  AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  RadialBarChart, RadialBar, ScatterChart, Scatter,
} from 'recharts';
import { Cosine } from '../types';
import { SAMPLE_COSINES } from '../constants/data';
import { usePipeline } from '../contexts/PipelineContext';

type DeepDiveType = 'skills' | 'project' | 'github' | 'leetcode' | 'behavioral' | 'cgpa' | 'cosCred' | null;

interface FullPortfolioViewProps {
  cosine: Cosine;
  onClose: () => void;
}

export default function FullPortfolioView({ cosine: initialCosine, onClose }: FullPortfolioViewProps) {
  // Demo state to switch between profiles
  const [currentCosine, setCurrentCosine] = useState<Cosine>(initialCosine);
  const [profileIndex, setProfileIndex] = useState(SAMPLE_COSINES.findIndex(c => c.id === initialCosine.id));
  const [activeDeepDive, setActiveDeepDive] = useState<DeepDiveType>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isSkillGraphFullscreen, setIsSkillGraphFullscreen] = useState(false);
  const [isSatisfactionFullscreen, setIsSatisfactionFullscreen] = useState(false);
  const [isRetentionFullscreen, setIsRetentionFullscreen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [activeInternship, setActiveInternship] = useState<any | null>(null);
  const [isShortlistModalOpen, setIsShortlistModalOpen] = useState(false);
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [isArenaDeepDiveOpen, setIsArenaDeepDiveOpen] = useState(false);
  const { shortlistCandidate } = usePipeline();
  const [shortlistForm, setShortlistForm] = useState({
    role: 'Senior Frontend Engineer',
    note: ''
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleNextProfile = () => {
    const nextIdx = (profileIndex + 1) % SAMPLE_COSINES.length;
    setProfileIndex(nextIdx);
    setCurrentCosine(SAMPLE_COSINES[nextIdx]);
  };

  const handlePrevProfile = () => {
    const prevIdx = (profileIndex - 1 + SAMPLE_COSINES.length) % SAMPLE_COSINES.length;
    setProfileIndex(prevIdx);
    setCurrentCosine(SAMPLE_COSINES[prevIdx]);
  };

  const cosine = currentCosine;
  const breakdown = cosine.scoreBreakdown || { identity: 9.0, skill: 8.5, social: 8.0, activity: 8.5 };
  
  const skillData = cosine.skillDistribution || [
    { name: 'Generic', value: 100, color: '#FF2A2A' }
  ];

  // Helper for domain-specific visual accents
  const getProjectIcon = (type?: string) => {
    switch (type) {
      case 'design': return <Palette size={14} className="text-accent-red" />;
      case 'marketing': return <Rocket size={14} className="text-accent-red" />;
      case 'strategy': return <TrendingUp size={14} className="text-accent-red" />;
      default: return <Code2 size={14} className="text-accent-red" />;
    }
  };

  const closeDeepDive = () => {
    setActiveDeepDive(null);
    setSelectedProject(null);
  };

  const openProjectDetails = (project: any) => {
    setSelectedProject(project);
    setActiveDeepDive('project');
  };

  return (
    <div className={`fixed inset-0 z-[150] flex items-center justify-center transition-all duration-500 ${isFullscreen ? 'p-0' : 'p-4 md:p-8'}`}>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500 ${isFullscreen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} 
        onClick={onClose} 
      />
      
      <motion.div 
        key={cosine.id} // Allow animation switch
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        className={`relative overflow-y-auto overflow-x-hidden bg-bg-surface border border-white/10 shadow-[0_0_150px_rgba(255,31,31,0.2)] scroll-smooth flex flex-col transition-all duration-500 ease-in-out custom-portfolio-scrollbar ${
          isFullscreen 
            ? 'w-full h-full max-w-none max-h-screen rounded-none border-none' 
            : 'w-full max-w-6xl max-h-[90vh] rounded-[48px]'
        }`}
      >
        <style>
          {`
            .custom-portfolio-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .custom-portfolio-scrollbar::-webkit-scrollbar-track {
              background: #0A0A0A;
            }
            .custom-portfolio-scrollbar::-webkit-scrollbar-thumb {
              background: #333333;
              border-radius: 10px;
            }
            .custom-portfolio-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #FF2A2A;
            }
          `}
        </style>
        {/* Profile Switcher (Demo Only) */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[170] flex items-center gap-4 bg-black/40 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full shadow-2xl">
           <button onClick={handlePrevProfile} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white">
             <ChevronLeft size={16} />
           </button>
           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-red">Dossier {profileIndex + 1}/{SAMPLE_COSINES.length}</span>
           <button onClick={handleNextProfile} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white">
             <ChevronRight size={16} />
           </button>
        </div>

        {/* Sticky Header */}
        <header className="sticky top-0 z-[160] bg-bg-surface/80 backdrop-blur-md border-b border-white/5 p-8 pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-red to-accent-red/40 flex items-center justify-center text-white shadow-xl shadow-accent-red/20">
              <span className="text-2xl font-black">{cosine.name.charAt(0)}</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                 <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-text-primary dark:text-white leading-none">
                  {cosine.name}
                </h1>
                <div className="px-2 py-0.5 bg-accent-red/20 border border-accent-red/30 rounded-md">
                   <span className="text-[8px] font-black uppercase tracking-widest text-accent-red">{cosine.primaryDomain}</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-secondary">
                  <GraduationCap size={14} className="text-accent-red" /> {cosine.university}
                </span>
                <div className="w-1 h-1 rounded-full bg-white/10" />
                <span className="text-[10px] font-black uppercase tracking-widest text-accent-red">
                  {cosine.degree || 'B.Tech CSE'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-8 px-8 py-3 bg-white/5 border border-white/10 rounded-2xl">
              <button 
                onClick={() => setActiveDeepDive('cgpa')}
                className="text-center group transition-all hover:scale-105 active:scale-95"
              >
                <p className="text-[8px] text-text-secondary font-black uppercase tracking-widest mb-1 opacity-50 group-hover:text-accent-red transition-colors">CGPA</p>
                <p className="text-xl font-black font-mono text-text-primary dark:text-white group-hover:text-accent-red transition-colors">{cosine.cgpa || '8.8'}</p>
              </button>
              <div className="w-[1px] h-8 bg-white/10" />
              <button 
                onClick={() => setActiveDeepDive('cosCred')}
                className="text-center group transition-all hover:scale-105 active:scale-95"
              >
                <p className="text-[8px] text-text-secondary font-black uppercase tracking-widest mb-1 opacity-50 group-hover:text-accent-red transition-colors">COS CRED</p>
                <p className="text-xl font-black font-mono text-accent-red group-hover:brightness-125 transition-all">{cosine.cosCred}</p>
              </button>
            </div>
            <button 
              onClick={() => !isShortlisted && setIsShortlistModalOpen(true)}
              disabled={isShortlisted}
              className={`flex-1 md:flex-none px-8 py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs transition-all duration-300 ${
                isShortlisted 
                ? 'bg-transparent border-2 border-[#A0E8AF] text-[#A0E8AF] cursor-default' 
                : 'bg-accent-red text-white hover:scale-105 hover:brightness-110 shadow-2xl shadow-accent-red/30'
              }`}
            >
              {isShortlisted ? '✓ SHORTLISTED' : 'SHORTLIST FOR INTERVIEW'}
            </button>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsFullscreen(!isFullscreen)} 
                className="p-4 rounded-2xl glass hover:bg-white/10 transition-all text-text-secondary hover:text-white"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </button>
              <button onClick={onClose} className="p-4 rounded-2xl glass hover:bg-white/10 transition-all text-text-secondary hover:text-white">
                <X size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Content Grid */}
        <div className="p-8 md:p-12 md:pt-16 overflow-visible">
          {!activeInternship ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Column 1: Core Metrics & Skills (4 Span) */}
            <div className="lg:col-span-4 space-y-8">
              {/* Skill Distribution */}
              <div 
                onClick={() => setActiveDeepDive('skills')}
                className="bg-bg-secondary border border-white/5 p-8 rounded-[40px] shadow-xl relative cursor-pointer group hover:scale-[1.02] hover:border-gray-600 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-accent-red flex items-center gap-3">
                    <BarChart3 size={16} /> Skill Distribution
                  </h3>
                  <div className="relative group/info">
                    <button 
                      className="p-1 text-text-secondary hover:text-white transition-colors"
                      aria-label="How is this calculated?"
                    >
                      <Info size={14} />
                    </button>
                    
                    {/* Methodology Popover */}
                    <div className="absolute top-full right-0 mt-4 w-72 p-6 bg-[#1A1A1A] border border-white/10 rounded-2xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover/info:opacity-100 group-hover/info:translate-y-0 transition-all z-[170]">
                      <h4 className="text-xs font-black uppercase tracking-widest text-white mb-3 flex items-center gap-2">
                        How is this calculated?
                      </h4>
                      <p className="text-[11px] text-text-secondary leading-relaxed mb-4 font-medium">
                        Skill proficiency is not self-reported. The Core Stack distribution is dynamically calculated using cross-platform data:
                      </p>
                      <ul className="space-y-3 mb-4">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-accent-red mt-1.5" />
                          <p className="text-[10px] text-gray-200"><span className="italic text-white">Escrow History:</span> Volume of completed gigs tagged with this skill.</p>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-accent-red mt-1.5" />
                          <p className="text-[10px] text-gray-200"><span className="italic text-white">Client Ratings:</span> Average feedback score for gigs using this tool.</p>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-accent-red mt-1.5" />
                          <p className="text-[10px] text-gray-200"><span className="italic text-white">External Proof:</span> Verified GitHub commit history and LeetCode mastery metrics.</p>
                        </li>
                      </ul>
                      <div className="pt-3 border-t border-white/5">
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-accent-red mb-2">Parameter Legend</p>
                        <div className="space-y-2">
                          <div>
                            <span className="text-[9px] font-bold text-white uppercase italic">Expert:</span>
                            <span className="text-[9px] text-text-secondary block">Top 5% of platform or 20+ verified gigs.</span>
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-white uppercase italic">Highly Proficient:</span>
                            <span className="text-[9px] text-text-secondary block">10+ verified gigs and &gt;4.5 client rating.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[250px] w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={skillData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {skillData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                        itemStyle={{ color: '#fff', fontSize: '10px', textTransform: 'uppercase', fontWeight: 900 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                      <p className="text-[10px] font-black text-text-secondary uppercase">CORE</p>
                      <p className="text-xl font-black text-text-primary dark:text-white uppercase italic">STACK</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {skillData.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: skill.color }} />
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] font-black text-text-primary dark:text-white uppercase">{skill.name}</span>
                        <span className="text-[8px] font-bold text-text-secondary uppercase">Highly Proficient</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Platform Cred Breakdown */}
              <div className="bg-bg-secondary border border-white/5 p-8 rounded-[40px] shadow-xl">
                 <h3 className="text-xs font-black uppercase tracking-[0.3em] text-accent-red mb-8 flex items-center gap-3">
                   <ShieldCheck size={16} /> COS Cred Breakdown
                 </h3>
                 <div className="space-y-4">
                   <ExpandableScoreMetric 
                     label="Identity Integrity" 
                     value={breakdown.identity} 
                     type="identity"
                   />
                   <ExpandableScoreMetric 
                     label="Skill Provenance" 
                     value={breakdown.skill} 
                     type="skill"
                   />
                   <ExpandableScoreMetric 
                     label="Social Proofing" 
                     value={breakdown.social} 
                     type="social"
                   />
                   <ExpandableScoreMetric 
                     label="Network Activity" 
                     value={breakdown.activity} 
                     type="activity"
                   />
                 </div>
              </div>

              {/* Behavioral & Reliability Signals Summary */}
              <div 
                onClick={() => setActiveDeepDive('behavioral')}
                className="bg-bg-surface border border-white/5 p-8 rounded-[40px] shadow-2xl relative cursor-pointer group hover:scale-[1.02] hover:border-accent-red/30 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                  <Activity size={24} className="text-accent-red animate-pulse" />
                </div>
                
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white mb-6 flex items-center gap-3">
                  <ShieldCheck size={16} className="text-accent-red" /> Behavioral & Reliability
                </h3>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">On-Time Delivery</p>
                      <p className="text-xl font-black font-mono text-white">95%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">Avg Rating</p>
                      <p className="text-xl font-black font-mono text-white">4.9</p>
                    </div>
                  </div>

                  <div className="p-6 bg-accent-red/5 border border-accent-red/20 rounded-3xl relative group-hover:bg-accent-red/10 transition-colors">
                    <div className="absolute -top-3 left-4 px-3 py-1 bg-accent-red rounded-lg shadow-lg">
                      <span className="text-[9px] font-black uppercase tracking-widest text-white italic">The Golden Signal</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                       <div>
                         <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60 mb-1">Repeat Clients</p>
                         <p className="text-3xl font-black font-mono text-accent-red shadow-accent-red/40 drop-shadow-md">3</p>
                       </div>
                       <div className="w-12 h-12 rounded-full border-2 border-accent-red/40 flex items-center justify-center p-1">
                         <div className="w-full h-full bg-accent-red rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,42,42,0.6)]">
                           <Users size={18} className="text-white" />
                         </div>
                       </div>
                    </div>
                  </div>
                  
                  <p className="text-[8px] font-black text-text-secondary uppercase tracking-[0.2em] italic opacity-40">
                    * Calculated via verified escrow payouts.
                  </p>
                </div>
              </div>
            </div>

            {/* Column 2: Proof of Work Timeline (4 Span) */}
            <div className="lg:col-span-4 h-full flex flex-col">
              <div className="bg-bg-secondary border border-white/5 p-8 rounded-[40px] shadow-xl h-full flex flex-col min-h-0">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-accent-red mb-8 flex-shrink-0 flex items-center gap-3">
                  <Terminal size={16} /> Verified Proof of Work
                </h3>

                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar relative min-h-0">
                  <div className="relative pl-8 h-full">
                    <span className="absolute left-0 top-2 bottom-4 w-[2px] bg-gradient-to-b from-[#FF2A2A] via-[#FF2A2A] to-transparent z-0" />
                    
                    <div className="space-y-6 mb-8">
                      {(showAllProjects ? (cosine.projects || []) : (cosine.projects || []).slice(0, 2)).map((project, i) => (
                        <div 
                          key={i} 
                          className="relative group cursor-pointer"
                          onClick={() => openProjectDetails(project)}
                        >
                          <div className="absolute -left-[35px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent-red shadow-[0_0_15px_rgba(255,42,42,1)] z-10 border-2 border-[#1A1A1A] group-hover:scale-125 transition-transform" />
                          <div className="bg-white/[0.03] border border-white/5 p-6 rounded-3xl group-hover:bg-accent-red/[0.07] group-hover:border-accent-red/40 group-hover:scale-[1.01] transition-all duration-500 text-left min-h-[180px] flex flex-col justify-between shadow-2xl">
                            <div>
                              <div className="flex items-center gap-3 mb-3">
                                 <div className="p-2.5 bg-white/5 rounded-xl text-accent-red group-hover:bg-accent-red group-hover:text-white transition-all duration-500 shadow-lg">
                                   {getProjectIcon(project.type)}
                                 </div>
                                 <h4 className="text-lg font-black uppercase tracking-tight group-hover:text-accent-red transition-colors italic">
                                    {project.name}
                                  </h4>
                                  <CheckCircle2 size={16} className="text-[#A0E8AF] ml-auto opacity-40 group-hover:opacity-100 transition-opacity" />
                              </div>
                              <p className="text-[11px] text-text-secondary leading-relaxed mb-6 font-medium opacity-90 line-clamp-3 group-hover:opacity-100 transition-opacity">
                                {project.description}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                              {project.skills.slice(0, 3).map(s => (
                                <span key={s} className="px-2.5 py-1 bg-black/60 text-[8px] font-black uppercase tracking-widest text-text-secondary rounded-lg border border-white/10 group-hover:border-accent-red/20 transition-colors">
                                  {s}
                                </span>
                              ))}
                              {project.skills.length > 3 && (
                                <span className="text-[8px] font-black text-accent-red mt-1 ml-1">+{project.skills.length - 3} MORE ENTRIES</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {cosine.projects && cosine.projects.length > 2 && (
                      <button 
                        onClick={() => setShowAllProjects(!showAllProjects)}
                        className="w-full py-5 px-6 border border-white/10 rounded-[24px] text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary hover:text-white hover:bg-accent-red hover:border-accent-red shadow-2xl transition-all duration-500 text-center flex items-center justify-center gap-4 group/btn bg-black/40 backdrop-blur-xl sticky bottom-0"
                      >
                        <span className="opacity-80 group-hover/btn:opacity-100 transition-opacity">
                          {showAllProjects ? 'Collapse Dossier' : `Release All ${cosine.projects.length} Records`}
                        </span>
                        <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover/btn:bg-white/20 transition-all">
                          <ChevronRight size={14} className={`transition-transform duration-500 ${showAllProjects ? '-rotate-90' : 'rotate-0 text-accent-red group-hover/btn:text-white'}`} />
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Domain Specifics & Arena (4 Span) */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Domain Specific Layout Shift */}
              {cosine.primaryDomain === 'Engineering' && cosine.externalStats && (
                <div className="bg-bg-secondary border border-white/5 p-8 rounded-[40px] shadow-xl">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-text-secondary mb-8 flex items-center gap-3">
                    <Globe size={16} className="text-accent-blue" /> Engineering Ecosystem
                  </h3>
                  
                  {/* GitHub Heatmap Concept */}
                  <div 
                    onClick={() => setActiveDeepDive('github')}
                    className="mb-8 p-6 bg-black/20 rounded-3xl border border-white/5 cursor-pointer hover:scale-[1.02] hover:border-gray-600 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <Github size={20} className="text-text-primary dark:text-white" />
                        <span className="text-xs font-black uppercase tracking-widest text-text-primary dark:text-white">GitHub Activity</span>
                      </div>
                      <ExternalLink size={14} className="text-text-secondary opacity-40 group-hover:text-white transition-colors" />
                    </div>
                    
                    {/* Mock Heatmap */}
                    <div className="flex gap-1 mb-6">
                       {Array.from({ length: 15 }).map((_, i) => (
                          <div key={i} className="flex-1 flex flex-col gap-1">
                             {Array.from({ length: 4 }).map((_, j) => {
                                const opacity = Math.random() > 0.5 ? (Math.random() * 0.8 + 0.2) : 0.05;
                                return (
                                  <div 
                                   key={j} 
                                   className="w-full h-2 rounded-sm transition-all duration-500" 
                                   style={{ backgroundColor: opacity > 0.1 ? `rgba(255, 42, 42, ${opacity})` : 'rgba(255,255,255,0.05)' }} 
                                  />
                                );
                             })}
                          </div>
                       ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <p className="text-[10px] font-bold text-text-secondary uppercase opacity-60">Repos</p>
                          <p className="text-lg font-black font-mono text-text-primary dark:text-white">{cosine.externalStats.github.totalRepos}</p>
                       </div>
                       <div>
                          <p className="text-[10px] font-bold text-text-secondary uppercase opacity-60">Commits (1y)</p>
                          <p className="text-lg font-black font-mono text-accent-red">{cosine.externalStats.github.commitsLastYear}</p>
                       </div>
                    </div>
                  </div>

                  {/* LeetCode */}
                  <div 
                    onClick={() => setActiveDeepDive('leetcode')}
                    className="p-6 bg-black/20 rounded-3xl border border-white/5 cursor-pointer hover:scale-[1.02] hover:border-gray-600 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Code2 size={20} className="text-accent-amber" />
                        <span className="text-xs font-black uppercase tracking-widest text-text-primary dark:text-white">LeetCode Mastery</span>
                      </div>
                      <ExternalLink size={14} className="text-text-secondary opacity-40 group-hover:text-white transition-colors" />
                    </div>
                    <div className="space-y-4">
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black uppercase text-text-secondary">SOLVED</span>
                          <span className="text-lg font-black font-mono text-text-primary dark:text-white">{cosine.externalStats.leetcode.solved}</span>
                       </div>
                       <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex">
                          <div className="h-full bg-accent-deep-green" style={{ width: '30%' }} />
                          <div className="h-full bg-accent-amber" style={{ width: '50%' }} />
                          <div className="h-full bg-accent-red" style={{ width: '20%' }} />
                       </div>
                       <div className="flex justify-between text-[8px] font-black uppercase tracking-widest">
                          <span className="text-accent-deep-green">Easy: {cosine.externalStats.leetcode.easy}</span>
                          <span className="text-accent-amber">Med: {cosine.externalStats.leetcode.medium}</span>
                          <span className="text-accent-red">Hard: {cosine.externalStats.leetcode.hard}</span>
                       </div>
                    </div>
                  </div>
                </div>
              )}

              {cosine.primaryDomain === 'Design' && (
                <div className="bg-bg-secondary border border-white/5 p-8 rounded-[40px] shadow-xl">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-text-secondary mb-8 flex items-center gap-3">
                    <PenTool size={16} className="text-accent-red" /> Design Gallery
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                     {Array.from({ length: 4 }).map((_, i) => (
                       <div key={i} className="aspect-square bg-white/[0.03] border border-white/5 rounded-3xl flex items-center justify-center group cursor-pointer overflow-hidden relative">
                          <Layout size={24} className="text-white/10 group-hover:text-accent-red/40 group-hover:scale-110 transition-all" />
                          <div className="absolute inset-0 bg-accent-red/0 group-hover:bg-accent-red/5 transition-all" />
                          <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all">
                             <span className="text-[8px] font-black uppercase tracking-widest text-accent-red">Case Study</span>
                          </div>
                       </div>
                     ))}
                  </div>
                  <button className="w-full mt-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                     View Figma Workspace <ExternalLink size={12} />
                  </button>
                </div>
              )}

              {(cosine.primaryDomain === 'Management' || cosine.primaryDomain === 'Marketing') && (
                <div className="bg-bg-secondary border border-white/5 p-8 rounded-[40px] shadow-xl">
                   <h3 className="text-xs font-black uppercase tracking-[0.3em] text-accent-red mb-8 flex items-center gap-3">
                    <TrendingUp size={16} /> ROI & Growth Metrics
                  </h3>
                  <div className="space-y-6">
                     <div className="p-6 bg-accent-red/5 border border-accent-red/10 rounded-3xl">
                        <p className="text-[10px] font-black text-text-secondary uppercase mb-2">Campaign Efficiency</p>
                        <div className="flex items-baseline gap-2">
                           <span className="text-4xl font-black font-mono text-text-primary dark:text-white">4.2x</span>
                           <span className="text-[10px] font-black text-accent-deep-green uppercase">Avg Return</span>
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                           <p className="text-[8px] font-bold text-text-secondary uppercase mb-1">Growth</p>
                           <p className="text-xl font-black font-mono text-text-primary dark:text-white">+120%</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                           <p className="text-[8px] font-bold text-text-secondary uppercase mb-1">Reach</p>
                           <p className="text-xl font-black font-mono text-text-primary dark:text-white">1.2M</p>
                        </div>
                     </div>
                  </div>
                </div>
              )}

              {/* Arena Record - Only show if has participations */}
              {cosine.arenaRecord && (
                <div 
                  onClick={() => setIsArenaDeepDiveOpen(true)}
                  className="bg-bg-secondary border border-white/5 p-8 rounded-[40px] shadow-xl cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-[#FF2A2A] hover:-translate-y-1 group/arena"
                >
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-accent-amber mb-8 flex items-center gap-3 group-hover/arena:text-accent-red transition-colors">
                    <Trophy size={16} /> The Arena Record
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <p className="text-[9px] text-text-secondary font-black uppercase mb-1 text-left">TOTAL EVENTS</p>
                      <p className="text-2xl font-black font-mono text-text-primary dark:text-white text-left">{cosine.arenaRecord.totalParticipations}</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <p className="text-[9px] text-text-secondary font-black uppercase mb-1 text-left">SUCCESS RATE</p>
                      <p className="text-2xl font-black font-mono text-accent-deep-green text-left">{cosine.arenaRecord.successRate}%</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {(cosine.arenaRecord.achievements || []).map((award, i) => (
                      <div key={i} className="flex items-start gap-4 group">
                        <div className="w-2 h-2 rounded-full bg-accent-amber mt-1.5 group-hover:scale-150 transition-all group-hover/arena:bg-accent-red" />
                        <p className="text-xs font-bold text-text-primary leading-tight text-left">{award}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Verified Internships Master List */}
              {cosine.internships && cosine.internships.length > 0 && (
                <div className="bg-bg-secondary border border-white/5 p-8 rounded-[40px] shadow-xl">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-text-secondary mb-8 flex items-center gap-3">
                    <Briefcase size={16} className="text-accent-red" /> Verified Internships
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {cosine.internships.map((internship) => (
                      <button 
                        key={internship.id}
                        onClick={() => setActiveInternship(internship)}
                        className="p-4 flex flex-col gap-2.5 group bg-white/5 border border-white/10 rounded-2xl hover:bg-accent-red/5 hover:border-accent-red/30 transition-all text-left overflow-hidden"
                      >
                         <div className="flex items-center justify-between">
                            <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-accent-red group-hover:bg-accent-red group-hover:text-white transition-all">
                               <Briefcase size={12} />
                            </div>
                            {internship.ppoStatus === 'Offered' && (
                              <span className="px-1.5 py-0.5 bg-[#A0E8AF]/10 text-[#A0E8AF] rounded text-[6px] font-black uppercase tracking-widest border border-[#A0E8AF]/20">
                                PPO
                              </span>
                            )}
                         </div>
                         <div className="min-w-0">
                            <h4 className="text-[10px] font-black text-white uppercase italic group-hover:text-accent-red transition-colors truncate tracking-tighter" title={internship.company}>
                              {internship.company}
                            </h4>
                            <p className="text-[8px] font-bold text-text-secondary uppercase tracking-tight truncate opacity-80" title={internship.role}>
                              {internship.role}
                            </p>
                         </div>
                         <div className="flex items-center justify-between mt-1 opacity-30 group-hover:opacity-100 transition-all border-t border-white/5 pt-2">
                            <span className="text-[7px] font-black text-text-secondary uppercase tracking-widest">{internship.duration}</span>
                            <ChevronRight size={10} className="text-accent-red transform group-hover:translate-x-1 transition-transform" />
                         </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Gigs Feed - Logic handled above */}
            </div>
          </div>
        ) : (
          <div className="mb-20 min-h-0">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0A0A0A] border border-white/10 rounded-[48px] min-h-[600px] flex flex-col shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent-red/5 blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <div className="p-8 md:p-12 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <button 
                    onClick={() => setActiveInternship(null)}
                    className="p-4 bg-white/5 border border-white/10 rounded-2xl text-text-secondary hover:text-white hover:bg-accent-red transition-all group"
                  >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                  </button>
                  <div>
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white leading-none">
                      {activeInternship.company}
                    </h2>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-red">{activeInternship.role}</span>
                      <span className="w-1 h-1 rounded-full bg-white/10" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary opacity-60 italic">{activeInternship.duration} dossier</span>
                    </div>
                  </div>
                </div>
                {activeInternship.ppoStatus === 'Offered' && (
                  <div className="flex items-center gap-4 px-6 py-3 bg-[#A0E8AF]/10 border border-[#A0E8AF]/20 rounded-2xl">
                    <Award size={20} className="text-[#A0E8AF]" />
                    <span className="text-xs font-black uppercase tracking-widest text-[#A0E8AF]">Verified PPO Offer</span>
                  </div>
                )}
              </div>

              <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0">
                <div className="lg:col-span-7 p-8 md:p-12 border-r border-white/5 flex flex-col">
                   <h3 className="text-xs font-black uppercase tracking-widest text-text-secondary mb-8">Performance Analytics Radar</h3>
                   <div className="flex-1 min-h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={activeInternship.performanceMetrics}>
                          <PolarGrid stroke="rgba(255,255,255,0.05)" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 900 }} />
                          <Radar
                            name="Score"
                            dataKey="value"
                            stroke="#FF2A2A"
                            strokeWidth={3}
                            fill="#FF2A2A"
                            fillOpacity={0.1}
                          />
                          <RechartsTooltip contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                        </RadarChart>
                      </ResponsiveContainer>
                   </div>
                   <div className="mt-8 grid grid-cols-3 gap-4">
                      {activeInternship.performanceMetrics.map((m: any) => (
                        <div key={m.subject} className="p-4 bg-white/5 border border-white/5 rounded-2xl text-center">
                           <p className="text-[8px] font-black text-text-secondary uppercase tracking-widest mb-1 opacity-50">{m.subject}</p>
                           <p className="text-lg font-black text-white font-mono">{m.value}</p>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="lg:col-span-5 p-8 md:p-12 flex flex-col bg-white/[0.01]">
                   <h3 className="text-xs font-black uppercase tracking-widest text-text-secondary mb-8">Verified Offer Outcome</h3>
                   <div className="space-y-8">
                      {activeInternship.ppoStatus === 'Offered' ? (
                        <div className="bg-[#A0E8AF]/5 border border-[#A0E8AF]/20 rounded-[32px] p-8 space-y-6">
                           <div>
                              <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-4">Official Extension</p>
                              <div className="space-y-4">
                                 <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#A0E8AF]">
                                       <Briefcase size={16} />
                                    </div>
                                    <div>
                                       <p className="text-[8px] font-bold text-text-secondary uppercase">Proposed Role</p>
                                       <p className="text-lg font-black text-white uppercase italic leading-tight">{activeInternship.ppoRole}</p>
                                    </div>
                                 </div>
                                 <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-accent-deep-green">
                                       <CircleDollarSign size={16} />
                                    </div>
                                    <div>
                                       <p className="text-[8px] font-bold text-text-secondary uppercase">Annual Compensation</p>
                                       <p className="text-lg font-black text-accent-deep-green font-mono leading-tight">{activeInternship.ppoCompensation}</p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="pt-6 border-t border-[#A0E8AF]/10 flex items-center justify-between">
                              <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">Candidate Decision</span>
                              <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                                activeInternship.candidateDecision === 'Accepted' ? 'bg-[#A0E8AF] text-black shadow-lg shadow-[#A0E8AF]/20' : 'bg-white/10 text-white'
                              }`}>
                                {activeInternship.candidateDecision}
                              </span>
                           </div>
                        </div>
                      ) : (
                        <div className="bg-white/5 border border-white/5 rounded-3xl p-10 text-center opacity-30 italic h-40 flex items-center justify-center">
                           <p className="text-[10px] font-black uppercase tracking-[0.2em]">Engagement completed without terminal offer record</p>
                        </div>
                      )}

                      <div className="bg-[#1A1A1A] p-8 rounded-[32px] border border-white/5">
                         <div className="flex items-center justify-between mb-6">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Manager Endorsement</h4>
                            <div className="flex items-center gap-1">
                               {Array.from({ length: 5 }).map((_, i) => (
                                 <Star key={i} size={10} className="fill-accent-amber text-accent-amber" />
                               ))}
                            </div>
                         </div>
                         <p className="text-xs text-white/70 leading-relaxed font-medium italic relative pl-4 border-l border-accent-red/20">
                            "Candidate displayed exceptional commitment to production-grade delivery. Technical aptitude and collaborative velocity was consistent with senior expectations."
                         </p>
                         <div className="mt-8 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-accent-red flex items-center justify-center text-white text-[10px] font-black italic">H.R</div>
                            <div>
                               <p className="text-[9px] font-black text-white uppercase tracking-tight">Verified Engineering Director</p>
                               <p className="text-[7px] font-bold text-text-secondary uppercase">Authenticated via Enterprise Escrow</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) }
        </div>

        {/* Footer Actions */}
        <footer className="mt-auto p-8 border-t border-white/5 flex flex-col md:flex-row gap-6 items-center justify-between bg-bg-surface/50 backdrop-blur-md">
          <div className="flex items-center gap-6">
             <button className="flex items-center gap-3 text-text-secondary hover:text-white transition-colors uppercase font-black text-[10px] tracking-widest">
               <Mail size={16} /> Send Direct Email
             </button>
             <button className="flex items-center gap-3 text-text-secondary hover:text-white transition-colors uppercase font-black text-[10px] tracking-widest">
               <MessageSquare size={16} /> Open Discord Channel
             </button>
          </div>
          <p className="text-[8px] text-text-secondary font-black uppercase tracking-widest opacity-30 italic">
            This dossier is generated via verified proof-of-work protocols. Any discrepancies should be reported to oversight@cos.network
          </p>
        </footer>

        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-red/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 -z-10" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent-amber/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 -z-10" />
      </motion.div>

        {/* Shortlist Modal */}
        <AnimatePresence>
          {isShortlistModalOpen && (
            <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsShortlistModalOpen(false)}
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-lg bg-[#1A1A1A] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl"
              >
                <div className="p-8 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-accent-red/10 rounded-xl text-accent-red">
                       <CheckCircle2 size={24} />
                    </div>
                    <div>
                       <h3 className="text-xl font-black italic uppercase tracking-tight text-white leading-none">Shortlist Candidate</h3>
                       <p className="text-[10px] font-black uppercase tracking-widest text-[#A0E8AF] mt-1">{cosine.name}</p>
                    </div>
                  </div>
                  <button onClick={() => setIsShortlistModalOpen(false)} className="p-2 text-text-secondary hover:text-white transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <div className="p-8 space-y-6">
                  <div className="space-y-2 text-left">
                    <label className="text-[9px] font-black text-text-secondary uppercase tracking-[0.2em] ml-1">Assign to Role</label>
                    <select 
                      value={shortlistForm.role}
                      onChange={(e) => setShortlistForm({ ...shortlistForm, role: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs font-bold text-white focus:border-accent-red/50 outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="Senior Frontend Engineer" className="bg-[#1A1A1A]">Senior Frontend Engineer</option>
                      <option value="Data Analyst Intern" className="bg-[#1A1A1A]">Data Analyst Intern</option>
                      <option value="General Talent Pool" className="bg-[#1A1A1A]">General Talent Pool</option>
                    </select>
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-[9px] font-black text-text-secondary uppercase tracking-[0.2em] ml-1">Internal Hiring Note (Optional)</label>
                    <textarea 
                      placeholder="Enter evaluation notes or justification..."
                      value={shortlistForm.note}
                      onChange={(e) => setShortlistForm({ ...shortlistForm, note: e.target.value })}
                      className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-white focus:border-accent-red/50 outline-none transition-all resize-none italic"
                    />
                  </div>
                </div>

                <div className="p-8 border-t border-white/5 bg-white/[0.01] flex gap-4">
                  <button 
                    onClick={() => setIsShortlistModalOpen(false)}
                    className="flex-1 py-4 bg-transparent border border-white/10 text-text-secondary rounded-2xl text-[10px] font-black uppercase tracking-widest hover:text-white hover:bg-white/5 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      shortlistCandidate(cosine, shortlistForm.role);
                      setIsShortlisted(true);
                      setIsShortlistModalOpen(false);
                    }}
                    className="flex-[2] py-4 bg-accent-red text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-accent-red/20"
                  >
                    Confirm & Move to Pipeline
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Deep Dive Modals */}
      <AnimatePresence>
        {isArenaDeepDiveOpen && (
          <ArenaDeepDiveModal 
            onClose={() => setIsArenaDeepDiveOpen(false)} 
            cosine={cosine}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeDeepDive && (
          <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 20 }}
              className="w-full max-w-5xl h-[85vh] bg-[#0A0A0A] rounded-[40px] border border-white/10 shadow-[0_0_100px_rgba(255,42,42,0.15)] relative overflow-hidden flex flex-col"
            >
              <button 
                onClick={closeDeepDive}
                className="absolute top-8 right-8 p-3 bg-white/5 rounded-2xl text-text-secondary hover:text-white transition-colors border border-white/5 hover:border-white/20 z-10"
              >
                <X size={20} />
              </button>

              <div className="flex-1 overflow-y-auto p-8 md:p-12 scrollbar-hide">
                {/* Modal Content Rendering */}
                {activeDeepDive === 'cgpa' && (
                  <div className="space-y-12">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-accent-red/10 rounded-[24px] flex items-center justify-center text-accent-red">
                        <GraduationCap size={32} />
                      </div>
                      <div>
                        <h3 className="text-4xl font-black italic uppercase tracking-tighter text-white leading-none mb-2">
                          Academic Integrity Review
                        </h3>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-red">Semester-wise GPA Progression & Verified Subjects</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                       <div className="lg:col-span-2 bg-[#1A1A1A] p-8 rounded-[32px] border border-white/5">
                          <h4 className="text-xs font-black uppercase tracking-widest text-text-secondary mb-8">Verified GPA Progression</h4>
                          <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={[
                                { name: 'Sem 1', gpa: 8.8 }, { name: 'Sem 2', gpa: 9.1 }, 
                                { name: 'Sem 3', gpa: 9.4 }, { name: 'Sem 4', gpa: 9.2 },
                                { name: 'Sem 5', gpa: 9.5 }, { name: 'Sem 6', gpa: 9.3 }
                              ]}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis domain={[0, 10]} stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                                <RechartsTooltip 
                                  contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                                />
                                <Bar dataKey="gpa" fill="#FF2A2A" radius={[8, 8, 0, 0]} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                       </div>
                       
                       <div className="space-y-6">
                         <div className="bg-[#1A1A1A] p-8 rounded-[32px] border border-white/5">
                            <h4 className="text-xs font-black uppercase tracking-widest text-text-secondary mb-6">Key Core Subjects</h4>
                            <div className="space-y-4">
                              {['Data Structures', 'Algorithms', 'Neural Networks', 'Database Systems'].map(subject => (
                                <div key={subject} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                                   <span className="text-[11px] font-bold text-white uppercase italic">{subject}</span>
                                   <span className="text-[10px] font-black text-accent-red uppercase tracking-widest">GRADE: A+</span>
                                </div>
                              ))}
                            </div>
                         </div>
                         
                         <div className="bg-accent-red/5 p-8 rounded-[32px] border border-accent-red/20 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                              <ShieldCheck size={64} className="text-accent-red" />
                            </div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-accent-red mb-4">Official Verification</h4>
                            <p className="text-[11px] text-gray-400 leading-relaxed mb-6 font-medium italic">
                              "Authenticated via digital escrow-locked transcripts provided by GGSIPU Examination Cell."
                            </p>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-accent-red/20 flex items-center justify-center text-accent-red">
                                <Award size={20} />
                              </div>
                              <div>
                                <p className="text-[10px] font-black text-white uppercase tracking-tighter leading-none mb-1">PROCTORED RECORD</p>
                                <p className="text-[8px] font-bold text-accent-red/80 uppercase">TIMESTAMP: 2024.12.05</p>
                              </div>
                            </div>
                         </div>
                       </div>
                    </div>
                  </div>
                )}

                {activeDeepDive === 'cosCred' && (
                  <div className="space-y-12">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-accent-red/10 rounded-[24px] flex items-center justify-center text-accent-red">
                        <ShieldCheck size={32} />
                      </div>
                      <div>
                        <h3 className="text-4xl font-black italic uppercase tracking-tighter text-white leading-none mb-2">
                          COS Platform Trust Metrics
                        </h3>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-red">Weighted Analysis of Professional Integrity</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                       <div className="bg-[#1A1A1A] p-12 rounded-[48px] border border-white/5 flex justify-center">
                          <div className="h-[400px] w-full max-w-[500px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                                { subject: 'Identity Integrity', A: breakdown.identity * 10, fullTop: 100 },
                                { subject: 'Skill Provenance', A: breakdown.skill * 10, fullTop: 100 },
                                { subject: 'Social Proofing', A: breakdown.social * 10, fullTop: 100 },
                                { subject: 'Network Activity', A: breakdown.activity * 10, fullTop: 100 }
                              ]}>
                                <PolarGrid stroke="rgba(255,255,255,0.05)" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 900 }} />
                                <Radar
                                  name="Cosine Score"
                                  dataKey="A"
                                  stroke="#FF2A2A"
                                  strokeWidth={3}
                                  fill="#FF2A2A"
                                  fillOpacity={0.15}
                                />
                                <RechartsTooltip 
                                  contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                                />
                              </RadarChart>
                            </ResponsiveContainer>
                          </div>
                       </div>
                       
                       <div className="space-y-8">
                          <div className="space-y-4">
                            {[
                              { label: 'Identity Integrity', val: breakdown.identity, desc: 'KYC, biometric matching and multi-factor validation status.' },
                              { label: 'Skill Provenance', val: breakdown.skill, desc: 'Quality of verifiable code, complexity of repository contribution.' },
                              { label: 'Social Proofing', val: breakdown.social, desc: 'Authenticated peer reviews and community-vetted endorsements.' },
                              { label: 'Network Activity', val: breakdown.activity, desc: 'Platform responsiveness, consistency of gig execution.' }
                            ].map(pillar => (
                              <div key={pillar.label} className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl hover:bg-white/[0.05] transition-all">
                                <div className="flex justify-between items-center mb-2">
                                   <h5 className="text-[11px] font-black uppercase tracking-widest text-white italic">{pillar.label}</h5>
                                   <span className="text-sm font-black font-mono text-accent-red">{pillar.val}/10.0</span>
                                </div>
                                <p className="text-[10px] text-text-secondary leading-relaxed opacity-60">{pillar.desc}</p>
                              </div>
                            ))}
                          </div>
                          
                          <div className="pt-4 border-t border-white/5">
                             <p className="text-[10px] text-text-secondary leading-relaxed font-medium italic italic">
                               <span className="text-accent-red font-black uppercase not-italic mr-2">Oversight Note:</span>
                               COS CRED is a dynamic aggregate weighted by project impact, tenure, and verified as-you-go human interaction protocols. Scores are non-static and subject to audit.
                             </p>
                          </div>
                       </div>
                    </div>
                  </div>
                )}

                {activeDeepDive === 'skills' && (
                  <div className="space-y-12">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-accent-red/10 rounded-[24px] flex items-center justify-center text-accent-red">
                        <PieChartIcon size={32} />
                      </div>
                      <div>
                        <h3 className="text-4xl font-black italic uppercase tracking-tighter text-white leading-none mb-2">
                          Detailed Skill Analytics
                        </h3>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-red">System Protocol: Proficiency Audit</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Graph 1: Line Chart */}
                      <div className="bg-[#1A1A1A] p-8 rounded-[32px] border border-white/5">
                        <div className="flex items-center justify-between mb-8">
                          <h4 className="text-xs font-black uppercase tracking-widest text-text-secondary">Skill Utilization Over Time</h4>
                          <button 
                            onClick={() => setIsSkillGraphFullscreen(true)}
                            className="group/expand p-2.5 bg-white/5 hover:bg-accent-red rounded-xl text-text-secondary hover:text-white transition-all border border-white/5 hover:border-accent-red/50 shadow-lg"
                            title="Expand to Full Screen"
                          >
                            <Maximize2 size={16} className="group-hover/expand:scale-110 transition-transform" />
                          </button>
                        </div>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={[
                              { name: 'May', Python: 45, React: 30, SQL: 40 }, 
                              { name: 'Jun', Python: 52, React: 35, SQL: 42 }, 
                              { name: 'Jul', Python: 48, React: 42, SQL: 45 },
                              { name: 'Aug', Python: 61, React: 48, SQL: 50 }, 
                              { name: 'Sep', Python: 55, React: 55, SQL: 52 }, 
                              { name: 'Oct', Python: 67, React: 60, SQL: 58 },
                              { name: 'Nov', Python: 72, React: 68, SQL: 62 }, 
                              { name: 'Dec', Python: 65, React: 75, SQL: 65 }, 
                              { name: 'Jan', Python: 84, React: 80, SQL: 70 },
                              { name: 'Feb', Python: 78, React: 85, SQL: 72 }, 
                              { name: 'Mar', Python: 92, React: 92, SQL: 80 }, 
                              { name: 'Apr', Python: 88, React: 95, SQL: 85 }
                            ]}>
                              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                              <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                              <RechartsTooltip 
                                contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                itemStyle={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 900 }}
                              />
                              <Legend 
                                verticalAlign="top" 
                                align="right" 
                                iconType="circle"
                                wrapperStyle={{ paddingBottom: '20px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' }}
                              />
                              <Line type="monotone" dataKey="Python" stroke="#FF2A2A" strokeWidth={3} dot={{ fill: '#FF2A2A', r: 3 }} activeDot={{ r: 5 }} />
                              <Line type="monotone" dataKey="React" stroke="#A0E8AF" strokeWidth={3} dot={{ fill: '#A0E8AF', r: 3 }} activeDot={{ r: 5 }} />
                              <Line type="monotone" dataKey="SQL" stroke="#F59E0B" strokeWidth={3} dot={{ fill: '#F59E0B', r: 3 }} activeDot={{ r: 5 }} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Graph 2: Bar Chart */}
                      <div className="bg-[#1A1A1A] p-8 rounded-[32px] border border-white/5">
                        <div className="flex items-center justify-between mb-8">
                          <h4 className="text-xs font-black uppercase tracking-widest text-text-secondary">Client Satisfaction by Skill</h4>
                          <button 
                            onClick={() => setIsSatisfactionFullscreen(true)}
                            className="group/expand p-2.5 bg-white/5 hover:bg-accent-red rounded-xl text-text-secondary hover:text-white transition-all border border-white/5 hover:border-accent-red/50 shadow-lg"
                            title="Expand to Full Screen"
                          >
                            <Maximize2 size={16} className="group-hover/expand:scale-110 transition-transform" />
                          </button>
                        </div>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                              { name: 'Python', rating: 4.9 }, { name: 'React', rating: 4.7 }, { name: 'SQL', rating: 4.5 },
                              { name: 'Figma', rating: 4.8 }, { name: 'Three.js', rating: 4.6 }
                            ]}>
                              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                              <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                              <YAxis domain={[0, 5]} stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                              <RechartsTooltip 
                                contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                itemStyle={{ color: '#A0E8AF', fontSize: '10px', textTransform: 'uppercase', fontWeight: 900 }}
                              />
                              <Bar dataKey="rating" fill="#A0E8AF" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Graph 3: Client Retention (Full Width Bottom Row) */}
                      <div className="lg:col-span-2 bg-[#1A1A1A] p-8 rounded-[32px] border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                          <TrendingUp size={120} className="text-accent-red" />
                        </div>
                        <div className="flex items-center justify-between mb-8 relative z-10">
                          <h4 className="text-xs font-black uppercase tracking-widest text-text-secondary flex items-center gap-2">
                             <ShieldCheck size={14} className="text-accent-red" /> CLIENT RETENTION (REPEAT HIRE %)
                          </h4>
                          <button 
                            onClick={() => setIsRetentionFullscreen(true)}
                            className="group/expand p-2.5 bg-white/5 hover:bg-accent-red rounded-xl text-text-secondary hover:text-white transition-all border border-white/5 hover:border-accent-red/50 shadow-lg"
                            title="Expand to Full Screen"
                          >
                            <Maximize2 size={16} className="group-hover/expand:scale-110 transition-transform" />
                          </button>
                        </div>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart 
                              data={[
                                { skill: 'Python', retention: 85 }, 
                                { skill: 'React', retention: 60 }, 
                                { skill: 'SQL', retention: 45 },
                                { skill: 'Figma', retention: 70 }, 
                                { skill: 'Three.js', retention: 50 }
                              ]} 
                              layout="vertical"
                              margin={{ left: 20, right: 40 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                              <XAxis 
                                type="number" 
                                domain={[0, 100]} 
                                tickFormatter={(val) => `${val}%`}
                                stroke="rgba(255,255,255,0.3)" 
                                fontSize={10} 
                                tickLine={false} 
                                axisLine={false} 
                              />
                              <YAxis 
                                dataKey="skill" 
                                type="category" 
                                stroke="rgba(255,255,255,0.3)" 
                                fontSize={10} 
                                tickLine={false} 
                                axisLine={false} 
                                width={100}
                              />
                              <RechartsTooltip 
                                cursor={{fill: 'rgba(255,255,255,0.05)'}}
                                contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '20px' }}
                                labelStyle={{ display: 'none' }}
                                content={({ active, payload }) => {
                                  if (active && payload && payload.length) {
                                    const data = payload[0].payload;
                                    return (
                                      <div className="bg-[#1A1A1A] border border-white/10 p-4 rounded-2xl shadow-2xl max-w-[200px]">
                                        <p className="text-[10px] font-black uppercase text-accent-red tracking-widest mb-2 italic">{data.skill}</p>
                                        <p className="text-xs font-bold text-white uppercase italic leading-relaxed">
                                          {data.retention}% of clients who hired this Cosine for {data.skill} returned for another gig.
                                        </p>
                                      </div>
                                    );
                                  }
                                  return null;
                                }}
                              />
                              <Bar dataKey="retention" fill="#FF2A2A" radius={[0, 4, 4, 0]} barSize={24} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>

                    {/* Fullscreen Graph Overlay */}
                    <AnimatePresence>
                      {isSkillGraphFullscreen && (
                        <FullScreenChart 
                          title="Skill Utilization Deep Dive" 
                          subtitle="Time-Series Proficiency Audit"
                          onClose={() => setIsSkillGraphFullscreen(false)}
                        >
                          <LineChart data={[
                            { name: 'May', Python: 45, React: 30, SQL: 40 }, 
                            { name: 'Jun', Python: 52, React: 35, SQL: 42 }, 
                            { name: 'Jul', Python: 48, React: 42, SQL: 45 },
                            { name: 'Aug', Python: 61, React: 48, SQL: 50 }, 
                            { name: 'Sep', Python: 55, React: 55, SQL: 52 }, 
                            { name: 'Oct', Python: 67, React: 60, SQL: 58 },
                            { name: 'Nov', Python: 72, React: 68, SQL: 62 }, 
                            { name: 'Dec', Python: 65, React: 75, SQL: 65 }, 
                            { name: 'Jan', Python: 84, React: 80, SQL: 70 },
                            { name: 'Feb', Python: 78, React: 85, SQL: 72 }, 
                            { name: 'Mar', Python: 92, React: 92, SQL: 80 }, 
                            { name: 'Apr', Python: 88, React: 95, SQL: 85 }
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                            <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                            <RechartsTooltip 
                              contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '20px' }}
                              itemStyle={{ fontSize: '12px', textTransform: 'uppercase', fontWeight: 900, padding: '4px 0' }}
                            />
                            <Legend verticalAlign="top" align="center" iconType="circle" wrapperStyle={{ paddingBottom: '40px', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase' }} />
                            <Line type="monotone" dataKey="Python" stroke="#FF2A2A" strokeWidth={4} dot={{ fill: '#FF2A2A', r: 5 }} activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="React" stroke="#A0E8AF" strokeWidth={4} dot={{ fill: '#A0E8AF', r: 5 }} activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="SQL" stroke="#F59E0B" strokeWidth={4} dot={{ fill: '#F59E0B', r: 5 }} activeDot={{ r: 8 }} />
                          </LineChart>
                        </FullScreenChart>
                      )}

                      {isSatisfactionFullscreen && (
                        <FullScreenChart 
                          title="Client Satisfaction Analysis" 
                          subtitle="Sentiment & Delivery Protocol"
                          onClose={() => setIsSatisfactionFullscreen(false)}
                        >
                          <BarChart data={[
                            { name: 'Python', rating: 4.9 }, { name: 'React', rating: 4.7 }, { name: 'SQL', rating: 4.5 },
                            { name: 'Figma', rating: 4.8 }, { name: 'Three.js', rating: 4.6 }
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                            <YAxis domain={[0, 5]} stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                            <RechartsTooltip 
                              contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '20px' }}
                              itemStyle={{ color: '#A0E8AF', fontSize: '12px', textTransform: 'uppercase', fontWeight: 900 }}
                            />
                            <Bar dataKey="rating" fill="#A0E8AF" radius={[8, 8, 0, 0]} />
                          </BarChart>
                        </FullScreenChart>
                      )}

                      {isRetentionFullscreen && (
                        <FullScreenChart 
                          title="Retention & Loyalty Matrix" 
                          subtitle="Multi-Gig Success Velocity"
                          onClose={() => setIsRetentionFullscreen(false)}
                        >
                          <BarChart 
                            data={[
                              { skill: 'Python', retention: 85 }, 
                              { skill: 'React', retention: 60 }, 
                              { skill: 'SQL', retention: 45 },
                              { skill: 'Figma', retention: 70 }, 
                              { skill: 'Three.js', retention: 50 }
                            ]} 
                            layout="vertical"
                            margin={{ left: 40, right: 80, bottom: 40 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                            <XAxis type="number" domain={[0, 100]} tickFormatter={(val) => `${val}%`} stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                            <YAxis dataKey="skill" type="category" stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} dx={-10} width={120} />
                            <RechartsTooltip 
                              cursor={{fill: 'rgba(255,255,255,0.05)'}}
                              contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '32px' }}
                              labelStyle={{ display: 'none' }}
                              content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                  const data = payload[0].payload;
                                  return (
                                    <div className="bg-[#1A1A1A] border border-white/10 p-6 rounded-3xl shadow-2xl max-w-[300px]">
                                      <p className="text-sm font-black uppercase text-accent-red tracking-[0.2em] mb-4 italic">{data.skill}</p>
                                      <p className="text-base font-bold text-white uppercase italic leading-relaxed">
                                        {data.retention}% client retention rate for {data.skill} related projects.
                                      </p>
                                    </div>
                                  );
                                }
                                return null;
                              }}
                            />
                            <Bar dataKey="retention" fill="#FF2A2A" radius={[0, 8, 8, 0]} barSize={48} />
                          </BarChart>
                        </FullScreenChart>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {activeDeepDive === 'project' && selectedProject && (
                  <div className="space-y-12">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-accent-red/10 rounded-[24px] flex items-center justify-center text-accent-red">
                          {selectedProject.name.includes('GSD') ? <Rocket size={32} /> : <Layout size={32} />}
                        </div>
                        <div>
                          <h3 className="text-4xl font-black italic uppercase tracking-tighter text-white leading-none mb-2">
                            {selectedProject.name}
                          </h3>
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-red">Verified Growth & Architecture</p>
                        </div>
                      </div>
                      <div className="hidden md:flex gap-4">
                        <button className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
                          <ExternalLink size={14} /> LIVE PROJECT
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 space-y-8">
                        <div className="bg-[#1A1A1A] p-8 rounded-[32px] border border-white/5">
                          <h4 className="text-xs font-black uppercase tracking-widest text-text-secondary mb-8">Project Scaling Metrics</h4>
                          <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={[
                                { name: 'Week 1', users: 100, volume: 5 }, { name: 'Week 2', users: 250, volume: 12 },
                                { name: 'Week 3', users: 480, volume: 22 }, { name: 'Week 4', users: 720, volume: 35 },
                                { name: 'Week 5', users: 950, volume: 42 }, { name: 'Week 6', users: 1200, volume: 48 }
                              ]}>
                                <defs>
                                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#FF2A2A" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#FF2A2A" stopOpacity={0}/>
                                  </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                                <RechartsTooltip 
                                  contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                  itemStyle={{ color: '#FF2A2A', fontSize: '10px', textTransform: 'uppercase', fontWeight: 900 }}
                                />
                                <Area type="monotone" dataKey="users" stroke="#FF2A2A" fillOpacity={1} fill="url(#colorUsers)" strokeWidth={3} />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        <div className="bg-[#1A1A1A] p-8 rounded-[32px] border border-white/5">
                          <h4 className="text-xs font-black uppercase tracking-widest text-text-secondary mb-6">Tech Stack Details</h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {selectedProject.skills.map((skill: string) => (
                              <div key={skill} className="p-4 bg-black/40 border border-white/5 rounded-2xl flex flex-col items-center text-center">
                                <span className="text-[10px] font-black text-white uppercase italic mb-1">{skill}</span>
                                <span className="text-[8px] text-text-secondary font-bold uppercase tracking-tight">Active Usage</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-[#1A1A1A] p-8 rounded-[40px] border border-white/5 shadow-xl">
                          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#FFD700] mb-8 flex items-center gap-3">
                            <Trophy size={16} /> THE TROPHY CASE
                          </h3>
                          <div className="space-y-6">
                            {[
                              { title: 'GeeksForGeeks Hackfest 2026', result: 'Finalist' },
                              { title: 'GDGOC Techsprint', result: 'Special Mention' },
                              { title: 'FOSS Hack 2026', result: 'Track Winner' }
                            ].map((item, i) => (
                              <div key={i} className="flex items-start gap-4 group">
                                <div className="mt-1 flex-shrink-0">
                                  {i === 2 ? (
                                    <Trophy size={14} className="text-[#FFD700]" />
                                  ) : (
                                    <CheckCircle2 size={14} className="text-[#A0E8AF]" />
                                  )}
                                </div>
                                <div>
                                  <p className="text-xs font-black text-white leading-tight uppercase italic">{item.title}</p>
                                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight mt-0.5">{item.result}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-[#1A1A1A] p-8 rounded-[40px] border border-accent-deep-green/20 shadow-xl relative overflow-hidden group">
                          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                            <CircleDollarSign size={80} className="text-[#A0E8AF]" />
                          </div>
                          
                          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#A0E8AF] mb-8 flex items-center gap-3 italic">
                            <Zap size={16} /> BACKING & GRANTS
                          </h3>
                          
                          <div className="space-y-6 relative z-10">
                            {[
                              { title: 'Accel Atoms AI Cohort', desc: 'Selected Participant', accent: true },
                              { title: 'AMD Slingshot', desc: 'Regional Finalist' },
                              { title: 'Initial Grant', desc: '$5,000 (Equity-Free)', mono: true }
                            ].map((item, i) => (
                              <div key={i} className={`p-4 rounded-2xl border ${item.accent ? 'bg-[#A0E8AF]/10 border-[#A0E8AF]/20' : 'bg-black/40 border-white/5'}`}>
                                <div className="flex items-center justify-between mb-1">
                                  <p className={`text-[11px] font-black uppercase italic ${item.accent ? 'text-[#A0E8AF]' : 'text-white'}`}>{item.title}</p>
                                  {item.accent && <div className="px-1.5 py-0.5 bg-[#A0E8AF] text-black text-[7px] font-black rounded uppercase">Verified</div>}
                                </div>
                                <p className={`text-[10px] font-bold uppercase tracking-tight ${item.mono ? 'font-mono text-[#A0E8AF]' : 'text-gray-400'}`}>
                                  {item.desc}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-[#1A1A1A] p-6 rounded-[24px] border border-white/5 opacity-60">
                           <h4 className="text-[9px] font-black text-text-secondary uppercase mb-3 tracking-widest">Architectural Summary</h4>
                           <p className="text-[11px] text-text-primary leading-relaxed italic">
                             {selectedProject.name.includes('GSD') 
                               ? "Utilized serverless Firebase for real-time escrow state management and Bone currency tracking across campus nodes."
                               : "Component-driven React architecture with strict TypeScript typing and custom design system for dossier rendering."}
                           </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeDeepDive === 'github' && (
                  <div className="space-y-12">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-white/10 rounded-[24px] flex items-center justify-center text-white">
                        <Github size={32} />
                      </div>
                      <div>
                        <h3 className="text-4xl font-black italic uppercase tracking-tighter text-white leading-none mb-2">
                          Engineering Ecosystem
                        </h3>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-red">System Protocol: Core Repository Scan</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                       <div className="bg-[#1A1A1A] p-8 rounded-[32px] border border-white/5">
                        <h4 className="text-xs font-black uppercase tracking-widest text-text-secondary mb-8">Commit Activity Calendar (Mock)</h4>
                        <div className="grid grid-cols-21 gap-1">
                           {Array.from({ length: 21 * 7 }).map((_, i) => (
                             <div 
                              key={i} 
                              className="aspect-square rounded-sm" 
                              style={{ 
                                backgroundColor: Math.random() > 0.4 
                                  ? `rgba(255, 42, 42, ${Math.random() * 0.8 + 0.2})` 
                                  : 'rgba(255,255,255,0.05)' 
                              }} 
                             />
                           ))}
                        </div>
                        <div className="flex justify-between mt-4">
                           <span className="text-[8px] font-black text-text-secondary uppercase">May 2025</span>
                           <span className="text-[8px] font-black text-text-secondary uppercase">Apr 2026</span>
                        </div>
                      </div>

                      <div className="bg-[#1A1A1A] p-8 rounded-[32px] border border-white/5">
                        <h4 className="text-xs font-black uppercase tracking-widest text-text-secondary mb-8">Language Distribution</h4>
                        <div className="h-[250px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={[
                                  { name: 'Python', value: 45, color: '#FF2A2A' },
                                  { name: 'C', value: 25, color: '#B31D1D' },
                                  { name: 'React', value: 20, color: '#7A1A1A' },
                                  { name: 'Other', value: 10, color: '#4A0E0E' }
                                ]}
                                cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value"
                              >
                                {[
                                  { name: 'Python', value: 45, color: '#FF2A2A' },
                                  { name: 'C', value: 25, color: '#B31D1D' },
                                  { name: 'React', value: 20, color: '#7A1A1A' },
                                  { name: 'Other', value: 10, color: '#4A0E0E' }
                                ].map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#1A1A1A" strokeWidth={3} />
                                ))}
                              </Pie>
                              <RechartsTooltip 
                                contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333', color: '#fff', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                              />
                              <Legend 
                                verticalAlign="bottom" 
                                iconType="circle" 
                                wrapperStyle={{ paddingTop: '20px' }}
                                formatter={(value: string) => <span style={{ color: '#A3A3A3', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' }}>{value}</span>}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 p-8 rounded-[32px] border border-white/10">
                       <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-red mb-8">TOP ACTIVITY REPOSITORIES</h4>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         {[
                           { name: 'cos-escrow-engine', stars: 124, forks: 42, commits: 340 },
                           { name: 'quantum-talent-radar', stars: 89, forks: 12, commits: 210 },
                           { name: 'blockchain-campus-p2p', stars: 56, forks: 8, commits: 520 }
                         ].map(repo => (
                           <div key={repo.name} className="p-6 bg-black/40 border border-white/5 rounded-2xl">
                              <h5 className="text-sm font-black text-white uppercase italic mb-3">{repo.name}</h5>
                              <div className="flex gap-4">
                                <div className="flex flex-col">
                                   <span className="text-[8px] font-black text-text-secondary uppercase">Stars</span>
                                   <span className="text-sm font-black font-mono text-accent-amber">{repo.stars}</span>
                                </div>
                                <div className="flex flex-col">
                                   <span className="text-[8px] font-black text-text-secondary uppercase">Commits</span>
                                   <span className="text-sm font-black font-mono text-accent-red">{repo.commits}</span>
                                </div>
                              </div>
                           </div>
                         ))}
                       </div>
                    </div>
                  </div>
                )}

                {activeDeepDive === 'leetcode' && (
                  <div className="space-y-12">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-[#FFA116]/10 rounded-[24px] flex items-center justify-center text-[#FFA116]">
                        <Code2 size={32} />
                      </div>
                      <div>
                        <h3 className="text-4xl font-black italic uppercase tracking-tighter text-white leading-none mb-2">
                          LeetCode Diagnostics
                        </h3>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-red">Diagnostic Tooling: Algorithm Mastery</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="bg-[#1A1A1A] p-8 rounded-[32px] border border-white/5">
                        <h4 className="text-xs font-black uppercase tracking-widest text-text-secondary mb-8">Mastery by Algorithm Category</h4>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart outerRadius="80%" data={[
                              { subject: 'Dynamic Prog', A: 120, fullMark: 150 },
                              { subject: 'Graphs/Trees', A: 98, fullMark: 150 },
                              { subject: 'Arrays/Hash', A: 142, fullMark: 150 },
                              { subject: 'Math', A: 110, fullMark: 150 },
                              { subject: 'Binary Search', A: 85, fullMark: 150 },
                              { subject: 'Sorting', A: 130, fullMark: 150 }
                            ]}>
                              <PolarGrid stroke="rgba(255,255,255,0.1)" />
                              <PolarAngleAxis dataKey="subject" stroke="rgba(255,255,255,0.4)" fontSize={10} />
                              <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="none" />
                              <Radar name="Candidate" dataKey="A" stroke="#FF2A2A" fill="#FF2A2A" fillOpacity={0.4} />
                              <RechartsTooltip />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div className="bg-[#1A1A1A] p-8 rounded-[32px] border border-white/5">
                        <h4 className="text-xs font-black uppercase tracking-widest text-text-secondary mb-8">Global Ranking Progression</h4>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={[
                              { month: 'Oct', rank: 45000 }, { month: 'Nov', rank: 32000 },
                              { month: 'Dec', rank: 25000 }, { month: 'Jan', rank: 18000 },
                              { month: 'Feb', rank: 12000 }, { month: 'Mar', rank: 8540 }
                            ]}>
                              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                              <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                              <YAxis reversed stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} label={{ value: 'World Rank', angle: -90, position: 'insideLeft', fill: 'rgba(255,255,255,0.1)' }} />
                              <RechartsTooltip 
                                contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                itemStyle={{ color: '#FFA116', fontSize: '10px', textTransform: 'uppercase', fontWeight: 900 }}
                              />
                              <Line type="stepAfter" dataKey="rank" stroke="#FFA116" strokeWidth={3} dot={false} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                       {[
                         { label: 'Total Solved', value: '450', sub: 'Acceptance: 72%' },
                         { label: 'Easy', value: '200', color: 'text-accent-deep-green' },
                         { label: 'Medium', value: '200', color: 'text-accent-amber' },
                         { label: 'Hard', value: '50', color: 'text-accent-red' }
                       ].map(metric => (
                         <div key={metric.label} className="p-8 bg-white/5 border border-white/5 rounded-[32px] text-center">
                            <p className="text-[10px] font-black text-text-secondary uppercase mb-2 tracking-widest">{metric.label}</p>
                            <p className={`text-4xl font-black font-mono ${metric.color || 'text-white'}`}>{metric.value}</p>
                            {metric.sub && <p className="text-[9px] font-black text-accent-red uppercase italic mt-2">{metric.sub}</p>}
                         </div>
                       ))}
                    </div>
                  </div>
                )}

                {activeDeepDive === 'behavioral' && (
                  <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-accent-red/10 rounded-[24px] flex items-center justify-center text-accent-red shadow-[0_0_20px_rgba(255,42,42,0.1)]">
                        <Activity size={32} />
                      </div>
                      <div>
                        <h3 className="text-4xl font-black italic uppercase tracking-tighter text-white leading-none mb-2">
                          Verified Reliability Analytics
                        </h3>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-red flex items-center gap-2">
                           <ShieldCheck size={12} /> System Protocol: Trust Provenance
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                       {/* Column 1: The Golden Signal */}
                       <div className="lg:col-span-5 space-y-8">
                          <div className="bg-[#1A1A1A] p-8 rounded-[40px] border border-accent-red/20 relative overflow-hidden group shadow-[0_0_40px_rgba(255,42,42,0.05)]">
                             <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity">
                               <Users size={120} />
                             </div>
                             
                             <h4 className="text-xs font-black uppercase tracking-[0.3em] text-accent-red mb-8 flex items-center gap-3">
                               The Golden Signal: Repeat Clients
                             </h4>

                             <div className="space-y-4">
                               {[
                                 { name: 'TechFlow Startup', gigs: 4, role: 'Frontend Dev', logo: 'TF' },
                                 { name: 'MarquesB (YouTuber)', gigs: 3, role: 'Video Editing', logo: 'MB' },
                                 { name: 'Nexus AI', gigs: 2, role: 'Data Visualization', logo: 'NA' }
                               ].map((client, i) => (
                                 <div key={i} className="bg-black/40 border border-white/5 p-5 rounded-3xl flex items-center justify-between group/item hover:border-accent-red/40 transition-all">
                                   <div className="flex items-center gap-4">
                                      <div className="w-10 h-10 rounded-xl bg-accent-red/10 border border-accent-red/20 flex items-center justify-center text-accent-red font-black text-xs">
                                        {client.logo}
                                      </div>
                                      <div>
                                         <h5 className="text-sm font-black text-white uppercase italic flex items-center gap-2">
                                           {client.name}
                                           <CheckCircle2 size={12} className="text-[#A0E8AF]" />
                                         </h5>
                                         <p className="text-[10px] font-bold text-text-secondary uppercase tracking-tight">{client.role}</p>
                                      </div>
                                   </div>
                                   <div className="text-right">
                                      <p className="text-lg font-black font-mono text-white leading-none">{client.gigs}</p>
                                      <p className="text-[7px] font-black text-accent-red uppercase tracking-widest">VERIFIED GIGS</p>
                                   </div>
                                 </div>
                               ))}
                             </div>

                             <div className="mt-8 pt-8 border-t border-white/5">
                               <p className="text-[11px] text-text-secondary leading-relaxed font-medium italic opacity-60">
                                 "Calculated exclusively via verified escrow payouts. These relationships prove high human trust and retention."
                               </p>
                             </div>
                          </div>

                          <div className="bg-white/5 border border-white/5 p-8 rounded-[40px] flex items-center justify-between">
                             <div className="space-y-1">
                               <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">Total Escrow Volume</p>
                               <p className="text-2xl font-black font-mono text-accent-red">$42,500.00</p>
                             </div>
                             <div className="w-12 h-12 rounded-xl bg-accent-red/10 border border-accent-red/20 flex items-center justify-center text-accent-red">
                               <Briefcase size={20} />
                             </div>
                          </div>
                       </div>

                       {/* Column 2: Health & Timeline */}
                       <div className="lg:col-span-7 space-y-8">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             {/* Delivery Health */}
                             <div className="bg-[#1A1A1A] p-8 rounded-[40px] border border-white/5">
                               <h4 className="text-xs font-black uppercase tracking-widest text-text-secondary mb-8">Delivery Health</h4>
                               <div className="h-[250px]">
                                 <ResponsiveContainer width="100%" height="100%">
                                   <RadialBarChart 
                                     cx="50%" 
                                     cy="50%" 
                                     innerRadius="40%" 
                                     outerRadius="100%" 
                                     barSize={15} 
                                     data={[
                                       { name: 'Delivery Rate', value: 98, fill: '#FF2A2A' },
                                       { name: 'On-Time Rate', value: 94, fill: '#A0E8AF' },
                                       { name: 'Dispute Win', value: 100, fill: '#FFA116' }
                                     ]}
                                     startAngle={180}
                                     endAngle={0}
                                   >
                                     <RadialBar
                                       background
                                       dataKey="value"
                                       cornerRadius={10}
                                     />
                                     <Legend 
                                       iconSize={10} 
                                       layout="vertical" 
                                       verticalAlign="middle" 
                                       wrapperStyle={{ top: '65%', left: '0', right: '0', textAlign: 'center' }}
                                       formatter={(value: any, entry: any) => (
                                         <span className="text-[10px] font-black uppercase text-text-secondary px-2">
                                           {entry.payload.value}% {value}
                                         </span>
                                       )}
                                     />
                                   </RadialBarChart>
                                 </ResponsiveContainer>
                               </div>
                             </div>

                             {/* Performance Snapshot */}
                             <div className="bg-[#1A1A1A] p-8 rounded-[40px] border border-white/5 space-y-6">
                                <h4 className="text-xs font-black uppercase tracking-widest text-text-secondary">System Feedback</h4>
                                <div className="space-y-4">
                                  {[
                                    { label: 'Avg Rating', val: '4.9/5.0', accent: 'text-white' },
                                    { label: 'Disputes', val: '0', accent: 'text-accent-deep-green' },
                                    { label: 'Fastest Delivery', val: '2h 14m', accent: 'text-accent-amber' }
                                  ].map(item => (
                                    <div key={item.label} className="flex justify-between items-end border-b border-white/5 pb-4">
                                       <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">{item.label}</span>
                                       <span className={`text-sm font-black font-mono ${item.accent}`}>{item.val}</span>
                                    </div>
                                  ))}
                                </div>
                             </div>
                          </div>

                          {/* Ratings Timeline */}
                          <div className="bg-[#1A1A1A] p-8 rounded-[40px] border border-white/5">
                            <div className="flex items-center justify-between mb-8">
                               <h4 className="text-xs font-black uppercase tracking-widest text-text-secondary">Ratings Timeline (12 Months)</h4>
                               <div className="flex gap-4">
                                  <div className="flex items-center gap-2">
                                     <div className="w-2 h-2 rounded-full bg-accent-red" />
                                     <span className="text-[8px] font-black uppercase text-text-secondary">Gig Rating</span>
                                  </div>
                               </div>
                            </div>
                             <div className="h-[300px]">
                               <ResponsiveContainer width="100%" height="100%">
                                 <ScatterChart
                                   margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                                 >
                                   <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                   <XAxis 
                                     type="number" 
                                     dataKey="x" 
                                     name="Month" 
                                     unit="" 
                                     stroke="rgba(255,255,255,0.3)" 
                                     fontSize={10} 
                                     tickLine={false} 
                                     axisLine={false}
                                     domain={[1, 12]}
                                   />
                                   <YAxis 
                                     type="number" 
                                     dataKey="y" 
                                     name="Rating" 
                                     unit="*" 
                                     stroke="rgba(255,255,255,0.3)" 
                                     fontSize={10} 
                                     tickLine={false} 
                                     axisLine={false}
                                     domain={[4.0, 5.0]}
                                   />
                                   <RechartsTooltip 
                                     cursor={{ strokeDasharray: '3 3' }}
                                     contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                     itemStyle={{ color: '#FF2A2A', fontSize: '10px', textTransform: 'uppercase', fontWeight: 900 }}
                                   />
                                   <Scatter 
                                     name="Ratings" 
                                     data={[
                                       { x: 1, y: 5.0 }, { x: 2, y: 4.8 }, { x: 3, y: 5.0 },
                                       { x: 4, y: 4.9 }, { x: 5, y: 4.7 }, { x: 6, y: 5.0 },
                                       { x: 7, y: 5.0 }, { x: 8, y: 4.9 }, { x: 9, y: 5.0 },
                                       { x: 10, y: 4.8 }, { x: 11, y: 5.0 }, { x: 12, y: 5.0 }
                                     ]} 
                                     fill="#FF2A2A" 
                                     line={{ stroke: 'rgba(255, 42, 42, 0.2)', strokeWidth: 1 }}
                                   />
                                 </ScatterChart>
                               </ResponsiveContainer>
                             </div>
                             <p className="text-[10px] text-text-secondary text-center mt-6 uppercase font-black tracking-widest opacity-40">
                               Proving consistency over time vs cumulative average
                             </p>
                          </div>
                       </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ExpandableScoreMetric({ label, value, type }: { label: string, value: number, type: 'identity' | 'skill' | 'social' | 'activity' }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock data for visualizations
  const skillProofData = [
    { metric: 'Escrow Comp', value: 98 },
    { metric: 'On-Time', value: 95 },
    { metric: 'Rating', value: 92 },
  ];

  const activityData = [
    { month: 'Jan', activity: 40 },
    { month: 'Feb', activity: 65 },
    { month: 'Mar', activity: 55 },
    { month: 'Apr', activity: 80 },
    { month: 'May', activity: 70 },
    { month: 'Jun', activity: 95 },
  ];

  const renderExpandedContent = () => {
    switch (type) {
      case 'identity':
        return (
          <div className="grid grid-cols-1 gap-3 pt-4">
            {[
              'Student ID Match',
              'Biometric/Liveness Check',
              'Linked GitHub Account',
              'Financial Escrow KYC'
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5">
                <span className="text-[10px] font-black uppercase tracking-tight text-text-secondary">{item}</span>
                <div className="flex items-center gap-2 text-accent-deep-green">
                  <span className="text-[8px] font-black uppercase tracking-widest">VERIFIED</span>
                  <ShieldCheck size={12} strokeWidth={3} />
                </div>
              </div>
            ))}
          </div>
        );
      case 'skill':
        return (
          <div className="pt-4 space-y-4">
            <div className="h-[120px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillProofData} layout="vertical" margin={{ left: -20, right: 20 }}>
                  <XAxis type="number" hide domain={[0, 100]} />
                  <YAxis 
                    dataKey="metric" 
                    type="category" 
                    tick={{ fill: '#A3A3A3', fontSize: 9, fontWeight: 900 }}
                    width={80}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#FF2A2A" 
                    radius={[0, 4, 4, 0]} 
                    barSize={12}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[9px] font-black uppercase tracking-widest text-text-secondary leading-normal opacity-60">
              Calculated via cross-platform Git analysis and verified Escrow completion history.
            </p>
            <div className="grid grid-cols-3 gap-2">
               {skillProofData.map(d => (
                 <div key={d.metric} className="text-center">
                    <p className="text-[8px] font-black text-text-secondary uppercase mb-1">{d.metric}</p>
                    <p className="text-xs font-mono font-black text-white">{d.value}%</p>
                 </div>
               ))}
            </div>
          </div>
        );
      case 'social':
        return (
          <div className="grid grid-cols-1 gap-2 pt-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
              <span className="text-[9px] font-black uppercase tracking-widest text-text-secondary">Peer Gigs Completed</span>
              <span className="text-sm font-mono font-black text-accent-red">12</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
              <span className="text-[9px] font-black uppercase tracking-widest text-text-secondary">Mentorship Sessions</span>
              <span className="text-sm font-mono font-black text-accent-red">4</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
              <span className="text-[9px] font-black uppercase tracking-widest text-text-secondary">Ecosystem Upvotes</span>
              <span className="text-sm font-mono font-black text-accent-red">842</span>
            </div>
          </div>
        );
      case 'activity':
        return (
          <div className="pt-4 space-y-4">
            <div className="h-[120px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <defs>
                    <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF2A2A" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FF2A2A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="month" 
                    hide 
                  />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#222', border: 'none', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff', fontSize: '10px', textTransform: 'uppercase', fontWeight: 900 }}
                    labelStyle={{ display: 'none' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="activity" 
                    stroke="#FF2A2A" 
                    fillOpacity={1} 
                    fill="url(#colorActivity)" 
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <p className="text-[8px] font-black text-text-secondary uppercase mb-1">Avg Response</p>
                  <p className="text-xs font-mono font-black text-white">&lt; 2 HOURS</p>
               </div>
               <div>
                  <p className="text-[8px] font-black text-text-secondary uppercase mb-1">Login Streak</p>
                  <p className="text-xs font-mono font-black text-white">42 DAYS</p>
               </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div 
      className={`group cursor-pointer p-4 rounded-2xl border transition-all duration-300 ${
        isExpanded 
        ? 'bg-white/[0.08] border-white/20 shadow-lg' 
        : 'bg-transparent border-transparent hover:bg-white/5'
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary group-hover:text-white transition-colors">{label}</span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              className="text-text-secondary opacity-40"
            >
              <ChevronRight size={12} />
            </motion.div>
          </div>
          <span className="text-xs font-mono font-black text-text-primary dark:text-white">{value.toFixed(1)}</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${value * 10}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-full bg-accent-red shadow-[0_0_8px_rgba(255,42,42,0.4)]"
          />
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {renderExpandedContent()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ArenaDeepDiveModal({ onClose, cosine }: { onClose: () => void, cosine: Cosine }) {
  const [activeMetricDetail, setActiveMetricDetail] = useState<'events' | 'success' | 'competency' | null>(null);

  const combatLog = [
    { 
      event: "GDGOC Techsprint", 
      result: "Special Mention", 
      product: "GSD (Campus Ecosystem)", 
      tech: "React Native, Firebase",
      color: "#FF2A2A"
    },
    { 
      event: "GeeksForGeeks Hackfest 2026", 
      result: "Finalist", 
      product: "Slop Block", 
      tech: "Python, AI Filtering Logic",
      color: "#F5A623"
    },
    { 
      event: "Smart India Hackathon", 
      result: "Winner", 
      product: "Fintech Escrow Protocol", 
      tech: "Solidity, Node.js",
      color: "#2ECC71"
    }
  ];

  const getMetricDetailContent = () => {
    switch (activeMetricDetail) {
      case 'events':
        return (
          <div className="space-y-4">
            <h5 className="text-xs font-black uppercase tracking-widest text-white text-left">Event Breakdown</h5>
            <div className="space-y-2">
              <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                <span className="text-[10px] font-bold text-text-secondary uppercase">Open Source Hackathons</span>
                <span className="text-xs font-black text-white">5</span>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                <span className="text-[10px] font-bold text-text-secondary uppercase">Private Buildathons</span>
                <span className="text-xs font-black text-white">4</span>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                <span className="text-[10px] font-bold text-text-secondary uppercase">Campus Sprints</span>
                <span className="text-xs font-black text-white">3</span>
              </div>
            </div>
            <p className="text-[9px] text-text-secondary italic uppercase tracking-widest opacity-60 text-left">* Verified across COS nodes</p>
          </div>
        );
      case 'success':
        return (
          <div className="space-y-4">
            <h5 className="text-xs font-black uppercase tracking-widest text-white text-left">Success Logic</h5>
            <p className="text-[11px] text-text-secondary leading-relaxed font-medium text-left">
              Calculated from: <span className="text-white">4 Overall Wins</span>, <span className="text-white">4 Top-10 Finalist placements</span>, and <span className="text-white">2 Special Mentions</span> across 12 verified events.
            </p>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-accent-deep-green" style={{ width: '85%' }} />
            </div>
          </div>
        );
      case 'competency':
        return (
          <div className="space-y-4">
            <h5 className="text-xs font-black uppercase tracking-widest text-white text-left">Rapid Prototyping</h5>
            <p className="text-[11px] text-text-secondary leading-relaxed font-medium text-left">
              Demonstrated ability to deploy functional full-stack MVPs within <span className="text-white">24-48 hour</span> constraints, primarily utilizing <span className="text-white">React and Firebase</span>.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-white/10 rounded text-[8px] font-black uppercase text-text-secondary tracking-widest">Velocity</span>
              <span className="px-2 py-1 bg-white/10 rounded text-[8px] font-black uppercase text-text-secondary tracking-widest">Stability</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[600] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 30 }}
        className="w-full max-w-5xl h-full max-h-[85vh] bg-[#0A0A0A] border border-white/10 rounded-[48px] shadow-[0_0_150px_rgba(255,42,42,0.15)] flex flex-col overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-red/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
        {/* Header */}
        <div className="p-8 md:p-12 border-b border-white/5 flex items-center justify-between relative z-10">
          <div>
            <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white leading-none mb-2">Arena Performance Deep Dive</h3>
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-accent-red" />
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary opacity-60">Verified Combat History // {cosine.name}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-4 bg-white/5 hover:bg-accent-red rounded-2xl text-text-secondary hover:text-white transition-all border border-white/5"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 md:p-12 no-scrollbar space-y-12 relative z-10">
          {/* Performance Metrics Bar */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div 
                onClick={() => setActiveMetricDetail(activeMetricDetail === 'events' ? null : 'events')}
                className={`bg-[#1A1A1A] border p-8 rounded-[32px] flex flex-col gap-2 shadow-xl transition-all cursor-pointer hover:bg-[#2A2A2A] group ${activeMetricDetail === 'events' ? 'ring-1 ring-accent-red border-accent-red/30' : 'border-white/5 hover:ring-1 hover:ring-accent-red'}`}
              >
                <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] opacity-40 text-left">Total Events</p>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent-red/10 rounded-xl text-accent-red">
                    <Trophy size={20} />
                  </div>
                  <span className="text-4xl font-black font-mono text-white text-left">12</span>
                </div>
              </div>
              <div 
                onClick={() => setActiveMetricDetail(activeMetricDetail === 'success' ? null : 'success')}
                className={`bg-[#1A1A1A] border p-8 rounded-[32px] flex flex-col gap-2 shadow-xl transition-all cursor-pointer hover:bg-[#2A2A2A] group ${activeMetricDetail === 'success' ? 'ring-1 ring-accent-red border-accent-red/30' : 'border-white/5 hover:ring-1 hover:ring-accent-red'}`}
              >
                <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] opacity-40 text-left">Success Rate</p>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent-deep-green/10 rounded-xl text-accent-deep-green">
                    <Activity size={20} />
                  </div>
                  <span className="text-4xl font-black font-mono text-white text-left">85%</span>
                </div>
              </div>
              <div 
                onClick={() => setActiveMetricDetail(activeMetricDetail === 'competency' ? null : 'competency')}
                className={`bg-[#1A1A1A] border p-8 rounded-[32px] flex flex-col gap-2 shadow-xl transition-all cursor-pointer hover:bg-[#2A2A2A] group ${activeMetricDetail === 'competency' ? 'ring-1 ring-accent-red border-accent-red/30' : 'border-white/5 hover:ring-1 hover:ring-accent-red'}`}
              >
                <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] opacity-40 text-left">Core Competency</p>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent-amber/10 rounded-xl text-accent-amber">
                     <Zap size={20} />
                  </div>
                  <span className="text-xl font-black italic uppercase tracking-tighter text-white leading-none text-left">Rapid Prototyping</span>
                </div>
              </div>
            </div>

            {/* Inline Detail Panel */}
            <AnimatePresence mode="wait">
              {activeMetricDetail && (
                <motion.div
                  key="detail-panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-[#151515] border border-white/10 rounded-3xl p-8 relative overflow-hidden"
                >
                  <button 
                    onClick={() => setActiveMetricDetail(null)}
                    className="absolute top-6 right-6 p-2 text-text-secondary hover:text-white transition-colors"
                  >
                    <X size={16} />
                  </button>
                  {getMetricDetailContent()}
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent-red/5 blur-2xl rounded-full" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* The Combat Log */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary mb-8 ml-4">THE ARENA COMBAT LOG</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {combatLog.map((log, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#1A1A1A] border border-white/5 p-8 rounded-[40px] flex flex-col shadow-xl relative overflow-hidden group hover:border-white/20 transition-all h-[320px]"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity" style={{ background: `radial-gradient(circle at top right, ${log.color}, transparent)` }} />
                  
                  <div className="mb-6">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] font-black uppercase tracking-widest text-white/50">{log.event}</span>
                  </div>

                  <h5 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-2 leading-tight flex-1">{log.product}</h5>
                  
                  <div className="space-y-4 pt-4 border-t border-white/5 mt-auto">
                    <div>
                      <p className="text-[8px] font-black text-text-secondary uppercase tracking-widest mb-2">RESULT POSITION</p>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor]" style={{ color: log.color, backgroundColor: log.color }} />
                        <span className="text-xs font-black uppercase tracking-widest" style={{ color: log.color }}>{log.result}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-text-secondary uppercase tracking-widest mb-2">TECH STACK DEPLOYED</p>
                      <p className="text-[10px] font-bold text-white/60 tracking-tight">{log.tech}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              <div className="bg-bg-surface/20 border border-white/5 border-dashed p-8 rounded-[40px] flex flex-col items-center justify-center text-center opacity-30 h-[320px]">
                <PlusCircle size={32} className="text-text-secondary mb-4 opacity-50" />
                <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">9+ ARCHIVED EVENTS</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 border-t border-white/5 bg-white/[0.01] flex items-center justify-center relative z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary opacity-30">Verifiable Talent Combat Log // ARCHIVE_042</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

const FullScreenChart: React.FC<{ 
  title: string; 
  subtitle: string; 
  onClose: () => void; 
  children: React.ReactNode;
}> = ({ title, subtitle, onClose, children }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] bg-black/95 backdrop-blur-3xl flex flex-col p-8 md:p-16"
    >
      <div className="flex items-center justify-between mb-12">
        <div>
          <h3 className="text-4xl font-black italic uppercase tracking-tighter text-white leading-none mb-4">
            {title}
          </h3>
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-accent-red" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-red opacity-80">{subtitle}</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="group/close p-6 bg-white/5 hover:bg-accent-red rounded-[24px] text-text-secondary hover:text-white transition-all border border-white/5 hover:border-accent-red/30 shadow-2xl"
        >
          <Minimize2 size={32} className="group-hover/close:scale-110 transition-transform" />
        </button>
      </div>
      
      <div className="flex-1 bg-[#1A1A1A]/50 border border-white/5 rounded-[48px] p-8 md:p-16 shadow-[0_0_150px_rgba(255,42,42,0.1)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-red/5 via-transparent to-accent-amber/5 opacity-50" />
        <div className="relative h-full w-full">
           <ResponsiveContainer width="100%" height="100%">
             {children as React.ReactElement}
           </ResponsiveContainer>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.6em] text-text-secondary opacity-30 italic">
          Verifiable Talent Intelligence Protocol // {new Date().getFullYear()} // COS_NETWORK
        </p>
      </div>
    </motion.div>
  );
};
