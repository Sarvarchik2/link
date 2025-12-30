import React from 'react';
import { motion } from 'motion/react';

export function ScanningLine() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#6FB98F] to-transparent"
        style={{
          filter: 'drop-shadow(0 0 8px rgba(111, 185, 143, 0.8))',
        }}
        animate={{
          top: ['-2px', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 2,
        }}
      />
      
      {/* Secondary scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#6FB98F]/50 to-transparent"
        animate={{
          top: ['-1px', '100%'],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 3,
        }}
      />
    </div>
  );
}
