import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SKILL_CATEGORIES } from '../constants/data';

interface SkillComboboxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SkillCombobox({ value, onChange, placeholder = "Select Skill..." }: SkillComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const allSkills = SKILL_CATEGORIES.flatMap(cat => cat.tags.map(tag => ({ name: tag, category: cat.name })));
  
  const displayValue = isOpen ? search : value || '';

  const filteredSkills = allSkills.filter(skill => 
    skill.name.toLowerCase().includes(search.toLowerCase()) || 
    skill.category.toLowerCase().includes(search.toLowerCase())
  );

  // Group filtered skills by category
  const groupedSkills = filteredSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="relative flex items-center">
        <div className="absolute left-4 pointer-events-none">
          <Search size={16} className={value || isOpen ? 'text-accent-red' : 'text-text-secondary opacity-40'} />
        </div>
        <input
          type="text"
          value={displayValue}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={value || placeholder}
          className={`w-full bg-[#1A1A1A] border ${isOpen ? 'border-accent-red/40 shadow-[0_0_15px_rgba(255,31,31,0.1)]' : 'border-white/5'} rounded-2xl py-4 pl-12 pr-12 text-sm font-bold uppercase tracking-tight transition-all hover:border-white/20 outline-none placeholder:text-text-secondary/40 text-white`}
        />
        <div className="absolute right-4 pointer-events-none">
          <ChevronDown size={16} className={`text-text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.98 }}
            animate={{ opacity: 1, y: 5, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.98 }}
            className="absolute top-full left-0 right-0 z-[100] bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto py-2 
              [&::-webkit-scrollbar]:w-1.5
              [&::-webkit-scrollbar-track]:bg-[#1A1A1A]
              [&::-webkit-scrollbar-thumb]:bg-[#333]
              [&::-webkit-scrollbar-thumb]:rounded-full
              hover:[&::-webkit-scrollbar-thumb]:bg-accent-red/50">
              {Object.entries(groupedSkills).length > 0 ? (
                Object.entries(groupedSkills).map(([category, skills]) => (
                  <div key={category} className="mb-2 last:mb-0">
                    <div className="px-4 py-1.5 flex items-center gap-2">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-accent-red/60 italic">
                        {category}
                      </span>
                      <div className="flex-1 h-[1px] bg-white/5" />
                    </div>
                    <div className="px-2">
                      {skills.map(skillName => (
                        <div
                          key={skillName}
                          onClick={() => {
                            onChange(skillName);
                            setIsOpen(false);
                            setSearch('');
                          }}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all cursor-pointer group ${
                            value === skillName ? 'bg-accent-red/10 border border-accent-red/20' : 'hover:bg-[#2A2A2A] border border-transparent'
                          }`}
                        >
                          <span className={`text-[11px] font-bold uppercase tracking-tight ${value === skillName ? 'text-accent-red' : 'text-text-secondary group-hover:text-white'}`}>
                            {skillName}
                          </span>
                          {value === skillName && <Check size={14} className="text-accent-red" />}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-40">No Matches Found</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
