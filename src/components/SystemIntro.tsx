import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SystemIntroProps {
  onComplete: () => void;
}

export function SystemIntro({ onComplete }: SystemIntroProps) {
  const [step, setStep] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [isGlitching, setIsGlitching] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const sequence = [
    { text: '> Initializing LINK-DIGITAL Protocol...', delay: 600 },
    { text: '> Connecting to server: TAS-UZ-001', delay: 400 },
    { text: '> Loading system modules...', delay: 500 },
    { text: '', delay: 300 },
    { text: '> Core: Nuxt.js + Vue [CHECK]', delay: 400 },
    { text: '> Backend: Python/Django [CHECK]', delay: 400 },
    { text: '> Frontend: React/Motion [CHECK]', delay: 400 },
    { text: '> Mobile: Flutter SDK [CHECK]', delay: 400 },
    { text: '', delay: 300 },
    { text: '> AI Neural Network: Online [CHECK]', delay: 500 },
    { text: '> Machine Learning: Active [CHECK]', delay: 400 },
    { text: '> Security Protocols: Enabled [CHECK]', delay: 400 },
    { text: '', delay: 400 },
    { text: '> System check complete.', delay: 600 },
    { text: '> All systems operational.', delay: 500 },
    { text: '', delay: 400 },
    { text: '> Welcome to LINK-DIGITAL.', delay: 800 },
  ];

  // Initialize Web Audio
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  // Typing sound effect
  const playTypingSound = () => {
    if (!audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = 800 + Math.random() * 200;
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.02, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.05);
  };

  // Whoosh sound effect
  const playWhooshSound = () => {
    if (!audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(200, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.5);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.5);
    
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.5);
  };

  // Ambient drone
  const playAmbientDrone = () => {
    if (!audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = 60;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 0.5);
    
    oscillator.start(ctx.currentTime);
    
    return () => {
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
      oscillator.stop(ctx.currentTime + 0.3);
    };
  };

  // Glitch sound
  const playGlitchSound = () => {
    if (!audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.frequency.value = Math.random() * 2000 + 100;
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.1);
      }, i * 50);
    }
  };

  useEffect(() => {
    const stopDrone = playAmbientDrone();
    return () => {
      if (stopDrone) stopDrone();
    };
  }, []);

  useEffect(() => {
    if (step < sequence.length) {
      playTypingSound();
      const timer = setTimeout(() => {
        setStep(step + 1);
      }, sequence[step].delay);
      return () => clearTimeout(timer);
    } else {
      // Start glitch effect
      const glitchTimer = setTimeout(() => {
        setIsGlitching(true);
        playGlitchSound();
        
        setTimeout(() => {
          setShowExplosion(true);
          playWhooshSound();
          
          setTimeout(() => {
            setShowIntro(false);
            setTimeout(() => {
              onComplete();
            }, 500);
          }, 1000);
        }, 800);
      }, 500);
      
      return () => clearTimeout(glitchTimer);
    }
  }, [step]);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Glitch overlay */}
          {isGlitching && (
            <motion.div
              className="absolute inset-0 z-50"
              animate={{
                opacity: [0, 1, 0, 1, 0],
                x: [-5, 5, -5, 5, 0],
              }}
              transition={{ duration: 0.3, repeat: 2 }}
            >
              <div className="w-full h-full bg-gradient-to-r from-[#6FB98F]/20 via-transparent to-[#6FB98F]/20" />
            </motion.div>
          )}

          {/* Particle explosion */}
          {showExplosion && (
            <div className="absolute inset-0 z-40">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-[#6FB98F] rounded-full"
                  initial={{
                    x: '50vw',
                    y: '50vh',
                    opacity: 1,
                  }}
                  animate={{
                    x: `${50 + (Math.random() - 0.5) * 100}vw`,
                    y: `${50 + (Math.random() - 0.5) * 100}vh`,
                    opacity: 0,
                    scale: [1, 0],
                  }}
                  transition={{
                    duration: 1,
                    delay: Math.random() * 0.2,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </div>
          )}

          <div className="max-w-3xl w-full px-6 relative z-10">
            <div className="space-y-2 font-mono">
              {sequence.slice(0, step).map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: line.text ? 1 : 0,
                    x: 0,
                    ...(isGlitching && index === sequence.length - 1
                      ? {
                          x: [0, -5, 5, -3, 3, 0],
                          filter: [
                            'hue-rotate(0deg)',
                            'hue-rotate(90deg)',
                            'hue-rotate(180deg)',
                            'hue-rotate(270deg)',
                            'hue-rotate(360deg)',
                          ],
                        }
                      : {}),
                  }}
                  transition={{ duration: 0.2 }}
                  className={`text-[#6FB98F] text-sm md:text-base ${
                    line.text.includes('[CHECK]') ? 'text-[#6FB98F]' : ''
                  } ${isGlitching && index === sequence.length - 1 ? 'text-2xl' : ''}`}
                >
                  {line.text}
                  {line.text.includes('[CHECK]') && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, type: 'spring' }}
                      className="inline-block ml-2"
                    >
                      ✓
                    </motion.span>
                  )}
                </motion.div>
              ))}
              
              {step < sequence.length && (
                <motion.div
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="text-[#6FB98F] text-sm md:text-base"
                >
                  _
                </motion.div>
              )}
            </div>

            {/* Progress bar */}
            <div className="mt-8 w-full h-0.5 bg-[#6FB98F]/20 relative overflow-hidden">
              <motion.div
                className="h-full bg-[#6FB98F] relative"
                initial={{ width: '0%' }}
                animate={{ width: `${(step / sequence.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              >
                {/* Scanning effect */}
                <motion.div
                  className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white/50 to-transparent"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.div>
            </div>

            {/* System info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1 }}
              className="mt-6 flex justify-between text-xs text-[#6FB98F]/60"
            >
              <span>NODE: TAS-UZ-001</span>
              <span>STATUS: {step < sequence.length ? 'LOADING' : 'READY'}</span>
              <span>PROTOCOL: v1.0.4</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
