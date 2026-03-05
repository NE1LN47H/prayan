"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

export type CardContent = {
    id: string | number;
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    bgClass?: string;
    content?: React.ReactNode;
};

type SlidingCardsProps = {
    cards: CardContent[];
    className?: string;
    cardSize?: string;
    centerIcon?: React.ReactNode;
    visibleRange?: number;
    onCardClick?: (index: number) => void;
    showSwipeLabel?: boolean;
};

const SlidingCards: React.FC<SlidingCardsProps> = React.memo(({
    cards,
    className = "",
    onCardClick,
    showSwipeLabel = true,
}) => {
    const cardStackRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLElement[]>([]);
    // ... scroll logic (unchanged)
    // ... (omitting mid lines for brevity in instruction, will target specifically below)


    useEffect(() => {
        const cardStack = cardStackRef.current;
        if (!cardStack) return;
        cardsRef.current = Array.from(cardStack.querySelectorAll(".card"));

        let isSwiping = false;
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let currentY = 0;
        let animationFrameId: number | null = null;

        const getDuration = () => 300;

        const getActiveCard = () => cardsRef.current[0];

        const updatePositions = () => {
            cardsRef.current.forEach((card, i) => {
                const offset = i;
                card.style.zIndex = `${100 - offset}`;
                card.style.transform = `translate3d(0, ${20 * offset}px, ${-40 * offset}px)`;
                card.style.opacity = `${1 - offset * 0.2}`;
                card.style.pointerEvents = offset === 0 ? "auto" : "none";
            });
        };

        const applySwipeStyles = (deltaX: number) => {
            const card = getActiveCard();
            if (!card) return;
            const rotate = deltaX * 0.1;
            const opacity = 1 - Math.min(Math.abs(deltaX) / 200, 1) * 0.5;
            card.style.transform = `translate3d(${deltaX}px, 0, 0) rotateZ(${rotate}deg)`;
            card.style.opacity = `${opacity}`;
        };

        const handleStart = (clientX: number, clientY: number) => {
            if (isSwiping) return;
            isSwiping = true;
            startX = currentX = clientX;
            startY = currentY = clientY;
            const card = getActiveCard();
            if (card) {
                card.style.transition = "none";
            }
        };

        const handleMove = (clientX: number, clientY: number) => {
            if (!isSwiping) return;

            const deltaX = clientX - startX;
            const deltaY = clientY - startY;

            // If we've moved more vertically than horizontally at the start, 
            // cancel the swipe to allow natural scrolling
            if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 10) {
                isSwiping = false;
                updatePositions();
                return;
            }

            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(() => {
                currentX = clientX;
                applySwipeStyles(deltaX);
            });
        };

        const handleEnd = () => {
            if (!isSwiping) return;
            if (animationFrameId) cancelAnimationFrame(animationFrameId);

            const deltaX = currentX - startX;
            const threshold = 100;
            const duration = getDuration();
            const card = getActiveCard();

            if (card) {
                card.style.transition = `transform ${duration}ms cubic-bezier(0.23, 1, 0.32, 1), opacity ${duration}ms ease`;

                if (Math.abs(deltaX) > threshold) {
                    const direction = Math.sign(deltaX);
                    card.style.transform = `translate3d(${direction * 500}px, 0, -100px) rotateZ(${direction * 45}deg)`;
                    card.style.opacity = "0";

                    setTimeout(() => {
                        cardsRef.current = [...cardsRef.current.slice(1), card];
                        card.style.transition = "none";
                        updatePositions();
                    }, duration);
                } else {
                    updatePositions();
                }
            }

            isSwiping = false;
            startX = currentX = startY = currentY = 0;
        };

        const onPointerDown = (e: PointerEvent) => handleStart(e.clientX, e.clientY);
        const onPointerMove = (e: PointerEvent) => handleMove(e.clientX, e.clientY);
        const onPointerUp = () => handleEnd();

        cardStack.addEventListener("pointerdown", onPointerDown);
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);

        updatePositions();

        return () => {
            cardStack.removeEventListener("pointerdown", onPointerDown);
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", onPointerUp);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [cards]);

    return (
        <section
            ref={cardStackRef}
            className={cn(
                "relative w-full max-w-[360px] h-[520px] mx-auto overflow-visible touch-pan-y select-none py-10",
                className
            )}
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
        >
            {cards.map((card, index) => (
                <article
                    key={card.id}
                    onClick={() => onCardClick?.(index)}
                    className={cn(
                        "card absolute inset-0 rounded-3xl border border-white/10 shadow-2xl cursor-grab active:cursor-grabbing",
                        card.bgClass || "bg-[#050505]"
                    )}
                    style={{ willChange: "transform, opacity" }}
                >
                    {card.content || (
                        <div className="p-8 h-full flex flex-col gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-neon-red">
                                {card.icon}
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-3xl font-display font-bold text-white">{card.title}</h3>
                                <p className="text-white/50 leading-relaxed text-sm">{card.description}</p>
                            </div>
                        </div>
                    )}
                </article>
            ))}

            {/* Swipe Label */}
            {showSwipeLabel && (
                <div className="absolute -bottom-24 left-0 right-0 flex flex-col items-center gap-4 animate-pulse pointer-events-none">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-neon-red to-neon-red shadow-[0_0_15px_rgba(255,0,60,0.8)]" />
                        <span className="text-base md:text-xl uppercase tracking-[0.6em] font-black text-neon-red drop-shadow-[0_0_20px_rgba(255,0,60,1)] text-center" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                            Swipe The Events
                        </span>
                        <div className="w-16 h-[2px] bg-gradient-to-l from-transparent via-neon-red to-neon-red shadow-[0_0_15px_rgba(255,0,60,0.8)]" />
                    </div>
                    <div className="flex gap-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-2.5 h-2.5 rounded-full bg-neon-red shadow-[0_0_10px_rgba(255,0,60,0.5)] animate-ping" style={{ animationDelay: `${i * 0.3}s` }} />
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
});

export default SlidingCards;
