import React, { useState } from 'react';
import { motion } from 'motion/react';

interface GlitchOnHoverProps {
  children: string;
  className?: string;
}

const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export function GlitchOnHover({ children, className = '' }: GlitchOnHoverProps) {
  const [displayText, setDisplayText] = useState(children);
  const [isGlitching, setIsGlitching] = useState(false);

  const startGlitch = () => {
    if (isGlitching) return;
    
    setIsGlitching(true);
    const originalText = children;
    let iterations = 0;
    const maxIterations = 10;

    const glitchInterval = setInterval(() => {
      if (iterations >= maxIterations) {
        clearInterval(glitchInterval);
        setDisplayText(originalText);
        setIsGlitching(false);
        return;
      }

      const glitchedText = originalText
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (Math.random() < 0.3) {
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          }
          return iterations > maxIterations / 2 ? originalText[index] : char;
        })
        .join('');

      setDisplayText(glitchedText);
      iterations++;
    }, 50);
  };

  return (
    <motion.span
      className={className}
      onMouseEnter={startGlitch}
      style={{
        display: 'inline-block',
        cursor: 'pointer',
      }}
      whileHover={{
        textShadow: isGlitching ? [
          '2px 0 0 rgba(255, 0, 0, 0.5), -2px 0 0 rgba(0, 255, 0, 0.5)',
          '-2px 0 0 rgba(255, 0, 0, 0.5), 2px 0 0 rgba(0, 255, 0, 0.5)',
          '0 0 0 rgba(255, 0, 0, 0.5), 0 0 0 rgba(0, 255, 0, 0.5)',
        ] : 'none',
      }}
      transition={{
        textShadow: {
          duration: 0.1,
          repeat: isGlitching ? Infinity : 0,
        },
      }}
    >
      {displayText}
    </motion.span>
  );
}
