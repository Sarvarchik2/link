import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function AmbientSound() {
  const [isMuted, setIsMuted] = useState(false);
  const [showControl, setShowControl] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodesRef = useRef<GainNode[]>([]);

  useEffect(() => {
    // Initialize audio context after user interaction
    const initAudio = () => {
      if (audioContextRef.current) return;
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      startAmbientSound();
      setShowControl(true);
      
      // Remove listener after first interaction
      document.removeEventListener('click', initAudio);
      document.removeEventListener('keydown', initAudio);
    };

    document.addEventListener('click', initAudio);
    document.addEventListener('keydown', initAudio);

    return () => {
      document.removeEventListener('click', initAudio);
      document.removeEventListener('keydown', initAudio);
      stopAmbientSound();
    };
  }, []);

  const startAmbientSound = () => {
    if (!audioContextRef.current) return;

    const ctx = audioContextRef.current;

    // Create multiple oscillators for rich ambient drone
    const frequencies = [55, 110, 165]; // Low frequencies for deep ambience
    
    frequencies.forEach((freq, index) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filterNode = ctx.createBiquadFilter();
      
      oscillator.type = 'sine';
      oscillator.frequency.value = freq;
      
      filterNode.type = 'lowpass';
      filterNode.frequency.value = 300;
      filterNode.Q.value = 1;
      
      oscillator.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      // Very low volume for subtle effect
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.008, ctx.currentTime + 2);
      
      oscillator.start(ctx.currentTime);
      
      oscillatorsRef.current.push(oscillator);
      gainNodesRef.current.push(gainNode);

      // Add slow frequency modulation for organic feel
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      
      lfo.frequency.value = 0.1 + index * 0.05; // Very slow modulation
      lfoGain.gain.value = 2;
      
      lfo.connect(lfoGain);
      lfoGain.connect(oscillator.frequency);
      lfo.start(ctx.currentTime);
    });

    // Add subtle noise for texture
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    
    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;
    
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.value = 100;
    
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.003;
    
    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    
    whiteNoise.start(ctx.currentTime);
    gainNodesRef.current.push(noiseGain);
  };

  const stopAmbientSound = () => {
    oscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop();
      } catch (e) {
        // Already stopped
      }
    });
    oscillatorsRef.current = [];
    gainNodesRef.current = [];
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  const toggleMute = () => {
    if (!audioContextRef.current) return;
    
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    
    const targetVolume = newMuted ? 0 : 0.008;
    const ctx = audioContextRef.current;
    
    gainNodesRef.current.forEach((gainNode, index) => {
      const baseVolume = index === gainNodesRef.current.length - 1 ? 0.003 : 0.008;
      gainNode.gain.linearRampToValueAtTime(
        newMuted ? 0 : baseVolume,
        ctx.currentTime + 0.5
      );
    });
  };

  return (
    <AnimatePresence>
      {showControl && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, delay: 2 }}
          onClick={toggleMute}
          className="fixed bottom-24 right-6 z-50 w-10 h-10 rounded-full bg-[#6FB98F]/10 border border-[#6FB98F]/30 backdrop-blur-sm flex items-center justify-center hover:bg-[#6FB98F]/20 transition-all group"
          title={isMuted ? 'Unmute ambient sound' : 'Mute ambient sound'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-[#6FB98F]" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#6FB98F]" />
          )}
          
          {/* Pulse animation when playing */}
          {!isMuted && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[#6FB98F]"
              animate={{
                scale: [1, 1.5],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
