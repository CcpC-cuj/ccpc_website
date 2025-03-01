import React, { useState, useEffect } from 'react';
import './Slideshow.css';

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    { src: 'img/img1.jpg', alt: 'GitHub Session' },
    { src: 'img/img2.jpg', alt: 'Computer Graphics' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="slideshow">
      {slides.map((slide, index) => (
        <div
          className={`slide ${index === currentIndex ? 'active' : ''}`}
          key={index}
          style={{ backgroundImage: `url(${slide.src})` }}
        >
          <div className="overlay">{slide.alt}</div>
        </div>
      ))}
    </div>
  );
};

export default Slideshow;
