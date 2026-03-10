import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route } from 'react-router-dom';
import { Hero } from './components/Hero';
import { ParallaxHero } from './components/ParallaxHero';
import { About } from './components/About';
import { Events } from './components/Events';
import { Timeline } from './components/Timeline';
import { Sponsors, Footer } from './components/Sponsors';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import ImageTube3D from './components/ImageTube3D';
import { BackgroundBeams } from './components/BackgroundBeams';
import { Navbar } from './components/Navbar';
import CreditsPage from './pages/CreditsPage';
import LayamRegistrationPage from './pages/LayamRegistrationPage';
import HotShotsRegistrationPage from './pages/HotShotsRegistrationPage';
import PhotographyRegistrationPage from './pages/PhotographyRegistrationPage';
import EFootballRegistrationPage from './pages/EFootballRegistrationPage';
import FreeFireRegistrationPage from './pages/FreeFireRegistrationPage';

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
      duration: 2.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // GSAP ScrollTrigger configuration for mobile smoothness
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });

    if ('ontouchstart' in window) {
      ScrollTrigger.normalizeScroll(true);
    }

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
    <Routes>
      {/* /credits is a fully standalone page — no loading screen, no Lenis */}
      <Route path="/credits" element={<CreditsPage />} />
      <Route path="/register/layam" element={<LayamRegistrationPage />} />
      <Route path="/register/hot-shots" element={<HotShotsRegistrationPage />} />
      <Route path="/register/photography" element={<PhotographyRegistrationPage />} />
      <Route path="/register/efootball" element={<EFootballRegistrationPage />} />
      <Route path="/register/free-fire" element={<FreeFireRegistrationPage />} />

      {/* Main site */}
      <Route path="*" element={
        <main className="relative bg-black min-h-screen">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <LoadingScreen key="loader" />
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="relative"
              >
                <Navbar />
                <CustomCursor />
                <ParallaxHero />
                <Hero />
                <div className="relative">
                  <div className="relative z-10 w-full">
                    <About />
                    <section className="py-20 px-6 relative overflow-hidden">
                      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
                        <div className="text-center space-y-4">
                          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-tighter">
                            FEST <span className="text-neon-red">HIGHLIGHTS</span>
                          </h2>
                          <p className="text-white/40 uppercase tracking-widest text-sm">Experience the Future</p>
                        </div>
                        <ImageTube3D />
                      </div>
                    </section>
                    <Events />
                    <Sponsors />
                    <Timeline />
                    <Footer />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      } />
    </Routes>
  );
}
