import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Music, Zap, Trophy, Users, Star } from 'lucide-react';
import { cn } from '@/src/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const EventCard = ({ title, description, icon: Icon, color, image }: any) => {
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

        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest font-bold opacity-50">Learn More</span>
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-2",
            color === 'red' ? 'bg-neon-red text-black' : 'bg-neon-purple text-white'
          )}>
            <Zap size={18} />
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

  const techEvents = [
    {
      title: 'Hackathon',
      description: '24 hours of intense coding to solve real-world problems with innovative solutions.',
      icon: Cpu,
      color: 'red',
    },
    {
      title: 'AI Challenge',
      description: 'Push the boundaries of artificial intelligence and machine learning in this elite contest.',
      icon: Zap,
      color: 'red',
    },
    {
      title: 'Robo War',
      description: 'The ultimate battle of machines. Engineering prowess meets tactical combat.',
      icon: Trophy,
      color: 'red',
    },
  ];

  const culturalEvents = [
    {
      title: 'Dance Battle',
      description: 'Showcase your rhythm and energy in the most anticipated dance competition of the year.',
      icon: Music,
      color: 'purple',
    },
    {
      title: 'Music Fest',
      description: 'From classical melodies to rock anthems, let the music take center stage.',
      icon: Star,
      color: 'purple',
    },
    {
      title: 'Fashion Show',
      description: 'Where style meets substance. Walk the ramp and redefine the world of fashion.',
      icon: Users,
      color: 'purple',
    },
  ];

  return (
    <section ref={containerRef} id="events" className="py-32 px-6 bg-black/50">
      <div className="max-w-7xl mx-auto space-y-32">
        {/* Tech Events */}
        <div className="space-y-16">
          <div className="section-title flex items-end justify-between border-b border-white/10 pb-8">
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter">
              TECH <span className="text-neon-red">ARENA</span>
            </h2>
            <p className="text-white/40 uppercase tracking-widest text-sm hidden md:block">Innovation & Excellence</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {techEvents.map((event, i) => (
              <div key={i} className="event-card-wrapper">
                <EventCard {...event} />
              </div>
            ))}
          </div>
        </div>

        {/* Cultural Events */}
        <div className="space-y-16">
          <div className="section-title flex items-end justify-between border-b border-white/10 pb-8">
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter">
              CULTURAL <span className="text-neon-purple">VIBE</span>
            </h2>
            <p className="text-white/40 uppercase tracking-widest text-sm hidden md:block">Art & Expression</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {culturalEvents.map((event, i) => (
              <div key={i} className="event-card-wrapper">
                <EventCard {...event} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
