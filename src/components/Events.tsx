import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap } from 'lucide-react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { cn } from '@/src/lib/utils';
import { Reveal } from './Reveal';

gsap.registerPlugin(ScrollTrigger);

import SlidingCards, { CardContent } from './ui/SlidingCards';

const EventCard = React.memo(({ title, description, color, image, registerLink }: any) => {
  return (
    <div className="perspective-1000 group h-full">
      <div className={cn(
        "glass overflow-hidden rounded-3xl h-full transition-colors duration-300 group-hover:border-opacity-50 flex flex-col",
        color === 'red' ? 'group-hover:border-neon-red' : 'group-hover:border-neon-purple'
      )}>
        {image && (
          <div className="relative w-full aspect-[2/3] bg-black/40 overflow-hidden border-b border-white/5">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        <div className="p-8 flex flex-col flex-1 gap-6">
          <div className="space-y-4">
            <h3 className="text-3xl font-display font-bold">{title}</h3>
            <p className="text-white/50 leading-relaxed text-sm">{description}</p>
          </div>

          <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between gap-3">
            <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">Learn More</span>
            <div className="flex items-center gap-3">
              {registerLink && (
                <Link
                  to={registerLink}
                  className="flex items-center gap-2 text-[10px] px-4 py-2 rounded-full bg-neon-red text-black font-bold tracking-widest uppercase hover:shadow-[0_0_20px_rgba(255,0,60,0.5)] transition-all duration-300 no-underline"
                  style={{ fontFamily: "'Orbitron',sans-serif" }}
                >
                  Register
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export const Events = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.section-title', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
    });
  }, { scope: containerRef });

  const onlineEvents = [
    {
      title: 'HOT SHOTS',
      description: 'Unleash your creativity and capture the perfect moment in our premier reels challenge.',
      color: 'red',
      image: '/posters/hotshots.jpeg',
      registerLink: '/register/hot-shots',
    },
    {
      title: 'Captura',
      description: 'Capture the essence of the moment in our premier photography challenge.',
      color: 'red',
      image: '/posters/captura.jpeg',
      registerLink: '/register/photography',
    },
    {
      title: 'Aabheri',
      description: 'The soul of music. Compete in our classical music competition and shine.',
      color: 'red',
      image: '/posters/aabheri.jpeg',
      registerLink: '/register/aabheri',
    },
  ];

  const culturalEvents = [
    {
      title: 'Estella',
      description: 'The personality contest where grace meets intelligence. Be the face of Prayan.',
      color: 'purple',
      registerLink: '/register/estella',
    },
    {
      title: 'Mr & Mrs Prayan',
      description: 'The hunt for the ultimate duo. Showcase your charisma and teamwork.',
      color: 'purple',
      registerLink: '/register/mr-mrs-prayan',
    },
  ];

  const stageEvents = [
    {
      title: 'LAYAM',
      description: 'Showcase your rhythm and energy in the most anticipated Inter-college Dance competition of the year.',
      color: 'red',
      registerLink: '/register/layam',
    },
    {
      title: 'Music Show',
      description: 'An evening of melodies and high energy performance by the best talents.',
      color: 'orange',
      registerLink: '/register/music-show',
    },
    {
      title: 'Fashion Show',
      description: 'Walk the ramp with style and attitude at our flagship fashion event.',
      color: 'pink',
      registerLink: '/register/fashion-show',
    },
    {
      title: 'Quiz.com',
      description: 'Test your knowledge across technology, culture, and more in our mega quiz.',
      color: 'blue',
      registerLink: '/register/quiz',
    },
  ];

  const formatCards = (eventsList: any[]) =>
    eventsList.map((event, i) => ({
      id: i,
      title: event.title,
      description: event.description,
      content: <EventCard {...event} />
    }));

  const onlineCardsData = formatCards(onlineEvents);
  const culturalCardsData = formatCards(culturalEvents);
  const stageCardsData = formatCards(stageEvents);

  const DeckLabel = ({ text }: { text: string }) => (
    <div className="flex flex-col items-center mb-12">
      <div className="flex items-center gap-3 md:gap-4">
        <div className="w-8 md:w-12 h-[1.5px] bg-neon-red/50" />
        <span className="text-lg md:text-xl uppercase tracking-[0.2em] font-bold text-white text-center whitespace-nowrap" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          {text}
        </span>
        <div className="w-8 md:w-12 h-[1.5px] bg-neon-red/50" />
      </div>
    </div>
  );

  return (
    <section ref={containerRef} id="events" className="py-20 md:py-32 px-6 bg-black/50">
      <div className="max-w-7xl mx-auto space-y-20 md:space-y-48">
        {/* Main Title */}
        <div className="space-y-12 md:space-y-16">
          <Reveal>
            <div className="section-title flex items-end justify-between border-b border-white/10 pb-6 md:pb-8">
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-tighter">
                FEST <span className="text-neon-red">HIGHLIGHTS</span>
              </h2>
              <p className="text-white/40 uppercase tracking-widest text-sm hidden md:block">Innovation & Excellence</p>
            </div>
          </Reveal>
        </div>

        {/* Decks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 lg:gap-8 items-start">
          {/* Online Events Deck */}
          <div className="space-y-8">
            <DeckLabel text="Online" />
            <SlidingCards cards={onlineCardsData} />
          </div>

          {/* Cultural Events Deck */}
          <div className="space-y-8">
            <DeckLabel text="Cultural" />
            <SlidingCards cards={culturalCardsData} showSwipeLabel={false} />
          </div>

          {/* Stage Events Deck */}
          <div className="space-y-8">
            <DeckLabel text="Inter-College" />
            <SlidingCards cards={stageCardsData} showSwipeLabel={false} />
          </div>
        </div>
        {/* VKCET Venue */}
        <div id="venue" className="space-y-12 md:space-y-16">
          <div className="section-title flex items-end justify-between border-b border-white/10 pb-6 md:pb-8">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-tighter">
              VENUE
            </h2>
            <p className="text-white/40 uppercase tracking-widest text-sm hidden md:block">VKCET · Parippally, Kerala</p>
          </div>

          <div className="glass rounded-3xl overflow-hidden border border-white/10 group hover:border-neon-red/40 transition-colors duration-500">
            <div className="relative w-full h-[320px] sm:h-[420px] md:h-[500px]">
              <iframe
                title="VKCET Location"
                src="https://www.google.com/maps?q=Valia+Koonambaikulathamma+College+of+Engineering+and+Technology+Parippally+Kerala&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.8)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Overlay bar */}
              <div className="absolute bottom-0 inset-x-0 px-6 py-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between">
                <div>
                  <p className="text-white font-display font-bold text-lg tracking-widest uppercase">VKCET</p>
                  <p className="text-white/50 text-xs tracking-widest uppercase">Parippally · Kollam · Kerala</p>
                </div>
                <a
                  href="https://maps.app.goo.gl/T8Q5yUtPRJRgpAKb9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-4 py-2 rounded-full border border-neon-red/60 text-neon-red hover:bg-neon-red hover:text-black transition-all duration-300 tracking-widest uppercase"
                >
                  Open in Maps
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
