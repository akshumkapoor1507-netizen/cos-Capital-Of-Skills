import React from 'react';
import { motion } from 'motion/react';
import { 
  CreditCard, ShieldCheck, Zap, Download, RefreshCw, 
  ExternalLink, Calendar, Receipt, ChevronRight, 
  Trophy, Briefcase, Users
} from 'lucide-react';

export default function SubscriptionView() {
  const invoices = [
    { id: 'inv_001', date: 'Oct 12, 2026', amount: '$499.00', plan: 'Elite Partner', status: 'Paid' },
    { id: 'inv_002', date: 'Sep 12, 2026', amount: '$499.00', plan: 'Elite Partner', status: 'Paid' },
    { id: 'inv_003', date: 'Aug 12, 2026', amount: '$499.00', plan: 'Elite Partner', status: 'Paid' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10 pb-20"
    >
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-text-primary dark:text-white mb-2">
            Subscription & Billing
          </h2>
          <p className="text-text-secondary font-bold uppercase tracking-widest text-[10px] opacity-60">
            Premium account management for Institutional Partners
          </p>
        </div>
        <div className="flex items-center gap-3 bg-accent-red/5 border border-accent-red/10 px-4 py-2 rounded-xl">
          <ShieldCheck size={14} className="text-accent-red" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-red">Verified Corporate Entity</span>
        </div>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Current Plan Hero */}
        <div className="lg:col-span-8">
          <div className="relative bg-bg-surface border border-white/5 p-10 rounded-[48px] overflow-hidden shadow-2xl">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-amber/10 blur-[100px] -translate-y-1/2 translate-x-1/2 -z-10" />
            
            <div className="flex flex-col md:flex-row gap-10">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-accent-amber/20 border border-accent-amber/30 rounded-lg text-accent-amber text-[10px] font-black uppercase tracking-[0.2em]">
                    Active Plan
                  </span>
                </div>
                <h3 className="text-5xl font-black italic text-text-primary dark:text-white uppercase tracking-tighter mb-4">
                  ELITE PARTNER
                </h3>
                <p className="text-text-secondary text-sm font-medium leading-relaxed max-w-md mb-8">
                  You are on our top-tier institutional plan. Access to premium candidate verification protocols and real-time ecosystem movement alerts is fully enabled.
                </p>
                <div className="flex gap-4">
                  <button className="px-8 py-4 bg-white/5 border border-white/10 text-text-primary dark:text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-white/10 transition-all">
                    MANAGE USERS
                  </button>
                </div>
              </div>

              {/* Usage Metrics */}
              <div className="w-full md:w-64 space-y-4">
                 <UsageCard label="Active Portfolio Views" current={420} max={1000} icon={<Users size={14} />} />
                 <UsageCard label="Gig Postings" current={8} max={25} icon={<Briefcase size={14} />} />
                 <UsageCard label="Arena Hosting Credits" current={3} max={5} icon={<Trophy size={14} />} />
              </div>
            </div>
          </div>
        </div>

        {/* Payment & Support */}
        <div className="lg:col-span-4 space-y-8">
          {/* Payment Card */}
          <div className="bg-bg-surface border border-white/5 p-8 rounded-[40px] shadow-xl">
             <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary mb-8">
               PAYMENT METHOD
             </h4>
             <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-10 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
                   <CreditCard size={24} className="text-white/40" />
                </div>
                <div>
                   <p className="text-sm font-black text-text-primary dark:text-white">VISA •••• 4242</p>
                   <p className="text-[10px] font-bold text-text-secondary uppercase">Expires 12/28</p>
                </div>
             </div>
             <div className="flex items-center gap-3 p-4 bg-white/[0.03] rounded-2xl border border-white/5 mb-8">
                <Calendar size={14} className="text-accent-red" />
                <div>
                   <p className="text-[9px] font-black text-text-secondary uppercase">Next Billing Cycle</p>
                   <p className="text-xs font-black text-text-primary dark:text-white uppercase tracking-tight">Nov 12, 2026</p>
                </div>
             </div>
             <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-text-primary dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all flex items-center justify-center gap-2">
               Update Payment <RefreshCw size={12} />
             </button>
          </div>

          <div className="p-8 bg-accent-red/5 border border-accent-red/10 rounded-[40px]">
             <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-red mb-4 flex items-center gap-2">
               <Zap size={12} /> Priority Support
             </h4>
             <p className="text-xs text-text-primary font-medium leading-relaxed opacity-80 mb-6">
               As an Elite Partner, you have a dedicated account strategist.
             </p>
             <button className="text-[10px] font-black uppercase tracking-widest text-text-primary dark:text-white flex items-center gap-2 group">
               Contact Strategist <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="lg:col-span-12">
           <div className="bg-bg-surface border border-white/5 rounded-[48px] overflow-hidden shadow-2xl">
             <div className="p-10 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-text-primary dark:text-white flex items-center gap-3">
                  <Receipt size={16} className="text-accent-red" /> Invoice History
                </h3>
                <span className="text-[10px] font-bold text-text-secondary uppercase opacity-40">Previous 12 Months</span>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full">
                   <thead>
                      <tr className="bg-black/20">
                         <th className="px-10 py-5 text-left text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-40">Invoice ID</th>
                         <th className="px-10 py-5 text-left text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-40">Date</th>
                         <th className="px-10 py-5 text-left text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-40">Tier</th>
                         <th className="px-10 py-5 text-left text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-40">Amount</th>
                         <th className="px-10 py-5 text-right text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-40">Action</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                      {invoices.map((inv) => (
                         <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="px-10 py-6">
                               <span className="text-xs font-mono font-black text-text-primary dark:text-white">{inv.id}</span>
                            </td>
                            <td className="px-10 py-6">
                               <span className="text-xs font-black text-text-primary dark:text-white uppercase tracking-tight">{inv.date}</span>
                            </td>
                            <td className="px-10 py-6">
                               <span className="text-[10px] font-black text-text-secondary uppercase">{inv.plan}</span>
                            </td>
                            <td className="px-10 py-6">
                               <span className="text-xs font-mono font-black text-text-primary dark:text-white">{inv.amount}</span>
                            </td>
                            <td className="px-10 py-6 text-right">
                               <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-text-secondary hover:text-white hover:bg-white/10 transition-all">
                                  <Download size={16} />
                               </button>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
             <div className="p-8 bg-black/10 text-center">
                <button className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary hover:text-white transition-colors flex items-center gap-2 mx-auto">
                   View Full Billing Portal <ExternalLink size={12} />
                </button>
             </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
}

function UsageCard({ label, current, max, icon }: { label: string, current: number, max: number, icon: React.ReactNode }) {
  const percentage = (current / max) * 100;
  return (
    <div className="bg-white/5 border border-white/5 p-5 rounded-3xl group hover:border-white/10 transition-all">
      <div className="flex items-center justify-between mb-3">
         <div className="flex items-center gap-2">
            <div className="text-accent-red opacity-60">{icon}</div>
            <span className="text-[8px] font-black uppercase tracking-widest text-text-secondary">{label}</span>
         </div>
         <span className="text-[10px] font-black font-mono text-text-primary dark:text-white">{current}/{max}</span>
      </div>
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
         <motion.div 
           initial={{ width: 0 }}
           animate={{ width: `${percentage}%` }}
           className="h-full bg-accent-red shadow-[0_0_8px_rgba(255,42,42,0.4)]"
         />
      </div>
    </div>
  );
}
