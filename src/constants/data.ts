
import { Gig, Cosine } from '../types';

export const SAMPLE_GIGS: Gig[] = [
  {
    id: '1',
    title: 'Edit 3 YouTube reels for tech channel',
    posterName: 'TechVlog India',
    budget: '₹800',
    deadline: '2 days',
    skills: ['DaVinci Resolve', 'Video Editing', 'Shorts'],
    description: 'Looking for a fast editor who can make engaging tech reels with subtitles and flashy transitions.',
    status: 'open'
  },
  {
    id: '2',
    title: 'Research competitors for D2C brand',
    posterName: 'EcoLifestyle Startup',
    budget: '₹1200',
    deadline: '5 days',
    skills: ['Research', 'Data Analysis', 'Excel'],
    description: 'Need a detailed report on 5 competitors in the organic skincare space in India.',
    status: 'open'
  },
  {
    id: '3',
    title: 'Build landing page for SaaS tool',
    posterName: 'DevNexus',
    budget: '₹3500',
    deadline: '7 days',
    skills: ['Webflow', 'React', 'Tailwind CSS'],
    description: 'Convert a Figma design into a responsive landing page.',
    status: 'open'
  },
  {
    id: '4',
    title: 'Peer review MBA case study',
    posterName: 'Rahul K.',
    budget: '₹400',
    deadline: '24 hours',
    skills: ['Business Strategy', 'Content Writing'],
    description: 'Need someone to proofread and provide feedback on an MBA marketing case study.',
    status: 'open'
  }
];

