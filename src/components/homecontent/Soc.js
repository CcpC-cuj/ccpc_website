import React from "react";
import socImage from "../assets/soc.png"; // Replace with your actual image path

const SoC = () => {
  return (
    <div className="soc-section mt-12 px-4 lg:px-16">
      {/* Flex container for left side content and right side image */}
      <div className="flex flex-col lg:flex-row-reverse items-center lg:items-start justify-between gap-8">
        {/* Right Side: Image Section (Appears at top on mobile) */}
        <div className="lg:w-1/2 flex justify-center">
        <a href="/soc">
          <img
            src={socImage}
            alt="SoC Event"
            className="w-full lg:w-3/4 h-auto rounded-xl shadow-2xl transition-transform transform hover:scale-105 duration-300 lg:ml-40"
          />
          </a>
        </div>

        {/* Left Side: Question and Answer Section */}
        <div className="lg:w-1/2 space-y-8">
          {/* SoC Overview */}
          <div className="bg-blue-500/20 backdrop-blur-md text-lg rounded-lg text-left p-8 lg:p-4 shadow-xl">
            <h3 className="text-2xl font-semibold text-white mb-4">What is SoC?</h3>
            <p className="text-gray-300 leading-relaxed">
              SoC succinctly conveys the essence of coding activities across different seasons, organizing projects and events accordingly.
            </p>
          </div>

          {/* Why SoC */}
          <div className="bg-blue-500/20 backdrop-blur-md text-lg rounded-lg text-left p-8 lg:p-4 shadow-xl">
            <h3 className="text-2xl font-semibold text-white mb-4">Why SoC?</h3>
            <p className="text-gray-300 leading-relaxed">
              SoC optimizes coding engagement by aligning projects with the unique opportunities each season offers.
            </p>
          </div>

          {/* When SoC */}
          <div className="bg-blue-500/20 backdrop-blur-md text-lg rounded-lg text-left p-8 lg:p-4 shadow-xl">
            <h3 className="text-2xl font-semibold text-white mb-4">When SoC?</h3>
            <p className="text-gray-300 leading-relaxed">
              SoC events occur throughout the year, adapting coding initiatives to the specific characteristics of each season, including autumn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoC;
