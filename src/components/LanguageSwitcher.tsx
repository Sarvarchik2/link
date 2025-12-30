import React from 'react';
import { useLanguage, Language } from '../context/LanguageContext';
import { motion } from 'motion/react';

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const languages: Language[] = ['uz', 'ru', 'en'];

    return (
        <div className="flex items-center gap-1 font-mono text-xs md:text-sm bg-black/40 backdrop-blur-sm border border-[#6FB98F]/20 rounded-lg p-1">
            {languages.map((lang) => (
                <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`relative px-3 py-1.5 transition-all duration-300 rounded ${language === lang ? 'text-[#6FB98F] font-bold' : 'text-gray-500 hover:text-gray-300'
                        }`}
                >
                    <span className="relative z-10">{lang.toUpperCase()}</span>
                    {language === lang && (
                        <motion.div
                            layoutId="activeLang"
                            className="absolute inset-0 bg-[#6FB98F]/10 border border-[#6FB98F]/40 rounded shadow-[0_0_10px_rgba(111,185,143,0.2)]"
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        />
                    )}
                </button>
            ))}
        </div>
    );
}
