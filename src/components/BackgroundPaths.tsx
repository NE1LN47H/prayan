"use client"

import { motion } from "framer-motion"
import React, { useMemo } from "react"
import { cn } from "../lib/utils"

function FloatingPaths({ position, opacity = 0.3 }: { position: number; opacity?: number }) {
    const paths = useMemo(
        () =>
            Array.from({ length: 12 }, (_, i) => ({
                id: i,
                d: `M-${380 - i * 15 * position} -${189 + i * 18}C-${380 - i * 15 * position
                    } -${189 + i * 18} -${312 - i * 15 * position} ${216 - i * 18} ${152 - i * 15 * position
                    } ${343 - i * 18}C${616 - i * 15 * position} ${470 - i * 18} ${684 - i * 15 * position
                    } ${875 - i * 18} ${684 - i * 15 * position} ${875 - i * 18}`,
                width: 0.5 + i * 0.08,
                opacity: 0.1 + i * 0.08,
                duration: 20 + (i % 5) * 1.5,
            })),
        [position],
    )

    return (
        <svg
            className="absolute inset-0 h-full w-full"
            style={{ opacity }}
            fill="none"
            viewBox="0 0 696 316"
            preserveAspectRatio="xMidYMid slice"
        >
            {paths.map(path => (
                <motion.path
                    key={path.id}
                    d={path.d}
                    stroke="white"
                    strokeWidth={path.width}
                    strokeOpacity={path.opacity}
                    initial={{ pathLength: 0.3, opacity: 0.3 }}
                    animate={{
                        pathLength: [0.3, 1, 0.3],
                        opacity: [0.3, 0.6, 0.3],
                        pathOffset: [0, 1, 0],
                    }}
                    transition={{
                        duration: path.duration,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                    }}
                />
            ))}
        </svg>
    )
}

export interface BackgroundPathsProps {
    className?: string
    children?: React.ReactNode
    opacity?: number
}

export function BackgroundPaths({ className, children, opacity = 0.3 }: BackgroundPathsProps) {
    return (
        <div className={cn(
            "w-full bg-black text-white",
            children ? "relative min-h-screen overflow-y-auto overflow-x-hidden" : "absolute inset-0 overflow-hidden",
            className
        )}>
            {/* Mirrored path sets for symmetry */}
            <FloatingPaths position={1} opacity={opacity} />
            <FloatingPaths position={-1} opacity={opacity} />

            {/* Subtle center glow */}
            <div
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
                style={{
                    width: "min(60vw, 60vh)",
                    height: "min(60vw, 60vh)",
                    background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                }}
            />

            {/* Vignette */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(10,10,10,0.8) 100%)",
                }}
            />

            {/* Content layer */}
            {children && <div className="relative z-10 min-h-full w-full">{children}</div>}
        </div>
    )
}
