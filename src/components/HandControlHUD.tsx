import React, { RefObject } from 'react';
import { HandData } from '../hooks/useHandControl';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
    isActive: boolean;
    leftHand: HandData | null;
    rightHand: HandData | null;
    canvasRef: RefObject<HTMLCanvasElement | null>;
}

const HandControlHUD: React.FC<Props> = ({ isActive, leftHand, rightHand, canvasRef }) => {
    return (
        <AnimatePresence>
            {isActive && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    className="fixed bottom-6 right-6 z-[9999] w-64 bg-black/90 border border-cyan-500/50 backdrop-blur-md rounded-sm overflow-hidden flex flex-col font-mono text-[10px] text-cyan-400"
                    id="hand-control-hud"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center px-3 py-2 border-b border-cyan-500/20">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                            <span className="tracking-widest uppercase font-bold">Live Stream</span>
                        </div>
                        <div className="flex gap-1">
                            <div className={`w-1.5 h-1.5 rounded-full ${leftHand ? 'bg-[#FF006E]' : 'bg-white/10'}`} title="Cursor" />
                            <div className={`w-1.5 h-1.5 rounded-full ${rightHand ? 'bg-[#00F5FF]' : 'bg-white/10'}`} title="Scroll" />
                        </div>
                    </div>

                    {/* Video Preview Area - Smaller */}
                    <div className="relative w-full h-32 bg-black flex items-center justify-center overflow-hidden">
                        <canvas
                            ref={canvasRef}
                            className="w-full h-full object-cover"
                            style={{
                                transform: 'scaleX(-1)' // Mirror the video
                            }}
                        />

                        {/* Overlay grid */}
                        <div className="absolute inset-0 pointer-events-none" style={{
                            backgroundImage: 'linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)',
                            backgroundSize: '16px 16px'
                        }} />
                    </div>

                    {/* Footer Label */}
                    <div className="px-3 py-2 flex justify-between items-baseline bg-black/40">
                        <span className="text-[7px]">
                            {leftHand && '🔴 CURSOR'} {leftHand && rightHand && ' | '} {rightHand && '🔵 SCROLL'}
                            {!leftHand && !rightHand && 'STANDBY'}
                        </span>
                        <span className="tracking-tighter font-black text-xs">SYNC_STREAM_V3</span>
                    </div>

                    {/* Scanning lines effect */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-[2px] w-full top-0 animate-[scan_3s_linear_infinite]" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default HandControlHUD;
