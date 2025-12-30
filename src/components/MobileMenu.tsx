import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Linkedin, Github, Send } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { MenuParticleEffect } from './MenuParticleEffect';

import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export function MobileMenu({ isOpen, onClose, activeSection, onNavigate }: MobileMenuProps) {
  const { playClickSound, playHoverSound, playGlitchSound } = useSoundEffects();
  const { t } = useLanguage();
  const [currentTime, setCurrentTime] = useState('');

  const menuItems = [
    { id: 'services', label: t('nav.services'), number: '01' },
    { id: 'portfolio', label: t('nav.portfolio'), number: '02' },
    { id: 'about', label: t('nav.about'), number: '03' },
    { id: 'team', label: t('nav.team'), number: '04' },
    { id: 'contact', label: t('nav.contact'), number: '05' },
  ];

  useEffect(() => {
    // Update time every second
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Lock scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      playGlitchSound();
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]); // playGlitchSound is intentionally omitted - we only want to play sound on menu open

  const handleNavigate = (sectionId: string) => {
    playClickSound();
    onNavigate(sectionId);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Particle effect */}
          <MenuParticleEffect />

          {/* HUD Elements - Top Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-6 left-6 text-[10px] font-mono text-[#6FB98F]/60"
          >
            <motion.div
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              SYSTEM_STATUS: ACTIVE
            </motion.div>
            <div className="mt-1 text-[#6FB98F]/40">
              NAV_MODE: MOBILE
            </div>
          </motion.div>

          {/* HUD Elements - Top Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-6 right-6 text-right text-[10px] font-mono"
          >
            <div className="text-[#6FB98F]">{currentTime}</div>
            <div className="mt-1 text-[#6FB98F]/40">
              GMT+5 TASHKENT
            </div>
          </motion.div>

          {/* Navigation Items - Center */}
          <div className="relative flex flex-col items-center justify-center gap-8">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{
                  delay: 0.1 + index * 0.1,
                  duration: 0.4,
                }}
                onClick={() => handleNavigate(item.id)}
                onMouseEnter={playHoverSound}
                className="group relative"
              >
                <div className="flex items-center gap-4">
                  {/* Number indicator */}
                  <span className="text-[#6FB98F]/40 font-mono text-sm group-hover:text-[#6FB98F] transition-colors">
                    {item.number}
                  </span>

                  {/* Divider */}
                  <motion.div
                    className="w-6 h-px bg-[#6FB98F]/40 group-hover:bg-[#6FB98F]"
                    whileHover={{ width: 40 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Label */}
                  <span
                    className={`text-3xl font-mono tracking-wider transition-all duration-300 ${activeSection === item.id
                        ? 'text-[#6FB98F]'
                        : 'text-gray-400 group-hover:text-[#6FB98F]'
                      }`}
                    style={{ fontWeight: 600 }}
                  >
                    {item.label}
                  </span>
                </div>

                {/* Glitch effect on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  animate={{
                    textShadow: [
                      '2px 0 0 rgba(255, 0, 0, 0.3), -2px 0 0 rgba(0, 255, 0, 0.3)',
                      '-2px 0 0 rgba(255, 0, 0, 0.3), 2px 0 0 rgba(0, 255, 0, 0.3)',
                      '0 0 0 rgba(255, 0, 0, 0.3), 0 0 0 rgba(0, 255, 0, 0.3)',
                    ],
                  }}
                  transition={{
                    duration: 0.15,
                    repeat: Infinity,
                  }}
                />

                {/* Active indicator */}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeMobileSection"
                    className="absolute -left-8 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#6FB98F]"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                )}
              </motion.button>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4"
            >
              <LanguageSwitcher />
            </motion.div>
          </div>

          {/* HUD Elements - Bottom Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-6 left-6 text-[10px] font-mono text-[#6FB98F]/40"
          >
            <div>COORD: 41.2995°N</div>
            <div className="mt-1">69.2401°E</div>
          </motion.div>

          {/* Social Links - Bottom Center */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-6"
          >
            {[
              { icon: Github, label: 'GitHub', href: '#' },
              { icon: Linkedin, label: 'LinkedIn', href: '#' },
              { icon: Send, label: 'Telegram', href: '#' },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
                className="group relative w-12 h-12 rounded-lg flex items-center justify-center border border-[#6FB98F]/20 hover:border-[#6FB98F]/60 transition-colors"
                style={{
                  background: 'rgba(111, 185, 143, 0.05)',
                }}
              >
                <Icon className="w-5 h-5 text-[#6FB98F]/60 group-hover:text-[#6FB98F] transition-colors" strokeWidth={1.5} />

                {/* Glow on hover */}
                <motion.div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
                  style={{
                    boxShadow: '0 0 20px rgba(111, 185, 143, 0.3)',
                  }}
                  transition={{ duration: 0.3 }}
                />
              </a>
            ))}
          </motion.div>

          {/* System Info - Bottom Right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-6 right-6 text-right text-[10px] font-mono text-[#6FB98F]/40"
          >
            <div>BUILD: 2024.12.30</div>
            <div className="mt-1">VER: 1.0.0</div>
          </motion.div>

          {/* Scan lines overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-5"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #6FB98F 2px, #6FB98F 4px)',
            }}
          />

          {/* Corner markers */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#6FB98F]/30" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[#6FB98F]/30" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[#6FB98F]/30" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#6FB98F]/30" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}