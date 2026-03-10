import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert, Cpu, Sparkles, BookOpen, Users, Layout, GraduationCap } from 'lucide-react';

export default function N8nWorkshopRegistrationPage() {
    return (
        <div className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col">

            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            {/* Red glow top */}
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
                            Hands on Workshop · Registration
                        </span>
                    </div>

                    <h1
                        className="text-3xl sm:text-6xl md:text-7xl font-display font-bold tracking-tighter uppercase max-w-4xl mx-auto leading-none"
                        style={{ fontFamily: "'TronAres','Orbitron', sans-serif", textShadow: '0 0 40px rgba(255,0,60,0.2)' }}
                    >
                        Agentic AI Using n8n
                    </h1>

                    <p className="text-white/40 text-sm tracking-widest uppercase max-w-2xl mx-auto mt-6">
                        Learn how to build AI Agents and Autonomous Workflows using n8n and LLMs in this hands-on workshop.
                    </p>

                    {/* Quick Details */}
                    <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/5">
                            <span className="text-neon-red font-mono text-[10px] uppercase tracking-widest">Dates: 22, 23, 24 March</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/5">
                            <span className="text-neon-red font-mono text-[10px] uppercase tracking-widest">Time: 10:00 AM</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/5">
                            <span className="text-neon-red font-mono text-[10px] uppercase tracking-widest">Venue: CSE Dept Computer Lab</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-neon-red/20 bg-neon-red/5">
                            <span className="text-white font-mono text-[10px] uppercase tracking-widest font-bold">Early Bird Fee: ₹300</span>
                        </div>
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
                            <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em]">Workshop Portal</span>
                            <span className="flex items-center gap-1.5 text-[9px] font-mono text-neon-red/60 uppercase tracking-widest">
                                <span className="w-1.5 h-1.5 rounded-full bg-neon-red animate-pulse inline-block" />
                                Registration Open
                            </span>
                        </div>

                        {/* Registration Button Section */}
                        <div className="px-8 py-16 flex flex-col items-center justify-center gap-8 relative overflow-hidden text-center">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-red/[0.08] blur-[120px] rounded-full animate-pulse" />

                            <a
                                href="https://docs.google.com/forms/d/e/1FAIpQLSerwpXhGmatkvxPEuV7Bmur3w5lq2nSkOaJ9FTcg3ueFjjbSQ/viewform"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative px-12 py-6 rounded-2xl text-white no-underline transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden border border-neon-red/30 shadow-[0_0_40px_rgba(255,0,60,0.15)]"
                                style={{
                                    background: 'rgba(255, 0, 60, 0.05)',
                                    backdropFilter: 'blur(20px)',
                                    boxShadow: 'inset 0 0 20px rgba(255, 0, 60, 0.1)'
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                                <div className="relative flex flex-col items-center">
                                    <span className="text-2xl sm:text-4xl md:text-5xl font-display font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white drop-shadow-[0_0_15px_rgba(255,0,60,0.6)]" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                        Register Now
                                    </span>
                                    <span className="text-[10px] sm:text-[11px] tracking-[0.4em] sm:tracking-[0.5em] text-neon-red font-bold uppercase opacity-80 mt-2">Secure Workshop Spot</span>
                                </div>
                            </a>
                        </div>

                        {/* Bottom bar */}
                        <div className="flex items-center justify-between px-6 py-3 border-t border-white/5">
                            <span className="text-[9px] font-mono text-white/10 uppercase tracking-[0.3em]">VKCET · CSE Dept</span>
                            <span className="text-[9px] font-mono text-white/10 uppercase tracking-[0.3em]">System ID: N8N-WORKSHOP-26</span>
                        </div>
                    </div>
                </motion.div>

                {/* Benefits container */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="w-full max-w-4xl mt-12 mb-20"
                >
                    <div className="relative rounded-2xl overflow-hidden border border-white/8 p-8 md:p-12"
                        style={{ background: 'rgba(10,10,10,0.6)', backdropFilter: 'blur(20px)' }}>

                        <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-neon-red/30 to-transparent" />

                        <div className="flex items-center gap-4 mb-12">
                            <div className="w-10 h-10 rounded-xl bg-neon-red/10 flex items-center justify-center text-neon-red">
                                <Sparkles size={20} />
                            </div>
                            <h2 className="text-2xl font-display font-bold tracking-wider uppercase text-white">What you'll gain</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { icon: GraduationCap, text: "Certification with credentials" },
                                { icon: BookOpen, text: "KTU Activity Points" },
                                { icon: Cpu, text: "Agentic AI skill acquisition" },
                                { icon: Users, text: "Internship opportunities" },
                                { icon: Layout, text: "AI workflow templates" },
                                { icon: Sparkles, text: "Personalized mentorship" }
                            ].map((benefit, idx) => (
                                <div key={idx} className="flex gap-4 group">
                                    <div className="shrink-0 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neon-red group-hover:bg-neon-red group-hover:text-black transition-all duration-300">
                                        <benefit.icon size={16} />
                                    </div>
                                    <p className="text-white/70 text-sm leading-relaxed tracking-wide group-hover:text-white transition-colors py-1">
                                        {benefit.text}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Rules section abbreviated */}
                        <div className="mt-16 pt-8 border-t border-white/5">
                            <div className="flex items-center gap-3 mb-6">
                                <ShieldAlert size={16} className="text-neon-red/60" />
                                <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">Basic Protocols</span>
                            </div>
                            <ul className="space-y-3">
                                <li className="flex gap-3 items-start">
                                    <span className="text-neon-red font-mono text-[10px] mt-1">01</span>
                                    <p className="text-white/40 text-[11px] uppercase tracking-wider">Bring your own laptop if possible for hands-on sessions.</p>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-neon-red font-mono text-[10px] mt-1">02</span>
                                    <p className="text-white/40 text-[11px] uppercase tracking-wider">Certificates will be issued upon successful completion.</p>
                                </li>
                            </ul>
                        </div>

                        <div className="absolute top-4 right-4 text-[8px] font-mono text-white/5 uppercase tracking-[0.4em]">Protocol Version 8.0.2</div>
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
                    Prayan '26 · VKCET · Innovate
                </p>
            </motion.div>
        </div>
    );
}
