import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Music, Zap, Trophy, Users, Star } from 'lucide-react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { cn } from '@/src/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const SwipeableCard = ({ id, title, description, icon: Icon, color, registerLink, setCards, cards, isComingSoon }: any) => {
  const x = useMotionValue(0);
  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

  const isFront = cards.length > 0 && id === cards[cards.length - 1].id;

  const rotate = useTransform(() => {
    if (isFront) return `${rotateRaw.get()}deg`;
    const index = cards.findIndex((c: any) => c.id === id);
    const offset = (cards.length - 1 - index) * 2;
    return `${offset % 2 === 0 ? offset : -offset}deg`;
  });

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 100) {
      setCards((pv: any) => {
        const swipedCard = pv.find((v: any) => v.id === id);
        const remainingCards = pv.filter((v: any) => v.id !== id);
        return [swipedCard, ...remainingCards];
      });
      x.set(0);
    }
  };

  return (
    <motion.div
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
        zIndex: cards.findIndex((c: any) => c.id === id),
      }}
      animate={{
        scale: isFront ? 1 : 0.95,
        y: isFront ? 0 : (cards.length - 1 - cards.findIndex((c: any) => c.id === id)) * -10,
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="w-full max-w-[400px] aspect-[4/5] cursor-grab active:cursor-grabbing"
    >
      <div className={cn(
        "glass p-8 rounded-3xl h-full transition-all duration-500 flex flex-col gap-6 border border-white/10",
        isComingSoon ? "border-dashed border-neon-red/30" : (color === 'red' ? 'hover:border-neon-red/50' : 'hover:border-neon-purple/50')
      )}>
        <div className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center",
          isComingSoon ? "bg-white/5 text-white/20" : (color === 'red' ? 'bg-neon-red/10 text-neon-red' : 'bg-neon-purple/10 text-neon-purple')
        )}>
          <Icon size={32} />
        </div>

        <div className="space-y-4">
          <h3 className={cn("text-3xl font-display font-bold", isComingSoon && "text-white/20")}>{title}</h3>
          <p className="text-white/50 leading-relaxed text-sm">{description}</p>
        </div>

        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between gap-3">
          <span className="text-xs uppercase tracking-widest font-bold opacity-50">
            {isComingSoon ? "Stay Tuned" : "Swipe to see other events"}
          </span>
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
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-transform",
              isComingSoon ? "bg-white/5 text-white/20" : (color === 'red' ? 'bg-neon-red text-black' : 'bg-neon-purple text-white')
            )}>
              <Zap size={18} />
            </div>
          </div>
        </div>
        {isComingSoon && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-neon-red font-mono text-[10px] tracking-[0.4em] uppercase animate-pulse">Coming Soon</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const SwipeCardsContainer = ({ events }: { events: any[] }) => {
  const [cards, setCards] = useState(events.map((e, i) => ({ ...e, id: i })));

  return (
    <div className="relative h-[600px] w-full grid place-items-center">
      <AnimatePresence>
        {cards.map((card) => (
          <SwipeableCard key={card.id} {...card} cards={cards} setCards={setCards} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const EventCard = ({ title, description, icon: Icon, color, image, registerLink }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    gsap.to(cardRef.current, {
      rotateY: x * 20,
      rotateX: -y * 20,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 group"
    >
      <div className={cn(
        "glass p-8 rounded-3xl h-full transition-all duration-500 group-hover:border-opacity-50 flex flex-col gap-6",
        color === 'red' ? 'group-hover:border-neon-red' : 'group-hover:border-neon-purple'
      )}>
        <div className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center",
          color === 'red' ? 'bg-neon-red/10 text-neon-red' : 'bg-neon-purple/10 text-neon-purple'
        )}>
          <Icon size={32} />
        </div>

        <div className="space-y-4">
          <h3 className="text-3xl font-display font-bold">{title}</h3>
          <p className="text-white/50 leading-relaxed">{description}</p>
        </div>

        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between gap-3">
          <span className="text-xs uppercase tracking-widest font-bold opacity-50">Learn More</span>
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
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-2",
              color === 'red' ? 'bg-neon-red text-black' : 'bg-neon-purple text-white'
            )}>
              <Zap size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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

    gsap.from('.event-card-wrapper', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
      },
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    });
  }, { scope: containerRef });

  const techEvents: any[] = [
    // Add real tech events here
  ];

  const culturalEvents = [
    {
      title: 'LAYAM',
      description: 'Showcase your rhythm and energy in the most anticipated Inter-collegedance competition of the year.',
      icon: Music,
      color: 'red',
      registerLink: '/register/layam',
    },
  ];

  const allEvents = [
    {
      title: 'Events',
      description: 'More exciting events are on the way. Stay tuned for the full lineup!',
      icon: Star,
      color: 'red',
      isComingSoon: true,
    },
    ...techEvents,
    ...culturalEvents,
  ];

  return (
    <section ref={containerRef} id="events" className="py-20 md:py-32 px-6 bg-black/50">
      <div className="max-w-7xl mx-auto space-y-20 md:space-y-32">
        {/* Tech Events */}
        <div className="space-y-12 md:space-y-16">
          <div className="section-title flex items-end justify-between border-b border-white/10 pb-6 md:pb-8">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-tighter">
              TECH <span className="text-neon-red">EVENTS</span>
            </h2>
            <p className="text-white/40 uppercase tracking-widest text-sm hidden md:block">Innovation & Excellence</p>
          </div>

          <SwipeCardsContainer events={allEvents} />
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
