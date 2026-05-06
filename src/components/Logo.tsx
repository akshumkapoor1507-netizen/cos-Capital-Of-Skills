import React from 'react';
import { motion } from 'motion/react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-24',
    xl: 'h-36'
  };

  const fontSizes = {
    sm: '1.25rem',
    md: '2rem',
    lg: '4rem',
    xl: '6rem'
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative inline-flex items-center justify-center select-none group cursor-pointer transition-all ${sizes[size]} ${className}`}
    >
      <div className="flex items-center gap-0 tracking-tight relative" style={{ fontSize: fontSizes[size], lineHeight: 1 }}>
        {/* Letter C */}
        <span 
          className="text-[#FF7A00] relative drop-shadow-[2px_2px_0px_rgba(0,0,0,0.1)]"
          style={{ fontFamily: "'Rubik Dirt', system-ui" }}
        >
          c
        </span>

        {/* Letter O */}
        <div className="relative flex items-center justify-center">
          <span 
            className="bg-gradient-to-b from-[#00A294] to-[#86C82D] bg-clip-text text-transparent relative drop-shadow-[2px_2px_0px_rgba(0,0,0,0.1)]"
            style={{ fontFamily: "'Rubik Glitch', system-ui" }}
          >
            o
          </span>
          <motion.div 
            animate={{ 
              opacity: [0.3, 0.6, 0.3],
              x: [-1, 1, -1]
            }}
            transition={{ duration: 0.2, repeat: Infinity }}
            className="absolute top-[48%] left-[-10%] w-[120%] h-[2px] bg-white/10 z-30 pointer-events-none" 
          />
        </div>

        {/* Letter S */}
        <span 
          className="text-[#FF7A00] relative drop-shadow-[2px_2px_0px_rgba(0,0,0,0.1)]"
          style={{ fontFamily: "'Rubik Dirt', system-ui" }}
        >
          s
        </span>
      </div>
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-10 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] bg-repeat" />
    </motion.div>
  );
}
