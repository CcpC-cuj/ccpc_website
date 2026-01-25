import React, { useState } from 'react';
import './RepublicDayTheme.css';

/**
 * RepublicDayTheme Component
 * 
 * Wraps the application with Indian Republic Day theme styling.
 * 
 * TO REMOVE THIS THEME:
 * 1. In App.js, set: const ENABLE_REPUBLIC_DAY_THEME = false;
 * 2. Or remove this component import and wrapper from App.js
 * 3. Optionally delete RepublicDayTheme.css and RepublicDayTheme.jsx files
 * 
 * @param {React.ReactNode} children - The app content to wrap
 * @param {boolean} showBanner - Whether to show the Republic Day banner (default: true)
 */
const RepublicDayTheme = ({ children, showBanner = true }) => {
  const [bannerVisible, setBannerVisible] = useState(showBanner);

  return (
    <div className="republic-day-theme-active">
      {bannerVisible && (
        <div 
          className="republic-day-banner"
          onClick={() => setBannerVisible(false)}
          role="button"
          tabIndex={0}
          aria-label="Republic Day - Click to dismiss"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setBannerVisible(false);
            }
          }}
        >
          <div className="republic-day-banner-content">
            <div className="republic-day-banner-icon">🇮🇳</div>
            <span>Republic Day</span>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default RepublicDayTheme;

