import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!scrollRef.current) return;

    const sections = gsap.utils.toArray('.timeline-item');

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + scrollRef.current?.offsetWidth,
      }
    });

    // Progress bar
    gsap.to('.timeline-progress', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => "+=" + scrollRef.current?.offsetWidth,
        scrub: true,
      }
    });
  }, { scope: containerRef });

  const events = [
    { day: 'DAY 01', title: 'The Genesis', time: '09:00 AM', desc: 'Inauguration Ceremony & Keynote Speech' },
    { day: 'DAY 01', title: 'Tech Battles', time: '11:30 AM', desc: 'Hackathon Kickoff & Preliminary Rounds' },
    { day: 'DAY 01', title: 'Cultural Night', time: '06:00 PM', desc: 'Music Concert & DJ Night' },
    { day: 'DAY 02', title: 'Final Showdown', time: '10:00 AM', desc: 'Project Expo & Final Presentations' },
    { day: 'DAY 02', title: 'The Ramp', time: '04:00 PM', desc: 'Fashion Show & Award Ceremony' },
    { day: 'DAY 02', title: 'Grand Finale', time: '08:00 PM', desc: 'Celebrity Performance & Closing' },
  ];

  return (
    <section ref={containerRef} id="timeline" className="h-screen overflow-hidden bg-black relative">
      <div className="absolute top-20 left-6 z-20">
        <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter">
          EVENT <span className="text-neon-red">TIMELINE</span>
        </h2>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/5 z-30">
        <div className="timeline-progress h-full bg-neon-red w-full origin-left scale-x-0" />
      </div>

      <div ref={scrollRef} className="flex h-full items-center px-[10vw]">
        {events.map((event, i) => (
          <div key={i} className="timeline-item min-w-[80vw] md:min-w-[40vw] px-10">
            <div className="glass p-10 rounded-3xl space-y-6 relative group hover:border-neon-red transition-colors duration-500">
              <span className="text-neon-red font-display font-bold text-xl tracking-widest">{event.day}</span>
              <div className="space-y-2">
                <h3 className="text-4xl font-display font-bold">{event.title}</h3>
                <p className="text-neon-purple font-medium">{event.time}</p>
              </div>
              <p className="text-white/50 text-lg">{event.desc}</p>

              <div className="absolute -bottom-4 -right-4 text-8xl font-display font-bold opacity-5 group-hover:opacity-10 transition-opacity">
                0{i + 1}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
