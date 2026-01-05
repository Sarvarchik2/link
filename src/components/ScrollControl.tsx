import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
    isActive: boolean;
    isPinching: boolean;
    cursorX: number;
    cursorY: number;
}

const ScrollControl: React.FC<Props> = ({ isActive, isPinching, cursorX, cursorY }) => {
    const [anchorPoint, setAnchorPoint] = useState<{ x: number; y: number } | null>(null);
    const scrollIntervalRef = useRef<number | null>(null);

    // Set anchor point when pinching starts
    useEffect(() => {
        if (isPinching && !anchorPoint) {
            setAnchorPoint({ x: cursorX, y: cursorY });
        } else if (!isPinching && anchorPoint) {
            setAnchorPoint(null);
            if (scrollIntervalRef.current) {
                cancelAnimationFrame(scrollIntervalRef.current);
                scrollIntervalRef.current = null;
            }
        }
    }, [isPinching]);

    // Handle scrolling based on distance from anchor
    useEffect(() => {
        if (!isPinching || !anchorPoint) {
            if (scrollIntervalRef.current) {
                cancelAnimationFrame(scrollIntervalRef.current);
                scrollIntervalRef.current = null;
            }
            return;
        }

        const scroll = () => {
            const deltaX = cursorX - anchorPoint.x;
            const deltaY = cursorY - anchorPoint.y;

            // Dead zone - no scroll if too close to anchor
            const deadZone = 20;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (distance > deadZone) {
                // Calculate scroll speed based on distance
                const maxDistance = 150;
                const normalizedDistance = Math.min(distance / maxDistance, 1);
                const scrollSpeed = normalizedDistance * 60; // Increased from 30 to 60

                // Scroll vertically based on Y delta
                const scrollY = (deltaY / distance) * scrollSpeed;

                window.scrollBy({
                    top: scrollY,
                    behavior: 'auto'
                });
            }

            scrollIntervalRef.current = requestAnimationFrame(scroll);
        };

        scrollIntervalRef.current = requestAnimationFrame(scroll);

        return () => {
            if (scrollIntervalRef.current) {
                cancelAnimationFrame(scrollIntervalRef.current);
            }
        };
    }, [isPinching, anchorPoint, cursorX, cursorY]);

    if (!isActive || !isPinching || !anchorPoint) return null;

    const deltaX = cursorX - anchorPoint.x;
    const deltaY = cursorY - anchorPoint.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="fixed z-[9997] pointer-events-none"
                style={{
                    left: `${anchorPoint.x}px`,
                    top: `${anchorPoint.y}px`,
                    transform: 'translate(-50%, -50%)'
                }}
            >
                {/* Main circle */}
                <div className="relative w-20 h-20">
                    {/* Outer glow */}
                    <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl" />

                    {/* Circle border */}
                    <div className="absolute inset-2 rounded-full border-2 border-cyan-500/60 bg-black/80 backdrop-blur-md" />

                    {/* Center dot */}
                    <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-cyan-500 rounded-full -translate-x-1/2 -translate-y-1/2" />

                    {/* Direction arrows */}
                    <div className="absolute inset-0">
                        {/* Up arrow */}
                        <div className={`absolute top-2 left-1/2 -translate-x-1/2 transition-opacity ${deltaY < -20 ? 'opacity-100' : 'opacity-30'}`}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00F5FF" strokeWidth="3">
                                <path d="M12 19V5M5 12l7-7 7 7" />
                            </svg>
                        </div>

                        {/* Down arrow */}
                        <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 transition-opacity ${deltaY > 20 ? 'opacity-100' : 'opacity-30'}`}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00F5FF" strokeWidth="3">
                                <path d="M12 5v14M19 12l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Pulse effect */}
                    <motion.div
                        className="absolute inset-2 rounded-full border border-cyan-500/40"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </div>

                {/* Direction indicator line */}
                {distance > 20 && (
                    <motion.div
                        className="absolute top-1/2 left-1/2 w-0.5 bg-gradient-to-b from-cyan-500 to-transparent origin-top"
                        style={{
                            height: `${Math.min(distance, 100)}px`,
                            transform: `translate(-50%, -50%) rotate(${angle + 90}deg)`,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                    />
                )}
            </motion.div>
        </AnimatePresence>
    );
};

export default ScrollControl;
