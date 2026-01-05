import React, { useEffect, useState } from 'react';
import { HandData } from '../hooks/useHandControl';
import { motion } from 'motion/react';

interface Props {
    hand: HandData | null;
    color: string;
}

const HandCursor: React.FC<Props> = ({ hand, color }) => {
    const [pos, setPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (hand) {
            setPos({
                x: hand.x * window.innerWidth,
                y: hand.y * window.innerHeight
            });
        }
    }, [hand]);

    if (!hand) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[10000]"
            animate={{ x: pos.x, y: pos.y }}
            transition={{ type: "spring", damping: 25, stiffness: 200, restDelta: 0.001 }}
        >
            <div className="relative -translate-x-1/2 -translate-y-1/2">
                {/* Ring */}
                <div
                    className={`w-12 h-12 rounded-full border-2 ${color} opacity-40 transition-transform duration-200 ${hand.isPinching ? 'scale-50' : 'scale-100'}`}
                    style={{ borderColor: color }}
                />

                {/* Outer pulse */}
                <div
                    className={`absolute inset-0 w-12 h-12 rounded-full border border-current animate-ping opacity-20`}
                    style={{ color }}
                />

                {/* Inner dot */}
                <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full`}
                    style={{ backgroundColor: color }}
                />

                {/* Labels */}
                <div className="absolute top-14 left-1/2 -translate-x-1/2 text-[10px] uppercase font-mono tracking-widest bg-black/80 px-2 py-0.5 rounded border border-white/10" style={{ color }}>
                    {hand.isPinching ? 'ACTIVE' : 'READY'}
                </div>
            </div>
        </motion.div>
    );
};

export default HandCursor;
