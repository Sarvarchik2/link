import React from 'react';
import { motion } from 'motion/react';

interface LineDrawingBorderProps {
  delay?: number;
}

export function LineDrawingBorder({ delay = 0 }: LineDrawingBorderProps) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
      {/* Top line */}
      <motion.line
        x1="0"
        y1="0"
        x2="100%"
        y2="0"
        stroke="#6FB98F"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delay }}
      />
      
      {/* Right line */}
      <motion.line
        x1="100%"
        y1="0"
        x2="100%"
        y2="100%"
        stroke="#6FB98F"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      />
      
      {/* Bottom line */}
      <motion.line
        x1="100%"
        y1="100%"
        x2="0"
        y2="100%"
        stroke="#6FB98F"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delay + 0.4 }}
      />
      
      {/* Left line */}
      <motion.line
        x1="0"
        y1="100%"
        x2="0"
        y2="0"
        stroke="#6FB98F"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delay + 0.6 }}
      />

      {/* Corner accents */}
      <motion.circle
        cx="0"
        cy="0"
        r="3"
        fill="#6FB98F"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.8 }}
      />
      <motion.circle
        cx="100%"
        cy="100%"
        r="3"
        fill="#6FB98F"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.8 }}
      />
    </svg>
  );
}
