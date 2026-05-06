import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'motion/react';
import { Building2, ShieldCheck, Mail, Briefcase, ArrowRight, ArrowLeft, Trophy } from 'lucide-react';
import { CompanyRegistrationSchema, CompanyRegistration } from '../../lib/schemas';

interface CompanyOnboardingProps {
  onComplete: (data: CompanyRegistration) => void;
  onBack: () => void;
}

export default function CompanyOnboarding({ onComplete, onBack }: CompanyOnboardingProps) {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, setValue, watch, trigger, formState: { errors } } = useForm<CompanyRegistration>({
    resolver: zodResolver(CompanyRegistrationSchema),
    mode: 'onBlur',
    defaultValues: {
      hiringNeeds: [],
      wantsArena: false,
    }
  });

  const selectedNeeds = watch('hiringNeeds') || [];
  const password = watch('password') || '';
  const needsOptions = ['Web Dev', 'Mobile Dev', 'AI/ML', 'Content Creation', 'UI/UX Design', 'Video Editing', 'Marketing', 'Data Analytics'];

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

  const toggleNeed = (need: string) => {
    if (selectedNeeds.includes(need)) {
      setValue('hiringNeeds', selectedNeeds.filter(n => n !== need));
    } else {
      setValue('hiringNeeds', [...selectedNeeds, need]);
    }
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof CompanyRegistration)[] = [];
    if (step === 1) {
      fieldsToValidate = ['fullName', 'email', 'password', 'companyName', 'industry', 'businessRegistrationNumber'];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(prev => prev + 1);
    }
  };

  const onSubmit = (data: CompanyRegistration) => {
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
            <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-2 text-white">ENTITY VERIFICATION</h3>
            <p className="text-text-secondary text-xs font-mono uppercase tracking-[0.2em] opacity-60">Institutional partner registration</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-text-secondary ml-2">Contact Person Name</label>
              <input 
                {...register('fullName')} 
                placeholder="Aman Verma" 
                className={`w-full p-4 glass bg-white/5 border rounded-xl outline-none transition-all ${errors.fullName ? 'border-accent-red ring-1 ring-accent-red/20' : 'border-white/10 focus:border-accent-slate'}`} 
              />
              {errors.fullName && <p className="text-accent-red text-[10px] uppercase font-bold ml-2">{errors.fullName.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-text-secondary ml-2">Official Work Email</label>
                <input 
                  {...register('email')} 
                  type="email" 
                  placeholder="hiring@company.com" 
                  className={`w-full p-4 glass bg-white/5 border rounded-xl outline-none transition-all ${errors.email ? 'border-accent-red ring-1 ring-accent-red/20' : 'border-white/10 focus:border-accent-slate'}`} 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-text-secondary ml-2">Password</label>
                <input 
                  {...register('password')} 
                  type="password" 
                  placeholder="••••••••" 
                  className={`w-full p-4 glass bg-white/5 border rounded-xl outline-none transition-all ${errors.password ? 'border-accent-red ring-1 ring-accent-red/20' : 'border-white/10 focus:border-accent-slate'}`} 
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
            
            {(errors.email || errors.password) && <p className="text-accent-red text-[10px] uppercase font-bold ml-2">{errors.email?.message || errors.password?.message}</p>}

            <div className="space-y-1">
              <label className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-text-secondary ml-2">Company Name</label>
              <input 
                {...register('companyName')} 
                placeholder="TechNova Systems Private Limited" 
                className={`w-full p-4 glass bg-white/5 border rounded-xl outline-none transition-all ${errors.companyName ? 'border-accent-red ring-1 ring-accent-red/20' : 'border-white/10 focus:border-accent-slate'}`} 
              />
              {errors.companyName && <p className="text-accent-red text-[10px] uppercase font-bold ml-2">{errors.companyName.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-text-secondary ml-2">Industry</label>
                <input 
                  {...register('industry')} 
                  placeholder="FinTech / SaaS" 
                  className={`w-full p-4 glass bg-white/5 border rounded-xl outline-none transition-all ${errors.industry ? 'border-accent-red ring-1 ring-accent-red/20' : 'border-white/10 focus:border-accent-slate'}`} 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-text-secondary ml-2">Business Reg # (GST/EIN)</label>
                <input 
                  {...register('businessRegistrationNumber')} 
                  placeholder="e.g. 27AAAC..." 
                  className={`w-full p-4 glass bg-white/5 border rounded-xl outline-none transition-all font-mono ${errors.businessRegistrationNumber ? 'border-accent-red ring-1 ring-accent-red/20' : 'border-white/10 focus:border-accent-slate'}`} 
                />
              </div>
            </div>
            {errors.businessRegistrationNumber && <p className="text-accent-red text-[10px] uppercase font-bold ml-2">{errors.businessRegistrationNumber.message}</p>}
          </div>

          <div className="p-4 glass bg-accent-slate/5 rounded-2xl border border-accent-slate/10 flex items-center gap-4">
             <ShieldCheck size={20} className="text-accent-slate shrink-0" />
             <p className="text-[10px] text-accent-slate font-black uppercase tracking-widest leading-normal">
               ANTI-SHELL PROTOCOL: All identifiers are cross-referenced with regional registration databases.
             </p>
          </div>

          <button 
            type="button" 
            onClick={nextStep} 
            className={`w-full py-5 text-white font-black rounded-xl transition-all shadow-xl uppercase tracking-widest text-sm flex items-center justify-center gap-4 ${
              Object.keys(errors).length > 0 
                ? 'opacity-50 cursor-not-allowed bg-accent-slate' 
                : 'bg-accent-slate hover:scale-[1.02] shadow-accent-slate/20'
            }`}
          >
            NEXT: PARTNER NEEDS <ArrowRight size={18} />
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
            <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-2 text-white">RECRUITMENT INTENT</h3>
            <p className="text-text-secondary text-xs font-mono uppercase tracking-[0.2em] opacity-60">Talent acquisition parameters</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-text-secondary ml-2">What kind of talent are you looking for?</label>
              <div className="flex flex-wrap gap-2">
                {needsOptions.map(need => (
                  <button 
                    key={need}
                    type="button"
                    onClick={() => toggleNeed(need)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                      selectedNeeds.includes(need) 
                        ? 'bg-accent-slate border-accent-slate text-white shadow-lg shadow-accent-slate/20' 
                        : 'border-white/10 hover:border-white/30 text-text-secondary'
                    }`}
                  >
                    {need}
                  </button>
                ))}
              </div>
              {errors.hiringNeeds && <p className="text-accent-red text-[10px] uppercase font-bold text-center">{errors.hiringNeeds.message}</p>}
            </div>

            <div className="p-6 glass bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group cursor-pointer" onClick={() => setValue('wantsArena', !watch('wantsArena'))}>
               <div className="flex items-center gap-4">
                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${watch('wantsArena') ? 'bg-accent-red text-white' : 'bg-white/5 text-text-secondary'}`}>
                   <Trophy size={24} />
                 </div>
                 <div>
                   <p className="text-sm font-black uppercase tracking-tight">HOST ARENAS / COMPETITIONS</p>
                   <p className="text-[10px] text-text-secondary uppercase tracking-widest opacity-60">Gamified recruitment through skills</p>
                 </div>
               </div>
               <div className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${watch('wantsArena') ? 'border-accent-red bg-accent-red' : 'border-white/20'}`}>
                 {watch('wantsArena') && <ArrowRight size={14} className="text-white" />}
               </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button type="button" onClick={() => setStep(1)} className="flex-1 py-5 glass border border-white/10 text-white font-black rounded-xl hover:bg-white/5 transition-all text-xs flex items-center justify-center gap-2">
              <ArrowLeft size={16} /> BACK
            </button>
            <button 
              type="submit" 
              className={`flex-[2] py-5 text-white font-black rounded-xl transition-all shadow-xl uppercase tracking-widest text-sm flex items-center justify-center gap-4 ${
                Object.keys(errors).length > 0
                  ? 'bg-accent-slate opacity-50 cursor-not-allowed'
                  : 'bg-accent-slate hover:scale-[1.02] shadow-accent-slate/20'
              }`}
            >
              SUBMIT INSTITUTIONAL SYNC
            </button>
          </div>
        </motion.div>
      )}
    </form>
  );
}
