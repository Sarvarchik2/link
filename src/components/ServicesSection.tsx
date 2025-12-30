import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, BrainCircuit, Smartphone, Database } from 'lucide-react';
import { GlitchText } from './GlitchText';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { useLanguage } from '../context/LanguageContext';
import { RadarCircle } from './RadarCircle';
import { LineDrawingBorder } from './LineDrawingBorder';

export function ServicesSection() {
  const { playPulseSound } = useSoundEffects();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  const services = [
    {
      title: t('services.saas.title'),
      description: t('services.saas.desc'),
      icon: LayoutDashboard,
      className: 'md:col-span-2',
      serialNumber: 'SRV-001-SAAS',
      status: 'ACTIVE',
      progress: 98,
    },
    {
      title: t('services.ai.title'),
      description: t('services.ai.desc'),
      icon: BrainCircuit,
      className: 'md:col-span-1',
      serialNumber: 'SRV-002-AINR',
      status: 'ACTIVE',
      progress: 95,
    },
    {
      title: t('services.mobile.title'),
      description: t('services.mobile.desc'),
      icon: Smartphone,
      className: 'md:col-span-1',
      serialNumber: 'SRV-003-MOBL',
      status: 'ACTIVE',
      progress: 97,
    },
    {
      title: t('services.backend.title'),
      description: t('services.backend.desc'),
      icon: Database,
      className: 'md:col-span-2',
      serialNumber: 'SRV-004-BCND',
      status: 'ACTIVE',
      progress: 99,
    },
  ];

  return (
    <section className="relative py-32 px-6" id="services">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-4 text-white" style={{ fontWeight: 700 }}>
            <GlitchText>{t('services.title')}</GlitchText>
          </h2>
          <p className="text-gray-400 text-lg font-mono">{t('services.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              onMouseEnter={() => {
                playPulseSound();
                setHoveredIndex(index);
              }}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`${service.className} relative rounded-2xl p-8 group cursor-pointer overflow-hidden`}
              style={{
                background: 'rgba(111, 185, 143, 0.03)',
                backdropFilter: 'blur(12px)',
                border: '0.5px solid rgba(111, 185, 143, 0.2)',
              }}
            >
              {/* Line drawing border animation */}
              <LineDrawingBorder delay={index * 0.15} />

              {/* Gradient corner glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#6FB98F]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* HUD Metadata - Top */}
              <div className="absolute top-3 left-3 flex gap-4 text-[10px] font-mono text-[#6FB98F]/60">
                <span>{service.serialNumber}</span>
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
                <span className="text-[#6FB98F]">{service.status}</span>
              </div>

              {/* HUD Metadata - Bottom */}
              <div className="absolute bottom-3 left-3 text-[10px] font-mono text-[#6FB98F]/40">
                <span>COORD: {33 + index * 11}.{44 + index * 7}°N</span>
              </div>

              <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#6FB98F]/60">
                <motion.span
                  animate={{
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  {service.progress}%
                </motion.span>
              </div>

              <div className="relative z-10 mt-6">
                {/* Icon with radar effect */}
                <div className="mb-6 relative w-16 h-16">
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center relative z-10 transition-all duration-300"
                    style={{
                      background: 'rgba(111, 185, 143, 0.1)',
                      boxShadow: hoveredIndex === index ? '0 0 20px rgba(111, 185, 143, 0.4)' : 'none',
                    }}
                  >
                    <service.icon
                      className="w-8 h-8 text-[#6FB98F]"
                      strokeWidth={1}
                      style={{
                        filter: 'drop-shadow(0 0 8px rgba(111, 185, 143, 0.6))',
                      }}
                    />
                  </div>

                  {/* Radar circle on hover */}
                  {hoveredIndex === index && <RadarCircle />}
                </div>

                <h3 className="text-2xl mb-3 text-white font-mono" style={{ fontWeight: 600 }}>
                  {service.title}
                </h3>

                <p className="text-gray-400 leading-relaxed font-mono text-sm">
                  {service.description}
                </p>

                {/* Progress bar */}
                <div className="mt-6 h-px bg-[#6FB98F]/20 relative overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-[#6FB98F]"
                    initial={{ width: '0%' }}
                    whileInView={{ width: `${service.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.15 + 0.8 }}
                  >
                    <motion.div
                      className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/50 to-transparent"
                      animate={{
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                      }}
                    />
                  </motion.div>
                </div>
              </div>

              {/* Pulse glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl border border-[#6FB98F] pointer-events-none"
                animate={{
                  opacity: [0, 0.3, 0],
                  scale: [0.98, 1, 0.98],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
