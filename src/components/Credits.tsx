import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { BackgroundPaths } from './BackgroundPaths';

export const Credits = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener('open-credits', handleOpen);
        return () => window.removeEventListener('open-credits', handleOpen);
    }, []);

    const sections = [
        {
            title: 'Developed By',
            members: [
                { name: 'Neilnath' },
            ]
        },
        {
            title: 'Prayan Media Team',
            members: [
                { name: 'Name', role: 'etcetcetc' },
                { name: 'Name', role: 'etcetcetc' }
            ]
        }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="credits-portal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[10001] flex items-center justify-center p-4 md:p-8"
                >
                    {/* Animated Path Backdrop */}
                    <motion.div
                        key="credits-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                    >
                        <div className="absolute inset-0 cursor-pointer" onClick={() => setIsOpen(false)} style={{ zIndex: 20 }} />
                        <BackgroundPaths />
                    </motion.div>

                    {/* Editorial Modal */}
                    <motion.div
                        key="credits-modal"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-2xl bg-zinc-950 border border-white/5 p-6 md:p-12 rounded-none shadow-2xl overflow-hidden"
                    >
                        {/* Elegant Close */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-8 right-8 text-white/30 hover:text-white transition-colors group flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em]"
                        >
                            Close <X size={14} className="group-hover:rotate-90 transition-transform duration-500" />
                        </button>

                        <div className="relative space-y-12">
                            {/* Header */}
                            <div className="space-y-4 max-w-xl">
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-white/40 font-mono text-[10px] uppercase tracking-[0.5em] block"
                                >
                                    Personnel Registry // 2026
                                </motion.span>
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-4xl md:text-5xl font-display font-bold tracking-tighter leading-none"
                                >
                                    MEET OUR <span className="text-white/20 uppercase">TEAM</span>
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-sm text-white/40 leading-relaxed font-light font-sans"
                                >
                                    Discover the dedicated team powering PRAYAN 2026's online presence.
                                </motion.p>
                            </div>

                            {/* Credits Grid */}
                            <div className="grid md:grid-cols-2 gap-10 border-t border-white/5 pt-10">
                                {sections.map((section, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 + (idx * 0.1) }}
                                        className="space-y-8"
                                    >
                                        <h4 className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/70 pb-4 border-b border-white/10">
                                            {section.title}
                                        </h4>
                                        <div className="space-y-6">
                                            {section.members.map((member, i) => (
                                                <div key={i} className="group flex items-center gap-5">
                                                    <div className="w-16 h-16 rounded-full overflow-hidden bg-white/5 border border-white/10 group-hover:border-white/30 transition-colors shrink-0">
                                                        <img
                                                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=ffffff&color=000000`}
                                                            alt={member.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-xl font-display font-medium text-white/90 group-hover:text-white transition-colors">
                                                            {member.name}
                                                        </p>
                                                        {member.role && (
                                                            <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mt-1">
                                                                {member.role}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Footer Note */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="pt-12 border-t border-white/5 flex items-center justify-between font-mono text-[9px] text-white/10 uppercase tracking-[0.3em]"
                            >
                                <p>VKCET Infrastructure // Grid OS v2.1</p>
                                <div className="flex items-center gap-2">
                                    <span>Authorized Access Only</span>
                                    <ArrowRight size={10} />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
