import React from 'react';
import { motion } from 'motion/react';

export function BackgroundGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Vertical lines */}
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="rgba(111, 185, 143, 0.05)"
              strokeWidth="0.5"
            />
          </pattern>
          <pattern id="grid-small" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(111, 185, 143, 0.02)"
              strokeWidth="0.3"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect width="100%" height="100%" fill="url(#grid-small)" />
        
        {/* Highlighted accent lines */}
        <motion.line
          x1="33%"
          y1="0"
          x2="33%"
          y2="100%"
          stroke="rgba(111, 185, 143, 0.1)"
          strokeWidth="1"
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.line
          x1="66%"
          y1="0"
          x2="66%"
          y2="100%"
          stroke="rgba(111, 185, 143, 0.1)"
          strokeWidth="1"
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4,
            delay: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </svg>

      {/* Corner markers */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-[#6FB98F]/30" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-[#6FB98F]/30" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-[#6FB98F]/30" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-[#6FB98F]/30" />
    </div>
  );
}
