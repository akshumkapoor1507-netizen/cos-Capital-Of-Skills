import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'motion/react';
import { User, Mail, Github, Save, LogOut, Plus, Trash2, ShieldCheck } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { CosineRegistrationSchema, CompanyRegistrationSchema, CosineRegistration } from '../lib/schemas';

/**
 * Deliverable 3: Dashboard Profile Component
 * Demonstrates:
 * 1. Reading from global state (Zustand)
 * 2. Applying strict validation (Zod + react-hook-form)
 * 3. Conditional rendering based on User Type
 */
export default function DashboardProfile() {
  const { cosineProfile, companyProfile, userType, updateCosineProfile, updateCompanyProfile, logout, addToast } = useUserStore();

  const profile = userType === 'cosine' ? cosineProfile : companyProfile;
  const updateFn = userType === 'cosine' ? updateCosineProfile : updateCompanyProfile;

  const { register, handleSubmit, control, formState: { errors, isDirty } } = useForm<any>({
    resolver: zodResolver(userType === 'cosine' ? CosineRegistrationSchema : CompanyRegistrationSchema),
    mode: 'onBlur',
    defaultValues: profile,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skillTags',
  });

  const onUpdate = (data: any) => {
    updateFn(data);
    addToast('IDENTITY SYNC: UNIVERSAL STATE UPDATED', 'success');
  };

  if (!profile) return null;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">Identity Hub</h1>
          <p className="text-text-secondary font-mono text-xs uppercase tracking-widest mt-1">Management of verified capability</p>
        </div>
        <button onClick={logout} className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all text-text-secondary">
          <LogOut size={14} /> Termination
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="p-8 glass border border-white/10 rounded-[32px] flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-accent-red/10 border-2 border-accent-red flex items-center justify-center text-accent-red mb-6 shadow-2xl shadow-accent-red/20">
              <User size={40} />
            </div>
            <h2 className="text-xl font-black uppercase tracking-tight">{profile.fullName || profile.companyName}</h2>
            <p className="text-[10px] text-text-secondary font-black uppercase tracking-[0.2em] mt-1 opacity-60">
              Verified {userType?.toUpperCase()}
            </p>
          </div>

          <div className="p-6 glass border border-white/5 rounded-2xl space-y-4">
             <div className="flex items-center gap-3 text-text-secondary">
                <Mail size={16} />
                <span className="text-[10px] font-bold font-mono tracking-widest">{profile.email}</span>
             </div>
             {userType === 'cosine' && profile.collegeEmail && (
               <div className="flex items-center gap-3 text-accent-red">
                  <ShieldCheck size={16} />
                  <span className="text-[10px] font-bold font-mono tracking-widest">{profile.collegeEmail}</span>
               </div>
             )}
             {userType === 'cosine' && profile.githubUrl && (
               <div className="flex items-center gap-3 text-accent-slate">
                  <Github size={16} />
                  <span className="text-[10px] font-bold font-mono tracking-widest">{profile.githubUrl}</span>
               </div>
             )}
          </div>
        </div>

        {/* Edit Form (Applied Validation) */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit(onUpdate)} className="space-y-6">
            <div className="p-8 glass border border-white/10 rounded-[32px] space-y-6">
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-accent-red mb-4">Core Identification</h3>
              
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black font-mono uppercase tracking-widest text-text-secondary ml-2">Full Name (Required)</label>
                  <input 
                    {...register('fullName')}
                    className={`w-full p-4 glass bg-white/5 border rounded-xl outline-none transition-all ${errors.fullName ? 'border-accent-red ring-1 ring-accent-red/20' : 'border-white/10 focus:border-accent-red'}`}
                  />
                  {errors.fullName && <p className="text-accent-red text-[10px] font-bold uppercase ml-2">{errors.fullName.message as string}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black font-mono uppercase tracking-widest text-text-secondary ml-2">GitHub URL (Optional)</label>
                  <input 
                    {...register('githubUrl')}
                    placeholder="https://github.com/yourusername"
                    className="w-full p-4 glass bg-white/5 border border-white/10 rounded-xl outline-none focus:border-accent-slate"
                  />
                  {errors.githubUrl && <p className="text-accent-red text-[10px] font-bold uppercase ml-2">{errors.githubUrl.message}</p>}
                </div>
              </div>
            </div>

            {userType === 'cosine' && (
              <div className="p-8 glass border border-white/10 rounded-[32px] space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase tracking-[0.3em] text-accent-red">Skill Taxonomy</h3>
                  <button 
                    type="button" 
                    onClick={() => append({ name: '', level: 'Beginner' })}
                    className="p-2 glass border border-white/10 rounded-lg text-accent-red hover:bg-white/5 transition-all"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-12 gap-4 items-end">
                      <div className="col-span-6 space-y-2">
                        <label className="text-[8px] font-black font-mono uppercase tracking-widest text-text-secondary ml-2">Skill Name</label>
                        <input 
                          {...register(`skillTags.${index}.name` as const)}
                          placeholder="e.g. React"
                          className="w-full p-3 glass bg-white/5 border border-white/10 rounded-xl outline-none focus:border-accent-red text-sm"
                        />
                      </div>
                      <div className="col-span-4 space-y-2">
                        <label className="text-[8px] font-black font-mono uppercase tracking-widest text-text-secondary ml-2">Level</label>
                        <select 
                          {...register(`skillTags.${index}.level` as const)}
                          className="w-full p-3 glass bg-white/5 border border-white/10 rounded-xl outline-none focus:border-accent-red text-xs uppercase font-black"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </div>
                      <div className="col-span-2 pb-1">
                        <button 
                          type="button" 
                          onClick={() => remove(index)}
                          className="p-3 text-text-secondary hover:text-accent-red transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.skillTags && <p className="text-accent-red text-[10px] font-bold uppercase text-center">{errors.skillTags.message}</p>}
              </div>
            )}

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all ${
                (!isDirty || Object.keys(errors).length > 0)
                ? 'bg-white/5 text-text-secondary cursor-not-allowed border border-white/5 opacity-50' 
                : 'bg-text-primary text-bg-primary shadow-xl shadow-text-primary/10'
              }`}
            >
              <Save size={18} /> Sync Identity Changes
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}
