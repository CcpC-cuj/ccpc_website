import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import NAVBAR from '../components/Navbar.js';
import Footer from "../components/Footer.js";
import STARFIELD from "../components/Starfield";

const SOC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status

  useEffect(() => {
    // Logic to check if user is logged in, replace with your actual check
    // For example, checking if a token exists or using a global state
    const userLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Simple example
    setIsLoggedIn(userLoggedIn);
    
    const parts = document.querySelectorAll(".rotating-text");
    let timeline = gsap.timeline({ repeat: -1 }); // Infinite loop

    parts.forEach((part, index) => {
      timeline
        .to(part, { opacity: 1, duration: 1, ease: "power1.inOut" }) // Fade-in
        .to(part, { opacity: 0, duration: 1, ease: "power1.inOut" }, "+=2"); // Fade-out with 2s pause
    });

    return () => {
      timeline.kill(); // Cleanup timeline on unmount
    };
  }, []);

  return (
    <div>
    <div className="relative">
      <STARFIELD />
      <div className="relative z-10 text-white">
        <NAVBAR />
        <div className="m-20">
        <div className="soc flex flex-col md:flex-row justify-between items-center mt-12">
          {/* Left Section (Rotating Text) */}
          <div className="soc-title text-left flex-1">
          </div>

          {/* Right Section (SOC Logo) */}
          <div className="soc-right font-crimson flex-1 text-center md:text-left">
            <div className="flex justify-center items-baseline space-x-2">
              <span className="text-8xl font-extrabold text-red-600">S</span>
              <span className="text-7xl font-extrabold text-white">O</span>
              <span className="text-8xl font-extrabold text-red-600">C</span>
            </div>
          </div>
        </div>

        <div className="soc-title text-left flex-1">
            <h1 className="text-3xl font-urbanist md:text-4xl font-bold mb-4">
              Seasons of Code:
            </h1>
            <div className="text-2xl md:text-4xl md:ml-80 font-crimson ml-20 mb-30 relative text-left  ">
              <span className="rotating-text opacity-0 absolute">Summer Project</span>
              <span className="rotating-text opacity-0 absolute">Autumn Coding Challenge</span>
              <span className="rotating-text opacity-0 absolute">Spring DevSprint</span>
            </div>

          </div>

        {/* Description Section */}
        <div className="soc-description text-left mt-20">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">What is Seasons of Code?</h2>
          <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            The Seasons of Code is our flagship annual event, designed to enhance students' coding skills through hands-on projects and competitive challenges. This program is tailored to provide practical experience, expert mentorship, and opportunities to build a professional portfolio. It's a journey of learning, innovation, and collaboration, spanning the entire academic year.
          </p>
        </div>

       {/* Timeline Section */}
       <div className="soc-timeline mt-12 space-y-8">
  {/* Timeline Events */}
  {[
    {
      title: "Summer Project (June - July)",
      description:
        "During the Summer Project phase, participants are grouped based on their interests in fields like Web Development, AI/ML, UI/UX, and more. Under the guidance of mentors, these groups work on real-world projects, which are then showcased on the CCPC GitHub account and website. This phase is crucial for gaining in-depth technical experience.",
      color: "text-yellow-400",
    },
    {
      title: "Autumn Coding Challenge (October - November)",
      description:
        "The Autumn Coding Challenge is an open-to-all competitive coding event held in October and November. It offers a platform for students across the university to test their problem-solving skills, engage in algorithmic challenges, and compete in hackathons. It’s a high-energy event that fosters creativity, teamwork, and coding excellence.",
      color: "text-green-400",
    },
    {
      title: "Spring DevSprint (February - March)",
      description:
        "The Spring DevSprint is a dynamic hackathon held in February - March, featuring fast-paced coding challenges across Web Development, and App Development. Participants tackle real-world problems, working individually or in teams to showcase their skills and creativity. It’s a vibrant event that encourages innovation and rapid problem-solving.",
      color: "text-red-500",
    },
  ].map((event, index) => (
    <div
      key={index}
      className="timeline-event flex flex-col text-center md:text-left"
    >
      <div className={`event-timestamp text-lg font-bold ${event.color} mb-2`}>
        {event.title}
      </div>
      <div className="event-details text-white">
        <p>{event.description}</p>
      </div>
    </div>
  ))}
</div>

      </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default SOC;
