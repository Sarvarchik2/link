import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { MobileMenu } from './MobileMenu';
import { MenuToggleButton } from './MenuToggleButton';

import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';

export function Navigation() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { playHoverSound, playClickSound } = useSoundEffects();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = ['home', 'services', 'portfolio', 'about', 'team', 'contact'];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    playClickSound();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleMobileMenuToggle = () => {
    playClickSound();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'services', label: t('nav.services') },
    { id: 'portfolio', label: t('nav.portfolio') },
    { id: 'about', label: t('nav.about') },
    { id: 'team', label: t('nav.team') },
    { id: 'contact', label: t('nav.contact') },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-card border-b border-[#6FB98F]/20' : ''
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            onMouseEnter={playHoverSound}
            className="text-xl tracking-wider text-white hover:text-[#6FB98F] transition-colors font-mono"
            style={{ fontWeight: 700 }}
          >
            LINK<span className="text-[#6FB98F]">-</span>DIGITAL
          </button>

          {/* Navigation items - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={playHoverSound}
                className="relative text-sm uppercase tracking-wider text-gray-400 hover:text-[#6FB98F] transition-colors font-mono"
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#6FB98F]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}

            <div className="ml-2 border-l border-white/10 pl-6 h-6 flex items-center">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile menu toggle button */}
          <div className="md:hidden">
            <MenuToggleButton
              isOpen={isMobileMenuOpen}
              onClick={handleMobileMenuToggle}
              onMouseEnter={playHoverSound}
            />
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />
    </>
  );
}