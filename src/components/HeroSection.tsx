import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ParticleNetwork } from './ParticleNetwork';
import { GlitchText } from './GlitchText';
import { MagneticButton } from './MagneticButton';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { ScanningLine } from './ScanningLine';
import { useLanguage } from '../context/LanguageContext';

export function HeroSection() {
  const { playWhooshSound } = useSoundEffects();
  const { t } = useLanguage();

  const handleStartProject = () => {
    playWhooshSound();
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleNetwork />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* Scanning line effect */}
          <ScanningLine />

          <h1 className="text-3xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] leading-none tracking-tighter mb-8 text-white font-mono" style={{ fontWeight: 900 }}>
            <GlitchText>{t('hero.line1')}</GlitchText><br />
            <GlitchText>{t('hero.line2')}</GlitchText><br />
            <GlitchText>{t('hero.line3')}</GlitchText>
          </h1>

          <motion.p
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-mono"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <MagneticButton
              onClick={handleStartProject}
              className="group relative px-8 py-4 bg-transparent border border-[#6FB98F] text-[#6FB98F] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(111,185,143,0.4)]"
              style={{
                fontWeight: 600,
              }}
            >
              <span className="relative z-10 flex items-center gap-2 uppercase tracking-wider font-mono">
                {t('hero.start_project')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
              </span>

              {/* Glowing outline effect */}
              <motion.div
                className="absolute inset-0 border-2 border-[#6FB98F] rounded-lg"
                animate={{
                  opacity: [0, 0.5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1, duration: 0.5 },
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        }}
      >
        <div className="w-6 h-10 border-2 border-[#6FB98F] rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-[#6FB98F] rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}