import React, { useEffect, useRef } from 'react';

export function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);

    const renderGrain = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const buffer = imageData.data;

      for (let i = 0; i < buffer.length; i += 4) {
        const color = Math.random() * 255;
        buffer[i] = color;
        buffer[i + 1] = color;
        buffer[i + 2] = color;
        buffer[i + 3] = 25; // Low opacity
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const animate = () => {
      renderGrain();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-30 mix-blend-overlay"
    />
  );
}
