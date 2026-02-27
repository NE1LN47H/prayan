import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MagneticButton } from './MagneticButton';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const frameCount = 240; // Total number of frames in the sequence
  const currentFrame = (index: number) => `/frames/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

  useGSAP(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas dimensions
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(0);
    };

    // Preload images
    const preload = () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        imagesRef.current[i] = img;
      }
    };

    // Draw frame with object-cover logic
    const renderFrame = (index: number) => {
      const img = imagesRef.current[index];
      if (!img || !img.complete || !context) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.width;
      const imgHeight = img.height;

      const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
      const newWidth = imgWidth * ratio;
      const newHeight = imgHeight * ratio;
      const x = (canvasWidth - newWidth) / 2;
      const y = (canvasHeight - newHeight) / 2;

      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.drawImage(img, x, y, newWidth, newHeight);
    };

    preload();
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Initial frame render
    const checkImagesLoaded = () => {
      if (imagesRef.current[0] && imagesRef.current[0].complete) {
        renderFrame(0);
      } else if (imagesRef.current[0]) {
        imagesRef.current[0].onload = () => renderFrame(0);
      }
    };
    checkImagesLoaded();

    // Master Timeline - Unifies Pinning, Frames, and Text
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=800%', // Optimized for deep cinematic scroll
        scrub: 2, // High-inertia smooth tracking
        pin: true,
        onUpdate: (self) => {
          const frameIndex = Math.min(
            frameCount - 1,
            Math.floor(self.progress * frameCount)
          );
          renderFrame(frameIndex);
        },
      }
    });

    // Initial States
    gsap.set(['.hero-step-2', '.hero-step-3', '.hero-subtitle', '.hero-cta'], {
      opacity: 0,
      y: 60,
      filter: 'blur(20px)'
    });

    // Ares Protocol Initial States
    gsap.set('.beam-line', { scaleX: 0, opacity: 1 });
    gsap.set('.laser-scan', { opacity: 0, left: '0%' });
    gsap.set('.ares-text', {
      clipPath: 'inset(50% 0 50% 0)',
      opacity: 0,
      filter: 'brightness(2) contrast(1.5)'
    });

    // Timeline Sequence
    masterTl
      .addLabel('start')
      // Step 1: VKCET fades out
      .to('.hero-step-1', { opacity: 0, y: -60, filter: 'blur(20px)', duration: 1.5 }, 'start')

      .addLabel('step2', '+=0.2')
      // Step 2: PRESENTS fades in
      .to('.hero-step-2', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5 }, 'step2')
      .to('.hero-step-2', { opacity: 0, y: -60, filter: 'blur(20px)', duration: 1.5 }, 'step2+=2')

      .addLabel('step3', 'step2+=3.5')
      // Step 3: PRAYAN '26 THE ARES PROTOCOL - Cinematic Entrance
      .to('.hero-step-3', {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 2,
        ease: "power2.inOut"
      }, 'step3')

      .addLabel('protocol', 'step3+=1')
      // Protocol Beam - Horizontal Stretch
      .to('.beam-line', {
        scaleX: 1,
        duration: 1.2,
        ease: "power4.inOut"
      }, 'protocol')

      // Vertical Expansion (Shutter) & Text Materialization + Laser Scan
      .to('.beam-top', {
        top: '0%',
        duration: 1.5,
        ease: "expo.inOut"
      }, 'protocol+=0.8')
      .to('.beam-bot', {
        top: '100%',
        duration: 1.5,
        ease: "expo.inOut"
      }, 'protocol+=0.8')
      .to('.ares-text', {
        clipPath: 'inset(0% 0 0% 0)',
        opacity: 1,
        duration: 1.5,
        ease: "expo.inOut"
      }, 'protocol+=0.8')
      .to('.laser-scan', {
        opacity: 1,
        left: '100%',
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => gsap.to('.laser-scan', { opacity: 0, duration: 0.5 })
      }, 'protocol+=0.7')

      .addLabel('settle', 'protocol+=2.5')
      // Re-Sync Flicker (Chromatic Shift Effect)
      .to('.ares-text', {
        filter: 'brightness(1) contrast(1)',
        duration: 0.2,
        ease: "none"
      }, 'settle')
      .to('.ares-text', {
        opacity: 0.5,
        duration: 0.08,
        repeat: 3,
        yoyo: true,
        ease: "none"
      }, 'settle+=0.2')
      .to('.ares-text', {
        opacity: 1,
        duration: 0.1
      })

      // Fade out lines after text is solid
      .to('.beam-line', {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.2")

      // Subtitle & CTA Reveal
      .to('.hero-subtitle, .hero-cta', {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        stagger: 0.3,
        ease: "power3.out"
      }, "+=0.2")

      // Stay on final frame
      .to({}, { duration: 2 });

    // Global refresh to ensure positions are correct
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      masterTl.kill();
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="home" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full object-cover brightness-[0.8] contrast-[1.2] grayscale-[0.2]"
      />

      {/* Visual Masking Overlays */}
      <div className="noise" />
      <div className="scanlines" />

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,rgba(0,0,0,0.8)_100%)] pointer-events-none z-10" />

      {/* Overlay Gradient (Bottom fade) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black z-10" />

      {/* Content */}
      <div
        ref={textRef}
        className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6"
      >
        {/* Title Container - Increased height and relative positioning for steps */}
        <div className="relative h-24 md:h-32 w-full flex items-center justify-center">
          {/* Step 1: VKCET */}
          <h2 className="hero-step-1 absolute text-4xl md:text-6xl font-brand font-bold tracking-[0.4em] text-white opacity-100 uppercase">
            VKCET
          </h2>

          {/* Step 2: PRESENTS */}
          <h2 className="hero-step-2 absolute text-3xl md:text-5xl font-display font-light tracking-[0.8em] text-neon-red opacity-0 uppercase">
            PRESENTS
          </h2>

          {/* Step 3: PRAYAN '26 - Ares Protocol */}
          <div className="hero-step-3 absolute opacity-0 flex items-center justify-center">
            <div className="relative">
              {/* Protocol Beam (Shutter Lines) */}
              <div className="beam-line beam-top absolute top-1/2 left-0 right-0 h-[1.5px] bg-neon-red shadow-[0_0_10px_#ff003c] z-30 scale-x-0" />
              <div className="beam-line beam-bot absolute top-1/2 left-0 right-0 h-[1.5px] bg-neon-red shadow-[0_0_10px_#ff003c] z-30 scale-x-0" />

              <h1 className="ares-text glass-text-3d relative text-7xl md:text-9xl font-display font-bold tracking-tighter uppercase leading-none whitespace-nowrap overflow-hidden">
                PRAYAN<span className="text-neon-red drop-shadow-[0_0_15px_rgba(255,0,60,0.4)]">'26</span>
              </h1>

              {/* Laser Scan Line */}
              <div className="laser-scan absolute top-0 bottom-0 left-0 w-[2px] bg-white shadow-[0_0_15px_#fff,0_0_30px_#ff003c] z-30 opacity-0" />
            </div>
          </div>
        </div>

        <div className="space-y-4 mt-8">
          <p className="hero-subtitle text-xl md:text-2xl font-light text-white/80 tracking-widest uppercase opacity-0">
            Where Technology Meets Culture
          </p>

          <div className="hero-cta flex flex-col sm:flex-row gap-6 justify-center opacity-0 mt-8">
            <MagneticButton className="bg-neon-red text-black hover:shadow-[0_0_30px_rgba(255,0,60,0.5)]">
              Register Now
            </MagneticButton>
            <MagneticButton className="bg-white/10 text-white border border-white/20 hover:bg-white/20">
              Explore Events
            </MagneticButton>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-white/50 w-8 h-8" />
        </div>
      </div>

      {/* Decorative Lines */}
      <div className="absolute left-10 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute right-10 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
    </section>
  );
};
