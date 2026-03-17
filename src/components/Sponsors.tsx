import React from 'react';
import { Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

/* -------------------- SPONSORS DATA -------------------- */
const SPONSORS_DATA = [
  { name: 'Mafatlal', logo: '/sponsors/mafatlal.jpg', caption: 'Title Sponsor', size: 'lg' },
  { name: 'Sonetec', logo: '/sponsors/sonetec.png', caption: null, size: 'md' },
  { name: 'Sponsors', logo: null, caption: null, size: 'md' },
  { name: 'Sponsors', logo: null, caption: null, size: 'md' },
  { name: 'Sponsors', logo: null, caption: null, size: 'md' },
  { name: 'Sponsors', logo: null, caption: null, size: 'md' },
];

const titleBadgeStyles = `
  @keyframes titleShine {
    0% { transform: translateX(-100%) skewX(-20deg); }
    60%, 100% { transform: translateX(200%) skewX(-20deg); }
  }
  @keyframes titleGold {
    0% { background-position: 0% center; }
    100% { background-position: 200% center; }
  }
`;

/* -------------------- SPONSORS -------------------- */
export const Sponsors = () => {
  return (
    <section id="sponsors" className="py-20 md:py-32 px-6">
      <style dangerouslySetInnerHTML={{ __html: titleBadgeStyles }} />
      <div className="max-w-7xl mx-auto space-y-16 md:space-y-20">

        {/* Heading */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-tighter">
            OUR <span className="text-neon-red">SPONSORS</span>
          </h2>
          <p className="text-white/40 uppercase tracking-widest text-sm">
            Empowering the Vision
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {SPONSORS_DATA.map((sponsor, i) => (
            <div key={i} className="flex flex-col items-center gap-2">

              {/* Card — border hugs the image */}
              <div
                className={`sponsor-logo glass rounded-2xl inline-flex items-center justify-center transition-all duration-500 group border border-white/5 hover:border-neon-red overflow-hidden ${
                  sponsor.logo ? '' : 'opacity-20 p-8 w-40 h-32'
                }`}
              >
                {sponsor.logo ? (
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className={`block w-auto group-hover:scale-105 transition-all duration-300 ${
                      sponsor.size === 'lg' ? 'max-h-56' : 'max-h-40'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="text-white/20 font-display font-bold tracking-widest text-xs uppercase italic">
                    {sponsor.name}
                  </span>
                )}
              </div>

              {/* Caption badge */}
              {sponsor.caption && (
                <div className="relative inline-flex items-center justify-center mt-1">
                  <span className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-950 overflow-hidden border border-neon-red/50">
                    {/* Sweep shine */}
                    <span className="absolute inset-0 -translate-x-full animate-[titleShine_2.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-red animate-pulse relative z-10" />
                    <span
                      className="relative z-10 text-[11px] font-black uppercase tracking-[0.25em]"
                      style={{
                        background: 'linear-gradient(90deg, #ff003c 0%, #ffd700 50%, #ff003c 100%)',
                        backgroundSize: '200% auto',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'titleGold 2.5s linear infinite'
                      }}
                    >
                      {sponsor.caption}
                    </span>
                  </span>
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

/* -------------------- FOOTER -------------------- */
export const Footer = () => {
  return (
    <footer id="contact" className="pt-32 pb-10 px-6 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto">

        <div className="grid md:grid-cols-3 gap-16 mb-20 items-start">

          {/* Logo + About */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <img
                src="/assets/prayan-logo.png"
                alt="Prayan Logo"
                className="w-12 h-12 object-contain"
              />
              <span className="font-display font-bold text-3xl tracking-tighter">
                PRAYAN<span className="text-neon-red">'26</span>
              </span>
            </div>

            <p className="text-white/50 text-lg max-w-sm">
              The ultimate techno-cultural experience. Join us for two days of innovation,
              creativity, and unforgettable memories at VKCET.
            </p>

            <div className="flex gap-4">
              <a
                href="https://instagram.com/prayan_vke"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-neon-red hover:text-black transition-all duration-300"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Credits */}
          <div className="space-y-6 md:pl-8">
            <Link
              to="/credits"
              className="glass px-8 py-4 rounded-2xl border border-white/10 hover:border-neon-red hover:scale-105 hover:shadow-[0_0_20px_rgba(255,0,60,0.2)] transition-all duration-300 flex flex-col items-center gap-2 w-full max-w-[200px]"
            >
              {/* Neon Beam Animation - Always Visible */}
              <div className="absolute inset-0 pointer-events-none transition-opacity duration-500">
                <div
                  className="absolute inset-[-150%] animate-[spin_3s_linear_infinite] opacity-40 blur-xl"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 0%, transparent 35%, #ff003c 50%, transparent 65%, transparent 100%)'
                  }}
                />
                <div
                  className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] opacity-70"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 0%, transparent 40%, #ff003c 50%, transparent 60%, transparent 100%)'
                  }}
                />
                <div className="absolute inset-[1.5px] bg-zinc-950/90 rounded-[15px] z-0" />

                {/* Glass Shine Effect */}
                <div
                  className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/[0.1] to-transparent -translate-x-full animate-[shine_3s_infinite_ease-in-out] pointer-events-none"
                  style={{ animationDelay: '1s' }}
                />
              </div>

              <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes shine {
                  0% { transform: translateX(-100%) skewX(-15deg); }
                  50%, 100% { transform: translateX(100%) skewX(-15deg); }
                }
              `}} />

              <span className="text-white font-display font-bold tracking-widest text-sm uppercase group-hover:text-neon-red transition-colors relative z-10">Tap to see credits</span>
              <div className="h-px w-8 bg-neon-red/50 group-hover:w-16 group-hover:bg-neon-red transition-all duration-300 relative z-10" />
            </Link>
          </div>

          <div className="space-y-6">
            <h4 className="font-display font-bold text-xl">TECH COORDINATORS</h4>
            <ul className="space-y-6 text-white/50">
              <li className="flex flex-col gap-1">
                <span className="text-neon-red text-[10px] uppercase tracking-[0.2em] font-bold opacity-80">Student Coordinator</span>
                <span className="text-white text-lg font-display font-semibold tracking-tight">ALAN AR</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-neon-red text-[10px] uppercase tracking-[0.2em] font-bold opacity-80">Faculty Coordinator</span>
                <span className="text-white text-lg font-display font-semibold tracking-tight">VAISHAKAN B</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-white/30 text-sm">
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
