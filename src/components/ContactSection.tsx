import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Check, Loader2 } from 'lucide-react';
import { GlitchText } from './GlitchText';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { LineDrawingBorder } from './LineDrawingBorder';

import { useLanguage } from '../context/LanguageContext';

export function ContactSection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { playSuccessSound, playClickSound, playHoverSound } = useSoundEffects();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate slight delay for effect
    // await new Promise(resolve => setTimeout(resolve, 1000));

    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    const text = `
🚀 <b>NEW LEAD FROM WEBSITE</b>

👤 <b>Name:</b> ${formData.name}
📱 <b>Phone:</b> ${formData.phone}
📝 <b>Message:</b>
${formData.message}

🌐 <i>Link Digital System</i>
    `;

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: 'HTML',
        }),
      });

      if (response.ok) {
        playSuccessSound();
        setIsSuccess(true);
        setFormData({ name: '', phone: '', message: '' });
      } else {
        console.error('Telegram API Error:', await response.text());
        alert('Error sending message. Please try again.');
      }
    } catch (error) {
      console.error('Network Error:', error);
      alert('Connection error. Please check your internet.');
    } finally {
      setIsSubmitting(false);
    }
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

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative rounded-2xl p-8 md:p-12 h-full"
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

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full min-h-[400px] text-center space-y-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.1
                  }}
                  className="w-24 h-24 rounded-full bg-[#6FB98F]/20 border-2 border-[#6FB98F] flex items-center justify-center relative"
                >
                  <motion.div
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Check className="w-12 h-12 text-[#6FB98F]" strokeWidth={3} />
                  </motion.div>

                  {/* Ripple effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full border border-[#6FB98F]"
                    animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 font-mono">{t('contact.form.success')}</h3>
                  <p className="text-gray-400 font-mono">We'll be in touch shortly.</p>
                </div>

                <motion.button
                  onClick={() => setIsSuccess(false)}
                  className="mt-8 text-[#6FB98F] text-sm font-mono border-b border-[#6FB98F] hover:opacity-80 transition-opacity"
                  whileHover={{ scale: 1.05 }}
                >
                  Send another message
                </motion.button>
              </motion.div>
            ) : (
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
                    disabled={isSubmitting}
                    required
                    className="w-full bg-transparent border-b-2 border-[#6FB98F]/30 focus:border-[#6FB98F] py-3 text-white placeholder-gray-600 outline-none transition-all duration-300 font-mono disabled:opacity-50"
                    placeholder={t('contact.form.namePlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm mb-2 text-gray-400 uppercase tracking-wider font-mono">
                    {t('contact.form.phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => handleFocus('phone')}
                    onBlur={() => setFocusedField(null)}
                    disabled={isSubmitting}
                    required
                    className="w-full bg-transparent border-b-2 border-[#6FB98F]/30 focus:border-[#6FB98F] py-3 text-white placeholder-gray-600 outline-none transition-all duration-300 font-mono disabled:opacity-50"
                    placeholder="+998 90 123 45 67"
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
                    disabled={isSubmitting}
                    required
                    rows={4}
                    className="w-full bg-transparent border-b-2 border-[#6FB98F]/30 focus:border-[#6FB98F] py-3 text-white placeholder-gray-600 outline-none transition-all duration-300 resize-none font-mono disabled:opacity-50"
                    placeholder={t('contact.form.msgPlaceholder')}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  onMouseEnter={playHoverSound}
                  className={`relative w-full py-4 bg-transparent border border-[#6FB98F] text-[#6FB98F] rounded-lg flex items-center justify-center gap-2 uppercase tracking-wider transition-all duration-300 overflow-hidden font-mono ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
                  style={{
                    fontWeight: 600,
                    boxShadow: '0 0 20px rgba(111, 185, 143, 0.2)',
                  }}
                >
                  {isSubmitting ? (
                    <span className="relative z-10 flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      SENDING...
                    </span>
                  ) : (
                    <span className="relative z-10 flex items-center gap-2">
                      {t('contact.form.submit')}
                      <Send className="w-5 h-5" strokeWidth={1.5} />
                    </span>
                  )}

                  {/* Glowing outline effect */}
                  {!isSubmitting && (
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
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Google Map Embed */}
            <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden relative border border-[#6FB98F]/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d749.3764731286175!2d69.27011456967979!3d41.297856998207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8adb786ccb8d%3A0xbcf1d99032a70109!2z0YPQu9C40YbQsCDQqNCw0YXRgNC40YHQsNCx0LcgMywgMTAwMDAwLCDQotCw0YjQutC10L3RgiwgVGFzaGtlbnQsINCj0LfQsdC10LrQuNGB0YLQsNC9!5e0!3m2!1sru!2s!4v1767385171635!5m2!1sru!2s"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              {/* Overlay for scanlines effect */}
              <div className="absolute inset-0 pointer-events-none bg-[#6FB98F]/5 z-10" />
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 gap-4">
              {/* Phone */}
              <div className="p-6 rounded-xl border border-[#6FB98F]/20 bg-[#6FB98F]/5 hover:bg-[#6FB98F]/10 transition-colors group">
                <div className="text-xs text-[#6FB98F]/60 mb-2 font-mono uppercase">Phone</div>
                <a href="tel:+998901235853" className="text-xl md:text-2xl text-white font-mono hover:text-[#6FB98F] transition-colors">
                  +998 90 123 58 53
                </a>
              </div>

              {/* Socials */}
              <div className="grid grid-cols-3 gap-4">
                {/* Telegram */}
                <a
                  href="https://t.me/sarubola"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl border border-[#6FB98F]/20 bg-[#6FB98F]/5 hover:bg-[#6FB98F]/10 transition-colors flex flex-col items-center justify-center gap-2 group"
                >
                  <Send className="w-6 h-6 text-[#6FB98F] group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-gray-400 font-mono">Telegram</span>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/sarubola"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl border border-[#6FB98F]/20 bg-[#6FB98F]/5 hover:bg-[#6FB98F]/10 transition-colors flex flex-col items-center justify-center gap-2 group"
                >
                  <div className="w-6 h-6 rounded-md border-2 border-[#6FB98F] flex items-center justify-center relative group-hover:scale-110 transition-transform">
                    <div className="w-2 h-2 rounded-full border border-[#6FB98F]" />
                  </div>
                  <span className="text-xs text-gray-400 font-mono">Instagram</span>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/sarvar-faxrutdinov-2b2143396"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl border border-[#6FB98F]/20 bg-[#6FB98F]/5 hover:bg-[#6FB98F]/10 transition-colors flex flex-col items-center justify-center gap-2 group"
                >
                  <div className="w-6 h-6 text-[#6FB98F] font-bold text-lg leading-none flex items-center justify-center group-hover:scale-110 transition-transform">in</div>
                  <span className="text-xs text-gray-400 font-mono">LinkedIn</span>
                </a>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}