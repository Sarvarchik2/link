import React from 'react';
import { motion } from 'motion/react';

interface MenuToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
}

export function MenuToggleButton({ isOpen, onClick, onMouseEnter }: MenuToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className="relative w-10 h-10 flex items-center justify-center group"
      aria-label="Toggle menu"
    >
      <div className="relative w-6 h-6 flex flex-col items-end justify-center gap-1.5">
        {/* Top line - shorter */}
        <motion.div
          className="h-[2px] bg-[#6FB98F] rounded-full origin-center"
          animate={{
            width: isOpen ? '24px' : '16px',
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 4 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          style={{
            filter: 'drop-shadow(0 0 4px rgba(111, 185, 143, 0.6))',
          }}
        />

        {/* Center dot with pulsing effect */}
        <motion.div
          className="w-1.5 h-1.5 bg-[#6FB98F] rounded-full self-center relative"
          animate={{
            scale: isOpen ? 0 : [1, 1.3, 1],
            opacity: isOpen ? 0 : 1,
          }}
          transition={{ 
            scale: { duration: 2, repeat: Infinity },
            opacity: { duration: 0.2 },
          }}
          style={{
            filter: 'drop-shadow(0 0 4px rgba(111, 185, 143, 0.8))',
          }}
        >
          {/* Outer ring pulse */}
          {!isOpen && (
            <motion.div
              className="absolute inset-0 border border-[#6FB98F] rounded-full"
              animate={{
                scale: [1, 2, 2],
                opacity: [0.8, 0, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
          )}
        </motion.div>

        {/* Bottom line - longer */}
        <motion.div
          className="h-[2px] bg-[#6FB98F] rounded-full origin-center"
          animate={{
            width: isOpen ? '24px' : '24px',
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -4 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          style={{
            filter: 'drop-shadow(0 0 4px rgba(111, 185, 143, 0.6))',
          }}
        />
      </div>

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-lg border border-[#6FB98F]/0 group-hover:border-[#6FB98F]/30 transition-colors"
        animate={{
          boxShadow: isOpen 
            ? '0 0 20px rgba(111, 185, 143, 0.4)'
            : '0 0 0px rgba(111, 185, 143, 0)',
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Pulsing effect when open */}
      {isOpen && (
        <motion.div
          className="absolute inset-0 rounded-lg border border-[#6FB98F]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      )}

      {/* Corner brackets when open */}
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            className="absolute -top-1 -left-1 w-2 h-2 border-l border-t border-[#6FB98F]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            className="absolute -top-1 -right-1 w-2 h-2 border-r border-t border-[#6FB98F]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            className="absolute -bottom-1 -left-1 w-2 h-2 border-l border-b border-[#6FB98F]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            className="absolute -bottom-1 -right-1 w-2 h-2 border-r border-b border-[#6FB98F]"
          />
        </>
      )}
    </button>
  );
}