export const SAMPLE_COSINES: Cosine[] = [
  {
    id: 'c1',
    name: 'Priya Nair',
    university: 'IIT Delhi',
    degree: 'B.Tech CSE (AI/ML)',
    cgpa: 9.4,
    cosCred: 9.7,
    scoreBreakdown: { identity: 10, skill: 9.8, social: 9.5, activity: 9.5 },
    skills: ['Python', 'Data Science', 'SQL', 'React'],
    primaryDomain: 'Engineering',
    skillDistribution: [
      { name: 'Python', value: 40, color: '#FF2A2A' },
      { name: 'Data Science', value: 25, color: '#FF5E5E' },
      { name: 'React', value: 20, color: '#FF8F8F' },
      { name: 'SQL', value: 15, color: '#FFC0C0' },
    ],
    gigCount: 24,
    portfolioUrl: 'https://priya.codes',
    suggestedRoles: ["Data Engineer", "Full-Stack Dev"],
    behavioralStats: {
      ghostingRate: 0,
      avgResponseTimeHours: 0.5,
      arenaCollabStyle: 'Team Player',
      firstPassAcceptanceRate: 0.95,
      isProactive: true,
      avgRevisionTimeHours: 2,
      repeatHireRate: 0.9,
      concurrentGigs: 2
    },
    projects: [
      { 
        id: 'p1', 
        name: 'GSD - Campus Ecosystem', 
        description: 'A peer-to-peer student marketplace using in-app escrow and "Bones" rewards system for campus-wide engagement.', 
        githubUrl: 'https://github.com/priya/gsd', 
        skills: ['React Native', 'Firebase', 'Escrow Logic'],
        type: 'code'
      },
      { 
        id: 'p2', 
        name: 'Slop Block', 
        description: 'A dedicated browser extension that detects and filters AI-generated content from social feeds to maintain human-centric browsing.', 
        githubUrl: 'https://github.com/priya/slopblock', 
        skills: ['Python', 'Machine Learning', 'UI/UX'],
        type: 'code'
      },
      {
        id: 'p3',
        name: 'AceSideDown',
        description: 'A Stranger Things-themed game development project and large-scale gaming event execution for campus communities.', 
        skills: ['Event Management', 'Game Dev', 'Technical Operations'],
        type: 'strategy'
      }
    ],
    arenaRecord: {
      totalParticipations: 12,
      successRate: 85,
      achievements: [
        'GeeksForGeeks Hackfest 2026 - Finalist',
        'GDGOC Techsprint - Special Mention',
        'Smart India Hackathon - Winner (Fintech Track)'
      ]
    },
    externalStats: {
      github: {
        totalRepos: 42,
        topLanguages: ['Python', 'TypeScript', 'C++'],
        commitsLastYear: 1420
      },
      leetcode: {
        solved: 450,
        easy: 150,
        medium: 250,
        hard: 50
      }
    },
    certifications: [
      'Google Professional ML Engineer',
      'AWS Certified Developer Associate'
    ],
    internships: [
      {
        id: 'i1',
        company: 'TechCorp AI',
        role: 'AI/ML Intern',
        duration: 'May 2025 - July 2025 (3 Months)',
        managerRating: 4.8,
        ppoStatus: 'Offered',
        ppoRole: 'Junior ML Engineer',
        ppoCompensation: '₹18 LPA',
        candidateDecision: 'Pending',
        performanceMetrics: [
          { subject: 'Code Quality', value: 92, fullMark: 100 },
          { subject: 'Delivery', value: 95, fullMark: 100 },
          { subject: 'Communication', value: 88, fullMark: 100 },
          { subject: 'Problem Solving', value: 96, fullMark: 100 },
          { subject: 'Teamwork', value: 90, fullMark: 100 },
        ]
      },
      {
        id: 'i2',
        company: 'GrowthStartup',
        role: 'Data Analyst Intern',
        duration: 'Dec 2024 - Feb 2025 (3 Months)',
        managerRating: 4.5,
        ppoStatus: 'Not Offered',
        candidateDecision: 'Pending',
        performanceMetrics: [
          { subject: 'Analysis', value: 85, fullMark: 100 },
          { subject: 'Delivery', value: 80, fullMark: 100 },
          { subject: 'Communication', value: 95, fullMark: 100 },
          { subject: 'Problem Solving', value: 82, fullMark: 100 },
          { subject: 'Teamwork', value: 98, fullMark: 100 },
        ]
      }
    ]
  },
  {
    id: 'c2',
    name: 'Arjun Mehta',
    university: 'BITS Pilani',
    degree: 'B.Des Interation Design',
    cgpa: 8.9,
    cosCred: 8.9,
    scoreBreakdown: { identity: 9.5, skill: 8.5, social: 9.0, activity: 8.6 },
    skills: ['Figma', 'UI/UX', 'Spline', 'Three.js'],
    primaryDomain: 'Design',
    skillDistribution: [
      { name: 'UI Design', value: 50, color: '#FF2A2A' },
      { name: 'Prototyping', value: 30, color: '#FF8F8F' },
      { name: '3D Assets', value: 20, color: '#FFC0C0' },
    ],
    gigCount: 15,
    portfolioUrl: 'https://arjun.design',
    suggestedRoles: ["Product Designer", "3D Web Dev"],
    behavioralStats: {
      ghostingRate: 0.05,
      avgResponseTimeHours: 3,
      arenaCollabStyle: 'Solo Contributor',
      firstPassAcceptanceRate: 0.88,
      isProactive: false,
      avgRevisionTimeHours: 8,
      repeatHireRate: 0.7,
      concurrentGigs: 4
    },
    projects: [
      { 
        id: 'p3', 
        name: 'Neo-Genesis Wallet', 
        description: 'A brutalist fintech interface for managing web3 assets with zero-knowledge proof visualizations.', 
        liveUrl: 'https://behance.net/gallery/neo-genesis', 
        skills: ['Figma', 'Brutalism', '3D Design'],
        type: 'design'
      }
    ]
  },
  {
    id: 'c3',
    name: 'Zara Khan',
    university: 'Manipal',
    degree: 'B.B.A Digital Marketing',
    cgpa: 9.2,
    cosCred: 9.2,
    scoreBreakdown: { identity: 10, skill: 9.0, social: 9.2, activity: 9.4 },
    skills: ['Social Media Strategy', 'SEO', 'Email Marketing'],
    primaryDomain: 'Marketing',
    skillDistribution: [
      { name: 'Growth', value: 45, color: '#FF2A2A' },
      { name: 'Content', value: 35, color: '#FF8F8F' },
      { name: 'Ads', value: 20, color: '#FFC0C0' },
    ],
    gigCount: 18,
    portfolioUrl: 'https://zara.marketing',
    suggestedRoles: ["Growth Marketer", "Digital Strategist"],
    behavioralStats: {
      ghostingRate: 0,
      avgResponseTimeHours: 1.2,
      arenaCollabStyle: 'Team Player',
      firstPassAcceptanceRate: 0.92,
      isProactive: true,
      avgRevisionTimeHours: 4,
      repeatHireRate: 0.85,
      concurrentGigs: 1
    },
    projects: [
      { 
        id: 'p4', 
        name: 'Crypto 101 Campaign', 
        description: 'Led a viral awareness campaign that reached 1M+ views across Twitter and LinkedIn for an ed-tech DAO.', 
        skills: ['SEO', 'Virality', 'Analytics'],
        type: 'marketing'
      }
    ]
  },
  {
    id: 'c4',
    name: 'Rohan Gupta',
    university: 'Ashoka University',
    degree: 'B.Com Management',
    cgpa: 7.5,
    cosCred: 7.5,
    scoreBreakdown: { identity: 8.0, skill: 7.0, social: 7.5, activity: 7.5 },
    skills: ['Excel', 'Market Research', 'Operations'],
    primaryDomain: 'Management',
    skillDistribution: [
      { name: 'Ops', value: 40, color: '#FF2A2A' },
      { name: 'Research', value: 40, color: '#FF8F8F' },
      { name: 'Finance', value: 20, color: '#FFC0C0' },
    ],
    gigCount: 8,
    portfolioUrl: 'https://rohan.biz',
    suggestedRoles: ["Business Analyst", "Operations Specialist"],
    behavioralStats: {
      ghostingRate: 0.1,
      avgResponseTimeHours: 25,
      arenaCollabStyle: 'Solo Contributor',
      firstPassAcceptanceRate: 0.75,
      isProactive: false,
      avgRevisionTimeHours: 48,
      repeatHireRate: 0.3,
      concurrentGigs: 6
    },
    projects: [
      { 
        id: 'p5', 
        name: 'Logistics Optimization', 
        description: 'Reduced delivery overhead by 15% for a local D2C food brand through systematic route restructuring.', 
        skills: ['Operations', 'Data Analysis'],
        type: 'strategy'
      }
    ]
  }
];

export const SKILL_CATEGORIES = [
  { name: 'Design', tags: ['Figma', 'Photoshop', 'UI/UX', 'Illustrator', 'Canva'] },
  { name: 'Development', tags: ['React', 'Python', 'Node.js', 'Tailwind CSS', 'Webflow', 'Flutter'] },
  { name: 'Content & Writing', tags: ['Copywriting', 'SEO', 'Technical Writing', 'Script Writing'] },
  { name: 'Data & Research', tags: ['Excel', 'SQL', 'Tableau', 'Market Research', 'Data Analysis'] },
  { name: 'Video & Media', tags: ['DaVinci Resolve', 'Premiere Pro', 'After Effects', 'Shorts Editor'] },
  { name: 'Marketing', tags: ['Social Media', 'Growth Hacking', 'Email Marketing', 'Ads'] }
];
