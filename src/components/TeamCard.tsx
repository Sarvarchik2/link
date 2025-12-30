import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  accessLevel: string;
  status: string;
  photo: string;
  specialization: string;
}

interface TeamCardProps {
  member: TeamMember;
  isActive: boolean;
  index: number;
}

export function TeamCard({ member, isActive, index }: TeamCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  // 3D Tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Trigger glitch effect randomly when card becomes active
  React.useEffect(() => {
    if (isActive && !isGlitching) {
      const timer = setTimeout(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 300);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isActive, isGlitching]);

  return (
    <motion.div
      className="relative flex-shrink-0"
      style={{
        width: 320,
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        scale: isActive ? 1.05 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative h-[480px] rounded-2xl overflow-hidden"
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
          background: 'rgba(111, 185, 143, 0.03)',
          backdropFilter: 'blur(12px)',
          border: isActive ? '1px solid rgba(111, 185, 143, 0.6)' : '0.5px solid rgba(111, 185, 143, 0.2)',
          boxShadow: isActive 
            ? '0 0 40px rgba(111, 185, 143, 0.4), inset 0 0 20px rgba(111, 185, 143, 0.1)' 
            : 'none',
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Photo Container */}
        <div className="relative h-72 overflow-hidden">
          {/* Black and white filter */}
          <div
            className="absolute inset-0 z-10 mix-blend-overlay pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.1))',
            }}
          />

          {/* Scan lines */}
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none opacity-30"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #6FB98F 2px, #6FB98F 3px)',
            }}
            animate={{
              opacity: isActive ? [0.2, 0.4, 0.2] : 0.3,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />

          {/* Digital noise overlay */}
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
              opacity: 0.1,
            }}
          />

          {/* Photo */}
          <motion.div
            className="relative w-full h-full"
            animate={{
              filter: isActive 
                ? 'grayscale(0%) contrast(1.1)' 
                : 'grayscale(100%) contrast(1.3)',
            }}
            transition={{ duration: 0.3 }}
          >
            <ImageWithFallback
              src={member.photo}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Glitch effect */}
          {isGlitching && (
            <>
              <motion.div
                className="absolute inset-0 z-30"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.8, 0, 0.6, 0],
                  x: [-5, 5, -3, 3, 0],
                }}
                transition={{ duration: 0.3 }}
                style={{
                  background: 'rgba(255, 0, 0, 0.3)',
                  mixBlendMode: 'screen',
                }}
              />
              <motion.div
                className="absolute inset-0 z-30"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.8, 0, 0.6, 0],
                  x: [5, -5, 3, -3, 0],
                }}
                transition={{ duration: 0.3 }}
                style={{
                  background: 'rgba(0, 255, 0, 0.3)',
                  mixBlendMode: 'screen',
                }}
              />
            </>
          )}

          {/* Status indicator */}
          <motion.div
            className="absolute top-4 right-4 z-30 flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-[10px]"
            style={{
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
              border: '0.5px solid rgba(111, 185, 143, 0.3)',
            }}
            animate={{
              opacity: isActive ? 1 : 0.7,
            }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-[#6FB98F]"
              animate={{
                opacity: [0.5, 1, 0.5],
                boxShadow: [
                  '0 0 4px rgba(111, 185, 143, 0.6)',
                  '0 0 12px rgba(111, 185, 143, 1)',
                  '0 0 4px rgba(111, 185, 143, 0.6)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <span className="text-[#6FB98F]">{member.status}</span>
          </motion.div>
        </div>

        {/* Info Container */}
        <div className="p-6 space-y-4">
          {/* ID Badge */}
          <div className="flex items-center justify-between mb-3">
            <div
              className="px-3 py-1 rounded font-mono text-[10px] text-[#6FB98F]"
              style={{
                background: 'rgba(111, 185, 143, 0.1)',
                border: '0.5px solid rgba(111, 185, 143, 0.3)',
              }}
            >
              ID: {member.id}_OPR
            </div>
            <div
              className="px-3 py-1 rounded font-mono text-[10px]"
              style={{
                background: member.accessLevel === 'ALPHA' 
                  ? 'rgba(111, 185, 143, 0.2)' 
                  : 'rgba(111, 185, 143, 0.1)',
                border: '0.5px solid rgba(111, 185, 143, 0.3)',
                color: member.accessLevel === 'ALPHA' ? '#6FB98F' : '#6FB98F99',
              }}
            >
              ACCESS: {member.accessLevel}
            </div>
          </div>

          {/* Name */}
          <motion.h3
            className="text-xl font-mono text-white"
            style={{ fontWeight: 600, letterSpacing: '0.05em' }}
            animate={{
              textShadow: isActive 
                ? '0 0 10px rgba(111, 185, 143, 0.5)' 
                : 'none',
            }}
          >
            {member.name}
          </motion.h3>

          {/* Role */}
          <div className="text-sm font-mono text-[#6FB98F]">
            {member.role}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#6FB98F]/30 to-transparent" />

          {/* Specialization */}
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-gray-500">SPEC:</span>
            <span className="text-gray-400">{member.specialization}</span>
          </div>

          {/* Technical data */}
          <div className="flex items-center justify-between text-[10px] font-mono text-gray-600">
            <span>UPTIME: 99.9%</span>
            <span>CERT: VERIFIED</span>
          </div>
        </div>

        {/* Corner brackets */}
        <motion.div
          className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-[#6FB98F]/40"
          animate={{
            opacity: isActive ? 1 : 0.3,
          }}
        />
        <motion.div
          className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-[#6FB98F]/40"
          animate={{
            opacity: isActive ? 1 : 0.3,
          }}
        />
        <motion.div
          className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-[#6FB98F]/40"
          animate={{
            opacity: isActive ? 1 : 0.3,
          }}
        />
        <motion.div
          className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-[#6FB98F]/40"
          animate={{
            opacity: isActive ? 1 : 0.3,
          }}
        />

        {/* Circuit pattern overlay (subtle) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236FB98F' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
