import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, Search, Users, PlusCircle, Trophy, MessageSquare, 
  GraduationCap, Star, Filter, ArrowUpRight, CheckCircle2, X, Terminal, 
  Zap, Clock, ShieldCheck, Briefcase, ChevronRight, Activity, User, CreditCard,
  Maximize2, Minimize2, Video, Mail, ArrowLeft, MoreVertical, Target, PenTool, Globe,
  TrendingUp, ExternalLink, Loader2, Layers, UserCheck, Smile, BarChart3, Settings2
} from 'lucide-react';
import { SAMPLE_COSINES, SKILL_CATEGORIES } from '../constants/data';
import { Cosine } from '../types';
import { useUserStore } from '../store/useUserStore';
import { usePipeline } from '../contexts/PipelineContext';

import FullPortfolioView from './FullPortfolioView';
import SubscriptionView from './SubscriptionView';

import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';

// Mock data for Company specifically
const ACTIVE_POSTINGS = [
  { 
    id: 'p1', 
    title: 'Senior Frontend Engineer', 
    status: 'Open', 
    applicants: 12, 
    credRequired: 8.5, 
    type: 'Gig',
    openings: 3,
    deadline: '5 Days',
    roleApplicants: [
      { id: 'a1', name: 'Priya Nair', cosCred: 9.7, match: 95, skills: ['React', 'TypeScript', 'Node.js'], university: 'IIT Bombay', suggestedRoles: ['Frontend Lead'], gigCount: 14 },
      { id: 'a2', name: 'Arjun Mehta', cosCred: 8.9, match: 88, skills: ['Python', 'Django', 'PostgreSQL'], university: 'BITS Pilani', suggestedRoles: ['Backend Dev'], gigCount: 8 },
      { id: 'a3', name: 'Sanya Gupta', cosCred: 9.2, match: 92, skills: ['UI/UX', 'Figma', 'React'], university: 'NID', suggestedRoles: ['Product Designer'], gigCount: 12 },
    ]
  },
  { 
    id: 'p2', 
    title: 'Data Analyst Intern', 
    status: 'In Review', 
    applicants: 8, 
    credRequired: 9.0, 
    type: 'Internship',
    openings: 1,
    deadline: '12 Days',
    roleApplicants: [
      { id: 'a4', name: 'Rohan Sharma', cosCred: 9.1, match: 94, skills: ['Python', 'SQL', 'Tableau'], university: 'Delhi Technological University', suggestedRoles: ['Data Scientist'], gigCount: 5 }
    ]
  },
  { 
    id: 'p3', 
    title: 'Blockchain Researcher', 
    status: 'Escrow Locked', 
    applicants: 1, 
    credRequired: 9.5, 
    type: 'Internship',
    openings: 1,
    deadline: 'Closed',
    roleApplicants: []
  },
];

const ARENA_STATS = {
  activeHackathons: 1,
  totalParticipants: 450,
  submissionsPending: 12,
};

const ECOSYSTEM_TRACTION_DATA: Record<string, any[]> = {
  '7D': [
    { name: 'Mon', impressions: 400, profileCloses: 24 },
    { name: 'Tue', impressions: 300, profileCloses: 18 },
    { name: 'Wed', impressions: 600, profileCloses: 32 },
    { name: 'Thu', impressions: 800, profileCloses: 45 },
    { name: 'Fri', impressions: 500, profileCloses: 28 },
    { name: 'Sat', impressions: 900, profileCloses: 52 },
    { name: 'Sun', impressions: 1100, profileCloses: 68 },
  ],
  '30D': [
    { name: 'Week 1', impressions: 2800, profileCloses: 150 },
    { name: 'Week 2', impressions: 3200, profileCloses: 180 },
    { name: 'Week 3', impressions: 3000, profileCloses: 165 },
    { name: 'Week 4', impressions: 3800, profileCloses: 210 },
  ],
  'YTD': [
    { name: 'Jan', impressions: 12000, profileCloses: 800 },
    { name: 'Feb', impressions: 15000, profileCloses: 950 },
    { name: 'Mar', impressions: 18000, profileCloses: 1200 },
    { name: 'Apr', impressions: 16000, profileCloses: 1100 },
    { name: 'May', impressions: 21000, profileCloses: 1400 },
  ]
};

const PIPELINE_OFFERS_DATA = [
  { id: 'po1', name: 'Arjun Mehta', role: 'Full Stack Dev', offerStatus: 'Accepted', internStatus: 'Active', arena: 'HACKFORGOOD' },
  { id: 'po2', name: 'Sarah Jenkins', role: 'Frontend Engineer', offerStatus: 'Pending', internStatus: 'Not Started', arena: 'HACKFORGOOD' },
  { id: 'po3', name: 'Kenji Sato', role: 'AI Researcher', offerStatus: 'Accepted', internStatus: 'Completed', arena: 'TECHSPRINT 2026' },
  { id: 'po4', name: 'Elena Rossi', role: 'UI/UX Designer', offerStatus: 'Rejected', internStatus: 'Not Started', arena: 'TECHSPRINT 2026' },
  { id: 'po5', name: 'David Chen', role: 'Security Analyst', offerStatus: 'Pending', internStatus: 'Not Started', arena: 'HACKFORGOOD' },
];

const MOCK_ARENAS = [
  {
    id: 'arena-001',
    title: 'HACKFORGOOD',
    type: 'Public Open-Source Hackathon',
    prizePool: '999999998',
    endsIn: '40D',
    skills: ['PYTHON', 'DATA SCIENCE', 'SQL', 'REACT', 'FIGMA'],
    status: 'Active',
    participants: [
      { rank: 1, id: 'p1', name: 'Abhinav Beniwal', score: 98, status: 'Submitted', tech: 9.8, design: 9.8, avatar: 'AB', color: 'text-accent-amber' },
      { rank: 2, id: 'p2', name: 'Priya Nair', score: 94, status: 'In Progress', tech: 9.4, design: 9.4, avatar: 'PN', color: 'text-slate-300' }
    ]
  },
  {
    id: 'arena-002',
    title: 'HACKFORGOOD (LITE)',
    type: 'Public Open-Source Hackathon',
    prizePool: '5000',
    endsIn: '12D',
    skills: ['REACT', 'NODE.JS', 'SOLIDITY'],
    status: 'Active',
    participants: [
      { rank: 1, id: 'p3', name: 'Shreyansh', score: 88, status: 'Submitted', tech: 8.8, design: 8.8, avatar: 'S', color: 'text-accent-amber' },
      { rank: 2, id: 'p4', name: 'Apurva', score: 85, status: 'Submitted', tech: 8.5, design: 8.5, avatar: 'A', color: 'text-slate-300' }
    ]
  }
];

const ARENA_PERFORMANCE_META = {
  avgCompletionRate: '68%',
  topSkill: 'React',
  avgTimeToHire: '14 Days'
};

const INDIVIDUAL_ARENA_STATS = [
  { name: 'HACKFORGOOD', turnout: 145, successRate: '82%', hires: 4 },
  { name: 'TECHSPRINT 2026', turnout: 45, successRate: '91%', hires: 2 },
  { name: 'WEB3 INTENSIVE', turnout: 88, successRate: '75%', hires: 3 },
];

const ACTIVE_COHORTS = [
  { id: 'c1', name: 'Q3 Frontend Engineering Sprint', role: 'Frontend Engineer', candidates: 24, avgCred: 8.8, status: 'Active' },
  { id: 'c2', name: 'Data Science Accelerator', role: 'Data Analyst', candidates: 18, avgCred: 9.1, status: 'In Review' },
  { id: 'c3', name: 'Web3 Security Intensive', role: 'Blockchain Dev', candidates: 12, avgCred: 9.4, status: 'Active' },
  { id: 'c4', name: 'Product Design Cohort', role: 'UI/UX Designer', candidates: 15, avgCred: 8.5, status: 'Completed' },
];

const INTERVIEW_CANDIDATES = [
  { id: 'ic1', name: 'Abhinav Beniwal', role: 'Frontend Engineer', time: 'Today, 4:00 PM', status: 'Scheduled', university: 'DTU' },
  { id: 'ic2', name: 'Apurva', role: 'Data Scientist', time: 'Tomorrow, 11:30 AM', status: 'Scheduled', university: 'IIT Delhi' },
  { id: 'ic3', name: 'Shreyansh', role: 'Blockchain Dev', time: 'Nov 20, 2:00 PM', status: 'Scheduled', university: 'NSUT' },
];

const PIPELINE_CANDIDATES = [
  { id: 'pc1', name: 'Priya Nair', role: 'Senior Frontend Engineer', score: 9.7, stage: 'Decision Pending', email: 'priya@example.com' },
  { id: 'pc2', name: 'Arjun Mehta', role: 'Data Analyst', score: 8.9, stage: 'Decision Pending', email: 'arjun@example.com' },
];

