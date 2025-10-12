import React from 'react';
import { Link } from 'react-router-dom';
import Starfield from '../components/Starfield';
import SEO from '../components/common/SEO';
import OptimizedImage from '../components/common/OptimizedImage';
import Astronaut from '../components/assets/astronaut.png';

const NotFound = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <SEO 
        title="404 - Page Not Found | Code Crafters Programming Club"
        description="Oops! The page you're looking for doesn't exist. Return to Code Crafters Programming Club homepage to continue exploring."
        keywords="404, page not found, error page"
      />
      <Starfield />

      {/* Astronaut image absolutely positioned in the page, not inside another absolute/relative div */}
      {/* Astronaut image absolutely positioned on the right, floating up and down */}
      <OptimizedImage
        src={Astronaut}
        alt="Astronaut with laptop lost in space - representing a lost programmer in the vast codespace"
        className="absolute bottom-0 right-0 w-1/3 md:w-1/4 -rotate-12 opacity-100 mr-2 animate-float pointer-events-none select-none z-20"
        style={{ animation: 'float 3s ease-in-out infinite', zIndex: 20 }}
      />

      <div className="relative z-10 p-10 mx-4 md:w-3/4 text-center">
        <h1 className="text-7xl md:text-9xl font-extrabold text-white tracking-wider mb-6">
          404 <span className="text-5xl md:text-7xl text-yellow-500">Error</span>
        </h1>

        <p className="text-2xl md:text-3xl text-gray-300 mb-8">
          Oops! You’ve wandered off the known paths of our programming club.
          <br />
          This page has been lost in the vast Codespace.
          <br />
          But don’t worry—<span className="font-bold">let’s get out of the Codespace</span> and head back to safety!
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-4 bg-pink-500 text-white text-xl font-bold rounded-full shadow-lg hover:bg-pink-600 transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-black"
          aria-label="Return to Code Crafters Programming Club homepage"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
