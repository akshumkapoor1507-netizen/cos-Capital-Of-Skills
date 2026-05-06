import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { motion, AnimatePresence } from 'motion/react';

export default function ThemeToggle() {
  const { theme, setTheme } = useUserStore();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button 
      onClick={toggleTheme}
      className="relative w-16 h-8 rounded-full bg-bg-surface border border-border-custom flex items-center p-1.5 cursor-pointer group hover:border-accent-red/50 transition-all overflow-hidden shadow-inner"
    >
      <div className="absolute inset-0 bg-accent-red/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <motion.div 
        layout
        className="z-10 w-5 h-5 rounded-full bg-accent-red shadow-[0_0_15px_rgba(255,31,31,0.5)] flex items-center justify-center text-white"
        animate={{ 
          x: theme === 'dark' ? 32 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <AnimatePresence mode="wait">
          {theme === 'dark' ? (
            <motion.div
              key="moon"
              initial={{ scale: 0.5, rotate: -45, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotate: 45, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Moon size={10} fill="currentColor" strokeWidth={3} />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ scale: 0.5, rotate: -45, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotate: 45, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Sun size={10} fill="currentColor" strokeWidth={3} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      <div className="flex-1 flex justify-between px-2 text-[7px] font-black font-mono uppercase tracking-[0.2em] pointer-events-none opacity-40 select-none">
        <span className={theme === 'light' ? 'text-accent-red opacity-100' : ''}>OFF</span>
        <span className={theme === 'dark' ? 'text-accent-red opacity-100' : ''}>ON</span>
      </div>
    </button>
  );
}
