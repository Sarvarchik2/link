import React from 'react';
import { motion } from 'motion/react';
import { Code2, Zap, Users } from 'lucide-react';
import { GlitchText } from './GlitchText';
import { LineDrawingBorder } from './LineDrawingBorder';
import { useLanguage } from '../context/LanguageContext';

export function AboutSection() {
  const { t } = useLanguage();

  const stats = [
    {
      icon: Code2,
      value: '50+',
      label: t('about.stats.projects'),
      serialNumber: 'STAT-001',
    },
    {
      icon: Zap,
      value: '5+',
      label: t('about.stats.years'),
      serialNumber: 'STAT-002',
    },
    {
      icon: Users,
      value: '15+',
      label: t('about.stats.specialists'),
      serialNumber: 'STAT-003',
    },
  ];

  return (
    <section className="relative py-32 px-6" id="about">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-4 text-white font-mono" style={{ fontWeight: 700 }}>
            <GlitchText>{t('about.title')}</GlitchText>
          </h2>
          <p className="text-gray-400 text-lg font-mono">{t('about.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative rounded-2xl p-8"
            style={{
              background: 'rgba(111, 185, 143, 0.03)',
              backdropFilter: 'blur(12px)',
              border: '0.5px solid rgba(111, 185, 143, 0.2)',
            }}
          >
            <LineDrawingBorder delay={0} />

            {/* HUD Metadata */}
            <div className="absolute top-3 left-3 text-[10px] font-mono text-[#6FB98F]/60">
              SECT-ABOUT-001
            </div>

            <h3 className="text-3xl mb-6 text-white font-mono" style={{ fontWeight: 600 }}>
              {t('about.mission.title')}
            </h3>
            <p className="text-gray-400 leading-relaxed mb-4 font-mono text-sm">
              {t('about.mission.text1')}
            </p>
            <p className="text-gray-400 leading-relaxed font-mono text-sm">
              {t('about.mission.text2')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative rounded-2xl p-8"
            style={{
              background: 'rgba(111, 185, 143, 0.03)',
              backdropFilter: 'blur(12px)',
              border: '0.5px solid rgba(111, 185, 143, 0.2)',
            }}
          >
            <LineDrawingBorder delay={0.2} />

            {/* HUD Metadata */}
            <div className="absolute top-3 left-3 text-[10px] font-mono text-[#6FB98F]/60">
              SECT-ABOUT-002
            </div>

            <h3 className="text-3xl mb-6 text-white font-mono" style={{ fontWeight: 600 }}>
              {t('about.approach.title')}
            </h3>
            <p className="text-gray-400 leading-relaxed mb-4 font-mono text-sm">
              {t('about.approach.text1')}
            </p>
            <p className="text-gray-400 leading-relaxed font-mono text-sm">
              {t('about.approach.text2')}
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative text-center p-8 rounded-2xl group"
              style={{
                background: 'rgba(111, 185, 143, 0.03)',
                backdropFilter: 'blur(12px)',
                border: '0.5px solid rgba(111, 185, 143, 0.2)',
              }}
            >
              <LineDrawingBorder delay={index * 0.1 + 0.4} />

              {/* HUD Metadata */}
              <div className="absolute top-3 left-3 text-[10px] font-mono text-[#6FB98F]/60">
                {stat.serialNumber}
              </div>

              <div className="mb-4 inline-block">
                <div
                  className="w-16 h-16 mx-auto rounded-lg flex items-center justify-center"
                  style={{
                    background: 'rgba(111, 185, 143, 0.1)',
                    boxShadow: '0 0 20px rgba(111, 185, 143, 0.2)',
                  }}
                >
                  <stat.icon
                    className="w-8 h-8 text-[#6FB98F]"
                    strokeWidth={1}
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(111, 185, 143, 0.6))',
                    }}
                  />
                </div>
              </div>

              <motion.div
                className="text-5xl text-[#6FB98F] mb-2 font-mono"
                style={{ fontWeight: 700 }}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
              >
                {stat.value}
              </motion.div>

              <div className="text-gray-400 font-mono text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}