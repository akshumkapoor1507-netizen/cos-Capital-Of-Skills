
export type UserRole = 'cosine' | 'poster' | 'company' | 'guest';

export interface Gig {
  id: string;
  title: string;
  posterName: string;
  budget: string;
  deadline: string;
  skills: string[];
  description: string;
  status: 'open' | 'applied' | 'in-progress' | 'completed';
}

export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Cosine {
  id: string;
  name: string;
  university: string;
  degree?: string;
  cgpa?: number;
  cosCred: number;
  scoreBreakdown?: {
    identity: number;
    skill: number;
    social: number;
    activity: number;
  };
  skills: (string | Skill)[];
  skillDistribution?: { name: string; value: number; color: string }[];
  projects?: Build[];
  arenaRecord?: {
    totalParticipations: number;
    successRate: number;
    achievements: string[];
  };
  externalStats?: {
    github: {
      totalRepos: number;
      topLanguages: string[];
      commitsLastYear: number;
    };
    leetcode: {
      solved: number;
      easy: number;
      medium: number;
      hard: number;
    };
  };
  certifications?: string[];
  internships?: Internship[];
  gigCount: number;
  avatar?: string;
  portfolioUrl?: string;
  primaryDomain: 'Engineering' | 'Design' | 'Management' | 'Marketing';
  suggestedRoles?: string[];
  behavioralStats?: {
    ghostingRate: number;
    avgResponseTimeHours: number;
    arenaCollabStyle: 'Solo Contributor' | 'Team Player';
    firstPassAcceptanceRate: number;
    isProactive: boolean;
    avgRevisionTimeHours: number;
    repeatHireRate: number;
    concurrentGigs: number;
  };
}

export interface Internship {
  id: string;
  company: string;
  role: string;
  duration: string;
  managerRating: number;
  ppoStatus: 'Offered' | 'Not Offered';
  ppoRole?: string;
  ppoCompensation?: string;
  candidateDecision?: 'Accepted' | 'Rejected' | 'Pending';
  performanceMetrics: {
    subject: string;
    value: number;
    fullMark: number;
  }[];
}

export interface Build {
  id: string;
  name: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  skills: string[];
  tractionProof?: string;
  type?: 'code' | 'design' | 'strategy' | 'marketing';
}
