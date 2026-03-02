import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Music } from 'lucide-react';
import FormfacadeEmbed from "@formfacade/embed-react";

export default function LayamRegistrationPage() {
    return (
        <div className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col">

            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            {/* Red glow top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-neon-red/5 blur-[120px] pointer-events-none" />

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
                        <div className="w-10 h-10 rounded-xl bg-neon-red/10 flex items-center justify-center text-neon-red">
                            <Music size={20} />
                        </div>
                        <span
                            className="text-[11px] tracking-[0.5em] uppercase text-neon-red/70 font-mono"
                            style={{ fontFamily: "'Orbitron', sans-serif" }}
                        >
                            Cultural Vibe · Registration
                        </span>
                    </div>

                    <h1
                        className="text-5xl sm:text-7xl md:text-8xl font-display font-bold tracking-tighter uppercase"
                        style={{ fontFamily: "'TronAres','Orbitron', sans-serif", textShadow: '0 0 40px rgba(255,0,60,0.2)' }}
                    >
                        LAYAM
                    </h1>

                    <p className="text-white/40 text-sm tracking-widest uppercase max-w-md mx-auto">
                        Showcase your rhythm and energy in the most anticipated dance competition of the year
                    </p>
                    {/* Coordinators Highlight */}
                    <div className="pt-8 pb-4 flex flex-col items-center gap-6">
                        <div className="flex flex-col items-center">
                            <span className="text-neon-red text-[10px] uppercase tracking-[0.4em] font-bold opacity-80 mb-2">LAYAM'26 COORDINATORS</span>
                            <div className="h-px w-24 bg-gradient-to-r from-transparent via-neon-red/40 to-transparent" />
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-8 md:gap-12">
                            {/* Coordinator 1 */}
                            <div className="flex flex-col items-center gap-3 group">
                                <div className="flex items-center gap-4 py-2 px-6 rounded-2xl glass border border-white/5 group-hover:border-neon-red/30 transition-all duration-300">
                                    <span className="text-white text-lg font-display font-bold tracking-tight">Midhun MB</span>
                                    <a
                                        href="tel:9495249272"
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
                                    <span className="text-white text-lg font-display font-bold tracking-tight">Kavya L</span>
                                    <a
                                        href="tel:9747776684"
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
                        <span className="text-neon-red/40 text-[9px] font-mono tracking-[0.4em] uppercase">March 23 · VKCET</span>
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

                        {/* FormFacade embedded form */}
                        <div className="px-2 py-4">
                            <FormfacadeEmbed
                                formFacadeURL="https://formfacade.com/include/102361209278677182588/form/1FAIpQLSewxLMJWBLqsrPscMDJctzQ_8lJr6wnjGqzOHv5H7n30OAP6A/classic.js/?div=ff-compose"
                                onSubmitForm={() => console.log('LAYAM registration submitted')}
                            />
                        </div>

                        {/* Bottom bar */}
                        <div className="flex items-center justify-between px-6 py-3 border-t border-white/5">
                            <span className="text-[9px] font-mono text-white/10 uppercase tracking-[0.3em]">VKCET · Parippally</span>
                            <span className="text-[9px] font-mono text-white/10 uppercase tracking-[0.3em]">Grid OS v2.0.26</span>
                        </div>
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
                    Prayan '26 · VKCET · Cultural Vibe
                </p>
            </motion.div>
        </div>
    );
}
