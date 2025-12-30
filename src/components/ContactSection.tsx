import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send } from 'lucide-react';
import { GlitchText } from './GlitchText';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { LineDrawingBorder } from './LineDrawingBorder';

import { useLanguage } from '../context/LanguageContext';

export function ContactSection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { playSuccessSound, playClickSound, playHoverSound } = useSoundEffects();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSuccessSound();
    console.log('Form submitted:', formData);
    // Here you would typically send the form data to your backend
    alert(t('contact.form.success'));
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
    playClickSound();
  };

  return (
    <section className="relative py-32 px-6" id="contact">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-4 text-white font-mono" style={{ fontWeight: 700 }}>
            <GlitchText>{t('contact.title')}</GlitchText>
          </h2>
          <p className="text-gray-400 text-lg font-mono">{t('contact.subtitle')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative rounded-2xl p-8 md:p-12"
          style={{
            background: 'rgba(111, 185, 143, 0.03)',
            backdropFilter: 'blur(12px)',
            border: '0.5px solid rgba(111, 185, 143, 0.2)',
          }}
        >
          <LineDrawingBorder delay={0.2} />

          {/* HUD Metadata */}
          <div className="absolute top-3 left-3 text-[10px] font-mono text-[#6FB98F]/60">
            FORM-CONTACT-001
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
            <span className="text-[#6FB98F]">SECURE</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 mt-6">
            <div>
              <label htmlFor="name" className="block text-sm mb-2 text-gray-400 uppercase tracking-wider font-mono">
                {t('contact.form.name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleFocus('name')}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full bg-transparent border-b-2 border-[#6FB98F]/30 focus:border-[#6FB98F] py-3 text-white placeholder-gray-600 outline-none transition-all duration-300 font-mono"
                placeholder={t('contact.form.namePlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm mb-2 text-gray-400 uppercase tracking-wider font-mono">
                {t('contact.form.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full bg-transparent border-b-2 border-[#6FB98F]/30 focus:border-[#6FB98F] py-3 text-white placeholder-gray-600 outline-none transition-all duration-300 font-mono"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm mb-2 text-gray-400 uppercase tracking-wider font-mono">
                {t('contact.form.message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => handleFocus('message')}
                onBlur={() => setFocusedField(null)}
                required
                rows={4}
                className="w-full bg-transparent border-b-2 border-[#6FB98F]/30 focus:border-[#6FB98F] py-3 text-white placeholder-gray-600 outline-none transition-all duration-300 resize-none font-mono"
                placeholder={t('contact.form.msgPlaceholder')}
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={playHoverSound}
              className="relative w-full py-4 bg-transparent border border-[#6FB98F] text-[#6FB98F] rounded-lg flex items-center justify-center gap-2 uppercase tracking-wider transition-all duration-300 overflow-hidden font-mono"
              style={{
                fontWeight: 600,
                boxShadow: '0 0 20px rgba(111, 185, 143, 0.2)',
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {t('contact.form.submit')}
                <Send className="w-5 h-5" strokeWidth={1.5} />
              </span>

              {/* Glowing outline effect */}
              <motion.div
                className="absolute inset-0 border-2 border-[#6FB98F] rounded-lg"
                animate={{
                  opacity: [0, 0.5, 0],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}