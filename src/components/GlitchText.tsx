import React, { useState } from 'react';
import { motion } from 'motion/react';

interface GlitchTextProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
}

export function GlitchText({ children, className = '', style }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchText, setGlitchText] = useState(children);

  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  const handleMouseEnter = () => {
    setIsGlitching(true);
    let iterations = 0;
    const maxIterations = 3;

    const interval = setInterval(() => {
      setGlitchText(
        children
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (Math.random() < 0.5) {
              return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            }
            return char;
          })
          .join('')
      );

      iterations++;
      if (iterations >= maxIterations) {
        clearInterval(interval);
        setGlitchText(children);
        setIsGlitching(false);
      }
    }, 50);
  };

  return (
    <motion.span
      className={className}
      style={style}
      onMouseEnter={handleMouseEnter}
      animate={isGlitching ? { x: [-2, 2, -1, 1, 0] } : {}}
      transition={{ duration: 0.2 }}
    >
      {glitchText}
    </motion.span>
  );
}
