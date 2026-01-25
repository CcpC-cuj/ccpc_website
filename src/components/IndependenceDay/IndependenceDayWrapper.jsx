import React from 'react';
import IndependenceDayHero from './IndependenceDayHero';
import './IndependenceDayTheme.css';

/**
 * Independence Day Theme Wrapper
 * 
 * Wraps the home page content with Independence Day theme styling.
 * 
 * TO REMOVE THIS THEME:
 * 1. In home.js, set: const isIndependenceDayTheme = false;
 * 2. Or remove this component import and wrapper from home.js
 * 3. Optionally delete IndependenceDay folder and all its files
 * 
 * @param {React.ReactNode} children - The home page content to wrap
 */
const IndependenceDayWrapper = ({ children }) => {
  return (
    <div className="independence-day-theme-active">
      {/* Hero Section - Full Screen */}
      <div className="independence-hero-wrapper" style={{ position: 'relative', zIndex: 1 }}>
        <IndependenceDayHero />
      </div>
      
      {/* Original Content - Below Hero */}
      <div className="independence-content-wrapper" style={{ position: 'relative', zIndex: 2, backgroundColor: 'rgba(0, 0, 0, 0.95)' }}>
        {children}
      </div>
    </div>
  );
};

export default IndependenceDayWrapper;

