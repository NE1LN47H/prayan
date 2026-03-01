import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { MagneticButton } from './MagneticButton';
import { ChevronDown } from 'lucide-react';
import { TornadoBackground } from './TornadoBackground';

// March 23 2026 00:00:00 IST (UTC+5:30)
const EVENT_DATE = new Date('2026-03-23T00:00:00+05:30').getTime();

function getTimeLeft() {
  const diff = Math.max(0, EVENT_DATE - Date.now());
  const d = Math.floor(diff / 1000 / 3600 / 24);
  const m = Math.floor((diff / 1000 / 60) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return {
    d: String(d).padStart(2, '0'),
    m: String(m).padStart(2, '0'),
    s: String(s).padStart(2, '0'),
  };
}

function TronColon() {
  return (
    <span
      className="text-neon-red text-3xl sm:text-4xl md:text-5xl font-bold mx-1 select-none"
      style={{ fontFamily: "'TronAres','Orbitron',sans-serif", lineHeight: 1 }}
    >
      :
    </span>
  );
}

function TronDigit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      {/* Digit box */}
      <div className="relative">
        {/* Corner brackets */}
        <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neon-red opacity-60" />
        <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neon-red opacity-60" />
        <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neon-red opacity-60" />
        <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neon-red opacity-60" />

        <div
          className="px-3 sm:px-4 py-2 text-3xl sm:text-4xl md:text-5xl font-bold tracking-widest text-white"
          style={{
            fontFamily: "'TronAres','Orbitron',monospace",
            background: 'rgba(255,0,60,0.04)',
            textShadow: '0 0 12px rgba(255,0,60,0.6), 0 0 30px rgba(255,0,60,0.2)',
            minWidth: '72px',
            textAlign: 'center',
            letterSpacing: '0.05em',
          }}
        >
          {value}
        </div>
      </div>
      {/* Label */}
      <span
        className="text-[9px] sm:text-[10px] tracking-[0.3em] text-white/40 uppercase"
        style={{ fontFamily: "'Orbitron',sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);
  const [time, setTime] = useState(getTimeLeft);

  // Live countdown tick
  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    gsap.set(['.hero-step-3', '.hero-countdown', '.hero-subtitle', '.hero-cta'], {
      opacity: 0,
      y: 40,
      filter: 'blur(16px)',
    });
    gsap.set('.beam-line', { scaleX: 0, opacity: 1 });
    gsap.set('.laser-scan', { opacity: 0, left: '0%' });
    gsap.set('.ares-text', {
      clipPath: 'inset(50% 0 50% 0)',
      opacity: 0,
      filter: 'brightness(2) contrast(1.5)',
    });

    const runAnimation = () => {
      if (animatedRef.current) return;
      animatedRef.current = true;

      const tl = gsap.timeline({ delay: 0.3 });

      tl
        .to('.hero-step-3', {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 1.0, ease: 'power2.out',
        })
        .to('.beam-line', {
          scaleX: 1, duration: 0.8, ease: 'power4.inOut',
        }, '+=0.2')
        .to('.beam-top', { top: '0%', duration: 0.9, ease: 'expo.inOut' }, '+=0.1')
        .to('.beam-bot', { top: '100%', duration: 0.9, ease: 'expo.inOut' }, '<')
        .to('.ares-text', {
          clipPath: 'inset(0% 0 0% 0)', opacity: 1,
          duration: 0.9, ease: 'expo.inOut',
        }, '<')
        .to('.laser-scan', {
          opacity: 1, left: '100%', duration: 1.4, ease: 'power2.inOut',
        }, '<')
        .to('.laser-scan', { opacity: 0, duration: 0.3 }, '>')
        .to('.ares-text', { filter: 'brightness(1) contrast(1)', duration: 0.2 })
        .to('.ares-text', {
          opacity: 0.4, duration: 0.07, repeat: 3, yoyo: true, ease: 'none',
        })
        .to('.ares-text', { opacity: 1, duration: 0.1 })
        .to('.beam-line', { opacity: 0, duration: 0.3, ease: 'power2.out' }, '-=0.1')

        // Countdown fades in right after title settles
        .to('.hero-countdown', {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 0.9, ease: 'power3.out',
        }, '+=0.1')
        .to('.hero-subtitle', {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 0.8, ease: 'power3.out',
        }, '+=0.1')
        .to('.hero-cta', {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 0.8, ease: 'power3.out',
        }, '-=0.4');
    };

    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) runAnimation(); },
      { threshold: 0.25 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} id="home" className="relative h-screen w-full overflow-hidden bg-black">
      <TornadoBackground />
      <div className="absolute inset-0 noise z-0" />
      <div className="absolute inset-0 scanlines z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,rgba(0,0,0,0.8)_100%)] pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black z-10 pointer-events-none" />

      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6 gap-0">

        {/* PRAYAN '26 Title */}
        <div className="relative h-20 sm:h-24 md:h-32 w-full flex items-center justify-center pointer-events-none">
          <div className="hero-step-3 absolute opacity-0 flex items-center justify-center">
            <div className="relative">
              <div className="beam-line beam-top absolute top-1/2 left-0 right-0 h-[1.5px] bg-neon-red shadow-[0_0_10px_#ff003c] z-30 scale-x-0" />
              <div className="beam-line beam-bot absolute top-1/2 left-0 right-0 h-[1.5px] bg-neon-red shadow-[0_0_10px_#ff003c] z-30 scale-x-0" />

              <h1 className="ares-text glass-text-3d relative text-4xl sm:text-6xl md:text-8xl font-display font-bold tracking-tighter uppercase leading-none whitespace-nowrap overflow-hidden">
                PRAYAN<span className="text-neon-red drop-shadow-[0_0_15px_rgba(255,0,60,0.4)]">'26</span>
              </h1>
              <div className="laser-scan absolute top-0 bottom-0 left-0 w-[2px] bg-white shadow-[0_0_15px_#fff,0_0_30px_#ff003c] z-30 opacity-0" />
            </div>
          </div>
        </div>

        {/* ── Tron Countdown ── */}
        <div className="hero-countdown opacity-0 mt-6 flex flex-col items-center gap-3 pointer-events-none">
          {/* Top rule */}
          <div className="flex items-center gap-3 w-full max-w-xs">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-neon-red/60" />
            <span className="text-neon-red/60 text-[9px] tracking-[0.4em] uppercase" style={{ fontFamily: "'Orbitron',sans-serif" }}>
              Event Begins
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-neon-red/60" />
          </div>

          {/* Digits row */}
          <div className="flex items-center gap-1">
            <TronDigit value={time.d} label="Days" />
            <TronColon />
            <TronDigit value={time.m} label="Minutes" />
            <TronColon />
            <TronDigit value={time.s} label="Seconds" />
          </div>

          {/* Date badge */}
          <div
            className="text-[10px] tracking-[0.35em] text-neon-red/70 uppercase mt-1"
            style={{ fontFamily: "'Orbitron',sans-serif" }}
          >
            March 23 | 24
          </div>
        </div>

        {/* Subtitle + CTA */}
        <div className="space-y-4 mt-6 px-4">
          <p className="hero-subtitle text-lg sm:text-xl md:text-2xl font-light text-white/80 tracking-widest uppercase opacity-0 pointer-events-none">
            Techno cultural fest
          </p>
          <div className="hero-cta flex flex-col sm:flex-row gap-6 justify-center opacity-0 mt-6">
            <MagneticButton className="bg-neon-red text-black hover:shadow-[0_0_30px_rgba(255,0,60,0.5)]">
              Register Now
            </MagneticButton>
            <MagneticButton className="bg-white/10 text-white border border-white/20 hover:bg-white/20">
              Explore Events
            </MagneticButton>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none">
          <ChevronDown className="text-white/50 w-8 h-8" />
        </div>
      </div>

      <div className="absolute left-10 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none z-10" />
      <div className="absolute right-10 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none z-10" />
    </section>
  );
};
