import React, { useEffect, useState, useRef } from 'react';

const AdComponent = ({ adSlot, adFormat = 'auto', style = {} }) => {
  const [isVisible, setIsVisible] = useState(true);
  const adRef = useRef(null);
  const adLoaded = useRef(false);

  useEffect(() => {
    if (isVisible && !window.adsbygoogle) {
      const script = document.createElement('script');
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.REACT_APP_ADSENSE_CLIENT_ID}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }

    if (isVisible && !adLoaded.current && adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adLoaded.current = true;
      } catch (e) {
        console.error('AdSense error:', e);
      }
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="ad-container my-4 flex justify-center relative">
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-white text-xl z-10"
        onClick={() => setIsVisible(false)}
      >
        ×
      </button>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          minWidth: 320,
          minHeight: 100,
          width: '100%',
          ...style
        }}
        data-ad-client={process.env.REACT_APP_ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdComponent;