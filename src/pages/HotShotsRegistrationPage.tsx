import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

export default function HotShotsRegistrationPage() {
    return (
        <div className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col">

            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            {/* Red glow top - Subtler for better rendering */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full bg-neon-red/[0.03] blur-[150px] pointer-events-none" />

            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6 border-b border-white/5"
            >
                <Link
                    to="/"
                    className="flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-300 group text-xs tracking-[0.3em] uppercase font-mono no-underline"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
                    Back to Prayan
                </Link>

                <span
                    className="text-xs font-mono tracking-[0.4em] text-white/20 uppercase"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                    Prayan '26
                </span>
            </motion.header>

            {/* Main content */}
            <div className="relative z-10 flex-1 flex flex-col items-center px-4 py-12 md:py-16">

                {/* Title block */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-center mb-10 space-y-4"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span
                            className="text-[11px] tracking-[0.5em] uppercase text-neon-red font-bold font-mono"
                            style={{ fontFamily: "'Orbitron', sans-serif" }}
                        >
                            Cultural Event · HotShots
                        </span>
                    </div>

                    <h1
                        className="text-4xl sm:text-7xl md:text-8xl font-display font-bold tracking-tighter uppercase"
                        style={{ fontFamily: "'TronAres','Orbitron', sans-serif", textShadow: '0 0 40px rgba(255,0,60,0.2)' }}
                    >
                        HOTSHOTS
                    </h1>

                    <p className="text-white/40 text-sm tracking-widest uppercase max-w-md mx-auto">
                        Create, captivate, and conquer in our premier reel competition challenge
                    </p>
                    {/* Coordinators Highlight */}
                    <div className="pt-8 pb-4 flex flex-col items-center gap-6">
                        <div className="flex flex-col items-center">
                            <span className="text-neon-red text-[10px] uppercase tracking-[0.4em] font-bold opacity-80 mb-2">HOTSHOTS'26 COORDINATORS</span>
                            <div className="h-px w-24 bg-gradient-to-r from-transparent via-neon-red/40 to-transparent" />
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-8 md:gap-12">
                            {/* Coordinator 1 */}
                            <div className="flex flex-col items-center gap-3 group">
                                <div className="flex items-center gap-4 py-2 px-6 rounded-2xl glass border border-white/5 group-hover:border-neon-red/30 transition-all duration-300">
                                    <span className="text-white text-lg font-display font-bold tracking-tight">Tanish</span>
                                    <a
                                        href="https://wa.me/+918086591470"
                                        className="px-4 py-1.5 rounded-xl text-[10px] font-mono tracking-widest uppercase bg-neon-red/10 text-neon-red border border-neon-red/20 hover:bg-neon-red hover:text-black transition-all duration-300"
                                    >
                                        Contact
                                    </a>
                                </div>
                                <span className="text-white/30 text-[9px] uppercase tracking-[0.2em]">Lead-Coordinator</span>
                            </div>

                            {/* Coordinator 2 */}
                            <div className="flex flex-col items-center gap-3 group">
                                <div className="flex items-center gap-4 py-2 px-6 rounded-2xl glass border border-white/5 group-hover:border-neon-red/30 transition-all duration-300">
                                    <span className="text-white text-lg font-display font-bold tracking-tight">Keerthana</span>
                                    <a
                                        href="https://wa.me/+918136811493"
                                        className="px-4 py-1.5 rounded-xl text-[10px] font-mono tracking-widest uppercase bg-neon-red/10 text-neon-red border border-neon-red/20 hover:bg-neon-red hover:text-black transition-all duration-300"
                                    >
                                        Contact
                                    </a>
                                </div>
                                <span className="text-white/30 text-[9px] uppercase tracking-[0.2em]">Co-Coordinator</span>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-4 justify-center pt-2">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent to-neon-red/60" />
                        <span className="text-neon-red/40 text-[9px] font-mono tracking-[0.4em] uppercase">March 18 · VKCET</span>
                        <div className="h-px w-16 bg-gradient-to-l from-transparent to-neon-red/60" />
                    </div>
                </motion.div>

                {/* Form container */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="w-full max-w-2xl"
                >
                    <div className="relative rounded-2xl overflow-hidden border border-white/8"
                        style={{ background: 'rgba(10,10,10,0.8)', backdropFilter: 'blur(20px)' }}>

                        {/* Top accent line */}
                        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-neon-red to-transparent" />

                        {/* Corner brackets */}
                        <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-red/60 z-10" />
                        <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-red/60 z-10" />
                        <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-red/60 z-10" />
                        <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-red/60 z-10" />

                        {/* Status bar */}
                        <div className="flex items-center justify-between px-6 py-3 border-b border-white/5">
                            <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em]">Registration Portal</span>
                            <span className="flex items-center gap-1.5 text-[9px] font-mono text-neon-red/60 uppercase tracking-widest">
                                <span className="w-1.5 h-1.5 rounded-full bg-neon-red animate-pulse inline-block" />
                                Open
                            </span>
                        </div>

                        {/* Registration Button Section */}
                        <div className="px-8 py-20 flex flex-col items-center justify-center gap-8 relative overflow-hidden text-center">
                            {/* Animated Background Glow for Button - Smoother falloff */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-red/[0.08] blur-[120px] rounded-full animate-pulse" />

                            <a
                                href="https://docs.google.com/forms/d/e/1FAIpQLScFQ_fh5sam6aKzdoDZAXRUTqCISowZCy6GhVCZLinYzKfxPg/viewform"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative px-12 py-6 rounded-2xl text-white no-underline transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden border border-neon-red/30 shadow-[0_0_40px_rgba(255,0,60,0.15)]"
                                style={{
                                    background: 'rgba(255, 0, 60, 0.05)',
                                    backdropFilter: 'blur(20px)',
                                    boxShadow: 'inset 0 0 20px rgba(255, 0, 60, 0.1)'
                                }}
                            >
                                {/* Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                                <div className="relative flex flex-col items-center">
                                    <span className="text-2xl sm:text-4xl md:text-5xl font-display font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white drop-shadow-[0_0_15px_rgba(255,0,60,0.6)]" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                        Registration
                                    </span>
                                    <span className="text-[10px] sm:text-[11px] tracking-[0.4em] sm:tracking-[0.6em] text-neon-red font-bold uppercase opacity-80 mt-2">Open Official Portal</span>
                                </div>
                            </a>

                            <p className="text-white/30 text-[10px] uppercase tracking-[0.4em] max-w-sm leading-relaxed font-mono">
                                Redirected to Registration Form
                            </p>
                        </div>

                        {/* Bottom bar */}
                        <div className="flex items-center justify-between px-6 py-3 border-t border-white/5">
                            <span className="text-[9px] font-mono text-white/10 uppercase tracking-[0.3em]">VKCET · Parippally</span>
                            <span className="text-[9px] font-mono text-white/10 uppercase tracking-[0.3em]">Grid OS v2.0.26</span>
                        </div>
                    </div>
                </motion.div>
                {/* Rules & Regulations container */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="w-full max-w-2xl mt-12 mb-20"
                >
                    <div className="relative rounded-2xl overflow-hidden border border-white/8 p-8 md:p-12"
                        style={{ background: 'rgba(10,10,10,0.6)', backdropFilter: 'blur(20px)' }}>

                        {/* Top accent line */}
                        <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-neon-red/30 to-transparent" />

                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-neon-red/10 flex items-center justify-center text-neon-red">
                                <ShieldAlert size={20} />
                            </div>
                            <h2 className="text-2xl font-display font-bold tracking-wider uppercase text-white">Reel Competition Guidelines</h2>
                        </div>

                        <ul className="space-y-6">
                            {[
                                "Theme: Based on college or school life (dance, fun, creative content allowed).",
                                "Follow our Instagram pages: @prayan_vke & @4amfilms_.",
                                "Only one entry per student.",
                                "Maximum duration: 90 seconds.",
                                "Format: MP4 or MOV only.",
                                "Minimum 200 likes and shares required for qualification.",
                                "Last date: March 18, 2026.",
                                "Downloaded or reposted videos will be rejected.",
                                "Winners will be selected based on fair judgment, likes, videography skills, and video quality.",
                                "Submit your entry via WhatsApp (as a document) & Google Drive."
                            ].map((rule, idx) => (
                                <li key={idx} className="flex gap-3 sm:gap-4 group">
                                    <span className="text-neon-red font-mono text-[10px] sm:text-xs mt-1 opacity-50 font-bold">{idx + 1 === 10 ? "10" : `0${idx + 1}`}</span>
                                    <p className="text-white/60 text-xs sm:text-sm leading-relaxed tracking-wide group-hover:text-white/80 transition-colors uppercase font-mono">
                                        {rule}
                                    </p>
                                </li>
                            ))}
                        </ul>

                        {/* Decor elements */}
                        <div className="absolute top-4 right-4 text-[8px] font-mono text-white/5 uppercase tracking-[0.4em]">Protocol Version 6.0.4</div>
                    </div>
                </motion.div>
            </div>

            {/* Footer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="relative z-10 text-center py-6 border-t border-white/5"
            >
                <p className="text-[9px] font-mono text-white/10 uppercase tracking-[0.4em]">
                    Prayan '26 · VKCET · Cultural Event
                </p>
            </motion.div>
        </div>
    );
}
