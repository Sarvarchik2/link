import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
    scrollDelta: number;
    isActive: boolean;
}

const ScrollIndicator: React.FC<Props> = ({ scrollDelta, isActive }) => {
    const isScrolling = Math.abs(scrollDelta) > 0.1;
    const direction = scrollDelta < 0 ? 'up' : 'down';
    const intensity = Math.min(Math.abs(scrollDelta) / 120, 1);

    return (
        <AnimatePresence>
            {isActive && isScrolling && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[9998] pointer-events-none"
                >
                    <div className="flex flex-col items-center gap-2">
                        {/* Arrow */}
                        <motion.div
                            animate={{ y: direction === 'up' ? [-5, 5] : [5, -5] }}
                            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                            className="text-cyan-400"
                        >
                            {direction === 'up' ? (
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 19V5M5 12l7-7 7 7" />
                                </svg>
                            ) : (
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 5v14M19 12l-7 7-7-7" />
                                </svg>
                            )}
                        </motion.div>

                        {/* Intensity bar */}
                        <div className="w-32 h-2 bg-black/50 border border-cyan-500/30 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300"
                                style={{ width: `${intensity * 100}%` }}
                                initial={{ width: 0 }}
                                animate={{ width: `${intensity * 100}%` }}
                                transition={{ duration: 0.2 }}
                            />
                        </div>

                        {/* Label */}
                        <div className="text-cyan-400 text-xs font-mono uppercase tracking-wider">
                            {direction === 'up' ? '⬆ Scroll Up' : '⬇ Scroll Down'}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ScrollIndicator;
