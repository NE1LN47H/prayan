import React, { useState, useEffect } from 'react';
import './LaunchingSoon.css';

const LaunchingSoon: React.FC = () => {
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const targetWidth = 1200; // Standard desktop width for the design
            const newScale = width < targetWidth ? width / targetWidth : 1;
            setScale(newScale);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="launching-soon-body">
            <section className="coming-soon">
                <div 
                    className="coming-soon-inner"
                    style={{ 
                        transform: `scale(${scale})`,
                        transformOrigin: 'center center'
                    }}
                >
                    <h1 className="heading">Launching Soon</h1>
                    <h2 className="small-heading">PRAYAN'26 - ENTER THE GRID</h2>
                </div>
            </section>
        </div>
    );
};

export default LaunchingSoon;
