import React from "react";
import Team2025 from "../components/SEB/Team2025";
import STARFIELD from "../components/Starfield";

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-black py-8">
    <STARFIELD className="fixed inset-0 z-0" />
      <h1 className="text-white text-4xl font-bold text-center mb-8">Student Body by Year</h1>
      <div className="max-w-6xl mx-auto">
        {/* 2025 Team */}
        <div className="mb-16">
          <h2 className="text-white text-2xl font-semibold mb-4 text-center">2025</h2>
          <Team2025 />
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
