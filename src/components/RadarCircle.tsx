import React from 'react';
import { motion } from 'motion/react';

export function RadarCircle() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Outer rotating circle */}
      <motion.svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        animate={{ rotate: 360 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="url(#radarGradient)"
          strokeWidth="0.5"
          strokeDasharray="10 5"
        />
        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6FB98F" stopOpacity="0" />
            <stop offset="50%" stopColor="#6FB98F" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#6FB98F" stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Scanning sweep */}
      <motion.svg
        className="absolute w-full h-full"
        viewBox="0 0 100 100"
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <defs>
          <radialGradient id="sweepGradient">
            <stop offset="0%" stopColor="#6FB98F" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6FB98F" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path
          d="M 50 50 L 50 5 A 45 45 0 0 1 80 20 Z"
          fill="url(#sweepGradient)"
        />
      </motion.svg>

      {/* Pulsing center dot */}
      <motion.div
        className="absolute w-2 h-2 bg-[#6FB98F] rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
    </div>
  );
}
