import React from 'react';
import { motion } from 'motion/react';

export function ScanLines() {
  return (
    <>
      {/* Horizontal scan line */}
      <motion.div
        className="fixed left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#6FB98F]/30 to-transparent pointer-events-none z-30"
        animate={{
          top: ['0%', '100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Vertical scan line */}
      <motion.div
        className="fixed top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#6FB98F]/20 to-transparent pointer-events-none z-30"
        animate={{
          left: ['0%', '100%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Static scan lines overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-20 opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #6FB98F 2px, #6FB98F 4px)',
        }}
      />
    </>
  );
}
