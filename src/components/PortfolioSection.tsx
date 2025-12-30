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
      title: 'SmartLife AI',
      description: t('portfolio.projects.p1.desc'),
      tech: ['Flutter', 'Python', 'OpenAI'],
      gradient: 'from-[#6FB98F]/20 to-[#4A9870]/20',
      serialNumber: 'PRJ-2024-001',
      status: 'DEPLOYED',
    },
    {
      title: 'Enterprise CRM',
      description: t('portfolio.projects.p2.desc'),
      tech: ['Django', 'React', 'PostgreSQL'],
      gradient: 'from-[#6FB98F]/20 to-[#3D8060]/20',
      serialNumber: 'PRJ-2024-002',
      status: 'ACTIVE',
    },
    {
      title: 'FinTech Dashboard',
      description: t('portfolio.projects.p3.desc'),
      tech: ['Nuxt.js', 'FastAPI', 'Redis'],
      gradient: 'from-[#6FB98F]/20 to-[#2E6A50]/20',
      serialNumber: 'PRJ-2024-003',
      status: 'DEPLOYED',
    },
    {
      title: 'Healthcare Portal',
      description: t('portfolio.projects.p4.desc'),
      tech: ['Vue.js', 'Django', 'MongoDB'],
      gradient: 'from-[#6FB98F]/20 to-[#1F5440]/20',
      serialNumber: 'PRJ-2024-004',
      status: 'ACTIVE',
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

              {/* Project preview placeholder */}
              <div className={`w-full h-64 rounded-lg bg-gradient-to-br ${project.gradient} mb-6 flex items-center justify-center border border-[#6FB98F]/20 group-hover:border-[#6FB98F]/40 transition-colors mt-6 relative overflow-hidden`}>
                <div className="text-[#6FB98F]/40 group-hover:text-[#6FB98F]/60 transition-colors">
                  <ExternalLink className="w-12 h-12" strokeWidth={1} />
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