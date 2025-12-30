import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="relative py-12 px-6 border-t border-[#6FB98F]/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company info */}
          <div>
            <h3 className="text-xl mb-4 text-white font-mono" style={{ fontWeight: 700 }}>
              LINK<span className="text-[#6FB98F]">-</span>DIGITAL
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed font-mono">
              {t('footer.desc')}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-4 text-gray-400 uppercase tracking-wider text-sm font-mono">{t('footer.nav')}</h4>
            <ul className="space-y-2">
              {[
                { id: 'services', label: t('nav.services') },
                { id: 'portfolio', label: t('nav.portfolio') },
                { id: 'about', label: t('nav.about') },
                { id: 'contact', label: t('nav.contact') },
              ].map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-gray-400 hover:text-[#6FB98F] transition-colors text-sm font-mono"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h4 className="mb-4 text-gray-400 uppercase tracking-wider text-sm font-mono">{t('footer.social')}</h4>
            <div className="flex gap-4">
              {[
                { icon: Github, label: 'GitHub' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Twitter, label: 'Twitter' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-[#6FB98F]/10 border border-[#6FB98F]/20 flex items-center justify-center hover:bg-[#6FB98F]/20 transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-[#6FB98F]" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#6FB98F]/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm font-mono">
            © {currentYear} LINK-DIGITAL. {t('footer.rights')}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-[#6FB98F] transition-colors text-sm font-mono">
              {t('footer.privacy')}
            </a>
            <a href="#" className="text-gray-400 hover:text-[#6FB98F] transition-colors text-sm font-mono">
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}