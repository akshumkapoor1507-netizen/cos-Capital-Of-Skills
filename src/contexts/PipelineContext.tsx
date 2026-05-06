import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Candidate {
  id: string;
  name: string;
  role: string;
  university?: string;
  time?: string;
  status?: string;
  score?: number;
  stage?: string;
  email?: string;
}

interface RoleConstraints {
  minCgpa: number;
  minCosCred: number;
  requiredSkills: { name: string; level: string }[];
}

interface PipelineContextType {
  activeInterviews: Candidate[];
  decisionPipeline: Candidate[];
  hiredCandidates: Candidate[];
  activeTab: string;
  setActiveTab: (tab: any) => void;
  roleConstraints: RoleConstraints;
  setRoleConstraints: (constraints: RoleConstraints) => void;
  shortlistCandidate: (candidate: any, role: string) => void;
  moveToDecision: (candidateId: string) => void;
  hireCandidate: (candidateId: string) => void;
  rejectCandidate: (candidateId: string) => void;
}

const PipelineContext = createContext<PipelineContextType | undefined>(undefined);

const MOCK_INTERVIEWS: Candidate[] = [
  { id: 'ic1', name: 'Abhinav Beniwal', role: 'Frontend Engineer', time: 'Today, 4:00 PM', status: 'Scheduled', university: 'DTU' },
  { id: 'ic2', name: 'Apurva', role: 'Data Scientist', time: 'Tomorrow, 11:30 AM', status: 'Scheduled', university: 'IIT Delhi' },
];

const MOCK_PIPELINE: Candidate[] = [
  { id: 'pc1', name: 'Priya Nair', role: 'Senior Frontend Engineer', score: 9.7, stage: 'Decision Pending', email: 'priya@example.com' },
];

export function PipelineProvider({ children }: { children: ReactNode }) {
  const [activeInterviews, setActiveInterviews] = useState<Candidate[]>(MOCK_INTERVIEWS);
  const [decisionPipeline, setDecisionPipeline] = useState<Candidate[]>(MOCK_PIPELINE);
  const [hiredCandidates, setHiredCandidates] = useState<Candidate[]>([]);
  const [activeTab, setActiveTabOriginal] = useState<string>('talent-radar');
  const [roleConstraints, setRoleConstraints] = useState<RoleConstraints>({
    minCgpa: 0,
    minCosCred: 0,
    requiredSkills: []
  });

  // Wrapper to handle type safety if needed, though 'any' is used in interface for brevity
  const setActiveTab = (tab: any) => setActiveTabOriginal(tab);

  const shortlistCandidate = (candidateData: any, role: string) => {
    const newCandidate: Candidate = {
      id: `sc-${Date.now()}`,
      name: candidateData.name,
      role: role,
      university: candidateData.university || 'N/A',
      time: 'TBD',
      status: 'Scheduled',
    };
    setActiveInterviews(prev => [...prev, newCandidate]);
  };

  const moveToDecision = (candidateId: string) => {
    const candidate = activeInterviews.find(c => c.id === candidateId);
    if (candidate) {
      setActiveInterviews(prev => prev.filter(c => c.id !== candidateId));
      setDecisionPipeline(prev => [...prev, { ...candidate, stage: 'Decision Pending', score: 9.0 }]);
    }
  };

  const hireCandidate = (candidateId: string) => {
    const candidate = decisionPipeline.find(c => c.id === candidateId);
    if (candidate) {
      setDecisionPipeline(prev => prev.filter(c => c.id !== candidateId));
      setHiredCandidates(prev => [...prev, { ...candidate, stage: 'Hired' }]);
    }
  };

  const rejectCandidate = (candidateId: string) => {
    setDecisionPipeline(prev => prev.filter(c => c.id !== candidateId));
    setActiveInterviews(prev => prev.filter(c => c.id !== candidateId));
  };

  return (
    <PipelineContext.Provider value={{ 
      activeInterviews, 
      decisionPipeline, 
      hiredCandidates, 
      activeTab,
      setActiveTab,
      roleConstraints,
      setRoleConstraints,
      shortlistCandidate, 
      moveToDecision, 
      hireCandidate,
      rejectCandidate
    }}>
      {children}
    </PipelineContext.Provider>
  );
}

export function usePipeline() {
  const context = useContext(PipelineContext);
  if (context === undefined) {
    throw new Error('usePipeline must be used within a PipelineProvider');
  }
  return context;
}
