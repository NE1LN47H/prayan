import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { BackgroundPaths } from '../components/BackgroundPaths';

const CREDITS = [
    {
        title: 'Developed By',
        members: [
            { name: 'Neilnath P', role: null, image: '/team/neil.webp' },
        ],
    },
    {
        title: 'Prayan Media Team',
        members: [
            { name: 'Bharath Bhadran', role: 'Design', image: '/team/bharath.webp' },
            { name: 'Abhijith Kumar', role: 'Design', image: '/team/abhijith.webp' },
            { name: 'Albin Saju', role: 'Design', image: '/team/albin.webp' },
        ],
    },
];

export default function CreditsPage() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    return (
        <main className="relative min-h-screen bg-black text-white">
            <BackgroundPaths className="z-0" opacity={0.8}>
                <div className="relative z-10 min-h-screen flex flex-col">
                    {/* Back nav */}
                    <div className="px-6 py-6">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-300 no-underline group"
                            style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase' }}
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
                            Back to Site
                        </Link>
                    </div>

                    {/* Main panel */}
                    <div className="flex-1 flex items-center justify-center px-4 py-8 md:py-16">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={mounted ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full max-w-4xl bg-zinc-950/90 border border-white/5 p-6 md:p-12 lg:p-16 rounded-none shadow-2xl"
                        >
                            {/* Header */}
                            <div className="space-y-4 mb-10 md:mb-16">
                                <span
                                    className="text-white/30 text-[9px] md:text-[10px] uppercase tracking-[0.5em] block"
                                    style={{ fontFamily: "'Orbitron',sans-serif" }}
                                >
                                    PRAYAN 2026
                                </span>
                                <h1
                                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-none"
                                    style={{ fontFamily: "'TronAres','Orbitron',sans-serif" }}
                                >
                                    MEET OUR{' '}
                                    <span className="text-white/20">TEAM</span>
                                </h1>
                                <p className="text-white/40 text-xs sm:text-sm md:text-base max-w-lg leading-relaxed mt-4">
                                    Discover the dedicated team powering PRAYAN 2026's online presence.
                                </p>
                            </div>

                            {/* Credits grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 border-t border-white/5 pt-10 md:pt-16">
                                {CREDITS.map((section, si) => (
                                    <motion.div
                                        key={si}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={mounted ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.3 + si * 0.1, duration: 0.6 }}
                                        className="space-y-8"
                                    >
                                        <h4
                                            className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/50 pb-4 border-b border-white/10"
                                            style={{ fontFamily: "'Orbitron',sans-serif" }}
                                        >
                                            {section.title}
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 md:gap-8">
                                            {section.members.map((m, mi) => (
                                                <div key={mi} className="flex items-center gap-4 group">
                                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden bg-white/5 border border-white/10 group-hover:border-white/30 transition-all duration-300 shrink-0">
                                                        <img
                                                            src={m.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=ffffff&color=000000`}
                                                            alt={m.name}
                                                            loading="lazy"
                                                            decoding="async"
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-base md:text-xl font-display font-medium text-white/90 group-hover:text-white transition-colors truncate">
                                                            {m.name}
                                                        </p>
                                                        {m.role && (
                                                            <p className="text-[9px] md:text-[10px] text-white/30 uppercase tracking-widest mt-1"
                                                                style={{ fontFamily: "'Orbitron',sans-serif" }}>
                                                                {m.role}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Footer note */}
                            <div className="pt-10 mt-10 border-t border-white/5 flex items-center justify-between text-[9px] text-white/10 uppercase tracking-[0.3em]"
                                style={{ fontFamily: "'Orbitron',sans-serif" }}>
                                <p>VKCET</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </BackgroundPaths>
        </main>
    );
}
