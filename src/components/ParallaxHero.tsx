import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LAYERS = [
    { id: 1, src: 'https://f.top4top.io/p_3712yxjrk0.png', yPercent: 70 },
    { id: 2, src: 'https://d.top4top.io/p_3712tiwfg0.png', yPercent: 55 },
    { id: 4, src: 'https://c.top4top.io/p_37122bes20.png', yPercent: 80 },
];

export const ParallaxHero = () => {
    const layersRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    // Load TronAres via the Font Loading API
    useEffect(() => {
        const font = new FontFace(
            'TronAres',
            "url('/font/TronAres.ttf') format('truetype')"
        );
        font.load()
            .then((loaded) => {
                document.fonts.add(loaded);
                if (titleRef.current) {
                    titleRef.current.style.fontFamily = "'TronAres', 'Orbitron', sans-serif";
                }
            })
            .catch((err) => {
                console.error('[TronAres] Font failed to load:', err);
            });
    }, []);

    // GSAP parallax scroll
    useEffect(() => {
        const trigger = layersRef.current;
        if (!trigger) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger,
                start: '0% 0%',
                end: '100% 0%',
                scrub: 0.5,
            },
        });

        LAYERS.forEach((layer, idx) => {
            tl.to(
                trigger.querySelectorAll(`[data-parallax-layer="${layer.id}"]`),
                { yPercent: layer.yPercent, ease: 'none' },
                idx === 0 ? undefined : '<',
            );
        });

        tl.to(
            trigger.querySelectorAll('[data-parallax-layer="3"]'),
            { yPercent: 40, ease: 'none' },
            '<',
        );

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach((st) => {
                if (st.vars.trigger === trigger) st.kill();
            });
        };
    }, []);

    return (
        <div className="parallax-wrapper">
            {/* ── Header: the parallax visual ── */}
            <section className="parallax-header">
                <div className="parallax-visuals">
                    <div className="parallax-fade" />

                    <div ref={layersRef} data-parallax-layers className="parallax-layers">

                        {/* Layer 1 — far background */}
                        <img
                            src={LAYERS[0].src}
                            data-parallax-layer="1"
                            className="parallax-img"
                            loading="eager"
                            alt=""
                        />

                        {/* Layer 2 — mid background */}
                        <img
                            src={LAYERS[1].src}
                            data-parallax-layer="2"
                            className="parallax-img"
                            loading="eager"
                            alt=""
                        />

                        {/* Layer 3 — title */}
                        <div data-parallax-layer="3" className="parallax-title-layer">
                            <h2
                                ref={titleRef}
                                className="parallax-title"
                            >
                                PRAYAN'26
                            </h2>
                        </div>

                        {/* Layer 4 — foreground */}
                        <img
                            src={LAYERS[2].src}
                            data-parallax-layer="4"
                            className="parallax-img parallax-img--front"
                            loading="eager"
                            alt=""
                        />
                    </div>
                </div>
            </section>

            {/* ── Content spacer ── */}
            <section className="parallax-content" />
        </div>
    );
};
