import React from 'react';
import { motion } from 'framer-motion';

interface RevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    y?: number;
}

export const Reveal = ({ children, width = "100%", delay = 0.2, y = 30 }: RevealProps) => {
    return (
        <div style={{ position: "relative", width, overflow: "hidden" }}>
            <motion.div
                initial={{ opacity: 0, y }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                    duration: 0.8,
                    delay,
                    ease: [0.16, 1, 0.3, 1] // Matches --ease-premium
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};
