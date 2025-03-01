import React from "react";

const WhyCCPC = () => {
  return (
    <div className="mt-12 text-center px-4 lg:px-16">
      <h2 className="text-3xl font-semibold text-yellow-500 mb-8 font-mono">
        Why We Matter?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Contrivance */}
        <div className="w-full p-6 bg-gray-800/60 backdrop-blur-lg rounded-lg text-gray-300 shadow-lg border border-gray-700 flex-none hover:bg-gray-700 transition duration-300 transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-yellow-500 font-mono">Contrivance</h3>
          <p className="leading-relaxed mt-2 text-sm font-mono">
            With the aid of the skills we gain from technology, we have the ability to create and transform society.
          </p>
          {/* Tags/Hashtags */}
          <div className="mt-4 flex space-x-4">
            <span className="text-yellow-500 font-mono text-xs bg-gray-900 rounded px-2 py-1">
              #Innovation
            </span>
          </div>
        </div>

        {/* Creative */}
        <div className="w-full p-6 bg-gray-800/60 backdrop-blur-lg rounded-lg text-gray-300 shadow-lg border border-gray-700 flex-none hover:bg-gray-700 transition duration-300 transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-yellow-500 font-mono">Creative</h3>
          <p className="leading-relaxed mt-2 text-sm font-mono">
            We create beyond human imagination. Our team is dedicated to pushing boundaries and thinking outside the box to deliver exceptional results.
          </p>
          {/* Tags/Hashtags */}
          <div className="mt-4 flex space-x-4">
            <span className="text-yellow-500 font-mono text-xs bg-gray-900 rounded px-2 py-1">
              #OutsideTheBox
            </span>
          </div>
        </div>

        {/* Passion */}
        <div className="w-full p-6 bg-gray-800/60 backdrop-blur-lg rounded-lg text-gray-300 shadow-lg border border-gray-700 flex-none hover:bg-gray-700 transition duration-300 transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-yellow-500 font-mono">Passion</h3>
          <p className="leading-relaxed mt-2 text-sm font-mono">
            We have passion for creating innovative solutions that make a positive impact on people's lives.
          </p>
          {/* Tags/Hashtags */}
          <div className="mt-4 flex space-x-4">
            <span className="text-yellow-500 font-mono text-xs bg-gray-900 rounded px-2 py-1">
              #ImpactfulSolutions
            </span>
          </div>
        </div>

        {/* Cooperation */}
        <div className="w-full p-6 bg-gray-800/60 backdrop-blur-lg rounded-lg text-gray-300 shadow-lg border border-gray-700 flex-none hover:bg-gray-700 transition duration-300 transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-yellow-500 font-mono">Co-operation</h3>
          <p className="leading-relaxed mt-2 text-sm font-mono">
            We co-operate with team members to achieve our common goals and ensure success in our projects. Effective communication and collaboration are key to our teamwork.
          </p>
          {/* Tags/Hashtags */}
          <div className="mt-4 flex space-x-4">
            <span className="text-yellow-500 font-mono text-xs bg-gray-900 rounded px-2 py-1">
              #Teamwork
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyCCPC;
