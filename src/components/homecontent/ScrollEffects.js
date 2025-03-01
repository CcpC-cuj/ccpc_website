import React, { useEffect } from 'react';
import Logo from '../logo/logo'
import Navbar from '../navbar/navbar'
import './ScrollEffects.css';

const ScrollEffects = () => {
  useEffect(() => {
    const handleScroll = () => {
      const svgContainer = document.querySelector('.svg-container');
      const svgElement = document.getElementById('mySVG');
      const navButtons = document.querySelector('.navbar');
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop <= 0) {
        svgElement.src = '';
        svgContainer.style.top = '44.5%';
        svgContainer.style.left = '48.5%';
        navButtons.style.display = 'none';
      } else {
        svgElement.src = 'img/navlogo.svg';
        svgContainer.style.top = '10px';
        svgContainer.style.left = '50px';
        navButtons.style.display = 'flex';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="svg-container">
      <img id="mySVG" src="img/logo.svg" alt="Logo" />
    </div>
  );
};

export default ScrollEffects;
