import React, { useEffect, useRef } from 'react';
import './IndependenceDayHero.css';

/**
 * Independence Day Hero Section
 * Features:
 * - Full-screen tricolor gradient background
 * - Animated Ashoka Chakra (SVG)
 * - Cinematic entrance animations
 * - Patriotic headline with glow effects
 */
const IndependenceDayHero = () => {
  const chakraRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    // Rotate chakra continuously
    if (chakraRef.current) {
      const chakra = chakraRef.current;
      let rotation = 0;
      const rotate = () => {
        rotation += 0.5; // Slow rotation
        chakra.style.transform = `rotate(${rotation}deg)`;
        requestAnimationFrame(rotate);
      };
      rotate();
    }

    // Entrance animation
    if (heroRef.current) {
      heroRef.current.classList.add('hero-entered');
    }
  }, []);

  return (
    <div ref={heroRef} className="independence-hero">
      {/* Layered Tricolor Background */}
      <div className="hero-tricolor-bg">
        <div className="tricolor-layer saffron-layer"></div>
        <div className="tricolor-layer white-layer"></div>
        <div className="tricolor-layer green-layer"></div>
      </div>

      {/* Animated Light Rays */}
      <div className="hero-light-rays">
        <div className="light-ray ray-1"></div>
        <div className="light-ray ray-2"></div>
        <div className="light-ray ray-3"></div>
        <div className="light-ray ray-4"></div>
      </div>

      {/* Ashoka Chakra SVG */}
      <div className="hero-chakra-container">
        <svg
          ref={chakraRef}
          className="hero-chakra"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Circle */}
          <circle cx="100" cy="100" r="95" fill="none" stroke="#000080" strokeWidth="2" />
          
          {/* 24 Spokes */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 15) - 90; // 15 degrees per spoke (360/24)
            const radian = (angle * Math.PI) / 180;
            const x1 = 100 + 70 * Math.cos(radian);
            const y1 = 100 + 70 * Math.sin(radian);
            const x2 = 100 + 90 * Math.cos(radian);
            const y2 = 100 + 90 * Math.sin(radian);
            
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#000080"
                strokeWidth="3"
                strokeLinecap="round"
              />
            );
          })}
          
          {/* Inner Circle */}
          <circle cx="100" cy="100" r="25" fill="#000080" />
        </svg>
      </div>

      {/* Patriotic Headline */}
      <div className="hero-headline">
        <h1 className="hero-title">
          <span className="title-line-1">HAPPY</span>
          <span className="title-line-2">REPUBLIC DAY</span>
          <span className="title-flag">🇮🇳</span>
        </h1>
        <p className="hero-subtitle">
          Celebrating Freedom • Unity • Pride
        </p>
      </div>

      {/* Subtle Particle Effects */}
      <div className="hero-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className={`particle particle-${i % 3}`}></div>
        ))}
      </div>
    </div>
  );
};

export default IndependenceDayHero;


