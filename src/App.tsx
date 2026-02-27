import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Events } from './components/Events';
import { Timeline } from './components/Timeline';
import { Sponsors, Footer } from './components/Sponsors';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import GlowingEffectDemo from './components/glowing-effect-demo';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    const lenis = new Lenis({
      duration: 2.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      ScrollTrigger.refresh();
    }
  }, [isLoading]);

  return (
    <main className="relative bg-black min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" />
        ) : (
          <div key="content" className="relative">
            <CustomCursor />
            <Hero />
            <About />
            <section className="py-32 px-6">
              <div className="max-w-7xl mx-auto space-y-16">
                <div className="text-center space-y-4">
                  <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter">
                    FEST <span className="text-neon-red">HIGHLIGHTS</span>
                  </h2>
                  <p className="text-white/40 uppercase tracking-widest text-sm">Experience the Future</p>
                </div>
                <GlowingEffectDemo />
              </div>
            </section>
            <Events />
            <Timeline />
            <Sponsors />
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
