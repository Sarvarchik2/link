import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { GlitchText } from './GlitchText';
import { GlitchOnHover } from './GlitchOnHover';
import { LineDrawingBorder } from './LineDrawingBorder';
import { useLanguage } from '../context/LanguageContext';

export function PortfolioSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const projects = [
    {
      title: 'ABU EXPRESS',
      description: t('portfolio.projects.abuexpress.desc'),
      tech: ['React', 'Python', 'Logistics'],
      gradient: 'from-[#FFD700]/20 to-[#FFA500]/20',
      serialNumber: 'PRJ-2024-005',
      status: 'LIVE',
      image: '/images/portfolio/abuexpress.png',
      link: 'https://abuexpressgroup.com/ru'
    },
    {
      title: 'PROFYER',
      description: t('portfolio.projects.profyer.desc'),
      tech: ['Marketplace', 'Services', 'Web'],
      gradient: 'from-[#4A90E2]/20 to-[#00BFFF]/20',
      serialNumber: 'PRJ-2024-006',
      status: 'LIVE',
      image: '/images/portfolio/profyer.png',
      link: 'https://profyer.com/ru/'
    },
    {
      title: 'LIXIANG UZBEKISTAN',
      description: t('portfolio.projects.lixiang.desc'),
      tech: ['Automotive', '3D Config', 'Web'],
      gradient: 'from-[#8E44AD]/20 to-[#9B59B6]/20',
      serialNumber: 'PRJ-2024-010',
      status: 'LIVE',
      image: '/images/portfolio/lixiang.png',
      link: 'https://lixiang-uzbekistan.uz/ru'
    },
    {
      title: 'IONE GROUP',
      description: t('portfolio.projects.ione.desc'),
      tech: ['Marketing', 'Agency', 'Creative'],
      gradient: 'from-[#000000]/40 to-[#333333]/40',
      serialNumber: 'PRJ-2024-011',
      status: 'LIVE',
      image: '/images/portfolio/ione.png',
      link: 'http://ionegroup.uz/'
    },
    {
      title: 'MY SPORT UZ',
      description: t('portfolio.projects.mysport.desc'),
      tech: ['Mapbox', 'Data Vis', 'Gov'],
      gradient: 'from-[#1A5276]/40 to-[#2980B9]/40',
      serialNumber: 'PRJ-2024-012',
      status: 'LIVE',
      image: '/images/portfolio/mysport.png',
      link: 'https://mysportuz.netlify.app/'
    },
    {
      title: 'CULT BARBERSHOP',
      description: t('portfolio.projects.cult.desc'),
      tech: ['Booking', 'Service', 'Brand'],
      gradient: 'from-[#4E342E]/40 to-[#3E2723]/40',
      serialNumber: 'PRJ-2024-013',
      status: 'LIVE',
      image: '/images/portfolio/cult.png',
      link: 'https://cultbarbershop.uz/'
    },
    {
      title: 'MAKRO MARKET',
      description: t('portfolio.projects.makromarket.desc'),
      tech: ['E-commerce', 'Retail', 'Catalog'],
      gradient: 'from-[#2ECC71]/20 to-[#27AE60]/20',
      serialNumber: 'PRJ-2024-009',
      status: 'LIVE',
      image: '/images/portfolio/makromarket.png',
      link: 'https://makromarket.uz/'
    },
    {
      title: 'OZBE',
      description: t('portfolio.projects.ozbe.desc'),
      tech: ['E-commerce', 'Brand', 'Design'],
      gradient: 'from-[#D4AF37]/20 to-[#C0C0C0]/20',
      serialNumber: 'PRJ-2024-007',
      status: 'LIVE',
      image: '/images/portfolio/ozbe.png',
      link: 'https://www.ozbe.uz/'
    },
    {
      title: 'MAGIC TOUR',
      description: t('portfolio.projects.magictour.desc'),
      tech: ['Tourism', 'Booking', 'Landing'],
      gradient: 'from-[#FF6B6B]/20 to-[#4ECDC4]/20',
      serialNumber: 'PRJ-2024-008',
      status: 'LIVE',
      image: '/images/portfolio/magictour.png',
      link: 'http://magic-tour.uz/'
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden" id="portfolio">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-5xl md:text-6xl mb-4 text-white font-mono" style={{ fontWeight: 700 }}>
            <GlitchText>{t('portfolio.title')}</GlitchText>
          </h2>
          <p className="text-gray-400 text-lg font-mono">{t('portfolio.subtitle')}</p>
        </motion.div>
      </div>

      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-6 px-6 overflow-x-auto hide-scrollbar scroll-smooth"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
              onClick={() => window.open(project.link, '_blank')}
              className="flex-shrink-0 w-[90vw] md:w-[500px] rounded-2xl p-8 group cursor-pointer relative"
              style={{
                scrollSnapAlign: 'start',
                background: 'rgba(111, 185, 143, 0.03)',
                backdropFilter: 'blur(12px)',
                border: '0.5px solid rgba(111, 185, 143, 0.2)',
              }}
            >
              {/* Line drawing border */}
              <LineDrawingBorder delay={index * 0.1} />

              {/* HUD Metadata */}
              <div className="absolute top-3 left-3 text-[10px] font-mono text-[#6FB98F]/60">
                {project.serialNumber}
              </div>
              <div className="absolute top-3 right-3 flex items-center gap-2 text-[10px] font-mono">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-[#6FB98F]"
                  animate={{
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <span className="text-[#6FB98F]">{project.status}</span>
              </div>

              {/* Project preview */}
              <div className={`w-full h-64 rounded-lg mb-6 flex items-center justify-center border border-[#6FB98F]/20 group-hover:border-[#6FB98F]/40 transition-colors mt-6 relative overflow-hidden bg-black/50`}>
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
                )}

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-black/30">
                  <ExternalLink className="w-12 h-12 text-[#6FB98F]" strokeWidth={1} />
                </div>

                {/* Scanning effect on hover */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-px bg-[#6FB98F]"
                  initial={{ y: 0, opacity: 0 }}
                  whileHover={{ y: 256, opacity: 1 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>

              <h3 className="text-2xl mb-3 text-white font-mono" style={{ fontWeight: 600 }}>
                <GlitchOnHover>{project.title}</GlitchOnHover>
              </h3>

              <p className="text-gray-400 mb-6 leading-relaxed font-mono text-sm">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm font-mono rounded-full bg-[#6FB98F]/10 text-[#6FB98F] border border-[#6FB98F]/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-[#6FB98F]/50 hidden md:block">
          <div className="flex items-center gap-2 font-mono">
            <span className="text-sm uppercase tracking-wider">{t('portfolio.scroll')}</span>
            <div className="w-8 h-8 border border-[#6FB98F]/50 rounded-full flex items-center justify-center">
              →
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}