import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { GlitchText } from './GlitchText';
import { TeamCard } from './TeamCard';
import { useLanguage } from '../context/LanguageContext';

export function TeamSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const { t } = useLanguage();

  const teamMembers = [
    {
      id: '001',
      name: 'DAMIR KHALIKOV',
      role: t('team.roles.architect'),
      accessLevel: 'ALPHA',
      status: 'ONLINE',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
      specialization: 'FULL-STACK',
    },
    {
      id: '002',
      name: 'ALEKSANDR IVANOV',
      role: t('team.roles.backend'),
      accessLevel: 'BETA',
      status: 'ONLINE',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
      specialization: 'DJANGO/PYTHON',
    },
    {
      id: '003',
      name: 'ELENA PETROVA',
      role: t('team.roles.frontend'),
      accessLevel: 'BETA',
      status: 'ONLINE',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
      specialization: 'NUXT.JS/VUE',
    },
    {
      id: '004',
      name: 'MIKHAIL SOKOLOV',
      role: t('team.roles.ai'),
      accessLevel: 'GAMMA',
      status: 'ONLINE',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop',
      specialization: 'ML/AI',
    },
    {
      id: '005',
      name: 'ANASTASIA VOLKOVA',
      role: t('team.roles.mobile'),
      accessLevel: 'BETA',
      status: 'ONLINE',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop',
      specialization: 'FLUTTER/DART',
    },
    {
      id: '006',
      name: 'SERGEY NOVIKOV',
      role: t('team.roles.devops'),
      accessLevel: 'GAMMA',
      status: 'ONLINE',
      photo: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=500&fit=crop',
      specialization: 'KUBERNETES',
    },
  ];

  // Auto-scroll effect
  useEffect(() => {
    const controls = animate(x, -100 * teamMembers.length, {
      duration: 30,
      repeat: Infinity,
      ease: 'linear',
    });

    return () => controls.stop();
  }, [x, teamMembers.length]);

  // Detect center card
  useEffect(() => {
    const unsubscribe = x.on('change', (latest) => {
      const cardWidth = 320; // Width of each card + gap
      const scrollPosition = Math.abs(latest);
      const index = Math.round(scrollPosition / cardWidth) % teamMembers.length;
      setActiveIndex(index);
    });

    return () => unsubscribe();
  }, [x, teamMembers.length]);

  return (
    <section className="relative py-32 px-6 overflow-hidden" id="team">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl mb-4 text-white font-mono" style={{ fontWeight: 700 }}>
            <GlitchText>{t('team.title')}</GlitchText>
          </h2>
          <p className="text-gray-400 text-lg font-mono">{t('team.subtitle')}</p>

          {/* HUD Metadata */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-[10px] font-mono text-[#6FB98F]/60"
          >
            UNIT_STATUS: ALL_SYSTEMS_OPERATIONAL / TEAM_SIZE: {teamMembers.length} / ACCESS_CLEARANCE: VERIFIED
          </motion.div>
        </motion.div>

        {/* Central Scanner Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-32 bottom-0 w-px pointer-events-none z-10">
          <motion.div
            className="h-full w-full relative"
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, transparent, #6FB98F, transparent)',
                boxShadow: '0 0 20px rgba(111, 185, 143, 0.6), 0 0 40px rgba(111, 185, 143, 0.4)',
              }}
            />
          </motion.div>

          {/* Scanner crosshair */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <div className="w-12 h-12 border border-[#6FB98F] rounded-full relative">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-[#6FB98F]" />
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#6FB98F]" />
            </div>
          </motion.div>
        </div>

        {/* Cards Container */}
        <div className="relative" ref={containerRef}>
          <motion.div
            className="flex gap-8 py-12"
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -100 * teamMembers.length, right: 0 }}
            dragElastic={0.1}
          >
            {/* Duplicate cards for infinite scroll effect */}
            {[...teamMembers, ...teamMembers, ...teamMembers].map((member, index) => (
              <TeamCard
                key={`${member.id}-${index}`}
                member={member}
                isActive={index % teamMembers.length === activeIndex}
                index={index}
              />
            ))}
          </motion.div>
        </div>

        {/* Bottom HUD Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-between items-center text-[10px] font-mono text-[#6FB98F]/40"
        >
          <div>
            SCAN_MODE: CONTINUOUS / REFRESH_RATE: 60Hz
          </div>
          <div>
            SECURITY_LEVEL: MAXIMUM / ENCRYPTION: AES-256
          </div>
        </motion.div>

        {/* Navigation Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          viewport={{ once: true }}
          className="mt-8 text-center text-sm font-mono text-gray-500"
        >
          <span className="inline-flex items-center gap-2">
            <motion.span
              animate={{ x: [-10, 10, -10] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ←
            </motion.span>
            DRAG TO EXPLORE
            <motion.span
              animate={{ x: [-10, 10, -10] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              →
            </motion.span>
          </span>
        </motion.div>
      </div>

      {/* Ambient glow effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(111, 185, 143, 0.05) 0%, transparent 70%)',
        }}
      />
    </section>
  );
}
