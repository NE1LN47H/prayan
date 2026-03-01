import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
    { label: 'Home', href: '#home' },
    { label: 'Events', href: '#events' },
    { label: 'Venue', href: '#venue' },
];

export const Navbar = () => {
    const [visible, setVisible] = useState(true);
    const [atTop, setAtTop] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            setAtTop(y < 40);

            if (y < 40) {
                // Always show at top
                setVisible(true);
            } else if (y < lastScrollY.current) {
                // Scrolling up — show
                setVisible(true);
            } else if (y > lastScrollY.current + 6) {
                // Scrolling down more than 6px — hide
                setVisible(false);
                setMenuOpen(false);
            }

            lastScrollY.current = y;
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                transform: visible ? 'translateY(0)' : 'translateY(-110%)',
                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
        >
            <div
                style={{
                    margin: atTop ? '0' : '12px 20px 0',
                    borderRadius: atTop ? '0' : '16px',
                    transition: 'margin 0.4s ease, border-radius 0.4s ease, background 0.4s ease',
                    background: atTop
                        ? 'rgba(0,0,0,0.3)'
                        : 'rgba(10,10,10,0.55)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderBottom: atTop ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    border: atTop ? undefined : '1px solid rgba(255,255,255,0.08)',
                    boxShadow: atTop ? 'none' : '0 8px 32px rgba(0,0,0,0.4)',
                }}
            >
                <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">

                    {/* Logo */}
                    <a
                        href="#home"
                        className="flex items-center gap-2 group"
                        style={{ textDecoration: 'none' }}
                    >
                        <span
                            className="text-xl font-bold tracking-[0.15em] text-white uppercase"
                            style={{ fontFamily: "'TronAres','Orbitron',sans-serif" }}
                        >
                            PRAYAN
                        </span>
                        <span
                            className="text-xl font-bold text-neon-red"
                            style={{ fontFamily: "'TronAres','Orbitron',sans-serif" }}
                        >
                            '26
                        </span>
                    </a>

                    {/* Desktop links */}
                    <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
                        {NAV_LINKS.map(({ label, href }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    className="relative text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors duration-300 group no-underline"
                                    style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 11 }}
                                >
                                    {label}
                                    <span
                                        className="absolute -bottom-1 left-0 right-0 h-px bg-neon-red scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                                    />
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* CTA + Hamburger */}
                    <div className="flex items-center gap-4">
                        <a
                            href="#events"
                            className="hidden md:inline-flex items-center text-xs px-5 py-2.5 rounded-full text-black font-bold tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,0,60,0.5)]"
                            style={{
                                background: '#ff003c',
                                fontFamily: "'Orbitron',sans-serif",
                                textDecoration: 'none',
                            }}
                        >
                            Register
                        </a>
                        <Link
                            to="/credits"
                            className="hidden md:inline-flex items-center text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors duration-300 no-underline"
                            style={{ fontFamily: "'Orbitron',sans-serif" }}
                        >
                            Credits
                        </Link>

                        {/* Hamburger */}
                        <button
                            className="md:hidden flex flex-col gap-[5px] p-2 focus:outline-none"
                            onClick={() => setMenuOpen(o => !o)}
                            aria-label="Toggle menu"
                        >
                            <span
                                className="block w-6 h-[1.5px] bg-white transition-all duration-300"
                                style={{ transform: menuOpen ? 'rotate(45deg) translate(4.5px,4.5px)' : 'none' }}
                            />
                            <span
                                className="block w-6 h-[1.5px] bg-white transition-all duration-300"
                                style={{ opacity: menuOpen ? 0 : 1, transform: menuOpen ? 'scaleX(0)' : 'none' }}
                            />
                            <span
                                className="block w-6 h-[1.5px] bg-white transition-all duration-300"
                                style={{ transform: menuOpen ? 'rotate(-45deg) translate(4.5px,-4.5px)' : 'none' }}
                            />
                        </button>
                    </div>
                </nav>

                {/* Mobile dropdown */}
                <div
                    className="md:hidden overflow-hidden transition-all duration-400"
                    style={{ maxHeight: menuOpen ? '320px' : '0', opacity: menuOpen ? 1 : 0 }}
                >
                    <ul className="flex flex-col px-6 pb-6 gap-5 list-none m-0 p-0 pt-2">
                        {NAV_LINKS.map(({ label, href }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    onClick={() => setMenuOpen(false)}
                                    className="block text-sm tracking-widest uppercase text-white/70 hover:text-neon-red transition-colors duration-300 no-underline"
                                    style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 11 }}
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                        <li>
                            <a
                                href="#events"
                                onClick={() => setMenuOpen(false)}
                                className="inline-flex text-xs px-5 py-2.5 rounded-full text-black font-bold tracking-widest uppercase"
                                style={{ background: '#ff003c', fontFamily: "'Orbitron',sans-serif", textDecoration: 'none' }}
                            >
                                Register
                            </a>
                        </li>
                        <li>
                            <Link
                                to="/credits"
                                onClick={() => setMenuOpen(false)}
                                className="block text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors duration-300 no-underline"
                                style={{ fontFamily: "'Orbitron',sans-serif" }}
                            >
                                Credits
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};
