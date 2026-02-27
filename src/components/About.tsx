import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.about-text p', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    });

    // Floating cards animation
    gsap.to('.about-card', {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      stagger: 0.5,
      ease: 'sine.inOut',
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="about" className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div className="about-text space-y-8">
          <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter">
            THE <span className="text-neon-red">LEGACY</span> <br />
            CONTINUES
          </h2>
          <div className="space-y-6 text-lg text-white/60 leading-relaxed max-w-xl">
            <p>
              PRAYAN'26 is the flagship techno-cultural festival of Valia Koonambaikulam College of Engineering and Technology (VKCET).
              A convergence of innovation, creativity, and cultural excellence.
            </p>
            <p>
              From high-octane technical challenges to soul-stirring cultural performances,
              PRAYAN is where the brightest minds and most talented artists from across the nation unite.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-8">
            <div>
              <h4 className="text-4xl font-display font-bold text-neon-red">50+</h4>
              <p className="text-sm uppercase tracking-widest text-white/40">Events</p>
            </div>
            <div>
              <h4 className="text-4xl font-display font-bold text-neon-purple">10K+</h4>
              <p className="text-sm uppercase tracking-widest text-white/40">Footfall</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="about-card glass p-8 rounded-3xl relative z-10">
            <img
              src="https://picsum.photos/seed/tech/800/600"
              alt="Tech Fest"
              className="rounded-2xl grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="mt-6">
              <h3 className="text-2xl font-display font-bold">Innovation Hub</h3>
              <p className="text-white/50 mt-2">Witness the future of technology through our curated workshops and competitions.</p>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-neon-red/20 blur-[80px] rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-neon-purple/20 blur-[80px] rounded-full" />
        </div>
      </div>
    </section>
  );
};
