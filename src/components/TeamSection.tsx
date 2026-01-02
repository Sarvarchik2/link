import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GlitchText } from './GlitchText';
import { TeamCard } from './TeamCard';
import { useLanguage } from '../context/LanguageContext';

export function TeamSection() {
  const { t } = useLanguage();
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      skipSnaps: false,
      dragFree: false
    },
    [
      Autoplay({ delay: 4000, stopOnInteraction: true })
    ]
  );

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const teamMembers = [
    {
      id: '001',
      name: 'ULUGBEK',
      role: 'FULL STACK & AI',
      accessLevel: 'ALPHA',
      status: 'ONLINE',
      photo: '/images/team/ulugbek.jpg',
      specialization: 'FULL-STACK/AI',
    },
    {
      id: '002',
      name: 'ABDULLOH',
      role: t('team.roles.backend'),
      accessLevel: 'BETA',
      status: 'ONLINE',
      photo: '/images/team/abdulloh.jpg',
      specialization: 'DJANGO/PYTHON',
    },
    {
      id: '003',
      name: 'SARVAR',
      role: t('team.roles.frontend'),
      accessLevel: 'BETA',
      status: 'ONLINE',
      photo: '/images/team/sarvar.jpg',
      specialization: 'NUXT.JS/VUE',
    },
    {
      id: '004',
      name: 'BEHRUZ',
      role: 'PROJECT MANAGER',
      accessLevel: 'GAMMA',
      status: 'ONLINE',
      photo: '/images/team/behruz.jpg',
      specialization: 'AGILE/SCRUM',
    },
    {
      id: '005',
      name: 'ASAD',
      role: 'UI/UX DESIGNER',
      accessLevel: 'BETA',
      status: 'ONLINE',
      photo: '/images/team/asad.jpg',
      specialization: 'FIGMA/PROTOTYPING',
    },
    {
      id: '006',
      name: 'JOVOHIR',
      role: 'BACKEND & MOBILE',
      accessLevel: 'GAMMA',
      status: 'ONLINE',
      photo: '/images/team/jovohir.jpg',
      specialization: 'PYTHON/FLUTTER',
    },
    {
      id: '007',
      name: 'FERUZ',
      role: 'FULL STACK & AI',
      accessLevel: 'ALPHA',
      status: 'ONLINE',
      photo: '/images/team/feruz.jpg',
      specialization: 'FULL-STACK/AI',
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden" id="team">
      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-6">
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

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-[10px] font-mono text-[#6FB98F]/60"
          >
            UNIT_STATUS: ALL_SYSTEMS_OPERATIONAL / TEAM_SIZE: {teamMembers.length} / ACCESS_CLEARANCE: VERIFIED
          </motion.div>
        </motion.div>
      </div>

      {/* Carousel Container - Full Width */}
      <div className="relative group w-full">
        {/* Navigation Buttons */}
        <button
          onClick={scrollPrev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 border border-[#6FB98F]/30 text-[#6FB98F] opacity-0 group-hover:opacity-100 transition-all hover:bg-[#6FB98F]/10 hover:border-[#6FB98F] disabled:opacity-0 backdrop-blur-sm"
          disabled={!prevBtnEnabled && false}
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <button
          onClick={scrollNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 border border-[#6FB98F]/30 text-[#6FB98F] opacity-0 group-hover:opacity-100 transition-all hover:bg-[#6FB98F]/10 hover:border-[#6FB98F] disabled:opacity-0 backdrop-blur-sm"
          disabled={!nextBtnEnabled && false}
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_30%] xl:flex-[0_0_22%] min-w-0 pl-4 relative"
              >
                <div className="mx-2 md:mx-4 transition-all duration-300 transform">
                  <TeamCard
                    member={member}
                    isActive={index === selectedIndex}
                    index={index}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Container */}
      <div className="max-w-7xl mx-auto px-6">
        {/* Bottom HUD Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-between items-center text-[10px] font-mono text-[#6FB98F]/40"
        >
          <div>
            SCAN_MODE: AUTONOMOUS / REFRESH_RATE: 60Hz
          </div>
          <div>
            SECURITY_LEVEL: MAXIMUM / ENCRYPTION: AES-256
          </div>
        </motion.div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {teamMembers.map((_, index) => (
            <button
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${index === selectedIndex ? 'bg-[#6FB98F] w-4' : 'bg-[#6FB98F]/20'
                }`}
              onClick={() => emblaApi && emblaApi.scrollTo(index)}
            />
          ))}
        </div>
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
