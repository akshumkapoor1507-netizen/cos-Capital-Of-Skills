import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Github, Palette, Award, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { CosineRegistrationSchema, CosineRegistration } from '../../lib/schemas';
import { SKILL_CATEGORIES } from '../../constants/data';

interface CosineOnboardingProps {
  onComplete: (data: CosineRegistration) => void;
  onBack: () => void;
}

export default function CosineOnboarding({ onComplete, onBack }: CosineOnboardingProps) {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, setValue, watch, trigger, formState: { errors } } = useForm<CosineRegistration>({
    resolver: zodResolver(CosineRegistrationSchema),
    mode: 'onBlur',
    defaultValues: {
      skillTags: [],
      yearOfStudy: '1',
    }
  });

  const selectedSkills = watch('skillTags') || [];
  const password = watch('password') || '';

  const getPasswordStrength = (pass: string) => {
    if (!pass) return { label: 'EMPTY', color: 'bg-white/10', width: '0%' };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^a-zA-Z0-9]/.test(pass)) score++;
    
    if (score <= 1) return { label: 'WEAK', color: 'bg-accent-red', width: '25%' };
    if (score === 2) return { label: 'MEDIUM', color: 'bg-yellow-500', width: '50%' };
    if (score === 3) return { label: 'GOOD', color: 'bg-blue-500', width: '75%' };
    return { label: 'STRONG', color: 'bg-green-500', width: '100%' };
  };

  const passStrength = getPasswordStrength(password);

  const toggleSkill = (tag: string) => {
    const isSelected = selectedSkills.some(s => s.name === tag);
    if (isSelected) {
      setValue('skillTags', selectedSkills.filter(s => s.name !== tag));
    } else {
      setValue('skillTags', [...selectedSkills, { name: tag, level: 'Beginner' }]);
    }
  };

  const setSkillLevel = (tag: string, level: 'Beginner' | 'Intermediate' | 'Advanced') => {
    setValue('skillTags', selectedSkills.map(s => s.name === tag ? { ...s, level } : s));
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof CosineRegistration)[] = [];
    if (step === 1) {
      fieldsToValidate = ['fullName', 'collegeEmail', 'password', 'email', 'studentId'];
    } else if (step === 2) {
      fieldsToValidate = ['university', 'degree', 'yearOfStudy'];
    } else if (step === 3) {
      fieldsToValidate = ['skillTags'];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(prev => prev + 1);
    }
  };
  const prevStep = () => setStep(prev => Math.max(1, prev - 1));

  const onSubmit = (data: CosineRegistration) => {
    onComplete(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex flex-col gap-6"
        >
          <div className="text-center">
            <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-2 text-white">BASIC INTEL</h3>
            <p className="text-text-secondary text-xs font-mono uppercase tracking-[0.2em] opacity-60">Identity construction protocol</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-text-secondary ml-2">Full Name</label>
              <input 
                {...register('fullName')} 
                placeholder="Anya Singh" 
                className={`w-full p-4 glass bg-white/5 border rounded-xl outline-none transition-all ${errors.fullName ? 'border-accent-red ring-1 ring-accent-red/20' : 'border-white/10 focus:border-accent-red'}`} 
              />
              {errors.fullName && <p className="text-accent-red text-[10px] uppercase font-bold ml-2">{errors.fullName.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-text-secondary ml-2">College Email</label>
                <input 
                  {...register('collegeEmail')} 
                  type="email" 
                  placeholder="anyas@iitd.ac.in" 
                  className={`w-full p-4 glass bg-white/5 border rounded-xl outline-none transition-all ${errors.collegeEmail ? 'border-accent-red ring-1 ring-accent-red/20' : 'border-white/10 focus:border-accent-red'}`} 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-text-secondary ml-2">Password</label>
                <input 
                  {...register('password')} 
                  type="password" 
                  placeholder="••••••••" 
                  className={`w-full p-4 glass bg-white/5 border rounded-xl outline-none transition-all ${errors.password ? 'border-accent-red ring-1 ring-accent-red/20' : 'border-white/10 focus:border-accent-red'}`} 
                />
              </div>
            </div>
            
            <div className="px-2 space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-[8px] font-black uppercase tracking-widest text-text-secondary">Password Security</span>
                <span className={`text-[8px] font-black uppercase tracking-widest ${passStrength.label === 'WEAK' ? 'text-accent-red' : 'text-text-primary'}`}>{passStrength.label}</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: passStrength.width }}
                  className={`h-full ${passStrength.color} transition-all`}
                />
              </div>
            </div>

            {(errors.collegeEmail || errors.password) && (
              <p className="text-accent-red text-[10px] uppercase font-bold ml-2">
                {errors.collegeEmail?.message || errors.password?.message}
              </p>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-text-secondary ml-2">Personal Email</label>
                <input 
                  {...register('email')} 
                  type="email" 
                  placeholder="anya@gmail.com" 
                  className={`w-full p-4 glass bg-white/5 border rounded-xl outline-none transition-all ${errors.email ? 'border-accent-red ring-1 ring-accent-red/20' : 'border-white/10 focus:border-accent-red'}`} 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-text-secondary ml-2">Student ID Number</label>
                <input 
                  {...register('studentId')} 
                  placeholder="IITD2024CS" 
                  className={`w-full p-4 glass bg-white/5 border rounded-xl outline-none transition-all ${errors.studentId ? 'border-accent-red ring-1 ring-accent-red/20' : 'border-white/10 focus:border-accent-red'}`} 
                />
              </div>
            </div>
            {errors.studentId && <p className="text-accent-red text-[10px] uppercase font-bold ml-2">{errors.studentId.message}</p>}
          </div>

          <button 
            type="button" 
            onClick={nextStep} 
            className={`w-full py-5 text-white font-black rounded-xl transition-all shadow-xl uppercase tracking-widest text-sm flex items-center justify-center gap-4 ${
              Object.keys(errors).length > 0 
                ? 'opacity-50 cursor-not-allowed bg-accent-red' 
                : 'bg-accent-red hover:scale-[1.02] shadow-accent-red/20'
            }`}
          >
            NEXT: ACADEMICS <ArrowRight size={18} />
          </button>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex flex-col gap-6"
        >
          <div className="text-center">
             <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-2 text-white">ACADEMICS</h3>
             <p className="text-text-secondary text-xs font-mono uppercase tracking-[0.2em] opacity-60">Verification of status</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-text-secondary ml-2">University Name</label>
              <input 
                {...register('university')} 
                placeholder="Indian Institute of Technology, Delhi" 
                className={`w-full p-4 glass bg-white/5 border rounded-xl outline-none transition-all ${errors.university ? 'border-accent-red ring-1 ring-accent-red/20' : 'border-white/10 focus:border-accent-red'}`} 
              />
              {errors.university && <p className="text-accent-red text-[10px] uppercase font-bold ml-2">{errors.university.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-text-secondary ml-2">Degree/Major</label>
                <input 
                  {...register('degree')} 
                  placeholder="B.Tech Computer Science" 
                  className={`w-full p-4 glass bg-white/5 border rounded-xl outline-none transition-all ${errors.degree ? 'border-accent-red ring-1 ring-accent-red/20' : 'border-white/10 focus:border-accent-red'}`} 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-text-secondary ml-2">Year of Study</label>
                <select 
                  {...register('yearOfStudy')} 
                  className={`w-full p-4 glass bg-white/5 border rounded-xl outline-none transition-all text-text-primary text-sm uppercase font-black ${errors.yearOfStudy ? 'border-accent-red ring-1 ring-accent-red/20' : 'border-white/10 focus:border-accent-red'}`}
                >
                  <option value="1">Year 1</option>
                  <option value="2">Year 2</option>
                  <option value="3">Year 3</option>
                  <option value="4">Year 4</option>
                  <option value="5">Year 5+</option>
                </select>
              </div>
            </div>
            {(errors.degree || errors.yearOfStudy) && <p className="text-accent-red text-[10px] uppercase font-bold ml-2">Required fields are missing</p>}
          </div>

          <div className="flex gap-4">
            <button type="button" onClick={prevStep} className="flex-1 py-5 glass border border-white/10 text-white font-black rounded-xl hover:bg-white/5 transition-all text-xs flex items-center justify-center gap-2">
              <ArrowLeft size={16} /> BACK
            </button>
            <button 
              type="button" 
              onClick={nextStep} 
              className={`flex-[2] py-5 text-white font-black rounded-xl transition-all shadow-xl uppercase tracking-widest text-sm flex items-center justify-center gap-4 ${
                Object.keys(errors).length > 0 
                  ? 'opacity-50 cursor-not-allowed bg-accent-red' 
                  : 'bg-accent-red hover:scale-[1.02] shadow-accent-red/20'
              }`}
            >
              NEXT: SKILLS <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex flex-col gap-6"
        >
          <div className="text-center">
             <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-2 text-white">SKILL TAXONOMY</h3>
             <p className="text-text-secondary text-xs font-mono uppercase tracking-[0.2em] opacity-60">Initialize your core competencies</p>
          </div>

          <div className="space-y-8 max-h-[400px] overflow-y-auto px-2 custom-scrollbar">
            {SKILL_CATEGORIES.map(cat => (
              <div key={cat.name} className="space-y-3">
                <label className="text-[10px] font-black font-mono uppercase tracking-[0.3em] text-accent-red flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-accent-red/30" />
                  {cat.name}
                </label>
                <div className="flex flex-wrap gap-3">
                  {cat.tags.map(tag => {
                    const skill = selectedSkills.find(s => s.name === tag);
                    const isSelected = !!skill;
                    
                    return (
                      <div key={tag} className="flex flex-col gap-2">
                        <button 
                          key={tag}
                          type="button"
                          onClick={() => toggleSkill(tag)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${
                            isSelected 
                              ? 'bg-accent-red border-accent-red text-white shadow-lg shadow-accent-red/20' 
                              : 'border-white/10 hover:border-white/30 text-text-secondary'
                          }`}
                        >
                          {tag}
                        </button>
                        
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="flex gap-1 overflow-hidden"
                            >
                              {(['Beginner', 'Intermediate', 'Advanced'] as const).map(lvl => (
                                <button
                                  key={lvl}
                                  type="button"
                                  onClick={() => setSkillLevel(tag, lvl)}
                                  className={`px-1.5 py-0.5 rounded text-[7px] font-bold uppercase transition-all ${
                                    skill.level === lvl 
                                      ? 'bg-white text-bg-primary' 
                                      : 'bg-white/5 text-text-secondary hover:bg-white/10'
                                  }`}
                                >
                                  {lvl[0]}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {errors.skillTags && <p className="text-accent-red text-[10px] uppercase font-bold text-center">{errors.skillTags.message}</p>}

          <div className="flex gap-4">
            <button type="button" onClick={prevStep} className="flex-1 py-5 glass border border-white/10 text-white font-black rounded-xl hover:bg-white/5 transition-all text-xs flex items-center justify-center gap-2">
              <ArrowLeft size={16} /> BACK
            </button>
            <button 
              type="button" 
              onClick={nextStep} 
              className={`flex-[2] py-5 text-white font-black rounded-xl transition-all shadow-xl uppercase tracking-widest text-sm flex items-center justify-center gap-4 ${
                Object.keys(errors).length > 0 
                  ? 'opacity-50 cursor-not-allowed bg-accent-red' 
                  : 'bg-accent-red hover:scale-[1.02] shadow-accent-red/20'
              }`}
            >
              NEXT: PROOF (OPTIONAL) <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      )}

      {step === 4 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex flex-col gap-6"
        >
          <div className="text-center">
             <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-2 text-white">EXTERNAL PROOF</h3>
             <p className="text-text-secondary text-xs font-mono uppercase tracking-[0.2em] opacity-60">Verified history (Track B Bypass)</p>
          </div>

          <div className="space-y-6">
            <div className="p-6 glass bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-4">
               <div className="flex items-center gap-4 text-accent-slate">
                 <Github size={24} />
                 <span className="text-xs font-black uppercase tracking-widest">Connect GitHub Intelligence</span>
               </div>
               <input {...register('githubUrl')} placeholder="https://github.com/yourusername" className="w-full p-4 glass bg-white/5 border border-white/10 rounded-xl outline-none focus:border-accent-slate text-sm font-mono" />
            </div>

            <div className="p-6 glass bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-4">
               <div className="flex items-center gap-4 text-accent-red">
                 <Palette size={24} />
                 <span className="text-xs font-black uppercase tracking-widest">Visual Portfolio Proof</span>
               </div>
               <input {...register('behanceUrl')} placeholder="https://behance.net/yourprofile" className="w-full p-4 glass bg-white/5 border border-white/10 rounded-xl outline-none focus:border-accent-red text-sm font-mono" />
            </div>

            <div className="p-6 glass bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-4">
               <div className="flex items-center gap-4 text-accent-deep-green">
                 <Award size={24} />
                 <span className="text-xs font-black uppercase tracking-widest">Industry Certifications</span>
               </div>
               <input 
                 type="file" 
                 className="hidden" 
                 id="certUpload" 
                 onChange={(e) => setValue('certificationFile', e.target.files?.[0] || null)}
               />
               <label htmlFor="certUpload" className="w-full p-4 glass border border-dashed border-white/20 rounded-xl flex items-center justify-center gap-3 cursor-pointer hover:bg-white/5 transition-all text-xs font-bold uppercase tracking-tighter text-text-secondary">
                 <Upload size={16} /> {watch('certificationFile') ? (watch('certificationFile') as File).name : 'Upload PDF/Image'}
               </label>
            </div>
          </div>

          <div className="flex gap-4">
            <button type="button" onClick={prevStep} className="flex-1 py-5 glass border border-white/10 text-white font-black rounded-xl hover:bg-white/5 transition-all text-xs flex items-center justify-center gap-2">
              <ArrowLeft size={16} /> BACK
            </button>
            <button 
              type="submit" 
              className={`flex-[2] py-5 font-bold rounded-xl transition-all shadow-xl uppercase tracking-widest text-sm flex items-center justify-center gap-4 ${
                Object.keys(errors).length > 0
                  ? 'bg-text-primary text-bg-primary opacity-50 cursor-not-allowed'
                  : 'bg-text-primary text-bg-primary hover:scale-[1.02]'
              }`}
            >
              LAUNCH PROFILE IDENTITY
            </button>
          </div>
        </motion.div>
      )}
    </form>
  );
}
