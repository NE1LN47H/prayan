import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen = () => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('INITIALIZING HYPER-LINK...');

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, 20);

        const statuses = [
            'BOOTING CORE SYSTEM...',
            'ESTABLISHING ENCRYPTION...',
            'SYNCING LIGHT-CYCLES...',
            'OPTIMIZING GRID...',
            'ARES PROTOCOL ACTIVE.'
        ];

        let statusIndex = 0;
        const statusInterval = setInterval(() => {
            if (statusIndex < statuses.length) {
                setStatus(statuses[statusIndex]);
                statusIndex++;
            } else {
                clearInterval(statusInterval);
            }
        }, 400);

        return () => {
            clearInterval(interval);
            clearInterval(statusInterval);
        };
    }, []);

    return (
        <motion.div
            exit={{
                opacity: 0,
                scale: 1.1,
                filter: "blur(20px)",
                transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }
            }}
            className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            {/* Main Emblem / Portal */}
            <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Outer Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-[1px] border-neon-red/20 rounded-full"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 border-[1px] border-neon-purple/20 rounded-full border-dashed"
                />

                {/* Tracing Beam */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <motion.circle
                        cx="128"
                        cy="128"
                        r="126"
                        fill="none"
                        stroke="url(#beamGradient)"
                        strokeWidth="2"
                        strokeDasharray="100 1000"
                        animate={{ strokeDashoffset: [-1000, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <defs>
                        <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="50%" stopColor="#ff003c" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Center Logo/Icon */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="relative z-10 font-display font-bold text-6xl text-white tracking-widest flex items-center justify-center"
                >
                    <span className="text-glow-red">P</span>
                    <motion.div
                        animate={{
                            opacity: [0.3, 1, 0.3],
                            scale: [0.98, 1.02, 0.98]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-neon-red/10 blur-xl rounded-full -z-10"
                    />
                </motion.div>
            </div>

            {/* Loading Bar Container */}
            <div className="mt-20 w-64 space-y-4">
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <p className="text-[10px] font-mono text-neon-red/60 tracking-widest uppercase">System Status</p>
                        <p className="text-xs font-mono text-white/80 tracking-tighter h-4 overflow-hidden">{status}</p>
                    </div>
                    <p className="text-xs font-mono text-white/50">{progress}%</p>
                </div>

                <div className="h-[2px] w-full bg-white/5 relative overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-neon-red shadow-[0_0_10px_#ff003c]"
                    />
                </div>

                <div className="flex justify-between text-[8px] font-mono text-white/20 uppercase tracking-[0.2em]">
                    <span>Sector 7G</span>
                    <span>Access: Classified</span>
                </div>
            </div>

            {/* Footer Decoration */}
            <div className="absolute bottom-10 left-0 w-full px-10 flex justify-between items-center opacity-30">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="mx-6 text-[10px] font-mono text-white/40 tracking-[0.5em] uppercase">Grid OS v2.0.26</span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
        </motion.div>
    );
};
