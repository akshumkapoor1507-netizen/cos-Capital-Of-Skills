import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useUserStore, Toast } from '../store/useUserStore';

export default function ToastContainer() {
  const { toastQueue, removeToast } = useUserStore();

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4 pointer-events-none">
      <AnimatePresence>
        {toastQueue.map((toast: Toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className="pointer-events-auto min-w-[280px] p-4 glass bg-bg-secondary/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              {toast.type === 'success' && <CheckCircle2 size={18} className="text-green-500" />}
              {toast.type === 'error' && <AlertCircle size={18} className="text-accent-red" />}
              {toast.type === 'info' && <Info size={18} className="text-accent-slate" />}
              <span className="text-xs font-bold uppercase tracking-widest text-text-primary">{toast.message}</span>
            </div>
            <button 
              onClick={() => removeToast(toast.id)}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
