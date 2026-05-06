import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, ShieldCheck, Mail, User, ArrowRight, ArrowLeft, Send } from 'lucide-react';
import { PosterRegistrationSchema, PosterRegistration } from '../../lib/schemas';

interface PosterOnboardingProps {
  onComplete: (data: PosterRegistration) => void;
  onBack: () => void;
}

export default function PosterOnboarding({ onComplete, onBack }: PosterOnboardingProps) {
  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm<PosterRegistration>({
    resolver: zodResolver(PosterRegistrationSchema),
    mode: 'onBlur',
  });

  const phoneNumber = watch('phoneNumber');
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

  const onSubmit = (data: PosterRegistration) => {
    onComplete(data);
  };

  const sendOtp = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
    }, 1500);
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof PosterRegistration)[] = [];
    if (step === 1) {
      fieldsToValidate = ['fullName', 'email', 'password', 'phoneNumber'];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(prev => prev + 1);
    }
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
            <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-2 text-accent-red">POSTER IDENTITY</h3>
            <p className="text-text-secondary text-xs font-mono uppercase tracking-[0.2em] opacity-60">Gig-barrier initialization</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-text-secondary ml-2">Name / Alias</label>
              <input 
                {...register('fullName')} 
                placeholder="e.g. CreatorHub / Rohan" 
                className={`w-full p-4 glass bg-white/5 border rounded-xl outline-none transition-all ${errors.fullName ? 'border-accent-red ring-1 ring-accent-red/20' : 'border-white/10 focus:border-accent-red'}`} 
              />
              {errors.fullName && <p className="text-accent-red text-[10px] uppercase font-bold ml-2">{errors.fullName.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-text-secondary ml-2">Email</label>
                <input 
                  {...register('email')} 
                  type="email" 
                  placeholder="contact@example.com" 
                  className={`w-full p-4 glass bg-white/5 border rounded-xl outline-none transition-all ${errors.email ? 'border-accent-red ring-1 ring-accent-red/20' : 'border-white/10 focus:border-accent-red'}`} 
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
            
            {(errors.email || errors.password) && <p className="text-accent-red text-[10px] uppercase font-bold ml-2">{errors.email?.message || errors.password?.message}</p>}

            <div className="space-y-1">
              <label className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-text-secondary ml-2">Phone Number (For verification)</label>
              <div className="relative">
                <input 
                  {...register('phoneNumber')} 
                  placeholder="+91 98765 43210" 
                  className={`w-full p-4 pl-12 glass bg-white/5 border rounded-xl outline-none transition-all font-mono ${errors.phoneNumber ? 'border-accent-red ring-1 ring-accent-red/20' : 'border-white/10 focus:border-accent-red'}`} 
                />
                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary opacity-40" />
              </div>
              {errors.phoneNumber && <p className="text-accent-red text-[10px] uppercase font-bold ml-2">{errors.phoneNumber.message}</p>}
            </div>
          </div>

          <div className="p-4 glass bg-accent-red/5 rounded-2xl border border-accent-red/10 flex items-center gap-4">
             <ShieldCheck size={20} className="text-accent-red shrink-0" />
             <p className="text-[10px] text-accent-red font-black uppercase tracking-widest leading-normal">
               SPAM-BARRIER: We use OTP verification to ensure high-quality gig postings.
             </p>
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
            VERIFY CONTACT <ArrowRight size={18} />
          </button>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex flex-col gap-8"
        >
          <div className="text-center">
            <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-2 text-accent-red">PHONE OTP</h3>
            <p className="text-text-secondary text-xs font-mono uppercase tracking-[0.2em] opacity-60">Verification sent to {phoneNumber}</p>
          </div>

          <div className="flex flex-col items-center gap-6">
            {!otpSent ? (
              <button 
                type="button" 
                onClick={sendOtp}
                disabled={isLoading}
                className="w-full py-8 border-2 border-dashed border-white/10 rounded-[32px] flex flex-col items-center justify-center gap-4 hover:border-accent-red transition-all group"
              >
                {isLoading ? (
                  <div className="w-8 h-8 border-4 border-accent-red border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={32} className="text-text-secondary group-hover:text-accent-red transition-colors" />
                    <span className="text-xs font-black uppercase tracking-[0.2em]">SEND ONE-TIME PASSCODE</span>
                  </>
                )}
              </button>
            ) : (
              <div className="w-full space-y-6">
                <div className="flex justify-center gap-4">
                  {[...Array(6)].map((_, i) => (
                    <input 
                      key={i}
                      type="text"
                      maxLength={1}
                      className="w-12 h-16 glass bg-white/5 border border-white/10 rounded-xl text-center text-2xl font-black font-mono outline-none focus:border-accent-red"
                      onChange={(e) => {
                        if (e.target.value && i < 5) {
                          (e.target.nextSibling as HTMLInputElement)?.focus();
                        }
                      }}
                    />
                  ))}
                </div>
                <div className="text-center">
                   <button type="button" onClick={sendOtp} className="text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-accent-red transition-colors">Resend Code</button>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button type="button" onClick={() => setStep(1)} className="flex-1 py-5 glass border border-white/10 text-white font-black rounded-xl hover:bg-white/5 transition-all text-xs flex items-center justify-center gap-2">
              <ArrowLeft size={16} /> BACK
            </button>
            <button 
              type="submit" 
              disabled={!otpSent} 
              className={`flex-[2] py-5 text-white font-black rounded-xl transition-all shadow-xl uppercase tracking-widest text-sm flex items-center justify-center gap-4 ${
                (!otpSent || Object.keys(errors).length > 0)
                  ? 'opacity-50 cursor-not-allowed bg-accent-red'
                  : 'bg-accent-red hover:scale-[1.02] shadow-accent-red/20'
              }`}
            >
              VERIFY & COMPLETE
            </button>
          </div>
        </motion.div>
      )}
    </form>
  );
}
