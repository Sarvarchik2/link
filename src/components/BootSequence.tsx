import React from 'react';
import { motion } from 'motion/react';

interface BootSequenceProps {
  text: string;
  isGlitching?: boolean;
}

export function BootSequence({ text, isGlitching = false }: BootSequenceProps) {
  if (isGlitching) {
    return (
      <motion.div
        className="text-[#6FB98F] text-2xl font-mono"
        animate={{
          x: [-2, 2, -1, 1, 0],
          textShadow: [
            '2px 0 0 #ff0000, -2px 0 0 #00ff00',
            '-2px 0 0 #ff0000, 2px 0 0 #00ff00',
            '0 0 0 #ff0000, 0 0 0 #00ff00',
          ],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatType: 'mirror',
        }}
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            animate={{
              opacity: [1, 0.3, 1],
              y: [0, -2, 0, 2, 0],
            }}
            transition={{
              duration: 0.15,
              delay: index * 0.02,
              repeat: Infinity,
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  return (
    <div className="text-[#6FB98F] font-mono text-sm md:text-base">
      {text}
    </div>
  );
}
