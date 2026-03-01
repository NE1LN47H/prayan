import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
// @ts-ignore
import GLOBE from 'vanta/dist/vanta.globe.min';

export const VantaGlobe = () => {
    const [vantaEffect, setVantaEffect] = useState<any>(null);
    const myRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!vantaEffect && myRef.current) {
            setVantaEffect(
                GLOBE({
                    el: myRef.current,
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    color: 0xff0000,
                    color2: 0xff0000,
                    backgroundColor: 0x0
                })
            );
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div ref={myRef} className="sticky top-0 w-full h-screen pointer-events-auto" />
            {/* Gradient overlay to blend the bottom edge if needed */}
            <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-black to-transparent z-10" />
        </div>
    );
};
