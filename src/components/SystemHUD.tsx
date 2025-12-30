import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function SystemHUD() {
  const [time, setTime] = useState(new Date());
  const [fps, setFps] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let lastTime = performance.now();
    let frames = 0;
    let fpsInterval: number;

    const measureFPS = () => {
      const currentTime = performance.now();
      frames++;

      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frames * 1000) / (currentTime - lastTime)));
        frames = 0;
        lastTime = currentTime;
      }

      fpsInterval = requestAnimationFrame(measureFPS);
    };

    fpsInterval = requestAnimationFrame(measureFPS);
    return () => cancelAnimationFrame(fpsInterval);
  }, []);

  return (
    <>
      {/* Top Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="fixed top-6 left-6 z-40 text-[#6FB98F]/60 text-xs font-mono space-y-1"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#6FB98F] rounded-full animate-pulse" />
          <span>SYSTEM: ONLINE</span>
        </div>
        <div>BUILD: v1.0.4</div>
        <div>NODE: TAS-UZ-001</div>
      </motion.div>

      {/* Top Right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="fixed top-6 right-6 z-40 text-[#6FB98F]/60 text-xs font-mono text-right space-y-1"
      >
        <div>LAT: 41.2995° N</div>
        <div>LON: 69.2401° E</div>
        <div>LOCATION: TASHKENT</div>
      </motion.div>

      {/* Bottom Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="fixed bottom-6 left-6 z-40 text-[#6FB98F]/60 text-xs font-mono space-y-1"
      >
        <div>FPS: {fps}</div>
        <div>LATENCY: &lt;10ms</div>
        <div>STATUS: READY</div>
      </motion.div>

      {/* Bottom Right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        className="fixed bottom-6 right-6 z-40 text-[#6FB98F]/60 text-xs font-mono text-right space-y-1"
      >
        <div>TIME: {time.toLocaleTimeString('en-US', { hour12: false })}</div>
        <div>DATE: {time.toLocaleDateString('en-US')}</div>
        <div>TIMEZONE: UTC+5</div>
      </motion.div>
    </>
  );
}