export default function CompanyDashboard() {
  const { companyProfile, addToast } = useUserStore();
  const opsHubRef = useRef<HTMLDivElement>(null);
  const [managingCandidate, setManagingCandidate] = useState<any | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleManageCohortClick = () => {
    setEcosystemOpsTab('pipeline');
    setTimeout(() => {
      opsHubRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleExportReport = () => {
    setIsExporting(true);
    addToast("Generating Arena_Performance.csv...", "info");
    setTimeout(() => {
      setIsExporting(false);
      addToast("Report exported successfully", "success");
    }, 2000);
  };

  const handleDeepDive = (arena: any) => {
    setSelectedArena(arena);
    setActiveTab('arenas-hub');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { 
    activeInterviews, 
    decisionPipeline, 
    moveToDecision, 
    hireCandidate, 
    rejectCandidate,
    activeTab,
    setActiveTab,
    roleConstraints,
    setRoleConstraints
  } = usePipeline();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [hiringBoardTab, setHiringBoardTab] = useState<'post' | 'interviews' | 'pipeline'>('post');
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(ACTIVE_POSTINGS[0].id);
  const [selectedCosine, setSelectedCosine] = useState<Cosine | null>(null);
  const [showFullPortfolio, setShowFullPortfolio] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [minCred, setMinCred] = useState(0);
  const [radarFilters, setRadarFilters] = useState({
    skills: [] as string[],
    githubCommits: false,
    minGigs: 0,
    showcaseBuilds: false,
    minTrustScore: 0,
    minOnTimeRate: 0,
    excludeDisputes: false,
    minRepeatRate: 0,
    yearsOfStudy: [] as string[],
    degrees: [] as string[],
    ladderPosition: '',
    trackEntry: '',
    arenaPlacements: false,
    lastActive: '',
    ndaCleared: false,
    zeroGhosting: false,
    maxResponseTime: 'Any',
    collabStyle: 'Any',
    minFirstPassRate: 0,
    proactive: false,
    maxRevisionTime: 'Any',
    minRepeatHire: 0,
    maxConcurrentGigs: 10
  });
  const [openSections, setOpenSections] = useState<string[]>(['portfolio']);
  const [showSkillModal, setShowSkillModal] = useState(false);

  const toggleSection = (id: string) => {
    setOpenSections(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const totalActiveFilters = radarFilters.skills.length + 
    (radarFilters.githubCommits ? 1 : 0) + 
    (radarFilters.minGigs > 0 ? 1 : 0) + 
    (radarFilters.showcaseBuilds ? 1 : 0) +
    (radarFilters.minTrustScore > 0 ? 1 : 0) +
    (radarFilters.minOnTimeRate > 0 ? 1 : 0) +
    (radarFilters.excludeDisputes ? 1 : 0) +
    (radarFilters.minRepeatRate > 0 ? 1 : 0) +
    radarFilters.yearsOfStudy.length +
    radarFilters.degrees.length +
    (radarFilters.ladderPosition ? 1 : 0) +
    (radarFilters.trackEntry ? 1 : 0) +
    (radarFilters.arenaPlacements ? 1 : 0) +
    (radarFilters.lastActive ? 1 : 0) +
    (radarFilters.ndaCleared ? 1 : 0) +
    (radarFilters.zeroGhosting ? 1 : 0) +
    (radarFilters.maxResponseTime !== 'Any' ? 1 : 0) +
    (radarFilters.collabStyle !== 'Any' ? 1 : 0) +
    (radarFilters.minFirstPassRate > 0 ? 1 : 0) +
    (radarFilters.proactive ? 1 : 0) +
    (radarFilters.maxRevisionTime !== 'Any' ? 1 : 0) +
    (radarFilters.minRepeatHire > 0 ? 1 : 0) +
    (radarFilters.maxConcurrentGigs < 10 ? 1 : 0);
  
  // Skill Selection Modal for Hiring Board
  const [isSkillSelectorOpen, setIsSkillSelectorOpen] = useState(false);
  const [stagedSkills, setStagedSkills] = useState<{ name: string, level: string }[]>([]);
  const [skillSearch, setSkillSearch] = useState('');

  // New States
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [isVideoConnecting, setIsVideoConnecting] = useState(false);
  const [connectingCandidate, setConnectingCandidate] = useState<string | null>(null);
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
  const [isScanning, setIsScanning] = useState(false);
  const [isCreatingArena, setIsCreatingArena] = useState(false);
  const [isArenaLoading, setIsArenaLoading] = useState(false);
  const [selectedArena, setSelectedArena] = useState<any | null>(null);
  const [ecosystemTimeRange, setEcosystemTimeRange] = useState('30D');
  const [ecosystemOpsTab, setEcosystemOpsTab] = useState<'pipeline' | 'arenas'>('pipeline');
  const [arenas, setArenas] = useState<any[]>(MOCK_ARENAS);
  const [arenaForm, setArenaForm] = useState({
    title: '',
    type: 'Public Open-Source Hackathon',
    startDate: '',
    endDate: '',
    prizePool: '',
    skills: [] as string[],
    eventMode: 'Online'
  });

  const allSkills = Array.from(new Set(SAMPLE_COSINES.flatMap(c => c.skills.map(s => typeof s === 'string' ? s : s.name))));

  // Hiring Board Form State
  const [hiringForm, setHiringForm] = useState({
    roleName: '',
    baseSalary: '',
    headcount: '',
    qualifications: '',
    minCgpa: '7.5',
    minCosCred: '8.0',
    skills: [{ name: '', level: 'Intermediate' }]
  });

  const displayCompanyName = companyProfile?.companyName || 'INDUSTRIAL PARTNER';
  const displayIndustry = companyProfile?.industry || 'TECH INFRASTRUCTURE';

  const SKILL_PROFICIENCIES = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  
  const handleSkillToggle = (skillName: string) => {
    const isStaged = stagedSkills.find(s => s.name === skillName);
    if (isStaged) {
      setStagedSkills(stagedSkills.filter(s => s.name !== skillName));
    } else {
      setStagedSkills([...stagedSkills, { name: skillName, level: 'Intermediate' }]);
    }
  };

  const updateStagedSkillLevel = (name: string, level: string) => {
    setStagedSkills(stagedSkills.map(s => s.name === name ? { ...s, level } : s));
  };

  const confirmSkills = () => {
    setHiringForm({ ...hiringForm, skills: stagedSkills });
    setIsSkillSelectorOpen(false);
  };

  const removeSelectedSkill = (name: string) => {
    setHiringForm({ ...hiringForm, skills: hiringForm.skills.filter(s => s.name !== name) });
  };

  const filteredCosines = SAMPLE_COSINES.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         c.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.skills.some(s => (typeof s === 'string' ? s : s.name).toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Advanced Radar Filters
    const matchesSkills = radarFilters.skills.length === 0 || 
                         radarFilters.skills.every(reqSkill => 
                           c.skills.some(s => (typeof s === 'string' ? s : s.name) === reqSkill)
                         );

    const matchesGithub = !radarFilters.githubCommits || (c.externalStats?.github?.commitsLastYear || 0) > 50;
    const matchesGigs = c.gigCount >= radarFilters.minGigs;
    const matchesBuilds = !radarFilters.showcaseBuilds || (c.projects && c.projects.length > 0);
    const matchesTrust = c.cosCred >= radarFilters.minTrustScore;
    const matchesYears = radarFilters.yearsOfStudy.length === 0; // Simplified for now
    const matchesLadder = !radarFilters.ladderPosition || true; // Placeholder
    const matchesArena = !radarFilters.arenaPlacements || (c.arenaRecord && c.arenaRecord.totalParticipations > 0);
    const matchesActive = !radarFilters.lastActive || true; // Placeholder
    const matchesNda = !radarFilters.ndaCleared || true; // Placeholder

    // Behavioral Filters
    const matchesGhosting = !radarFilters.zeroGhosting || (c.behavioralStats?.ghostingRate === 0);
    const matchesResponse = radarFilters.maxResponseTime === 'Any' || (c.behavioralStats?.avgResponseTimeHours || 0) < parseInt(radarFilters.maxResponseTime.replace('< ', '').replace(' Hour', ''));
    const matchesCollab = radarFilters.collabStyle === 'Any' || c.behavioralStats?.arenaCollabStyle === radarFilters.collabStyle;
    const matchesFirstPass = (c.behavioralStats?.firstPassAcceptanceRate || 0) >= (radarFilters.minFirstPassRate / 100);
    const matchesProactive = !radarFilters.proactive || (c.behavioralStats?.isProactive === true);
    const matchesRevision = radarFilters.maxRevisionTime === 'Any' || (c.behavioralStats?.avgRevisionTimeHours || 0) < parseInt(radarFilters.maxRevisionTime.replace('< ', '').replace(' Hour', ''));
    const matchesRepeatHire = (c.behavioralStats?.repeatHireRate || 0) >= (radarFilters.minRepeatHire / 100);
    const matchesConcurrent = (c.behavioralStats?.concurrentGigs || 0) <= radarFilters.maxConcurrentGigs;

    // Contextual constraints from Hiring Board
    const matchesGlobalGpa = c.cgpa ? c.cgpa >= roleConstraints.minCgpa : true;
    const matchesGlobalCred = c.cosCred >= roleConstraints.minCosCred;
    const matchesGlobalSkills = roleConstraints.requiredSkills.length === 0 ||
                               roleConstraints.requiredSkills.some(req => 
                                 c.skills.some(s => (typeof s === 'string' ? s : s.name) === req.name)
                               );

    return matchesSearch && matchesSkills && 
           matchesGithub && matchesGigs && matchesBuilds && 
           matchesTrust && matchesYears && 
           matchesLadder && matchesArena && matchesActive && 
           matchesNda &&
           matchesGhosting && matchesResponse && matchesCollab && matchesFirstPass &&
           matchesProactive && matchesRevision && matchesRepeatHire && matchesConcurrent &&
           matchesGlobalGpa && matchesGlobalCred && matchesGlobalSkills;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 selection-red">
      {/* Candidate Management Side Drawer */}
      <AnimatePresence>
        {managingCandidate && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setManagingCandidate(null)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm shadow-inner"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 z-[70] w-96 h-full bg-[#1A1A1A] border-l border-[#333] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">{managingCandidate.name}</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary mt-1">{managingCandidate.role}</p>
                </div>
                <button 
                  onClick={() => setManagingCandidate(null)}
                  className="p-2 hover:bg-white/5 rounded-xl text-text-secondary hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 p-8 space-y-10 custom-scrollbar overflow-y-auto">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-red">Offer Status</label>
                  <select 
                    className="w-full bg-[#0A0A0A] border border-[#333] rounded-xl p-4 text-xs font-bold uppercase tracking-widest outline-none focus:border-accent-red transition-all appearance-none cursor-pointer text-white"
                    defaultValue={managingCandidate.offerStatus}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-red">Intern Status</label>
                  <select 
                    className="w-full bg-[#0A0A0A] border border-[#333] rounded-xl p-4 text-xs font-bold uppercase tracking-widest outline-none focus:border-accent-red transition-all appearance-none cursor-pointer text-white"
                    defaultValue={managingCandidate.internStatus}
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                  <p className="text-[9px] font-black uppercase tracking-widest text-text-secondary opacity-40 italic">Notes:</p>
                  <p className="text-[10px] font-medium text-text-secondary leading-relaxed">
                    Source: Arena [{managingCandidate.arena}]
                    <br />
                    Engagement metrics within top 5% of cohort. Recommended for accelerated onboarding.
                  </p>
                </div>
              </div>

              <div className="p-8 border-t border-white/5 bg-white/[0.01]">
                <button 
                  onClick={() => {
                    addToast("Candidate lifecycle updated", "success");
                    setManagingCandidate(null);
                  }}
                  className="w-full py-5 bg-accent-red text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-accent-red/20"
                >
                  Update Lifecycle
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* 1. Global State Integration & Header */}
      <header className="flex flex-col md:flex-row items-stretch md:items-center justify-between mb-12 gap-6 bg-bg-surface border border-border-custom p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-[0_0_50px_-12px_rgba(255,31,31,0.15)]">
        <div className="z-10 flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent-red flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,31,31,0.4)]">
              <Building2 size={24} />
            </div>
            <div className="flex flex-col">
              <h2 
                style={{ color: '#000000' }}
                className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none"
              >
                WELCOME, <span className="text-accent-red">{displayCompanyName}</span>
              </h2>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">{displayIndustry}</span>
                <div className="flex items-center gap-1.5 bg-accent-deep-green/10 px-2 py-0.5 rounded border border-accent-deep-green/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-deep-green animate-pulse" />
                  <span className="text-[8px] font-black text-accent-deep-green uppercase tracking-widest">MCA VERIFIED</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="z-10 flex gap-4 items-center">
          <div className="glass bg-white/5 p-4 rounded-2xl border border-white/10 min-w-[140px] flex flex-col justify-center">
            <span className="text-[8px] text-text-secondary font-black uppercase tracking-[0.2em] mb-1">PARTNER TIER</span>
            <span className="font-mono text-lg font-black text-black dark:text-white tracking-tighter flex items-center gap-2">
              ELITE <ShieldCheck size={14} className="text-accent-amber" />
            </span>
          </div>
          <div className="glass bg-white/5 p-4 rounded-2xl border border-white/10 min-w-[140px] flex flex-col justify-center">
            <span className="text-[8px] text-text-secondary font-black uppercase tracking-[0.2em] mb-1">TOTAL HIRES</span>
            <span className="font-mono text-lg font-black text-black dark:text-white tracking-tighter">42</span>
          </div>
        </div>

        {/* Background glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-red/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Navigation / Control Pane */}
        <motion.div 
          animate={{ 
            gridColumn: isSidebarExpanded ? "span 3 / span 3" : "span 1 / span 1",
            width: isSidebarExpanded ? "auto" : "80px"
          }}
          className="lg:col-start-1"
        >
          <div className="sticky top-24 flex flex-col gap-6">
            <div className="bg-bg-surface border border-border-custom p-2 rounded-3xl overflow-hidden shadow-xl">
              <div className="p-3 border-b border-border-custom mb-2 flex items-center justify-between">
                {isSidebarExpanded && <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary ml-2">Controls</span>}
                <button 
                  onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                  className={`p-2 rounded-xl bg-white/5 border border-white/5 text-text-secondary hover:text-accent-red hover:border-accent-red/20 transition-all ${!isSidebarExpanded ? 'mx-auto' : ''}`}
                  title={isSidebarExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
                  id="maximize-minimize-btn"
                >
                  {isSidebarExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
              </div>
              <NavButton expanded={isSidebarExpanded} active={activeTab === 'hiring-board'} onClick={() => setActiveTab('hiring-board')} icon={<Briefcase size={18} />} label="Hiring Board" />
              <NavButton expanded={isSidebarExpanded} active={activeTab === 'talent-radar'} onClick={() => setActiveTab('talent-radar')} icon={<Users size={18} />} label="Talent Radar" />
              <NavButton expanded={isSidebarExpanded} active={activeTab === 'arenas-hub'} onClick={() => setActiveTab('arenas-hub')} icon={<Trophy size={18} />} label="Arenas Hub" />
              <NavButton expanded={isSidebarExpanded} active={activeTab === 'ecosystem'} onClick={() => setActiveTab('ecosystem')} icon={<Activity size={18} />} label="Ecosystem" />
              <div className="border-t border-border-custom my-2 pt-2">
                <NavButton expanded={isSidebarExpanded} active={activeTab === 'subscription'} onClick={() => setActiveTab('subscription')} icon={<CreditCard size={18} />} label="Billing & Plan" />
              </div>
            </div>

            {/* Quick Stats Widget */}
            {isSidebarExpanded && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-bg-surface border border-border-custom p-6 rounded-3xl shadow-inner"
              >
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary mb-6 flex items-center gap-2">
                  <Zap size={12} className="text-accent-red" /> NETWORK REACH
                </h4>
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <span className="text-xs text-text-secondary font-bold uppercase tracking-widest">Total Impressions</span>
                    <span className="text-xl font-black font-mono text-text-primary leading-none">12.8K</span>
                  </div>
                  <div className="w-full h-1 bg-text-secondary/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      className="h-full bg-accent-red shadow-[0_0_10px_rgba(255,31,31,0.5)]" 
                    />
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-xs text-text-secondary font-bold uppercase tracking-widest">Profile Closes</span>
                    <span className="text-xl font-black font-mono text-text-primary leading-none">246</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Main Workspace */}
        <motion.div 
          animate={{ 
            gridColumn: isSidebarExpanded ? "span 9 / span 9" : "span 11 / span 11" 
          }}
          className="lg:col-start-auto"
        >
          {activeTab === 'talent-radar' && (
            <div className="space-y-8">
                      {/* Contextual Filtering Banner */}
              {(roleConstraints.minCgpa > 0 || roleConstraints.minCosCred > 0 || roleConstraints.requiredSkills.length > 0) && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-accent-red/10 border border-accent-red/20 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent-red rounded-lg text-white">
                      <Target size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white">Active Search Parameters</p>
                      <p className="text-[10px] font-bold text-text-secondary uppercase mt-0.5">
                        Matches for: <span className="text-accent-red">MIN CGPA {roleConstraints.minCgpa}</span>, <span className="text-accent-red">MIN CRED {roleConstraints.minCosCred}</span> & <span className="text-accent-red">{roleConstraints.requiredSkills.length} SKILLS</span>
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setRoleConstraints({ minCgpa: 0, minCosCred: 0, requiredSkills: [] })}
                    className="px-4 py-2 border border-accent-red/20 text-accent-red text-[8px] font-black uppercase tracking-widest rounded-lg hover:bg-accent-red hover:text-white transition-all"
                  >
                    Reset All
                  </button>
                </motion.div>
              )}

              {/* Filter Bar */}
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 relative w-full">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by tech stack, name or university..." 
                    className="w-full pl-14 pr-6 py-4 bg-bg-surface border border-border-custom rounded-2xl focus:border-accent-red/40 outline-none text-text-primary font-medium placeholder:text-text-secondary/40 transition-all shadow-lg"
                  />
                </div>
                <div className="flex items-center gap-4 bg-bg-surface border border-border-custom px-6 py-4 rounded-2xl shadow-lg w-full md:w-auto">
                  <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary whitespace-nowrap">MIN CRED</span>
                  <input 
                    type="range" 
                    min="0" 
                    max="10" 
                    step="0.1"
                    value={minCred}
                    onChange={(e) => setMinCred(parseFloat(e.target.value))}
                    className="accent-accent-red w-32"
                  />
                  <span className="font-mono font-black text-accent-red w-8">{minCred}</span>
                </div>

                <button 
                  onClick={() => setShowSkillModal(true)}
                  className="flex items-center gap-4 bg-bg-surface border border-border-custom px-6 py-4 rounded-2xl shadow-lg w-full md:w-auto relative hover:border-accent-red/50 transition-all group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-accent-red/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 flex items-center gap-4">
                    <div className={`p-2 rounded-lg transition-colors ${totalActiveFilters > 0 ? 'bg-accent-red text-white' : 'bg-white/5 text-text-secondary group-hover:text-white'}`}>
                      <Filter size={14} />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary whitespace-nowrap">ADVANCED FILTERS</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-text-primary">
                        {totalActiveFilters === 0 ? 'ANY SKILL' : `${totalActiveFilters} ACTIVE`}
                      </p>
                    </div>
                  </div>
                </button>

                {/* Advanced Filter Drawer */}
                <AnimatePresence>
                  {showSkillModal && (
                    <>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowSkillModal(false)}
                        className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
                      />
                      <motion.div 
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 z-[201] w-full max-w-[600px] h-full bg-[#1A1A1A] border-l border-[#333] shadow-2xl flex flex-col"
                      >
                        {/* Drawer Header */}
                        <div className="p-8 border-b border-white/5 bg-[#0A0A0A]/50 flex items-center justify-between sticky top-0 z-10 backdrop-blur-md">
                          <div>
                            <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">Advanced Talent Isolation</h3>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-[10px] font-black uppercase tracking-widest text-accent-red bg-accent-red/10 px-2 py-0.5 rounded">
                                {totalActiveFilters} Active Filters
                              </span>
                              <button 
                                onClick={() => setRadarFilters({
                                  skills: [],
                                  githubCommits: false,
                                  minGigs: 0,
                                  showcaseBuilds: false,
                                  minTrustScore: 0,
                                  minOnTimeRate: 0,
                                  excludeDisputes: false,
                                  minRepeatRate: 0,
                                  yearsOfStudy: [],
                                  degrees: [],
                                  ladderPosition: '',
                                  trackEntry: '',
                                  arenaPlacements: false,
                                  lastActive: '',
                                  ndaCleared: false,
                                  zeroGhosting: false,
                                  maxResponseTime: 'Any',
                                  collabStyle: 'Any',
                                  minFirstPassRate: 0,
                                  proactive: false,
                                  maxRevisionTime: 'Any',
                                  minRepeatHire: 0,
                                  maxConcurrentGigs: 10
                                })}
                                className="text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-white transition-colors"
                              >
                                Clear All
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <button 
                              onClick={() => setShowSkillModal(false)}
                              className="px-6 py-3 bg-accent-red text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent-red/20"
                            >
                              Apply Filters
                            </button>
                            <button 
                              onClick={() => setShowSkillModal(false)}
                              className="p-3 rounded-xl hover:bg-white/5 transition-all text-text-secondary hover:text-white"
                            >
                              <X size={20} />
                            </button>
                          </div>
                        </div>

                        {/* Drawer Content - Accordion Sections */}
                        <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-6">
                          
                          {/* Section 1: Portfolio & Work Evidence */}
                          <AccordionSection 
                            title="Portfolio & Work Evidence" 
                            isOpen={openSections.includes('portfolio')} 
                            onToggle={() => toggleSection('portfolio')}
                            icon={<Layers size={16} />}
                          >
                            <div className="space-y-6 pt-4">
                              <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Technical Skill Stack</label>
                                <div className="flex flex-wrap gap-2">
                                  {allSkills.sort().slice(0, 12).map(skill => (
                                    <button
                                      key={skill}
                                      onClick={() => {
                                        const isSelected = radarFilters.skills.includes(skill);
                                        setRadarFilters({
                                          ...radarFilters,
                                          skills: isSelected 
                                            ? radarFilters.skills.filter(s => s !== skill)
                                            : [...radarFilters.skills, skill]
                                        });
                                      }}
                                      className={`px-3 py-1.5 rounded-lg border text-[9px] font-black uppercase tracking-widest transition-all ${
                                        radarFilters.skills.includes(skill)
                                        ? 'bg-accent-red border-accent-red text-white'
                                        : 'bg-white/5 border-white/5 text-text-secondary hover:border-white/20'
                                      }`}
                                    >
                                      {skill}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <ToggleField 
                                label="Only show profiles with GitHub > 50+ commits"
                                checked={radarFilters.githubCommits}
                                onChange={(val) => setRadarFilters({ ...radarFilters, githubCommits: val })}
                              />

                              <RangeSlider 
                                label="Minimum Portfolio Density (Total Gigs)"
                                min={0}
                                max={50}
                                value={radarFilters.minGigs}
                                onChange={(val) => setRadarFilters({ ...radarFilters, minGigs: val })}
                                unit="Gigs"
                              />

                              <ToggleField 
                                label="Showcase Builds Available"
                                checked={radarFilters.showcaseBuilds}
                                onChange={(val) => setRadarFilters({ ...radarFilters, showcaseBuilds: val })}
                              />
                            </div>
                          </AccordionSection>

                          {/* Section 2: Trust & Reliability Signals */}
                          <AccordionSection 
                            title="Trust & Reliability Signals" 
                            isOpen={openSections.includes('trust')} 
                            onToggle={() => toggleSection('trust')}
                            icon={<ShieldCheck size={16} />}
                          >
                            <div className="space-y-6 pt-4">
                              <RangeSlider 
                                label="Minimum Trust Score"
                                min={0}
                                max={10}
                                step={0.1}
                                value={radarFilters.minTrustScore}
                                onChange={(val) => setRadarFilters({ ...radarFilters, minTrustScore: val })}
                                unit=""
                              />
                              <RangeSlider 
                                label="Minimum On-time Delivery Rate"
                                min={0}
                                max={100}
                                value={radarFilters.minOnTimeRate}
                                onChange={(val) => setRadarFilters({ ...radarFilters, minOnTimeRate: val })}
                                unit="%"
                              />
                              <ToggleField 
                                label="Exclude profiles with active disputes"
                                checked={radarFilters.excludeDisputes}
                                onChange={(val) => setRadarFilters({ ...radarFilters, excludeDisputes: val })}
                              />
                              <RangeSlider 
                                label="Minimum Repeat Client Rate"
                                min={0}
                                max={100}
                                value={radarFilters.minRepeatRate}
                                onChange={(val) => setRadarFilters({ ...radarFilters, minRepeatRate: val })}
                                unit="%"
                              />
                            </div>
                          </AccordionSection>

                          {/* Section 3: Academic & Institutional */}
                          <AccordionSection 
                            title="Academic & Institutional" 
                            isOpen={openSections.includes('academic')} 
                            onToggle={() => toggleSection('academic')}
                            icon={<GraduationCap size={16} />}
                          >
                            <div className="space-y-6 pt-4">
                              <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Year of Study</label>
                                <div className="grid grid-cols-3 gap-2">
                                  {['1st', '2nd', '3rd', 'Final', 'Graduated'].map(year => (
                                    <button
                                      key={year}
                                      onClick={() => {
                                        const isSelected = radarFilters.yearsOfStudy.includes(year);
                                        setRadarFilters({
                                          ...radarFilters,
                                          yearsOfStudy: isSelected ? radarFilters.yearsOfStudy.filter(y => y !== year) : [...radarFilters.yearsOfStudy, year]
                                        });
                                      }}
                                      className={`p-3 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${
                                        radarFilters.yearsOfStudy.includes(year)
                                        ? 'bg-accent-red border-accent-red text-white'
                                        : 'bg-white/5 border-white/5 text-text-secondary hover:border-white/10'
                                      }`}
                                    >
                                      {year}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </AccordionSection>

                          {/* Section 4: Experience Tier */}
                          <AccordionSection 
                            title="Experience Tier" 
                            isOpen={openSections.includes('experience')} 
                            onToggle={() => toggleSection('experience')}
                            icon={<Briefcase size={16} />}
                          >
                            <div className="space-y-6 pt-4">
                              <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Current Ladder Position</label>
                                <div className="grid grid-cols-1 gap-2">
                                  {['Peer Gigs', 'Micro-gigs', 'Startup Intern', 'Verified Intern'].map(tier => (
                                    <button
                                      key={tier}
                                      onClick={() => setRadarFilters({ ...radarFilters, ladderPosition: radarFilters.ladderPosition === tier ? '' : tier })}
                                      className={`p-4 rounded-xl border text-left text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-between ${
                                        radarFilters.ladderPosition === tier
                                        ? 'bg-accent-red border-accent-red text-white'
                                        : 'bg-white/5 border-white/5 text-text-secondary hover:border-white/10'
                                      }`}
                                    >
                                      {tier}
                                      {radarFilters.ladderPosition === tier && <CheckCircle2 size={14} />}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </AccordionSection>

                          {/* Section 5: Arena & Engagement */}
                          <AccordionSection 
                            title="Arena & Engagement" 
                            isOpen={openSections.includes('arena')} 
                            onToggle={() => toggleSection('arena')}
                            icon={<Trophy size={16} />}
                          >
                            <div className="space-y-6 pt-4">
                              <ToggleField 
                                label="Has COS Arena Placements"
                                checked={radarFilters.arenaPlacements}
                                onChange={(val) => setRadarFilters({ ...radarFilters, arenaPlacements: val })}
                              />
                              <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Last Active</label>
                                <select 
                                  className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-xs font-bold uppercase tracking-widest text-white outline-none focus:border-accent-red/30 transition-all cursor-pointer"
                                  value={radarFilters.lastActive}
                                  onChange={(e) => setRadarFilters({ ...radarFilters, lastActive: e.target.value })}
                                >
                                  <option value="">Any Time</option>
                                  <option value="7D">Last 7 Days</option>
                                  <option value="30D">Last 30 Days</option>
                                  <option value="90D">Last 90 Days</option>
                                </select>
                              </div>
                              <ToggleField 
                                label="Cleared for NDA-bound gigs"
                                checked={radarFilters.ndaCleared}
                                onChange={(val) => setRadarFilters({ ...radarFilters, ndaCleared: val })}
                              />
                            </div>
                          </AccordionSection>

                          {/* Section 6: Behavioral & Work Style Signals */}
                          <AccordionSection 
                            title="Behavioral & Work Style Signals" 
                            isOpen={openSections.includes('behavioral')} 
                            onToggle={() => toggleSection('behavioral')}
                            icon={<Smile size={16} />}
                          >
                            <div className="space-y-6 pt-4">
                              <div className="space-y-1">
                                <ToggleField 
                                  label="Zero Ghosting History"
                                  checked={radarFilters.zeroGhosting}
                                  onChange={(val) => setRadarFilters({ ...radarFilters, zeroGhosting: val })}
                                />
                                <p className="text-[10px] text-text-secondary opacity-60 ml-12">Exclude candidates who have ever abandoned an accepted gig or Arena.</p>
                              </div>

                              <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Max Average Response Time</label>
                                <select 
                                  className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-xs font-bold uppercase tracking-widest text-white outline-none focus:border-accent-red/30 transition-all cursor-pointer"
                                  value={radarFilters.maxResponseTime}
                                  onChange={(e) => setRadarFilters({ ...radarFilters, maxResponseTime: e.target.value })}
                                >
                                  <option value="Any">Any</option>
                                  <option value="< 1 Hour">&lt; 1 Hour</option>
                                  <option value="< 4 Hours">&lt; 4 Hours</option>
                                  <option value="< 12 Hours">&lt; 12 Hours</option>
                                  <option value="< 24 Hours">&lt; 24 Hours</option>
                                </select>
                              </div>

                              <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Arena Collaboration Style</label>
                                <div className="flex gap-2 p-1 bg-white/5 rounded-xl">
                                  {['Any', 'Solo Contributor', 'Team Player'].map(style => (
                                    <button
                                      key={style}
                                      onClick={() => setRadarFilters({ ...radarFilters, collabStyle: style })}
                                      className={`flex-1 py-3 px-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                                        radarFilters.collabStyle === style
                                        ? 'bg-accent-red text-white shadow-lg'
                                        : 'text-text-secondary hover:text-white hover:bg-white/5'
                                      }`}
                                    >
                                      {style}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Min. First-Pass Acceptance Rate</label>
                                  <span className="font-mono text-xs font-black text-accent-red">{radarFilters.minFirstPassRate}%</span>
                                </div>
                                <input 
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={radarFilters.minFirstPassRate}
                                  onChange={(e) => setRadarFilters({ ...radarFilters, minFirstPassRate: parseInt(e.target.value) })}
                                  className="w-full accent-accent-red h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer"
                                />
                                <p className="text-[10px] text-text-secondary opacity-60">Measures how often their work is approved without requiring major revisions.</p>
                              </div>

                              <div className="h-px bg-white/5 my-2" />

                              <div className="space-y-1">
                                <ToggleField 
                                  label="Highly Proactive Communicator"
                                  checked={radarFilters.proactive}
                                  onChange={(val) => setRadarFilters({ ...radarFilters, proactive: val })}
                                />
                                <p className="text-[10px] text-text-secondary opacity-60 ml-12">Prioritizes candidates who consistently provide status updates before being asked.</p>
                              </div>

                              <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Max Revision Turnaround Time</label>
                                <select 
                                  className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-xs font-bold uppercase tracking-widest text-white outline-none focus:border-accent-red/30 transition-all cursor-pointer"
                                  value={radarFilters.maxRevisionTime}
                                  onChange={(e) => setRadarFilters({ ...radarFilters, maxRevisionTime: e.target.value })}
                                >
                                  <option value="Any">Any</option>
                                  <option value="< 6 Hours">&lt; 6 Hours</option>
                                  <option value="< 12 Hours">&lt; 12 Hours</option>
                                  <option value="< 24 Hours">&lt; 24 Hours</option>
                                </select>
                                <p className="text-[10px] text-text-secondary opacity-60">Speed of implementing requested changes or bug fixes.</p>
                              </div>

                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Min. Repeat Hire Rate</label>
                                  <span className="font-mono text-xs font-black text-accent-red">{radarFilters.minRepeatHire}%</span>
                                </div>
                                <input 
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={radarFilters.minRepeatHire}
                                  onChange={(e) => setRadarFilters({ ...radarFilters, minRepeatHire: parseInt(e.target.value) })}
                                  className="w-full accent-accent-red h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer"
                                />
                                <p className="text-[10px] text-text-secondary opacity-60">Percentage of clients who hired this candidate for a second gig.</p>
                              </div>

                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Max Concurrent Active Gigs</label>
                                  <span className="font-mono text-xs font-black text-accent-red">{radarFilters.maxConcurrentGigs}</span>
                                </div>
                                <input 
                                  type="range"
                                  min="1"
                                  max="10"
                                  value={radarFilters.maxConcurrentGigs}
                                  onChange={(e) => setRadarFilters({ ...radarFilters, maxConcurrentGigs: parseInt(e.target.value) })}
                                  className="w-full accent-accent-red h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer"
                                />
                                <p className="text-[10px] text-text-secondary opacity-60">Filter out talent currently over-allocated on too many parallel projects.</p>
                              </div>
                            </div>
                          </AccordionSection>

                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Talent Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredCosines.map((cosine, idx) => (
                    <TalentCard 
                      key={cosine.id} 
                      cosine={cosine} 
                      index={idx}
                      selectedSkills={radarFilters.skills}
                      onClick={() => setSelectedCosine(cosine)} 
                    />
                  ))}
                </AnimatePresence>
                {filteredCosines.length === 0 && (
                  <div className="col-span-full py-20 text-center bg-bg-surface border border-white/5 border-dashed rounded-3xl">
                    <p className="text-text-secondary font-black uppercase tracking-widest">No matching talent found</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'hiring-board' && (
            <div className="space-y-8">
              {/* Sub-Navigation Tabs */}
              <div className="flex items-center gap-10 mb-4 px-2 overflow-x-auto no-scrollbar whitespace-nowrap border-b border-white/5">
                <button 
                  onClick={() => setHiringBoardTab('post')}
                  className={`text-xs font-black uppercase tracking-[0.25em] pb-3 transition-all relative ${
                    hiringBoardTab === 'post' ? 'text-white' : 'text-text-secondary hover:text-white'
                  }`}
                >
                  Post New Role
                  {hiringBoardTab === 'post' && (
                    <motion.div layoutId="hiringTabBorder" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-red shadow-[0_0_10px_rgba(255,31,31,0.5)]" />
                  )}
                </button>
                <button 
                  onClick={() => setHiringBoardTab('interviews')}
                  className={`text-xs font-black uppercase tracking-[0.25em] pb-3 transition-all relative ${
                    hiringBoardTab === 'interviews' ? 'text-white' : 'text-text-secondary hover:text-white'
                  }`}
                >
                  Active Interviews
                  {hiringBoardTab === 'interviews' && (
                    <motion.div layoutId="hiringTabBorder" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-red shadow-[0_0_10px_rgba(255,31,31,0.5)]" />
                  )}
                </button>
                <button 
                  onClick={() => setHiringBoardTab('pipeline')}
                  className={`text-xs font-black uppercase tracking-[0.25em] pb-3 transition-all relative ${
                    hiringBoardTab === 'pipeline' ? 'text-white' : 'text-text-secondary hover:text-white'
                  }`}
                >
                  Decision Pipeline
                  {hiringBoardTab === 'pipeline' && (
                    <motion.div layoutId="hiringTabBorder" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-red shadow-[0_0_10px_rgba(255,31,31,0.5)]" />
                  )}
                </button>
              </div>

              <AnimatePresence mode="wait">
                {hiringBoardTab === 'post' && (
                  <motion.section 
                    key="post"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-bg-surface border border-white/5 p-12 rounded-[40px] shadow-2xl relative overflow-hidden"
                  >
                    <div className="relative z-10">
                      <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-2">POST A ROLE & FIND MATCHES</h3>
                      <p className="text-text-secondary text-sm font-bold uppercase tracking-widest opacity-60 mb-12">Precision talent acquisition through skill-based filtering</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary ml-2">Post / Role Name</label>
                          <input 
                            type="text" 
                            value={hiringForm.roleName}
                            onChange={(e) => setHiringForm({...hiringForm, roleName: e.target.value})}
                            placeholder="e.g., Senior Frontend Engineer" 
                            className="w-full bg-bg-secondary border border-border-custom rounded-2xl p-5 outline-none focus:border-accent-red/40 transition-all text-text-primary dark:text-white placeholder:text-text-secondary/20 font-bold uppercase tracking-tight"
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between px-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Base Salary (Annual {currency})</label>
                            <button 
                              onClick={() => setCurrency(currency === 'USD' ? 'INR' : 'USD')}
                              className="text-[8px] font-black text-accent-red uppercase tracking-widest hover:underline"
                            >
                              Toggle to {currency === 'USD' ? 'INR' : 'USD'}
                            </button>
                          </div>
                          <div className="relative">
                            <span 
                              onClick={() => setCurrency(currency === 'USD' ? 'INR' : 'USD')}
                              className="absolute left-6 top-1/2 -translate-y-1/2 font-mono text-text-secondary cursor-pointer hover:text-accent-red transition-colors"
                            >
                              {currency === 'USD' ? '$' : '₹'}
                            </span>
                            <input 
                              type="number" 
                              value={hiringForm.baseSalary}
                              onChange={(e) => setHiringForm({...hiringForm, baseSalary: e.target.value})}
                              placeholder={currency === 'USD' ? '120,000' : '10,00,000'} 
                              className="w-full bg-bg-secondary border border-border-custom rounded-2xl p-5 pl-12 outline-none focus:border-accent-red/40 transition-all text-text-primary dark:text-white placeholder:text-text-secondary/20 font-bold font-mono"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary ml-2">Candidate Headcount</label>
                           <input 
                            type="number" 
                            value={hiringForm.headcount}
                            onChange={(e) => setHiringForm({...hiringForm, headcount: e.target.value})}
                            placeholder="3" 
                            className="w-full bg-bg-secondary border border-border-custom rounded-2xl p-5 outline-none focus:border-accent-red/40 transition-all text-text-primary dark:text-white placeholder:text-text-secondary/20 font-bold"
                          />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary ml-2">Required Qualifications</label>
                           <select 
                            value={hiringForm.qualifications}
                            onChange={(e) => setHiringForm({...hiringForm, qualifications: e.target.value})}
                            className="w-full bg-bg-secondary border border-border-custom rounded-2xl p-5 outline-none focus:border-accent-red/40 transition-all text-text-primary dark:text-white font-bold appearance-none uppercase"
                           >
                             <option value="">Select Level</option>
                             <option value="btech">B.Tech / B.E.</option>
                             <option value="mtech">M.Tech / M.E.</option>
                             <option value="phd">PhD Researcher</option>
                             <option value="bootcamp">Bootcamp Alumni</option>
                           </select>
                        </div>
                        <div className="flex flex-col gap-8 col-span-full bg-white/[0.02] p-8 rounded-3xl border border-white/5">
                           {/* CGPA Slider */}
                           <div className="space-y-4">
                             <div className="flex justify-between items-center px-2">
                               <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Minimum CGPA (Scale 10.0)</label>
                               <span className="font-mono font-black text-accent-red text-xl">{hiringForm.minCgpa}</span>
                             </div>
                             <input 
                              type="range" 
                              min="0" 
                              max="10" 
                              step="0.1"
                              value={hiringForm.minCgpa}
                              onChange={(e) => setHiringForm({...hiringForm, minCgpa: e.target.value})}
                              className="w-full accent-accent-red"
                            />
                           </div>

                           <div className="border-b border-[#333] opacity-20" />

                           {/* COS CRED Slider */}
                           <div className="space-y-4">
                             <div className="flex justify-between items-center px-2">
                               <div className="flex items-center gap-2">
                                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">MINIMUM COS CRED (SCALE 10.0)</label>
                                  <div className="relative group/tooltip">
                                     <div className="w-4 h-4 rounded-full border border-gray-500 flex items-center justify-center text-[10px] text-gray-500 hover:text-white hover:border-white transition-all cursor-pointer">?</div>
                                     <div className="absolute bottom-full left-0 mb-3 w-64 p-3 bg-[#2A2A2A] text-[10px] font-bold text-gray-300 rounded shadow-2xl border border-[#444] z-50 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible pointer-events-none transition-all leading-relaxed tracking-wide">
                                        COS CRED is a dynamic proof-of-work score aggregating Identity Integrity, Skill Provenance, Social Proofing, and Network Activity.
                                     </div>
                                  </div>
                               </div>
                               <span className="font-mono font-black text-accent-red text-xl">{hiringForm.minCosCred}</span>
                             </div>
                             <input 
                              type="range" 
                              min="0" 
                              max="10" 
                              step="0.1"
                              value={hiringForm.minCosCred}
                              onChange={(e) => setHiringForm({...hiringForm, minCosCred: e.target.value})}
                              className="w-full accent-accent-red"
                            />
                           </div>
                        </div>
                      </div>

                      <div className="space-y-6 mb-12">
                         <div className="flex items-center justify-between px-2">
                            <div>
                               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Required Skills Array</h4>
                               <p className="text-[9px] font-bold text-text-secondary/40 uppercase tracking-widest mt-1">Select keys & define proficiency levels</p>
                            </div>
                            <button 
                              onClick={() => {
                                setStagedSkills([...hiringForm.skills.filter(s => s.name !== '')]);
                                setIsSkillSelectorOpen(true);
                              }}
                              className="px-4 py-2 bg-accent-red/10 border border-accent-red/20 text-accent-red text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center gap-2 hover:bg-accent-red hover:text-white transition-all shadow-[0_0_20px_rgba(255,31,31,0.1)]"
                            >
                              <PlusCircle size={14} /> ADD SKILL
                            </button>
                         </div>
                         
                         <div className="flex flex-wrap gap-3 p-6 bg-white/[0.02] border border-white/5 rounded-3xl min-h-[140px] items-start content-start">
                            {hiringForm.skills.filter(s => s.name !== '').length > 0 ? (
                              hiringForm.skills.filter(s => s.name !== '').map((skill, index) => (
                                <motion.div 
                                  layout
                                  key={index} 
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="group flex items-center gap-3 bg-[#1A1A1A] border border-white/10 pl-4 pr-2 py-2 rounded-2xl hover:border-accent-red/30 transition-all"
                                >
                                   <div className="flex flex-col">
                                      <span className="text-[10px] font-black uppercase tracking-tight text-white">{skill.name}</span>
                                      <span className="text-[8px] font-black uppercase tracking-widest text-accent-red italic">{skill.level}</span>
                                   </div>
                                   <button 
                                     onClick={() => removeSelectedSkill(skill.name)}
                                     className="p-1 px-2 text-text-secondary hover:text-accent-red transition-colors"
                                   >
                                     <X size={14} />
                                   </button>
                                </motion.div>
                              ))
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center py-4 opacity-30">
                                <PlusCircle size={24} className="mb-2" />
                                <p className="text-[10px] font-black uppercase tracking-widest">No Skills Assigned Yet</p>
                              </div>
                            )}
                         </div>
                      </div>

                      <button 
                        onClick={() => {
                          setIsScanning(true);
                          
                          // Capture constraints
                          setRoleConstraints({
                            minCgpa: parseFloat(hiringForm.minCgpa),
                            minCosCred: parseFloat(hiringForm.minCosCred),
                            requiredSkills: hiringForm.skills.filter(s => s.name !== '')
                          });

                          // Simulate processing
                          setTimeout(() => {
                            setIsScanning(false);
                            setActiveTab('talent-radar');
                            setHiringForm({
                              roleName: '',
                              baseSalary: '',
                              headcount: '',
                              qualifications: '',
                              minCgpa: '7.5',
                              minCosCred: '8.0',
                              skills: [{ name: '', level: 'Intermediate' }]
                            });
                          }, 1500);
                        }}
                        disabled={isScanning}
                        className="w-full py-6 bg-accent-red text-white rounded-2xl font-black uppercase tracking-[0.25em] text-lg hover:scale-[1.01] transition-all shadow-[0_20px_50px_rgba(255,31,31,0.2)] disabled:opacity-70 disabled:cursor-wait"
                      >
                        {isScanning ? "CALIBRATING SCAN..." : "LOCK ROLE & SCAN NETWORK"}
                      </button>
                    </div>
                    {/* Decoration */}
                    <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-accent-red/10 blur-[100px] rounded-full" />
                  </motion.section>
                )}

                {hiringBoardTab === 'interviews' && (
                  <motion.div 
                    key="interviews"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="bg-bg-surface border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl overflow-hidden relative">
                       <div className="relative z-10">
                          <div className="flex items-center justify-between mb-12">
                             <div>
                                <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">Interview Waiting Room</h3>
                                <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-60 mt-1">Confirmed candidates available for screening</p>
                             </div>
                             <div className="flex items-center gap-3 bg-accent-deep-green/10 px-4 py-2 rounded-xl border border-accent-deep-green/20">
                                <Activity size={14} className="text-accent-deep-green animate-pulse" />
                                <span className="text-[10px] font-black text-accent-deep-green uppercase tracking-widest">3 CANDIDATES ONLINE</span>
                             </div>
                          </div>

                          <div className="space-y-4">
                            {activeInterviews.map((candidate) => (
                              <div key={candidate.id} className="bg-[#1A1A1A] border border-white/5 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between group hover:border-accent-red/30 transition-all">
                                 <div className="flex items-center gap-6 mb-4 md:mb-0">
                                    <div className="relative">
                                      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-text-secondary group-hover:text-accent-red transition-all">
                                        <User size={32} />
                                      </div>
                                      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-accent-deep-green border-2 border-[#1A1A1A] shadow-[0_0_10px_rgba(160,232,175,0.4)]" />
                                    </div>
                                    <div>
                                       <h4 className="text-xl font-black italic uppercase tracking-tight text-white mb-1">{candidate.name}</h4>
                                       <p className="text-xs font-bold text-accent-red uppercase tracking-widest mb-2">{candidate.role}</p>
                                       <div className="flex flex-wrap items-center gap-4">
                                          <div className="flex items-center gap-1.5 opacity-60">
                                             <GraduationCap size={12} className="text-text-secondary" />
                                             <span className="text-[10px] font-black text-text-secondary uppercase">{candidate.university}</span>
                                          </div>
                                          <div className="flex items-center gap-1.5 opacity-60">
                                             <Clock size={12} className="text-text-secondary" />
                                             <span className="text-[10px] font-black text-text-secondary uppercase">{candidate.time}</span>
                                          </div>
                                       </div>
                                    </div>
                                 </div>

                                 <div className="flex items-center gap-4 w-full md:w-auto">
                                    <button 
                                      onClick={() => moveToDecision(candidate.id)}
                                      className="flex-1 md:flex-none px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#A0E8AF] hover:bg-[#A0E8AF]/10 transition-all flex items-center justify-center gap-2"
                                    >
                                      <CheckCircle2 size={14} /> Move to Decision
                                    </button>
                                    <button 
                                      onClick={() => {
                                        setConnectingCandidate(candidate.name);
                                        setIsVideoConnecting(true);
                                      }}
                                      className="flex-1 md:flex-none px-6 py-4 bg-transparent border-2 border-[#A0E8AF]/30 text-[#A0E8AF] rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 hover:bg-[#A0E8AF] hover:text-black hover:scale-105 shadow-[0_0_20px_rgba(160,232,175,0.1)] hover:shadow-[0_0_30px_rgba(160,232,175,0.4)] relative overflow-hidden group/video"
                                    >
                                      <div className="absolute inset-0 bg-[#A0E8AF]/10 blur-xl opacity-0 group-hover/video:opacity-100 transition-opacity" />
                                      <Video size={14} className="relative z-10" /> <span className="relative z-10">Join Video</span>
                                    </button>
                                 </div>
                              </div>
                            ))}
                            {activeInterviews.length === 0 && (
                              <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl opacity-40">
                                <Users size={40} className="mx-auto mb-4" />
                                <p className="text-sm font-black uppercase tracking-widest">No candidates in interview stage</p>
                              </div>
                            )}
                          </div>
                       </div>
                       
                       {/* Background Glow */}
                       <div className="absolute -top-20 -left-20 w-80 h-80 bg-accent-deep-green/5 blur-[100px] rounded-full" />
                    </div>
                  </motion.div>
                )}

                {hiringBoardTab === 'pipeline' && (
                  <motion.div 
                    key="pipeline"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <div className="bg-bg-surface border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                       <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-2">Decision Pipeline</h3>
                       <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-60 mb-12">Post-interview evaluation & terminal actions</p>

                       <div className="space-y-4">
                          {decisionPipeline.map((candidate) => (
                            <div key={candidate.id} className="bg-[#1A1A1A] border border-white/5 p-8 rounded-3xl group hover:border-white/10 transition-all">
                               <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
                                  <div className="flex items-center gap-6">
                                     <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-accent-red">
                                        <GraduationCap size={32} />
                                     </div>
                                     <div>
                                        <h4 className="text-xl font-black italic uppercase tracking-tight text-white mb-1">{candidate.name}</h4>
                                        <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">{candidate.role}</p>
                                        <div className="flex items-center gap-3 mt-2">
                                          <span className="px-2 py-0.5 bg-accent-red/10 text-accent-red text-[8px] font-black uppercase rounded border border-accent-red/20">{candidate.score || 9.0} COS CRED</span>
                                          <span className="px-2 py-0.5 bg-white/5 text-text-secondary text-[8px] font-black uppercase rounded border border-white/10">{candidate.stage}</span>
                                        </div>
                                     </div>
                                  </div>

                                  <div className="flex-1 max-w-xl">
                                     <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                                        <p className="text-[8px] font-black text-text-secondary uppercase tracking-[0.2em] mb-2 flex items-center gap-2 italic">
                                          <Terminal size={10} className="text-accent-red" /> INTERNAL RECRUITER NOTES
                                        </p>
                                        <p className="text-[11px] text-white/50 leading-relaxed italic">
                                          "Exhibited strong architectural oversight. Candidate mentioned interest in scaling infrastructure. Score reflects high git-provenance."
                                        </p>
                                     </div>
                                  </div>

                                  <div className="flex flex-wrap items-center gap-3">
                                     <button 
                                      onClick={() => hireCandidate(candidate.id)}
                                      className="px-6 py-4 bg-accent-red text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-accent-red/20"
                                     >
                                       Hire
                                     </button>
                                     <button className="px-6 py-4 bg-white/5 border border-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                                       Second Interview
                                     </button>
                                     <div className="relative group/actions">
                                       <button className="p-4 bg-white/5 border border-white/10 text-text-secondary rounded-2xl hover:text-white transition-all">
                                          <MoreVertical size={18} />
                                       </button>
                                       <div className="absolute right-0 bottom-full mb-2 w-48 bg-bg-surface border border-white/10 rounded-2xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover/actions:opacity-100 group-hover/actions:translate-y-0 group-hover/actions:pointer-events-auto transition-all z-50 p-2">
                                          <button className="w-full text-left p-3 rounded-xl hover:bg-white/5 text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-white">Offer Other Post</button>
                                          <button 
                                            onClick={() => rejectCandidate(candidate.id)}
                                            className="w-full text-left p-3 rounded-xl hover:bg-accent-red/10 text-[10px] font-black uppercase tracking-widest text-accent-red"
                                          >
                                            Reject Candidate
                                          </button>
                                       </div>
                                     </div>
                                  </div>
                               </div>
                            </div>
                          ))}
                          {decisionPipeline.length === 0 && (
                            <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl opacity-40">
                              <Target size={40} className="mx-auto mb-4" />
                              <p className="text-sm font-black uppercase tracking-widest">Pipeline is currently empty</p>
                            </div>
                          )}
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Video Conference Overlay */}
              <AnimatePresence>
                {isVideoConnecting && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/95"
                  >
                    <div className="relative w-full max-w-5xl aspect-video bg-[#0A0A0A] border border-white/10 rounded-[32px] overflow-hidden flex flex-col items-center justify-center shadow-[0_0_100px_rgba(160,232,175,0.1)]">
                       <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(160,232,175,0.05),transparent_70%)] animate-pulse" />
                       
                       <div className="relative z-10 flex flex-col items-center">
                          <div className="w-24 h-24 rounded-full border-2 border-[#A0E8AF]/20 flex items-center justify-center mb-8 relative">
                            <motion.div 
                              animate={{ rotate: 360 }}
                              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                              className="absolute inset-0 rounded-full border-t-2 border-[#A0E8AF]"
                            />
                            <Video size={40} className="text-[#A0E8AF]" />
                          </div>
                          <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-2">Connecting to Secure Meeting Room</h3>
                          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#A0E8AF] animate-pulse">Establishing Peer-to-Peer Encryption...</p>
                          <p className="text-[10px] font-medium text-text-secondary mt-8 uppercase tracking-widest">Candidate: {connectingCandidate}</p>
                          
                          <div className="mt-12 p-12 bg-white/5 border border-white/10 rounded-2xl">
                             <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary italic">Live Stream API Placeholder</p>
                          </div>
                       </div>

                       <button 
                        onClick={() => setIsVideoConnecting(false)}
                        className="absolute top-8 right-8 p-4 bg-white/5 border border-white/10 rounded-2xl text-text-secondary hover:text-white hover:bg-accent-red hover:border-accent-red transition-all"
                       >
                         <X size={24} />
                       </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Invite Modal */}
              <AnimatePresence>
                {isInviteModalOpen && selectedCandidate && (
                  <div className="fixed inset-0 z-[250] flex items-center justify-center p-6">
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsInviteModalOpen(false)}
                      className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0, y: 20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.9, opacity: 0, y: 20 }}
                      className="relative w-full max-w-xl bg-bg-surface border border-white/10 rounded-[32px] overflow-hidden shadow-2xl"
                    >
                      <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-accent-red/10 rounded-xl text-accent-red">
                             <Mail size={24} />
                          </div>
                          <div>
                             <h4 className="text-xl font-black italic uppercase tracking-tight text-white leading-none">Meeting Invite Template</h4>
                             <p className="text-[8px] font-black uppercase tracking-widest text-text-secondary mt-1">Pre-filled communication stack</p>
                          </div>
                        </div>
                        <button onClick={() => setIsInviteModalOpen(false)} className="p-2 text-text-secondary hover:text-white transition-colors">
                          <X size={20} />
                        </button>
                      </div>

                      <div className="p-8 space-y-6 text-left">
                        <div className="space-y-2">
                           <label className="text-[9px] font-black text-text-secondary uppercase tracking-widest ml-1">Recipient</label>
                           <input 
                            readOnly
                            value={`${selectedCandidate.name} <${selectedCandidate.name.toLowerCase().replace(' ', '.')}@example.com>`}
                            className="w-full bg-white/5 border border-white/5 rounded-xl p-4 text-xs font-bold text-white/50"
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[9px] font-black text-text-secondary uppercase tracking-widest ml-1">Communication Body</label>
                           <textarea 
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-6 text-xs text-white leading-relaxed h-48 focus:border-accent-red/30 transition-all outline-none italic"
                            defaultValue={`Greetings ${selectedCandidate.name},\n\nWe are looking forward to our technical deep-dive scheduled for ${selectedCandidate.time}.\n\nPlease ensure your environment supports the following:\n- Node.js v18+\n- Stable bandwidth for high-fidelity video\n- Access to COS Secure Sandbox\n\nSee you in the waiting room.`}
                           />
                        </div>
                      </div>

                      <div className="p-8 border-t border-white/5 bg-white/[0.01] flex justify-end gap-4">
                        <button 
                          onClick={() => setIsInviteModalOpen(false)}
                          className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-white transition-colors"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={() => setIsInviteModalOpen(false)}
                          className="px-8 py-3 bg-accent-red text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-accent-red/20"
                        >
                          Dispatch Invite Details
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          )}

          {activeTab === 'arenas-hub' && (
            <div className="space-y-12">
              {selectedArena ? (
                <ArenaManager 
                  arena={selectedArena} 
                  onBack={() => setSelectedArena(null)} 
                  currency={currency}
                />
              ) : isCreatingArena ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-bg-surface border border-white/10 p-8 md:p-16 rounded-[50px] shadow-2xl relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-12">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => setIsCreatingArena(false)}
                          className="p-3 rounded-2xl bg-white/5 border border-white/10 text-text-secondary hover:text-white hover:border-accent-red transition-all"
                        >
                          <ArrowLeft size={20} />
                        </button>
                        <div>
                          <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">CONFIGURE NEW ARENA</h3>
                          <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-60 mt-1">Initialize competitive build protocols</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                      {/* Section 1: Core Details */}
                      <div className="space-y-8">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-red flex items-center gap-2">
                          <PlusCircle size={14} /> CORE DETAILS
                        </h4>
                        <div className="space-y-6">
                          <div className="space-y-2 text-left">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary ml-2">Arena Title</label>
                            <input 
                              type="text" 
                              value={arenaForm.title}
                              onChange={(e) => setArenaForm({...arenaForm, title: e.target.value})}
                              placeholder="e.g., AI-Agent Optimization Sprint" 
                              className="w-full bg-[#0A0A0A] border border-[#333] rounded-2xl p-5 outline-none focus:border-accent-red/40 transition-all text-text-primary dark:text-white placeholder:text-text-secondary/20 font-bold uppercase tracking-tight"
                            />
                          </div>
                          <div className="space-y-2 text-left">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary ml-2">Event Type</label>
                            <select 
                              value={arenaForm.type}
                              onChange={(e) => setArenaForm({...arenaForm, type: e.target.value})}
                              className="w-full bg-[#0A0A0A] border border-[#333] rounded-2xl p-5 outline-none focus:border-accent-red/40 transition-all text-text-primary dark:text-white font-bold appearance-none uppercase"
                            >
                              <option value="Public Open-Source Hackathon">Public Open-Source Hackathon</option>
                              <option value="Private Invite-Only Buildathon">Private Invite-Only Buildathon</option>
                            </select>
                          </div>

                          <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary ml-2">Event Mode</label>
                            <div className="flex bg-[#0A0A0A] p-1 rounded-2xl border border-[#333]">
                              {['Online', 'Offline', 'Hybrid'].map((mode) => (
                                <button
                                  key={mode}
                                  onClick={() => setArenaForm({ ...arenaForm, eventMode: mode })}
                                  className={`flex-1 py-3 text-center text-[10px] font-black uppercase tracking-widest transition-all rounded-xl ${
                                    arenaForm.eventMode === mode 
                                      ? 'bg-accent-red text-white shadow-lg shadow-accent-red/20' 
                                      : 'text-text-secondary hover:text-white'
                                  }`}
                                >
                                  {mode}
                                </button>
                              ))}
                            </div>

                            <AnimatePresence>
                              {arenaForm.eventMode !== 'Online' && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                  animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="mt-4 p-4 rounded-lg bg-[#1A1A1A] border border-[#333] text-sm text-gray-300 flex items-center gap-3">
                                    <span>📍 Venue sourcing and physical logistics will be managed automatically by the Capital of Skills network.</span>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Rules of Engagement */}
                      <div className="space-y-8">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-red flex items-center gap-2">
                          <Trophy size={14} /> RULES OF ENGAGEMENT
                        </h4>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2 text-left text-left">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary ml-2">Start Date</label>
                            <input 
                              type="date" 
                              value={arenaForm.startDate}
                              onChange={(e) => setArenaForm({...arenaForm, startDate: e.target.value})}
                              className="w-full bg-[#0A0A0A] border border-[#333] rounded-2xl p-5 outline-none focus:border-accent-red/40 transition-all text-text-primary dark:text-white font-bold font-mono"
                            />
                          </div>
                          <div className="space-y-2 text-left">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary ml-2">End Date</label>
                            <input 
                              type="date" 
                              value={arenaForm.endDate}
                              onChange={(e) => setArenaForm({...arenaForm, endDate: e.target.value})}
                              className="w-full bg-[#0A0A0A] border border-[#333] rounded-2xl p-5 outline-none focus:border-accent-red/40 transition-all text-text-primary dark:text-white font-bold font-mono"
                            />
                          </div>
                          <div className="space-y-2 text-left col-span-full">
                            <div className="flex items-center justify-between px-2">
                              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Total Prize Pool ({currency})</label>
                              <button 
                                onClick={() => setCurrency(currency === 'USD' ? 'INR' : 'USD')}
                                className="text-[8px] font-black text-accent-red uppercase tracking-widest hover:underline"
                              >
                                Toggle to {currency === 'USD' ? 'INR' : 'USD'}
                              </button>
                            </div>
                            <div className="relative">
                              <span 
                                onClick={() => setCurrency(currency === 'USD' ? 'INR' : 'USD')}
                                className="absolute left-6 top-1/2 -translate-y-1/2 font-mono text-text-secondary cursor-pointer hover:text-accent-red transition-colors"
                              >
                                {currency === 'USD' ? '$' : '₹'}
                              </span>
                              <input 
                                type="number" 
                                value={arenaForm.prizePool}
                                onChange={(e) => setArenaForm({...arenaForm, prizePool: e.target.value})}
                                placeholder={currency === 'USD' ? '50,000' : '40,00,000'} 
                                className="w-full bg-[#0A0A0A] border border-[#333] rounded-2xl p-5 pl-12 outline-none focus:border-accent-red/40 transition-all text-text-primary dark:text-white placeholder:text-text-secondary/20 font-bold font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Target Competencies */}
                      <div className="space-y-8 col-span-full">
                        <div className="flex items-center justify-between">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-red flex items-center gap-2">
                            <Target size={14} /> TARGET COMPETENCIES
                          </h4>
                          <span className="text-[8px] font-black text-text-secondary uppercase">{arenaForm.skills.length} / 5 SKILLS</span>
                        </div>
                        <div className="flex flex-wrap gap-4 p-8 bg-[#0A0A0A] rounded-3xl border border-[#333]">
                          {allSkills.slice(0, 15).map(skill => {
                            const isSelected = arenaForm.skills.includes(skill);
                            return (
                              <button
                                key={skill}
                                onClick={() => {
                                  if (isSelected) {
                                    setArenaForm({...arenaForm, skills: arenaForm.skills.filter(s => s !== skill)});
                                  } else if (arenaForm.skills.length < 5) {
                                    setArenaForm({...arenaForm, skills: [...arenaForm.skills, skill]});
                                  }
                                }}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                                  isSelected 
                                    ? 'bg-accent-red border-accent-red text-white' 
                                    : 'bg-white/5 border-white/10 text-text-secondary hover:text-white hover:border-white/30'
                                }`}
                              >
                                {skill}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        setIsArenaLoading(true);
                        setTimeout(() => {
                          const newArena = {
                            id: Date.now().toString(),
                            ...arenaForm,
                            participants: 0,
                            daysRemaining: Math.ceil((new Date(arenaForm.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) || 30
                          };
                          setArenas([newArena, ...arenas]);
                          setIsArenaLoading(false);
                          setIsCreatingArena(false);
                          setArenaForm({
                            title: '',
                            type: 'Public Open-Source Hackathon',
                            startDate: '',
                            endDate: '',
                            prizePool: '',
                            skills: []
                          });
                        }, 1500);
                      }}
                      disabled={isArenaLoading || !arenaForm.title}
                      className="w-full py-6 bg-accent-red text-white rounded-2xl font-black uppercase tracking-[0.25em] text-xl hover:scale-[1.01] transition-all shadow-[0_20px_50px_rgba(255,31,31,0.2)] disabled:opacity-70 disabled:cursor-wait"
                    >
                      {isArenaLoading ? "DEPLOYING ARENA..." : "INITIALIZE ARENA PROTOCOL"}
                    </button>
                  </div>
                  <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-accent-red/10 blur-[100px] rounded-full" />
                </motion.div>
              ) : (
                <>
                  <div className="bg-bg-surface border border-white/10 p-20 rounded-[50px] text-center relative overflow-hidden shadow-2xl group">
                    <div className="relative z-10 flex flex-col items-center">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-24 h-24 bg-accent-amber/10 border-2 border-accent-amber/20 rounded-[2rem] flex items-center justify-center text-accent-amber mb-10 shadow-[0_0_50px_rgba(245,166,35,0.15)]"
                      >
                        <Trophy size={40} />
                      </motion.div>
                      <h3 className="text-6xl font-black italic uppercase tracking-tighter mb-4 italic text-text-primary dark:text-white leading-none">CAPTURE THE FLAG</h3>
                      <p className="text-text-secondary max-w-xl mx-auto mb-12 font-bold text-lg leading-relaxed opacity-80 uppercase tracking-tight">
                        Host private buildathons or open-source hackathons to sieve through global talent instantly.
                      </p>
                      
                      <button 
                        onClick={() => setIsCreatingArena(true)}
                        className="relative group px-12 py-6 bg-accent-red text-white rounded-2xl font-black uppercase tracking-[0.3em] text-xl transition-all shadow-[0_20px_60px_rgba(255,42,42,0.3)] hover:scale-[1.03]"
                      >
                        <span className="relative z-10">HOST NEW HACKATHON / BUILDATHON</span>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity rounded-2xl" />
                      </button>
                    </div>
                    
                    {/* Animated Light Rays */}
                    <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(245,166,35,0.1),transparent_70%)] animate-pulse" />
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary ml-4 mb-8">ACTIVE ARENAS ({arenas.length})</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       {arenas.map((arena) => (
                         <motion.div 
                           key={arena.id}
                           initial={{ opacity: 0, scale: 0.95 }}
                           animate={{ opacity: 1, scale: 1 }}
                           className="bg-bg-surface border border-white/10 p-8 rounded-[40px] shadow-xl relative overflow-hidden group hover:border-accent-red/30 transition-all"
                         >
                           <div className="relative z-10">
                             <div className="flex justify-between items-start mb-8">
                               <div className="w-12 h-12 bg-accent-red/10 rounded-xl flex items-center justify-center text-accent-red">
                                 <Trophy size={24} />
                               </div>
                               <div className="text-right">
                                 <p className="text-[8px] font-black text-text-secondary uppercase tracking-widest mb-1">PRIZE POOL ({currency})</p>
                                 <p className="text-2xl font-black text-accent-red font-mono">{currency === 'USD' ? '$' : '₹'}{parseFloat(arena.prizePool).toLocaleString()}</p>
                               </div>
                             </div>
                             
                             <h4 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-2">{arena.title}</h4>
                             <p className="text-[10px] font-black text-accent-red uppercase tracking-widest mb-6 opacity-80">{arena.type}</p>
                             
                             <div className="grid grid-cols-2 gap-4 mb-8">
                               <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                 <p className="text-[8px] font-black text-text-secondary uppercase tracking-widest mb-1">PARTICIPANTS</p>
                                 <p className="text-xl font-black font-mono text-white">{arena.participants?.length || 0}</p>
                               </div>
                               <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                 <p className="text-[8px] font-black text-text-secondary uppercase tracking-widest mb-1">ENDS IN</p>
                                 <p className="text-xl font-black font-mono text-white tracking-widest">{arena.endsIn || `${arena.daysRemaining}D`}</p>
                               </div>
                             </div>

                             <div className="flex flex-wrap gap-2 mb-8">
                               {arena.skills.map((s: string) => (
                                 <span key={s} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[8px] font-black uppercase tracking-widest text-text-secondary">
                                   {s}
                                 </span>
                               ))}
                             </div>

                             <button 
                               onClick={() => setSelectedArena(arena)}
                               className="w-full py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-accent-red hover:border-accent-red transition-all"
                             >
                               MANAGE ARENA INTERFACE
                             </button>
                           </div>
                           <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent-red/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                         </motion.div>
                       ))}
                       
                       <div className="bg-bg-surface/40 border border-white/5 border-dashed p-16 rounded-[40px] flex flex-col items-center justify-center text-center opacity-40 h-full">
                          <Terminal size={32} className="text-text-secondary mb-4" />
                          <p className="text-xs font-black uppercase tracking-widest text-text-secondary leading-loose">
                            DEPLOYED ARENA SLOTS: {Math.max(0, 2 - arenas.length)} AVAILABLE<br />
                            AVAILABLE COMPUTE DETECTED
                          </p>
                       </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === 'ecosystem' && (
             <div className="space-y-12">
                {/* Section 1: Talent Lifecycle Metrics (Top Row) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Offers Extended */}
                  <div className="bg-bg-surface border border-white/5 p-8 rounded-[32px] shadow-xl group hover:border-accent-red/30 transition-all">
                    <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] opacity-40 mb-4">Offers Extended</p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-4xl font-black font-mono text-white tracking-tighter">24</span>
                      <div className="p-2 bg-white/5 rounded-xl text-text-secondary">
                        <Briefcase size={20} />
                      </div>
                    </div>
                    <p className="text-[9px] font-bold text-text-secondary uppercase tracking-widest">This Quarter</p>
                  </div>

                  {/* Offer Acceptance Rate */}
                  <div className="bg-bg-surface border border-white/5 p-8 rounded-[32px] shadow-xl group hover:border-accent-deep-green/30 transition-all">
                    <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] opacity-40 mb-4">Offer Acceptance Rate</p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-4xl font-black font-mono text-white tracking-tighter">75%</span>
                      <div className="flex items-center gap-1 text-accent-deep-green bg-accent-deep-green/10 px-2 py-1 rounded-lg">
                        <TrendingUp size={12} />
                        <span className="text-[10px] font-black font-mono">12%</span>
                      </div>
                    </div>
                    <p className="text-[9px] font-bold text-accent-deep-green uppercase tracking-widest flex items-center gap-1.5">
                      Positive Trend
                    </p>
                  </div>

                  {/* Active Interns */}
                  <div className="bg-bg-surface border border-white/5 p-8 rounded-[32px] shadow-xl group hover:border-accent-amber/30 transition-all">
                    <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] opacity-40 mb-4">Active Interns</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl font-black font-mono text-white tracking-tighter">12</span>
                      <div className="p-2 bg-accent-amber/10 rounded-xl text-accent-amber">
                        <Users size={20} />
                      </div>
                    </div>
                    <button 
                      onClick={handleManageCohortClick}
                      className="text-[9px] font-black text-accent-amber uppercase tracking-widest flex items-center gap-1.5 hover:underline cursor-pointer"
                    >
                      Manage Cohort <ExternalLink size={10} />
                    </button>
                  </div>

                  {/* Arena Success Rate */}
                  <div className="bg-bg-surface border border-white/5 p-8 rounded-[32px] shadow-xl group hover:border-accent-red/30 transition-all">
                    <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] opacity-40 mb-4">Arena Success Rate</p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-4xl font-black font-mono text-white tracking-tighter">82%</span>
                      <div className="p-2 bg-accent-red/10 rounded-xl text-accent-red">
                        <Trophy size={20} />
                      </div>
                    </div>
                    <p className="text-[9px] font-bold text-text-secondary uppercase tracking-widest leading-tight">Avg Candidate Completion</p>
                  </div>
                </div>

                {/* Section 2: Traction Visualization (Middle) */}
                <div className="bg-bg-surface border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-10">
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary mb-2">COMMAND CENTER</h4>
                      <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">Profile Impressions</h3>
                    </div>
                    <EcosystemTimeFilter active={ecosystemTimeRange} onChange={setEcosystemTimeRange} />
                  </div>
                  
                  <div className="h-[400px] w-full relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={ECOSYSTEM_TRACTION_DATA[ecosystemTimeRange]}>
                        <defs>
                          <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FF2A2A" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#FF2A2A" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorCloses" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <XAxis 
                          dataKey="name" 
                          stroke="#666" 
                          fontSize={10} 
                          tickLine={false} 
                          axisLine={false} 
                          dy={10}
                        />
                        <YAxis 
                          stroke="#666" 
                          fontSize={10} 
                          tickLine={false} 
                          axisLine={false}
                          tickFormatter={(value) => value >= 1000 ? `${value/1000}k` : value}
                        />
                        <RechartsTooltip 
                          contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333', borderRadius: '12px', fontSize: '10px' }}
                          itemStyle={{ textTransform: 'uppercase', fontWeight: 900 }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="impressions" 
                          stroke="#FF2A2A" 
                          strokeWidth={4}
                          fillOpacity={1} 
                          fill="url(#colorImpressions)" 
                          name="PROFILE IMPRESSIONS"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="profileCloses" 
                          stroke="#FFFFFF" 
                          strokeWidth={2}
                          fillOpacity={1} 
                          fill="url(#colorCloses)" 
                          name="ENGAGEMENTS"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="absolute top-0 right-0 w-96 h-96 bg-accent-red/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                </div>

                {/* Section 3: Operations Hub (Bottom Half) */}
                <div ref={opsHubRef} className="space-y-8">
                  <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/5 w-fit">
                    <button 
                      onClick={() => setEcosystemOpsTab('pipeline')}
                      className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        ecosystemOpsTab === 'pipeline' ? 'bg-accent-red text-white shadow-lg shadow-accent-red/20' : 'text-text-secondary hover:text-white'
                      }`}
                    >
                      Talent Pipeline
                    </button>
                    <button 
                      onClick={() => setEcosystemOpsTab('arenas')}
                      className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        ecosystemOpsTab === 'arenas' ? 'bg-accent-red text-white shadow-lg shadow-accent-red/20' : 'text-text-secondary hover:text-white'
                      }`}
                    >
                      Arena Analytics
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    {ecosystemOpsTab === 'pipeline' ? (
                      <motion.div 
                        key="pipeline-tab"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-bg-surface border border-white/5 rounded-[40px] shadow-2xl overflow-hidden"
                      >
                        <div className="p-8 md:p-12 border-b border-white/5 bg-white/[0.01]">
                          <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">Offers & Interns</h3>
                          <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary mt-2 opacity-60">Manage active recruitment cycles and deployment stages</p>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left">
                            <thead>
                              <tr className="border-b border-white/5">
                                <th className="px-12 py-6 text-[10px] font-black uppercase tracking-widest text-text-secondary">Candidate Name</th>
                                <th className="px-12 py-6 text-[10px] font-black uppercase tracking-widest text-text-secondary">Target Role</th>
                                <th className="px-12 py-6 text-[10px] font-black uppercase tracking-widest text-text-secondary text-center">Offer Status</th>
                                <th className="px-12 py-6 text-[10px] font-black uppercase tracking-widest text-text-secondary text-center">Intern Status</th>
                                <th className="px-12 py-6 text-[10px] font-black uppercase tracking-widest text-text-secondary text-right">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {PIPELINE_OFFERS_DATA.map((candidate) => (
                                <tr key={candidate.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                                  <td className="px-12 py-8 font-black text-white uppercase">{candidate.name}</td>
                                  <td className="px-12 py-8">
                                    <span className="text-[10px] font-bold text-text-secondary uppercase">{candidate.role}</span>
                                  </td>
                                  <td className="px-12 py-8 text-center">
                                    <span className={`px-4 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-[0.1em] border ${
                                      candidate.offerStatus === 'Accepted' ? 'bg-accent-deep-green/5 text-accent-deep-green border-accent-deep-green/20' :
                                      candidate.offerStatus === 'Rejected' ? 'bg-accent-red/5 text-accent-red border-accent-red/20' :
                                      'bg-accent-amber/5 text-accent-amber border-accent-amber/20'
                                    }`}>
                                      {candidate.offerStatus}
                                    </span>
                                  </td>
                                  <td className="px-12 py-8 text-center">
                                    <span className={`px-4 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-[0.1em] border ${
                                      candidate.internStatus === 'Active' ? 'bg-accent-deep-green/5 text-accent-deep-green border-accent-deep-green/20' : 
                                      candidate.internStatus === 'Completed' ? 'bg-accent-slate/10 text-white border-white/10' :
                                      'bg-white/5 text-text-secondary border-white/5'
                                    }`}>
                                      {candidate.internStatus === 'Rejected' ? 'Not Started' : candidate.internStatus}
                                    </span>
                                  </td>
                                  <td className="px-12 py-8 text-right">
                                    <button 
                                      onClick={() => setManagingCandidate(candidate)}
                                      className="px-5 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-white hover:bg-accent-red hover:border-accent-red transition-all shadow-xl"
                                    >
                                      Manage
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="arenas-tab"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-8"
                      >
                        {/* Arena Analytics Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          <div className="bg-[#1A1A1A] border border-white/5 p-8 rounded-[32px] shadow-xl group hover:border-accent-red/20 transition-all">
                            <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] opacity-40 mb-4">Total Arenas Hosted</p>
                            <div className="flex items-end justify-between">
                              <span className="text-4xl font-black font-mono text-white">08</span>
                              <div className="p-3 bg-accent-red/10 rounded-xl text-accent-red group-hover:scale-110 transition-transform">
                                <Trophy size={20} />
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-[#1A1A1A] border border-white/5 p-8 rounded-[32px] shadow-xl group hover:border-accent-amber/20 transition-all">
                            <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] opacity-40 mb-4">Avg Participant Score</p>
                            <div className="flex items-end justify-between">
                              <span className="text-4xl font-black font-mono text-white">88.4</span>
                              <div className="p-3 bg-accent-amber/10 rounded-xl text-accent-amber group-hover:scale-110 transition-transform">
                                <Activity size={20} />
                              </div>
                            </div>
                          </div>

                          <div className="bg-[#1A1A1A] border border-white/5 p-8 rounded-[32px] shadow-xl group hover:border-accent-deep-green/20 transition-all">
                            <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] opacity-40 mb-4">Top Discovered Skill</p>
                            <div className="flex items-end justify-between">
                              <span className="text-4xl font-black font-mono text-accent-deep-green tracking-tighter">React</span>
                              <div className="p-3 bg-accent-deep-green/10 rounded-xl text-accent-deep-green group-hover:scale-110 transition-transform">
                                <Zap size={20} />
                              </div>
                            </div>
                          </div>

                          <div className="bg-[#1A1A1A] border border-white/5 p-8 rounded-[32px] shadow-xl group hover:border-accent-slate/50 transition-all">
                            <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] opacity-40 mb-4">Avg Time-to-Hire</p>
                            <div className="flex items-end justify-between">
                              <span className="text-4xl font-black font-mono text-white">12D</span>
                              <div className="p-3 bg-white/5 rounded-xl text-text-secondary group-hover:scale-110 transition-transform">
                                <Clock size={20} />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Event Performance Logs Table */}
                        <div className="bg-bg-surface border border-white/5 rounded-[40px] shadow-2xl overflow-hidden">
                          <div className="p-8 md:p-12 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
                            <div>
                              <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">Event Performance Logs</h3>
                              <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary mt-2 opacity-60">Deep metrics across historical arena hosting</p>
                            </div>
                            <button 
                              onClick={handleExportReport}
                              disabled={isExporting}
                              className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-white transition-all flex items-center gap-2 min-w-[140px] justify-center"
                            >
                              {isExporting ? (
                                <>
                                  <Loader2 size={14} className="animate-spin" />
                                  EXPORTING...
                                </>
                              ) : (
                                'Export Report'
                              )}
                            </button>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left">
                              <thead>
                                <tr className="border-b border-white/5">
                                  <th className="px-12 py-6 text-[10px] font-black uppercase tracking-widest text-text-secondary">Arena Name</th>
                                  <th className="px-12 py-6 text-[10px] font-black uppercase tracking-widest text-text-secondary">Turnout</th>
                                  <th className="px-12 py-6 text-[10px] font-black uppercase tracking-widest text-text-secondary">Success Rate</th>
                                  <th className="px-12 py-6 text-[10px] font-black uppercase tracking-widest text-text-secondary">Candidate Hires</th>
                                  <th className="px-12 py-6 text-[10px] font-black uppercase tracking-widest text-text-secondary text-right">Deep Dive</th>
                                </tr>
                              </thead>
                              <tbody>
                                {INDIVIDUAL_ARENA_STATS.map((stat, idx) => (
                                  <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-12 py-8 font-black text-white uppercase">{stat.name}</td>
                                    <td className="px-12 py-8 font-mono text-white/60">{stat.turnout}</td>
                                    <td className="px-12 py-8 font-mono text-accent-red font-black">{stat.successRate}</td>
                                    <td className="px-12 py-8 font-mono text-white/80">{stat.hires}</td>
                                    <td className="px-12 py-8 text-right">
                                      <button 
                                        onClick={() => handleDeepDive(stat)}
                                        className="p-3 bg-white/5 border border-white/10 rounded-xl text-text-secondary hover:text-white hover:bg-accent-red/20 transition-all"
                                      >
                                        <ArrowUpRight size={16} />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
             </div>
          )}

          {activeTab === 'subscription' && <SubscriptionView />}
        </motion.div>
      </div>

      {/* Cosine Profile Modals */}
      <AnimatePresence>
        {isSkillSelectorOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-[#0A0A0A] flex flex-col w-screen h-screen"
          >
            {/* Header */}
            <div className="py-4 px-8 md:px-12 border-b border-[#333] shrink-0 bg-[#0A0A0A] z-[310] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-white">Select Required Skills</h3>
                  <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-text-secondary opacity-60 mt-1">Define project-critical technical competencies from global library</p>
                </div>
                <button 
                  onClick={() => setIsSkillSelectorOpen(false)}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white transition-all hover:bg-accent-red/20 shadow-2xl"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Search Moved to Fixed Header Area */}
              <div className="relative max-w-7xl mx-auto w-full">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-accent-red" size={20} />
                <input 
                  type="text" 
                  value={skillSearch}
                  onChange={(e) => setSkillSearch(e.target.value)}
                  placeholder="SEARCH GLOBAL SKILL LIBRARY (e.g. RUST, REACT, PYTORCH)..." 
                  className="w-full bg-[#1A1A1A] border-2 border-white/5 p-4 pl-16 rounded-[24px] outline-none focus:border-accent-red/40 transition-all font-black uppercase tracking-[0.2em] text-xs placeholder:opacity-20 shadow-2xl shadow-black/40"
                />
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12 md:pt-16 custom-selector-scrollbar
              [&::-webkit-scrollbar]:w-1.5
              [&::-webkit-scrollbar-track]:bg-[#0A0A0A]
              [&::-webkit-scrollbar-thumb]:bg-[#333]
              [&::-webkit-scrollbar-thumb]:rounded-full
              hover:[&::-webkit-scrollbar-thumb]:bg-accent-red/50
            ">
              <style>
                {`
                  .custom-selector-scrollbar {
                    scrollbar-gutter: stable;
                  }
                `}
              </style>
              <div className="max-w-7xl mx-auto space-y-16 pb-32">
                {/* Skill Grid Grouped */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-16">
                  {SKILL_CATEGORIES.map(cat => {
                    const filteredTags = cat.tags.filter(t => t.toLowerCase().includes(skillSearch.toLowerCase()));
                    if (filteredTags.length === 0) return null;
                    
                    return (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={cat.name} 
                        className="space-y-8"
                      >
                        <div className="flex items-center gap-4">
                          <h4 className="text-[12px] font-black uppercase tracking-[0.4em] text-accent-red italic block mt-2">{cat.name}</h4>
                          <div className="flex-1 h-px bg-white/10" />
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {filteredTags.map(tag => {
                            const isStaged = stagedSkills.find(s => s.name === tag);
                            return (
                              <button 
                                key={tag}
                                onClick={() => handleSkillToggle(tag)}
                                className={`px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border-2 ${
                                  isStaged 
                                  ? 'bg-accent-red border-accent-red text-white shadow-[0_0_30px_rgba(255,42,42,0.3)] scale-105' 
                                  : 'bg-white/[0.03] border-white/5 text-text-secondary hover:border-white/20 hover:text-white hover:bg-white/10'
                                }`}
                              >
                                {tag}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Docked Footer (Staging Area) */}
            <div className="shrink-0 bg-[#1A1A1A] border-t border-[#333] py-4 px-8 md:px-12 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-30">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                  
                  {/* Proficiency Selection Area */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-accent-red animate-pulse" />
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">PROWESS CONFIGURATION GRID</h4>
                      </div>
                      <span className="text-[9px] font-black text-accent-red px-2 py-0.5 bg-accent-red/10 border border-accent-red/20 rounded-full tracking-widest uppercase">
                        {stagedSkills.length} SKILLS TARGETED
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-3 min-h-[60px] p-4 bg-black/40 border border-white/5 rounded-[24px] overflow-hidden">
                      <AnimatePresence>
                        {stagedSkills.length > 0 ? (
                          stagedSkills.map(s => (
                            <motion.div 
                              layout
                              initial={{ opacity: 0, scale: 0.9, x: -10 }}
                              animate={{ opacity: 1, scale: 1, x: 0 }}
                              exit={{ opacity: 0, scale: 0.8, y: 10 }}
                              key={s.name} 
                              className="flex items-center gap-2 bg-[#0A0A0A] pr-1 rounded-xl border border-white/10 overflow-hidden shadow-xl"
                            >
                              <span className="pl-4 py-2.5 text-[10px] font-black uppercase tracking-tight text-white border-r border-white/10 bg-white/5">{s.name}</span>
                              <select 
                                value={s.level}
                                onChange={(e) => updateStagedSkillLevel(s.name, e.target.value)}
                                className="bg-transparent text-[9px] font-black uppercase tracking-tight text-accent-red p-1.5 px-3 outline-none cursor-pointer hover:text-white transition-colors"
                              >
                                {SKILL_PROFICIENCIES.map(p => (
                                  <option key={p} value={p} className="bg-[#0A0A0A] text-white p-4">{p}</option>
                                ))}
                              </select>
                              <button 
                                onClick={() => handleSkillToggle(s.name)}
                                className="p-2.5 text-text-secondary hover:text-accent-red transition-colors"
                              >
                                <X size={14} />
                              </button>
                            </motion.div>
                          ))
                        ) : (
                          <div className="w-full flex items-center justify-center opacity-30 py-2">
                             <p className="text-[10px] font-black uppercase tracking-[0.3em] italic text-center">Awaiting library selections to calibrate proficiency levels...</p>
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Terminal Actions */}
                  <div className="flex items-center gap-3 shrink-0 lg:flex-col lg:justify-center">
                    <button 
                      onClick={() => setStagedSkills([])}
                      disabled={stagedSkills.length === 0}
                      className="flex-1 lg:w-40 py-4 border border-white/10 text-text-secondary hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      CLEAR STAGE
                    </button>
                    <button 
                      onClick={confirmSkills}
                      disabled={stagedSkills.length === 0}
                      className="flex-[2] lg:w-40 py-4 bg-accent-red text-white rounded-xl text-[11px] font-black uppercase tracking-[0.2em] shadow-[0_10px_40px_rgba(255,42,42,0.3)] hover:scale-[1.03] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
                    >
                      CALIBRATE ROLE <ArrowUpRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {selectedCosine && !showFullPortfolio && (
          <TalentProfileModal 
            cosine={selectedCosine} 
            selectedSkills={radarFilters.skills}
            onClose={() => setSelectedCosine(null)} 
            onOpenFull={() => setShowFullPortfolio(true)}
          />
        )}
        {selectedCosine && showFullPortfolio && (
          <FullPortfolioView cosine={selectedCosine} onClose={() => setShowFullPortfolio(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

const NavButton: React.FC<{ expanded?: boolean; active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ expanded = true, active, onClick, icon, label }) => {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center p-5 rounded-2xl transition-all duration-300 group relative ${
        expanded ? 'gap-4 w-full' : 'justify-center w-14 h-14 mx-auto mb-2'
      } ${
        active 
          ? 'bg-accent-red text-white shadow-[0_10px_30px_rgba(255,31,31,0.25)]' 
          : 'text-text-secondary hover:bg-white/5 hover:text-white'
      }`}
      title={!expanded ? label : undefined}
    >
      <div className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
        {icon}
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="font-black text-xs uppercase tracking-widest leading-tight text-left"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
      {active && (
        <motion.div 
          layoutId="tabIndicator"
          className={`absolute bg-white rounded-full ${
            expanded ? 'left-1.5 w-1 h-1/2 translate-y-[-50%] top-1/2' : 'bottom-1.5 h-1 w-1/2 translate-x-[-50%] left-1/2'
          }`}
        />
      )}
    </button>
  );
}

const TalentCard: React.FC<{ cosine: Cosine; index: number; selectedSkills: string[]; onClick: () => void }> = ({ cosine, index, selectedSkills, onClick }) => {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (cosine.cosCred / 10) * circumference;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.01 }}
      onClick={onClick}
      className="bg-bg-surface border border-border-custom p-8 rounded-3xl cursor-pointer group hover:border-accent-red/20 transition-all shadow-xl h-full flex flex-col"
    >
      <div className="flex items-start justify-between mb-8">
        <div className="flex flex-col gap-4">
          <div className="w-14 h-14 rounded-full bg-bg-secondary border border-border-custom flex items-center justify-center text-text-secondary shadow-inner group-hover:bg-accent-red group-hover:text-white transition-all duration-500">
            <User size={28} />
          </div>
          <div>
            <h4 
              style={{ color: '#288a74' }}
              className="font-black text-xl uppercase tracking-tight group-hover:opacity-80 transition-all duration-300"
            >
              {cosine.name}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <GraduationCap size={12} className="text-accent-red opacity-60" />
              <span className="text-[9px] font-black uppercase tracking-widest text-text-secondary opacity-65">{cosine.university}</span>
            </div>
            
            {cosine.suggestedRoles && cosine.suggestedRoles.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {cosine.suggestedRoles.map((role, rIdx) => (
                  <div key={rIdx} className="flex items-center gap-1.5 px-2.5 py-1 bg-accent-red/10 border border-accent-red/20 rounded-md">
                    <Briefcase size={10} className="text-accent-red" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-accent-red">{role}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Circular COS CRED Gauge */}
        <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
          <div className="absolute inset-0 bg-accent-red/5 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <svg className="w-full h-full -rotate-90 overflow-visible relative z-10" viewBox="0 0 64 64">
            <circle 
              className="text-text-secondary/10" 
              strokeWidth="5" 
              stroke="currentColor" 
              fill="transparent" 
              r={radius} 
              cx="32" 
              cy="32" 
            />
            <motion.circle 
              className="text-accent-red" 
              strokeWidth="5" 
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ delay: index * 0.1, duration: 1.5, ease: "circOut" }}
              strokeLinecap="round"
              stroke="currentColor" 
              fill="transparent" 
              r={radius} 
              cx="32" 
              cy="32" 
              filter="drop-shadow(0 0 2px rgba(255, 42, 42, 0.3))"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center leading-none z-20">
            <span 
              style={{ color: '#ff1a1a' }}
              className="text-[14px] font-mono font-black group-hover:scale-110 transition-transform duration-300"
            >
              {cosine.cosCred}
            </span>
            <span className="text-[6px] font-black uppercase text-accent-red tracking-widest mt-0.5 opacity-80 group-hover:opacity-100">CRED</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-wrap gap-2 mb-8">
        {cosine.skills.map((skill, sIdx) => {
          const skillName = typeof skill === 'string' ? skill : skill.name;
          const isHighlighted = selectedSkills.includes(skillName);
          return (
            <span 
              key={sIdx} 
              className={`px-3 py-1 border text-[8px] font-black uppercase tracking-widest rounded-lg transition-all ${
                isHighlighted 
                ? 'bg-accent-red text-white border-accent-red shadow-[0_0_10px_rgba(255,31,31,0.3)] scale-110 z-10' 
                : 'bg-accent-amber/20 dark:bg-white/5 border-accent-amber/30 dark:border-white/5 text-accent-slate dark:text-text-secondary group-hover:border-accent-red/20'
              }`}
            >
              {skillName}
            </span>
          );
        })}
      </div>

      <div className="pt-6 border-t border-border-custom flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[8px] text-text-secondary font-black uppercase tracking-widest opacity-60">PROOFS</span>
          <span className="font-mono text-xs font-black text-text-primary">{cosine.gigCount} GIGS</span>
        </div>
        <div className="w-8 h-8 rounded-lg bg-bg-secondary border border-border-custom flex items-center justify-center text-text-secondary group-hover:bg-accent-red group-hover:text-white transition-all shadow-lg">
          <ArrowUpRight size={14} />
        </div>
      </div>
    </motion.div>
  );
}

function EcosystemTimeFilter({ active, onChange }: { active: string, onChange: (val: string) => void }) {
  return (
    <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/5">
      {['7D', '30D', 'YTD'].map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
            active === t ? 'bg-accent-red text-white shadow-lg shadow-accent-red/20' : 'text-text-secondary hover:text-white'
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

function ArenaManager({ arena, onBack, currency }: { arena: any, onBack: () => void, currency: string }) {
  const [activeTab, setActiveTab] = useState<'traction' | 'planning' | 'submissions' | 'leaderboard'>(
    arena.status === 'Completed' ? 'leaderboard' : 'traction'
  );

  const participants = arena.participants || [];

  const submissions = [
    { id: 's1', project: 'Z-Protocol Escrow', team: ['Arjun Mehta', 'Sarah J.'], tech: ['Solidity', 'React'], status: 'Unreviewed' },
    { id: 's2', project: 'Slop Filter AI', team: ['Kenji Sato'], tech: ['Python', 'OpenAI'], status: 'Reviewed' },
    { id: 's3', project: 'Campus Social Kit', team: ['Elena R.', 'David C.'], tech: ['Firebase', 'React'], status: 'Unreviewed' },
  ];

  const tractionStats = {
    dailyActive: 84,
    pageViews: "4.2K",
    conversion: "28%",
    growth: "+12%"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-12"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-white transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Arenas Hub
          </button>
          <div className="space-y-2">
            <h3 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white leading-none flex items-center gap-4">
              {arena.title} 
              <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${
                arena.status === 'Completed' ? 'bg-white/5 border-white/10 text-text-secondary' : 'bg-accent-red/10 border-accent-red/20 text-accent-red'
              }`}>
                {arena.status?.toUpperCase() || 'ACTIVE'}
              </span>
            </h3>
            <div className="flex flex-wrap items-center gap-6">
               <div className="flex items-center gap-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Prize Pool:</p>
                  <p className="text-sm font-black text-white font-mono">{currency === 'USD' ? '$' : '₹'}{parseFloat(arena.prizePool).toLocaleString()}</p>
               </div>
               <div className="h-1 w-1 rounded-full bg-white/20" />
               <div className="flex items-center gap-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Time Left:</p>
                  <p className="text-sm font-black text-white font-mono">{arena.status === 'Completed' ? 'CLOSED' : (arena.endsIn || `${arena.daysRemaining}D`)}</p>
               </div>
               <div className="h-1 w-1 rounded-full bg-white/20" />
               <div className="flex items-center gap-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Capacity:</p>
                  <p className="text-sm font-black text-white font-mono">{arena.participants?.length || 0} / 500</p>
               </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/5 overflow-x-auto no-scrollbar">
           {['traction', 'planning', 'submissions', 'leaderboard'].map((tab) => (
             <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'bg-accent-red text-white shadow-lg shadow-accent-red/20' : 'text-text-secondary hover:text-white'}`}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      {activeTab === 'traction' && (
        <div className="space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Daily Active Hackers', val: tractionStats.dailyActive, icon: <Users size={16} />, color: 'text-accent-red' },
                { label: 'Page Views', val: tractionStats.pageViews, icon: <Activity size={16} />, color: 'text-white' },
                { label: 'Submission Rate', val: tractionStats.conversion, icon: <CheckCircle2 size={16} />, color: 'text-accent-deep-green' },
                { label: 'Viral Growth', val: tractionStats.growth, icon: <Zap size={16} />, color: 'text-accent-amber' },
              ].map((s, i) => (
                <div key={i} className="bg-[#1A1A1A] border border-white/5 p-8 rounded-[32px] flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <p className="text-[9px] font-black text-text-secondary uppercase tracking-widest opacity-40">{s.label}</p>
                    <div className={`${s.color} opacity-40`}>{s.icon}</div>
                  </div>
                  <span className={`text-4xl font-black font-mono ${s.color}`}>{s.val}</span>
                </div>
              ))}
           </div>

           <div className="bg-[#1A1A1A] border border-white/5 p-8 rounded-[40px] h-[300px] flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-accent-red/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-center relative z-10">
                 <Terminal size={32} className="mx-auto mb-4 text-text-secondary/40" />
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary">Active Traffic Analysis Terminal</p>
                 <p className="text-[9px] font-bold text-accent-red mt-2 uppercase tracking-widest">Awaiting full telemetry stream...</p>
                 
                 {/* Decorative chart-like lines */}
                 <div className="mt-8 flex items-end justify-center gap-2 h-16">
                    {[40, 70, 45, 90, 65, 80, 50, 95, 30].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.05, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                        className="w-1.5 bg-accent-red/20 rounded-t-sm"
                      />
                    ))}
                 </div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'planning' && (
        <div className="bg-[#1A1A1A] border border-white/5 rounded-[40px] p-12 overflow-hidden shadow-2xl">
           <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary mb-12">ARENA LOGISTICS ENGINE</h4>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                 <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-text-secondary ml-2">Verification Protocol</label>
                    <div className="flex gap-4">
                       <button className="flex-1 p-4 bg-accent-red/10 border border-accent-red text-accent-red rounded-xl text-[10px] font-black uppercase tracking-widest">Proof-of-Work</button>
                       <button className="flex-1 p-4 bg-white/5 border border-white/5 text-text-secondary rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-white/20 transition-all">Manual Review</button>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <label className="text-[9px] font-black uppercase tracking-widest text-text-secondary ml-2">Extend Deadline</label>
                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                       <Clock size={16} className="text-text-secondary" />
                       <input type="date" className="bg-transparent border-none outline-none text-white text-xs font-black font-mono w-full" defaultValue="2026-05-18" />
                    </div>
                 </div>
              </div>
              <div className="space-y-8">
                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-text-secondary ml-2">Sponsorship Nodes</label>
                    <div className="p-6 border-2 border-white/5 border-dashed rounded-3xl text-center">
                       <PlusCircle size={24} className="mx-auto mb-3 text-text-secondary opacity-30" />
                       <p className="text-[9px] font-black uppercase tracking-widest text-text-secondary opacity-40">Inject New Sponsor Data</p>
                    </div>
                 </div>
                 <button className="w-full py-5 bg-white text-black rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-[1.02] transition-all">
                    COMMIT CHANGES TO CHAIN
                 </button>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'submissions' && (
        <div className="space-y-8">
           <div className="flex items-center justify-between px-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary">REGISTRY OF BUILDS ({submissions.length})</h4>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent-red hover:underline">
                 Download All Metadata <ArrowUpRight size={14} />
              </button>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {submissions.map((s) => (
                <div key={s.id} className="bg-[#1A1A1A] border border-white/5 p-10 rounded-[40px] flex flex-col h-full group hover:border-accent-red/30 transition-all">
                  <div className="flex items-center justify-between mb-8">
                     <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-accent-red border border-white/5 group-hover:border-accent-red/30 transition-all">
                        <Terminal size={24} />
                     </div>
                     <span className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest ${s.status === 'Reviewed' ? 'bg-accent-deep-green/10 text-accent-deep-green' : 'bg-white/5 text-text-secondary'}`}>
                        {s.status}
                     </span>
                  </div>
                  <h5 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-4 line-clamp-1">{s.project}</h5>
                  <div className="space-y-4 flex-1">
                     <div className="flex flex-wrap gap-2">
                        {s.tech.map(t => (
                          <span key={t} className="px-2 py-0.5 bg-white/5 rounded text-[8px] font-black uppercase tracking-widest text-text-secondary">{t}</span>
                        ))}
                     </div>
                     <div className="pt-4 border-t border-white/5">
                        <p className="text-[8px] font-black text-text-secondary uppercase tracking-widest mb-2 opacity-50">Contributors</p>
                        <div className="flex -space-x-2">
                           {s.team.map((m, i) => (
                             <div key={i} className="w-8 h-8 rounded-full bg-accent-red border-2 border-[#1A1A1A] flex items-center justify-center text-[10px] font-black text-white" title={m}>
                               {m[0]}
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>
                  <button className="mt-10 w-full py-4 bg-accent-red text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_10px_30px_rgba(255,42,42,0.2)]">
                     EVALUATE BUILD
                  </button>
                </div>
              ))}
           </div>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="bg-[#1A1A1A] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
          <div className="p-8 md:p-12 border-b border-white/5 flex items-center justify-between">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary">VERIFIED HACKER STANDINGS</h4>
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-40">
              <span className="flex items-center gap-1.5"><ShieldCheck size={12} /> Rubric Calibrated</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-12 py-6 text-[10px] font-black uppercase tracking-widest text-text-secondary">Rank</th>
                  <th className="px-12 py-6 text-[10px] font-black uppercase tracking-widest text-text-secondary">Participant</th>
                  <th className="px-12 py-6 text-[10px] font-black uppercase tracking-widest text-text-secondary">Tech Score</th>
                  <th className="px-12 py-6 text-[10px] font-black uppercase tracking-widest text-text-secondary">Design Score</th>
                  <th className="px-12 py-6 text-[10px] font-black uppercase tracking-widest text-text-secondary">Final Score</th>
                  <th className="px-12 py-6 text-[10px] font-black uppercase tracking-widest text-text-secondary text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((p) => (
                  <tr key={p.rank} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                    <td className="px-12 py-8 font-mono text-2xl font-black italic">
                      <span className={p.color}>#{p.rank.toString().padStart(2, '0')}</span>
                    </td>
                    <td className="px-12 py-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center font-black text-xs text-text-secondary group-hover:border-accent-red group-hover:text-white transition-all">
                          {p.avatar}
                        </div>
                        <div>
                          <p className="font-black text-white uppercase tracking-tight">{p.name}</p>
                          <p className="text-[8px] font-black text-text-secondary uppercase tracking-[0.2em] mt-1">Status: {p.status}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-12 py-8">
                       <span className="font-mono font-black text-text-secondary">{p.tech.toFixed(1)}</span>
                    </td>
                    <td className="px-12 py-8">
                       <span className="font-mono font-black text-text-secondary">{p.design.toFixed(1)}</span>
                    </td>
                    <td className="px-12 py-8">
                      <span className="text-xl font-black font-mono text-white tracking-tighter">{p.score}</span>
                    </td>
                    <td className="px-12 py-8 text-right">
                      <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-text-secondary hover:text-white hover:bg-accent-red transition-all">
                        <ArrowUpRight size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-8 md:p-12 bg-white/[0.01] flex items-center justify-center border-t border-white/5">
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary opacity-30">ENCRYPTED STANDINGS LOG // END_OF_DATA</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}

const AccordionSection = ({ title, isOpen, onToggle, children, icon }: { title: string, isOpen: boolean, onToggle: () => void, children: React.ReactNode, icon: React.ReactNode }) => {
  return (
    <div className="px-5 py-2 hover:bg-white/[0.02] transition-colors">
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg transition-colors ${isOpen ? 'bg-accent-red/10 text-accent-red' : 'bg-white/5 text-text-secondary'}`}>
            {icon}
          </div>
          <span className={`text-[11px] font-black uppercase tracking-widest transition-colors ${isOpen ? 'text-white' : 'text-text-secondary group-hover:text-white'}`}>
            {title}
          </span>
        </div>
        <ChevronRight size={14} className={`text-text-secondary transition-transform duration-300 ${isOpen ? 'rotate-90 text-accent-red' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {children}
            <div className="h-6" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ToggleField = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (val: boolean) => void }) => (
  <div className="flex items-center justify-between group cursor-pointer" onClick={() => onChange(!checked)}>
    <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary group-hover:text-white transition-colors">{label}</span>
    <div className={`w-10 h-5 rounded-full relative transition-colors ${checked ? 'bg-accent-red' : 'bg-white/10'}`}>
      <motion.div 
        animate={{ x: checked ? 20 : 2 }}
        className="absolute top-1 left-0 w-3 h-3 bg-white rounded-full shadow-sm"
      />
    </div>
  </div>
);

const RangeSlider = ({ label, min, max, step = 1, value, onChange, unit }: { label: string, min: number, max: number, step?: number, value: number, onChange: (val: number) => void, unit: string }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">{label}</label>
      <span className="font-mono font-black text-accent-red text-[11px]">{value}{unit}</span>
    </div>
    <div className="relative h-6 flex items-center">
      <input 
        type="range" 
        min={min} 
        max={max} 
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-accent-red h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
      />
    </div>
  </div>
);

function TalentProfileModal({ cosine, selectedSkills, onClose, onOpenFull }: { cosine: Cosine, selectedSkills: string[], onClose: () => void, onOpenFull: () => void }) {
  const [isArenaDeepDiveOpen, setIsArenaDeepDiveOpen] = useState(false);
  const breakdown = cosine.scoreBreakdown || { identity: 9.0, skill: 8.5, social: 8.0, activity: 8.5 };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-bg-primary/90 backdrop-blur-xl" 
        onClick={onClose} 
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-bg-surface border border-white/10 p-8 md:p-16 rounded-[40px] shadow-[0_0_100px_rgba(255,31,31,0.15)] scrollbar-hide"
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-3 rounded-full glass hover:bg-accent-red hover:text-white transition-all shadow-lg z-50">
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-16 relative z-10">
          <div className="w-32 h-32 rounded-3xl bg-bg-secondary border-2 border-white/5 flex items-center justify-center text-text-secondary shadow-2xl relative overflow-hidden group flex-shrink-0">
            <User size={64} className="group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-accent-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          <div className="text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
              <h3 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter text-text-primary dark:text-white leading-none">{cosine.name}</h3>
              <div className="px-3 py-1 bg-accent-deep-green/10 border border-accent-deep-green/20 text-accent-deep-green text-[10px] font-black rounded-lg uppercase tracking-widest">VERIFIED</div>
            </div>
            
            <p className="text-text-secondary font-bold text-xl uppercase tracking-widest opacity-60 flex items-center justify-center md:justify-start gap-3 mb-6">
              <GraduationCap size={24} className="text-accent-red" /> {cosine.university}
            </p>

            {cosine.suggestedRoles && cosine.suggestedRoles.length > 0 && (
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-8">
                {cosine.suggestedRoles.map((role, rIdx) => (
                  <div key={rIdx} className="flex items-center gap-2 px-3 py-1.5 bg-accent-red/10 border border-accent-red/20 rounded-xl">
                    <Briefcase size={14} className="text-accent-red" />
                    <span className="text-xs font-black uppercase tracking-widest text-accent-red">{role}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-8">
              <div className="glass bg-white/5 px-6 py-3 rounded-2xl border border-white/10 flex flex-col min-w-[120px]">
                <span className="text-[8px] text-text-secondary font-black uppercase tracking-widest mb-1 opacity-50">COS CRED</span>
                <span className="text-2xl font-black font-mono text-accent-red">{cosine.cosCred}<span className="text-sm">/10</span></span>
              </div>
              <div className="glass bg-white/5 px-6 py-3 rounded-2xl border border-white/10 flex flex-col min-w-[120px]">
                <span className="text-[8px] text-text-secondary font-black uppercase tracking-widest mb-1 opacity-50">VERIFIED GIGS</span>
                <span className="text-2xl font-black font-mono text-black dark:text-white">{cosine.gigCount}</span>
              </div>
              {cosine.portfolioUrl && (
                <button 
                  onClick={onOpenFull}
                  className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-accent-red hover:border-accent-red transition-all flex items-center gap-2"
                >
                  Examine Full Dossier <ArrowUpRight size={14} />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              {cosine.skills.map((skill, sIdx) => {
                const sName = typeof skill === 'string' ? skill : skill.name;
                const isMatch = selectedSkills.includes(sName);
                return (
                  <span 
                    key={sIdx} 
                    className={`px-3 py-1 border text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${
                      isMatch 
                      ? 'bg-accent-red text-white border-accent-red shadow-[0_0_15px_rgba(255,31,31,0.4)] scale-110' 
                      : 'bg-white/5 border-white/10 text-text-secondary opacity-60'
                    }`}
                  >
                    {sName}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
          <div className="space-y-12">
            <section>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-red mb-8 flex items-center gap-3">
                <Terminal size={14} /> PROOF OF BUILD
              </h4>
              <div className="space-y-6">
                {cosine.projects && cosine.projects.length > 0 ? (
                  cosine.projects.map(project => (
                    <div key={project.id} className="p-8 bg-bg-secondary border border-white/5 rounded-3xl group cursor-pointer hover:border-accent-red/30 transition-all shadow-xl">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                            <Zap size={20} className="text-accent-red" />
                          </div>
                          <h5 className="text-xl font-black uppercase tracking-tight">{project.name}</h5>
                        </div>
                        <div className="text-right">
                          <p className="text-[8px] text-text-secondary font-black uppercase tracking-widest opacity-50">Verified Proof</p>
                        </div>
                      </div>
                      <p className="text-text-secondary text-sm leading-relaxed opacity-70 mb-4 italic">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map(s => {
                          const isMatch = selectedSkills.includes(s);
                          return (
                            <span 
                               key={s} 
                               className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded transition-all ${
                                 isMatch 
                                 ? 'bg-accent-red text-white' 
                                 : 'text-accent-red/60 border border-accent-red/10'
                               }`}
                            >
                              {s}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-text-secondary text-xs uppercase font-black tracking-widest opacity-30 p-8 border border-dashed border-white/10 rounded-3xl text-center">No projects listed</p>
                )}
              </div>
            </section>
          </div>

          <div className="space-y-12">
            <section>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-red mb-8 flex items-center gap-3">
                <Activity size={14} /> COS CRED BREAKDOWN
              </h4>
              <div className="bg-bg-secondary border border-white/5 rounded-[40px] p-8 space-y-8">
                <ScoreBar label="Identity Verification" value={breakdown.identity} />
                <ScoreBar label="Skill Proof-of-Work" value={breakdown.skill} />
                <ScoreBar label="Social Contribution" value={breakdown.social} />
                <ScoreBar label="Platform Activity" value={breakdown.activity} />
                
                <div className="pt-4 mt-8 border-t border-white/5">
                   <p className="text-[8px] text-text-secondary italic uppercase tracking-widest leading-relaxed">
                     * Scores are calculated via cross-platform git analysis, peer-verification protocols, and verified escrow completion history.
                   </p>
                </div>
              </div>
            </section>

            {cosine.arenaRecord && (
              <section>
                <div 
                  onClick={() => setIsArenaDeepDiveOpen(true)}
                  className="bg-bg-secondary border border-white/5 p-8 rounded-[40px] shadow-xl cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-[#FF2A2A] hover:-translate-y-1 group/arena"
                >
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-amber mb-8 flex items-center gap-3 group-hover/arena:text-accent-red transition-colors">
                    <Trophy size={14} /> THE ARENA RECORD
                  </h4>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <p className="text-[8px] text-text-secondary font-black uppercase mb-1">EVENTS</p>
                      <p className="text-xl font-black font-mono text-text-primary dark:text-white">{cosine.arenaRecord.totalParticipations}</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <p className="text-[8px] text-text-secondary font-black uppercase mb-1">SUCCESS</p>
                      <p className="text-xl font-black font-mono text-accent-deep-green">{cosine.arenaRecord.successRate}%</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {(cosine.arenaRecord.achievements || []).slice(0, 2).map((award, i) => (
                      <div key={i} className="flex items-start gap-3 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-amber mt-1 group-hover:scale-150 transition-all group-hover/arena:bg-accent-red" />
                        <p className="text-[10px] font-bold text-text-primary leading-tight line-clamp-1">{award}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>

        <div className="mt-20 flex flex-col md:flex-row gap-4 relative z-10">
          <button 
            onClick={onOpenFull}
            className="flex-1 py-6 bg-accent-red text-white font-black rounded-2xl hover:scale-[1.02] transition-all shadow-2xl uppercase tracking-[0.2em] text-lg"
          >
            OPEN COMPLETE PORTFOLIO
          </button>
          <button className="md:w-20 py-6 bg-white/5 border border-white/10 text-black dark:text-white rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all">
            <MessageSquare size={24} />
          </button>
        </div>

        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-red/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 -z-10" />
      </motion.div>

      <AnimatePresence>
        {isArenaDeepDiveOpen && (
          <ArenaDeepDiveModal 
            onClose={() => setIsArenaDeepDiveOpen(false)} 
            cosine={cosine}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ScoreBar({ label, value }: { label: string, value: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">{label}</span>
        <span className="text-xs font-mono font-black text-black dark:text-white">{value.toFixed(1)}</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value * 10}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-accent-red shadow-[0_0_10px_rgba(255,31,31,0.5)]"
        />
      </div>
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
            <h5 className="text-xs font-black uppercase tracking-widest text-white">Event Breakdown</h5>
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
            <p className="text-[9px] text-text-secondary italic uppercase tracking-widest opacity-60">* Verified across COS nodes</p>
          </div>
        );
      case 'success':
        return (
          <div className="space-y-4">
            <h5 className="text-xs font-black uppercase tracking-widest text-white">Success Logic</h5>
            <p className="text-[11px] text-text-secondary leading-relaxed font-medium">
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
            <h5 className="text-xs font-black uppercase tracking-widest text-white">Rapid Prototyping</h5>
            <p className="text-[11px] text-text-secondary leading-relaxed font-medium">
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
                <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] opacity-40">Total Events</p>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent-red/10 rounded-xl text-accent-red">
                    <Trophy size={20} />
                  </div>
                  <span className="text-4xl font-black font-mono text-white">12</span>
                </div>
              </div>
              <div 
                onClick={() => setActiveMetricDetail(activeMetricDetail === 'success' ? null : 'success')}
                className={`bg-[#1A1A1A] border p-8 rounded-[32px] flex flex-col gap-2 shadow-xl transition-all cursor-pointer hover:bg-[#2A2A2A] group ${activeMetricDetail === 'success' ? 'ring-1 ring-accent-red border-accent-red/30' : 'border-white/5 hover:ring-1 hover:ring-accent-red'}`}
              >
                <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] opacity-40">Success Rate</p>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent-deep-green/10 rounded-xl text-accent-deep-green">
                    <Activity size={20} />
                  </div>
                  <span className="text-4xl font-black font-mono text-white">85%</span>
                </div>
              </div>
              <div 
                onClick={() => setActiveMetricDetail(activeMetricDetail === 'competency' ? null : 'competency')}
                className={`bg-[#1A1A1A] border p-8 rounded-[32px] flex flex-col gap-2 shadow-xl transition-all cursor-pointer hover:bg-[#2A2A2A] group ${activeMetricDetail === 'competency' ? 'ring-1 ring-accent-red border-accent-red/30' : 'border-white/5 hover:ring-1 hover:ring-accent-red'}`}
              >
                <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] opacity-40">Core Competency</p>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent-amber/10 rounded-xl text-accent-amber">
                     <Zap size={20} />
                  </div>
                  <span className="text-xl font-black italic uppercase tracking-tighter text-white leading-none">Rapid Prototyping</span>
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
