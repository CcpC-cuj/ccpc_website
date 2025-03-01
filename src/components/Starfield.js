import React, { useEffect, useRef } from "react";

const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let stars = [];
    const amplitude = canvas.height / 10; // Amplitude of the wave

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      for (let i = 0; i < 500; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseY: Math.random() * canvas.height,
          radius: Math.random() * 2,
          speed: 0.5 + Math.random() * 1.5,
          frequency: 0.5 + Math.random(),
        });
      }
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let star of stars) {
        let waveY = star.baseY + amplitude * Math.sin((star.x / canvas.width) * Math.PI * star.frequency);
        ctx.beginPath();
        ctx.arc(star.x, waveY, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
      }
    };

    const updateStars = () => {
      for (let star of stars) {
        star.x += star.speed;
        if (star.x > canvas.width) {
          star.x = 0;
          star.baseY = Math.random() * canvas.height;
        }
      }
    };

    const animate = () => {
      drawStars();
      updateStars();
      requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
};

export default Starfield;
