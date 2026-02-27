import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Instagram, Twitter, Linkedin, MapPin, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Sponsors = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.sponsor-logo', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(1.7)',
    });
  }, { scope: containerRef });

  const sponsors = [
    { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
    { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
    { name: 'Red Bull', logo: 'https://upload.wikimedia.org/wikipedia/en/f/f5/Red_Bull_Energy_Drink_logo.svg' },
    { name: 'Intel', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282020%29.svg' },
    { name: 'Spotify', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_with_text.svg' },
    { name: 'Adobe', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Adobe_Corporate_logo.svg' },
  ];

  return (
    <section ref={containerRef} id="sponsors" className="py-32 px-6">
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="text-center space-y-4">
          <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter">
            OUR <span className="text-neon-red">PARTNERS</span>
          </h2>
          <p className="text-white/40 uppercase tracking-widest text-sm">Empowering the Vision</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {sponsors.map((sponsor, i) => (
            <div
              key={i}
              className="sponsor-logo glass p-8 rounded-2xl flex items-center justify-center grayscale hover:grayscale-0 hover:border-neon-red transition-all duration-500 group"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="max-h-12 w-auto opacity-50 group-hover:opacity-100 transition-opacity"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer id="contact" className="pt-32 pb-10 px-6 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-2 space-y-8">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-gradient-to-br from-neon-red to-neon-purple rounded-xl flex items-center justify-center font-display font-bold text-2xl">
                P
              </div>
              <span className="font-display font-bold text-3xl tracking-tighter">
                PRAYAN<span className="text-neon-red">'26</span>
              </span>
            </div>
            <p className="text-white/50 text-lg max-w-md">
              The ultimate techno-cultural experience. Join us for two days of innovation,
              creativity, and unforgettable memories at VKCET.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-neon-red hover:text-black transition-all duration-300"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-display font-bold text-xl">Quick Links</h4>
            <ul className="space-y-4 text-white/50">
              {['Home', 'About', 'Events', 'Timeline', 'Register'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="hover:text-neon-red transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-display font-bold text-xl">Contact Us</h4>
            <ul className="space-y-4 text-white/50">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-neon-red shrink-0" />
                <span>VKCET, Valia Koonambaikulam, Parippally, Kerala</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-neon-red shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-neon-red shrink-0" />
                <span>info@prayan.vkcet.ac.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:row items-center justify-between gap-6 text-white/30 text-sm">
          <p>© 2026 PRAYAN VKCET. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
