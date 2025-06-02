import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import Navbar from '../components/Navbar.js';
import Footer from "../components/Footer.js";
import Starfield from "../components/Starfield";

const SOC = () => {
  // Scroll effect for elastic arrows
  useEffect(() => {
    const handleScroll = () => {
      const arrows = document.querySelectorAll('.arrow-summer, .arrow-winter');
      const scrollY = window.scrollY;
      
      arrows.forEach(arrow => {
        const stretchFactor = 1 + (scrollY * 0.001);
        arrow.style.transform = `translateX(-100%) translateY(-50%) scaleX(${Math.min(stretchFactor, 1.1)})`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <div className="relative">
        <Starfield />
        <div className="relative z-10 text-white">
          <Navbar />
          <div className="m-20">

            <div className="soc-title text-center flex-1">
              <h1 className="text-5xl font-urbanist md:text-6xl font-bold mb-4">
                Seasons of Code
              </h1>
              <p className="text-sky-300 text-xl md:text-2xl font-light tracking-wide mb-10">
                Ask || Learn || collaborate
              </p>
            </div>
            <div className="relative group">
              {/* Animated Card */}
              <div className="bg-gradient-to-br bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-8 shadow-2xl overflow-hidden transition-all duration-700 transform group-hover:scale-[1.02]">
                {/* Shimmer animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                {/* Content */}
                <div className="relative z-10">
                  <h2 className="text-2xl md:text-3xl bg-red font-bold mb-4 text-white">
                    What is Seasons of Code?
                  </h2>
                  <div style={{ textAlign: "justify" }} className="text-lg md:text-xl leading-relaxed text-white/80">
                    <p>&nbsp;&nbsp;&nbsp;&nbsp; <span className="font-bold text-yellow-400">Seasons of Code (SoC)</span> is the flagship year-round coding program by CCPC, built to <span className="font-bold text-white">boost your skills through real projects, collaboration, and competitions.</span></p>
                    <br />
                    <p>&nbsp;&nbsp;&nbsp;&nbsp; In every season — Summer and winter —  <span className="font-bold text-white">different projects and challenges are introduced.</span> Students get grouped based on their interests or may form their own teams to <span className="font-bold text-white">collaborate, compete, and create.</span> Each season brings a <span className="font-bold text-white"> new set of goals </span> — whether it's building a product, solving coding problems, or taking part in a hackathon. </p>
                    <br />
                    <p>&nbsp;&nbsp;&nbsp;&nbsp; We also believe that the best ideas come from you. SoC is <span className="font-bold text-white"> open to new ideas and projects from the crowd, </span>and we actively support participants who want to <span className="font-bold text-white">start something of their own.</span> </p>
                    <br />
                    <p>&nbsp;&nbsp;&nbsp;&nbsp; Whether you're here to <span className="font-bold text-yellow-400">learn, lead, or launch </span> something big — SoC is the place to start.</p>
                  </div>
                  
                  {/* Animated border bottom */}
                  <div className="mt-6 h-1 bg-gradient-to-r from-transparent via-white to-transparent w-full opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>


          <div className="relative min-h-[70vh] px-4 md:px-8 py-4 md:py-12 flex flex-col md:flex-row items-center justify-between bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl shadow-2xl text-white mt-10 overflow-hidden">
            {/* Big SOC Text - Top on mobile, original position on desktop */}
            <div className="flex-1 relative text-center">
              <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                SOC
              </h1>
              <p className="text-xl md:text-xl text-gray-400 -mt-2 tracking-[0.5em] ml-[0.5em]">
                Seasons of Code
              </p>
            </div>

                {/* Cards Container - Full width on mobile, flex-1 on desktop */}
                <div className="w-full md:flex-1 space-y-8 md:space-y-16 mt-0 md:mt-16 relative">
                  {/* Summer Card */}
                  <div className="relative md:ml-16 lg:ml-32 p-5 md:p-6 bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl shadow-lg border border-orange-200 transform transition-all duration-300 hover:shadow-orange-200/50 hover:-translate-y-1">
                    <h3 className="text-xl md:text-2xl font-bold text-orange-800">Summer Project (June - July)</h3>
                    
                    <p className="text-orange-600 mt-2 md:mt-3 text-sm md:text-base leading-relaxed">
                      Participants are grouped based on interests (Web Dev, AI/ML, UI/UX) to build real-world projects under mentor guidance. Projects are showcased on CCPC's GitHub and website.
                    </p>
                    
                    <div className="mt-3 md:mt-4 flex flex-wrap gap-2">
                      <span className="px-2 py-1 md:px-3 md:py-1 bg-orange-200 text-orange-800 rounded-full text-xs md:text-sm font-medium">
                        8 Weeks
                      </span>
                      <span className="px-2 py-1 md:px-3 md:py-1 bg-orange-200 text-orange-800 rounded-full text-xs md:text-sm font-medium">
                        Group Projects
                      </span>
                      <span className="px-2 py-1 md:px-3 md:py-1 bg-orange-200 text-orange-800 rounded-full text-xs md:text-sm font-medium">
                        Mentorship
                      </span>
                    </div>
                  </div>

                  {/* Spring Card */}
                  <div className="relative md:ml-16 lg:ml-32 p-5 md:p-6 bg-gradient-to-br from-blue-50 to-cyan-100 rounded-xl shadow-lg border border-cyan-200 transform transition-all duration-300 hover:shadow-cyan-200/50 hover:-translate-y-1">
                    <h3 className="text-xl md:text-2xl font-bold text-cyan-800">Spring DevSprint (Feb - Mar)</h3>
                    
                    <p className="text-cyan-600 mt-2 md:mt-3 text-sm md:text-base leading-relaxed">
                      Fast-paced hackathon featuring coding challenges in Web and App Development. Solve real-world problems individually or in teams to showcase skills and creativity.
                    </p>
                    
                    <div className="mt-3 md:mt-4 flex flex-wrap gap-2">
                      <span className="px-2 py-1 md:px-3 md:py-1 bg-cyan-200 text-cyan-800 rounded-full text-xs md:text-sm font-medium">
                        6 Weeks
                      </span>
                      <span className="px-2 py-1 md:px-3 md:py-1 bg-cyan-200 text-cyan-800 rounded-full text-xs md:text-sm font-medium">
                        Hackathon
                      </span>
                      <span className="px-2 py-1 md:px-3 md:py-1 bg-cyan-200 text-cyan-800 rounded-full text-xs md:text-sm font-medium">
                        Individual/Teams
                      </span>
                    </div>
                  </div>
                </div>

            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SOC;
