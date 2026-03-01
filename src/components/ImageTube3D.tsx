import { useEffect, useRef, useState } from "react";

const IMAGES = [
    "/tube/im1.jpeg",
    "/tube/im2.jpeg",
    "/tube/im3.jpeg",
    "/tube/im4.jpeg",
    "/tube/im5.jpg",
    "/tube/im6.jpg",
    "/tube/im7.jpg",
    "/tube/im8.jpg",
    "/tube/im9.jpg",
];

const LABELS = [
    "Pro Shows",
    "Music Bands",
    "Fashion Shows",
    "Auto Shows",
    "Gaming Arena",
    "Robotics",
    "Cultural Fest",
    "Art Exhibition",
    "Night Parade",
];

const COLS = 9; // one image per slot around the cylinder
const RADIUS = 420; // px — distance of each card from centre axis

export default function ImageTube3D() {
    const angleRef = useRef(0); // current rotation in degrees
    const rafRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number | null>(null);
    const cylinderRef = useRef<HTMLDivElement>(null);
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    const isManualHoverRef = useRef(false);  // true while user is hovering a card
    const frontIdxRef = useRef<number>(-1);   // last computed front card

    // Speed: degrees per second
    const targetSpeedRef = useRef(12);
    const currentSpeedRef = useRef(12);

    // When manually hovering, slow down; restore to auto-front on leave
    useEffect(() => {
        targetSpeedRef.current = hoveredIdx !== null ? 3 : 12;
    }, [hoveredIdx]);

    useEffect(() => {
        const tick = (now: number) => {
            if (lastTimeRef.current === null) lastTimeRef.current = now;
            const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05); // cap at 50ms
            lastTimeRef.current = now;

            // Smooth speed lerp
            currentSpeedRef.current +=
                (targetSpeedRef.current - currentSpeedRef.current) * 0.08;

            angleRef.current += currentSpeedRef.current * dt;

            if (cylinderRef.current) {
                cylinderRef.current.style.transform = `rotateY(${angleRef.current}deg)`;
            }

            // Auto-highlight the front-facing card
            if (!isManualHoverRef.current) {
                const angleStep = 360 / COLS;
                let minDist = Infinity;
                let frontIdx = 0;
                for (let i = 0; i < COLS; i++) {
                    let a = ((angleStep * i + angleRef.current) % 360 + 360) % 360;
                    if (a > 180) a -= 360; // normalise to [-180, 180]
                    const dist = Math.abs(a);
                    if (dist < minDist) { minDist = dist; frontIdx = i; }
                }
                if (frontIdx !== frontIdxRef.current) {
                    frontIdxRef.current = frontIdx;
                    setHoveredIdx(frontIdx);
                }
            }

            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);
        return () => {
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const angleStep = 360 / COLS;

    return (
        <div
            className="relative w-full overflow-hidden aspect-[9/16] md:aspect-auto md:h-[520px]"
            style={{ perspective: 1200 }}
        >
            {/* CSS grid background — zero JS cost */}
            <div
                className="absolute inset-0"
                style={{
                    background: "#000",
                    backgroundImage: `
            linear-gradient(rgba(255,30,60,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,30,60,0.06) 1px, transparent 1px)
          `,
                    backgroundSize: "48px 48px",
                }}
            />

            {/* Cylinder stage */}
            <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ perspective: 1200, perspectiveOrigin: "50% 50%" }}
            >
                {/* Rotating cylinder — only this div gets a transform mutation each frame */}
                <div
                    ref={cylinderRef}
                    style={{
                        position: "relative",
                        width: 260,
                        height: 360,
                        transformStyle: "preserve-3d",
                        willChange: "transform",
                    }}
                >
                    {IMAGES.map((src, i) => {
                        const rotY = angleStep * i;
                        const isHovered = hoveredIdx === i;

                        return (
                            <div
                                key={i}
                                onMouseEnter={() => { isManualHoverRef.current = true; setHoveredIdx(i); }}
                                onMouseLeave={() => { isManualHoverRef.current = false; setHoveredIdx(null); }}
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    transformStyle: "preserve-3d",
                                    transform: `rotateY(${rotY}deg) translateZ(${RADIUS}px)`,
                                    transition: "box-shadow 0.3s ease",
                                    borderRadius: 12,
                                    overflow: "hidden",
                                    cursor: "pointer",
                                    boxShadow: isHovered
                                        ? "0 0 40px rgba(255,30,60,0.6), 0 0 0 2px rgba(255,30,60,0.8)"
                                        : "0 0 20px rgba(0,0,0,0.8)",
                                }}
                            >
                                <img
                                    src={src}
                                    alt={LABELS[i]}
                                    loading="lazy"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        display: "block",
                                        opacity: isHovered ? 1 : 0.7,
                                        transition: "opacity 0.3s ease",
                                    }}
                                />
                                {/* Label */}
                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: 0,
                                        insetInline: 0,
                                        padding: "28px 12px 12px",
                                        background:
                                            "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)",
                                        color: "#fff",
                                        fontSize: 11,
                                        letterSpacing: "0.12em",
                                        textTransform: "uppercase",
                                        opacity: isHovered ? 1 : 0,
                                        transition: "opacity 0.3s ease",
                                        textAlign: "center",
                                    }}
                                >
                                    {LABELS[i]}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Vignette — left & right fade so only front cards are fully visible */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background: `
            radial-gradient(ellipse 55% 100% at 50% 50%, transparent 0%, rgba(0,0,0,0.85) 100%)
          `,
                }}
            />

            {/* Top / bottom fades */}
            <div
                className="pointer-events-none absolute inset-x-0 top-0 h-20"
                style={{ background: "linear-gradient(to bottom, #000, transparent)" }}
            />
            <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
                style={{ background: "linear-gradient(to top, #000, transparent)" }}
            />

            {/* Hint */}
            <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-white/25 text-[10px] tracking-widest uppercase select-none">
                hover to slow · drag to spin
            </div>
        </div>
    );
}
