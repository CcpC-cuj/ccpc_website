import React, { useState } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { Helmet } from "react-helmet";
import NAVBAR from "../components/NavbarHome";
import STARFIELD from "../components/Starfield";
import Footer from "../components/Footer";
import Logo from "../components/logo/logo";
import Title from "../components/homecontent/Title";
import WhyCCPC from "../components/homecontent/WhyCCPC"; 
import SoC from "../components/homecontent/Soc"; 
import TEAM from "../components/SEB/Team2025";
//{enabel when we have an evnent to display on the home page line 114 too}import UpcomingEvents from "../components/homecontent/UpcomingEvents"; 
import Gallery from "../components/homecontent/Gallery"; 
import PrashantPrashun from "../components/assets/prashantsir.jpg";
import hod_img from "../components/assets/hod_img.jpg";
import IndependenceDayWrapper from "../components/IndependenceDay/IndependenceDayWrapper";

// ============================================
// INDEPENDENCE DAY THEME TOGGLE
// ============================================
// To ENABLE the Independence Day theme: set to true
// To DISABLE the Independence Day theme: set to false
// ============================================
const isIndependenceDayTheme = tru;
// ============================================
const coordinatorDetails = {
  hod: {
    name: "Dr. Subhash Chandra Yadav",
    role: "Chairperson",
    designation: "Head of Deptt & Professor",
    linkedin: "#", // Add LinkedIn if available
    github: "#", // Add GitHub if available
    link: "#", // Add profile link if available
    img: hod_img,
    bio: "Dedicated educator and mentor guiding our coding community towards excellence.",
    quote: "Education is the most powerful weapon which you can use to change the world."
  },

  PrashantParashun: {
    name: "Dr. Prashant Prashun",
    role: "Club Coordinator",
    designation: "Assistant Professor & Faculty Advisor",
    linkedin: "#", // Add LinkedIn if available
    github: "#", // Add GitHub if available
    link: "#", // Add profile link if available
    img: PrashantPrashun,
    bio: "Dedicated educator and mentor guiding our coding community towards excellence.",
    quote: "Education is the most powerful weapon which you can use to change the world."
  }
};

const Home = () => {
  const [modalMember, setModalMember] = useState(null);
  return (
    <>
      <Helmet>
        <title>CCPC - Code Crafters Programming Club | Central University of Jharkhand</title>
        <meta name="description" content="Join Code Crafters Programming Club (CCPC) at Central University of Jharkhand. Enhance your coding skills, participate in hackathons, and connect with fellow programmers in Ranchi." />
        <meta name="keywords" content="CCPC, coding club, Central University of Jharkhand, programming club, hackathons, coding events, Ranchi, Jharkhand" />
        <meta property="og:title" content="CCPC - Code Crafters Programming Club | Central University of Jharkhand" />
        <meta property="og:description" content="Join Code Crafters Programming Club (CCPC) at Central University of Jharkhand. Enhance your coding skills, participate in hackathons, and connect with fellow programmers in Ranchi." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ccpc-cuj.web.app/" />
        <meta property="og:image" content="https://ccpc-cuj.web.app/logo.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CCPC - Code Crafters Programming Club | Central University of Jharkhand" />
        <meta name="twitter:description" content="Join Code Crafters Programming Club (CCPC) at Central University of Jharkhand. Enhance your coding skills, participate in hackathons, and connect with fellow programmers in Ranchi." />
        <meta name="twitter:image" content="https://ccpc-cuj.web.app/logo.svg" />
        <link rel="canonical" href="https://ccpc-cuj.web.app/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Code Crafters Programming Club (CCPC)",
            "alternateName": ["CCPC", "Coding Club CUJ"],
            "url": "https://ccpc-cuj.web.app/",
            "logo": "https://ccpc-cuj.web.app/logo.svg",
            "description": "Code Crafters Programming Club at Central University of Jharkhand - enhancing coding skills and hosting programming events",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Central University of Jharkhand",
              "addressLocality": "Ranchi",
              "addressRegion": "Jharkhand",
              "postalCode": "835222",
              "addressCountry": "IN"
            },
            "sameAs": [
              "https://www.instagram.com/ccpc.cuj/"
            ]
          })}
        </script>
      </Helmet>
    {isIndependenceDayTheme ? (
      <IndependenceDayWrapper>
        <div className="relative">
          <div className="relative z-10">
            <NAVBAR />

            {/* Logo and Description Section */}
            <div className="mt-6 text-center px-4 lg:px-16 flex lg:flex-row flex-col items-center justify-center">
              <div className="flex justify-center items-start mt-8">
                <Logo />
              </div>
              <div className="bg-blue-500/20 backdrop-blur-md text-s lg:text-xl mt-3 lg:ml-10 rounded-lg text-left p-6 lg:p-10">
                <div>
                  <p className="text-gray-300 leading-relaxed">
                    Code Crafters Programming Club is an exciting initiative designed to ignite a passion for coding within our institution.
                    Our mission is to provide students with a gateway to the dynamic world of programming, offering a supportive platform where assistance and mentorship are readily available.
                    Whether you're just starting or looking to refine your skills, we're here to help you unlock your potential and enhance your coding abilities.
                  </p>
                  <p className="text-gray-300 leading-relaxed mt-4">
                    At Code Crafters, we believe coding is a skill everyone should have the opportunity to learn. Our motto is simple:
                    <span className="font-semibold text-yellow-500"> "Innovate. Collaborate. Elevate."</span>
                    Join us as we provide every student with the right tools, guidance, and community to embark on this exciting journey.
                  </p>
                </div>
              </div>
            </div>

            <WhyCCPC />
            {/* <UpcomingEvents /> */}
            <SoC />
            <h1 className="text-white text-4xl mb-6 text-center mt-10">Club Leadership</h1>
      
            {/* Professor - Hierarchical Position */}
            <div className="mb-8 flex justify-center space-x-16">
              {/* HOD */}
              <div className="flex flex-col items-center">
                <div
                  className="cursor-pointer group"
                  onClick={() => setModalMember(coordinatorDetails.hod)}
                >
                  <img
                    src={coordinatorDetails.hod.img}
                    alt={coordinatorDetails.hod.name}
                    className="w-40 h-40 rounded-full bg-white border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <h2
                  className="text-white text-xl font-bold mt-3 cursor-pointer text-center"
                  onClick={() => setModalMember(coordinatorDetails.hod)}
                >
                  {coordinatorDetails.hod.name}
                </h2>
                <p className="text-blue-400 text-lg font-semibold">{coordinatorDetails.hod.role}</p>
                <p className="text-gray-300 text-base font-medium">{coordinatorDetails.hod.designation}</p>
                <div className="flex mt-2 space-x-4">
                  {coordinatorDetails.hod.linkedin && coordinatorDetails.hod.linkedin !== "#" && (
                    <span
                      onClick={() => setModalMember(coordinatorDetails.hod)}
                      className="text-blue-500 hover:text-blue-400 cursor-pointer"
                    >
                      <FaLinkedin size={24} />
                    </span>
                  )}
                  {coordinatorDetails.hod.github && coordinatorDetails.hod.github !== "#" && (
                    <span
                      onClick={() => setModalMember(coordinatorDetails.hod)}
                      className="text-gray-500 hover:text-gray-400 cursor-pointer"
                    >
                      <FaGithub size={24} />
                    </span>
                  )}
                </div>
              </div>
      
              {/* Prashant Prashun */}
              <div className="flex flex-col items-center">
                <div
                  className="cursor-pointer group"
                  onClick={() => setModalMember(coordinatorDetails.PrashantParashun)}
                >
                  <img
                    src={coordinatorDetails.PrashantParashun.img}
                    alt={coordinatorDetails.PrashantParashun.name}
                    className="w-40 h-40 rounded-full bg-white border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <h2
                  className="text-white text-xl font-bold mt-3 cursor-pointer text-center"
                  onClick={() => setModalMember(coordinatorDetails.PrashantParashun)}
                >
                  {coordinatorDetails.PrashantParashun.name}
                </h2>
                <p className="text-blue-400 text-lg font-semibold">
                  {coordinatorDetails.PrashantParashun.role}
                </p>
                <p className="text-gray-300 text-base font-medium">
                  {coordinatorDetails.PrashantParashun.designation}
                </p>
                <div className="flex mt-2 space-x-4">
                  {coordinatorDetails.PrashantParashun.linkedin && coordinatorDetails.PrashantParashun.linkedin !== "#" && (
                    <span
                      onClick={() => setModalMember(coordinatorDetails.PrashantParashun)}
                      className="text-blue-500 hover:text-blue-400 cursor-pointer"
                    >
                      <FaLinkedin size={24} />
                    </span>
                  )}
                  {coordinatorDetails.PrashantParashun.github && coordinatorDetails.PrashantParashun.github !== "#" && (
                    <span
                      onClick={() => setModalMember(coordinatorDetails.PrashantParashun)}
                      className="text-gray-500 hover:text-gray-400 cursor-pointer"
                    >
                      <FaGithub size={24} />
                    </span>
                  )}
                </div>
              </div>
            </div>
      
            <TEAM />
            <Gallery />
            <Footer />
          </div>
        </div>
      </IndependenceDayWrapper>
    ) : (
      <div className="relative">
        <STARFIELD />
        <div className="relative z-10">
          <NAVBAR />
          <div className="flex flex-col justify-center items-center min-h-[70vh] lg:min-h-screen">
            <div className="fixed-width text-center">
              <Title text="Code Crafters Programming Club" />
            </div>
          </div>

          <div className="mt-6 text-center px-4 lg:px-16 flex lg:flex-row flex-col items-center justify-center">
            <div className="flex justify-center items-start mt-8">
              <Logo />
            </div>
            <div className="bg-blue-500/20 backdrop-blur-md text-s lg:text-xl mt-3 lg:ml-10 rounded-lg text-left p-6 lg:p-10">
              <div>
                <p className="text-gray-300 leading-relaxed">
                  Code Crafters Programming Club is an exciting initiative designed to ignite a passion for coding within our institution.
                  Our mission is to provide students with a gateway to the dynamic world of programming, offering a supportive platform where assistance and mentorship are readily available.
                  Whether you're just starting or looking to refine your skills, we're here to help you unlock your potential and enhance your coding abilities.
                </p>
                <p className="text-gray-300 leading-relaxed mt-4">
                  At Code Crafters, we believe coding is a skill everyone should have the opportunity to learn. Our motto is simple:
                  <span className="font-semibold text-yellow-500"> "Innovate. Collaborate. Elevate."</span>
                  Join us as we provide every student with the right tools, guidance, and community to embark on this exciting journey.
                </p>
              </div>
            </div>
          </div>

          <WhyCCPC />
          {/* <UpcomingEvents /> */}
          <SoC />
          <h1 className="text-white text-4xl mb-6 text-center mt-10">Club Leadership</h1>
    
          {/* Professor - Hierarchical Position */}
          <div className="mb-8 flex justify-center space-x-16">
            {/* HOD */}
            <div className="flex flex-col items-center">
              <div
                className="cursor-pointer group"
                onClick={() => setModalMember(coordinatorDetails.hod)}
              >
                <img
                  src={coordinatorDetails.hod.img}
                  alt={coordinatorDetails.hod.name}
                  className="w-40 h-40 rounded-full bg-white border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <h2
                className="text-white text-xl font-bold mt-3 cursor-pointer text-center"
                onClick={() => setModalMember(coordinatorDetails.hod)}
              >
                {coordinatorDetails.hod.name}
              </h2>
              <p className="text-blue-400 text-lg font-semibold">{coordinatorDetails.hod.role}</p>
              <p className="text-gray-300 text-base font-medium">{coordinatorDetails.hod.designation}</p>
              <div className="flex mt-2 space-x-4">
                {coordinatorDetails.hod.linkedin && coordinatorDetails.hod.linkedin !== "#" && (
                  <span
                    onClick={() => setModalMember(coordinatorDetails.hod)}
                    className="text-blue-500 hover:text-blue-400 cursor-pointer"
                  >
                    <FaLinkedin size={24} />
                  </span>
                )}
                {coordinatorDetails.hod.github && coordinatorDetails.hod.github !== "#" && (
                  <span
                    onClick={() => setModalMember(coordinatorDetails.hod)}
                    className="text-gray-500 hover:text-gray-400 cursor-pointer"
                  >
                    <FaGithub size={24} />
                  </span>
                )}
              </div>
            </div>
      
            {/* Prashant Prashun */}
            <div className="flex flex-col items-center">
              <div
                className="cursor-pointer group"
                onClick={() => setModalMember(coordinatorDetails.PrashantParashun)}
              >
                <img
                  src={coordinatorDetails.PrashantParashun.img}
                  alt={coordinatorDetails.PrashantParashun.name}
                  className="w-40 h-40 rounded-full bg-white border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <h2
                className="text-white text-xl font-bold mt-3 cursor-pointer text-center"
                onClick={() => setModalMember(coordinatorDetails.PrashantParashun)}
              >
                {coordinatorDetails.PrashantParashun.name}
              </h2>
              <p className="text-blue-400 text-lg font-semibold">
                {coordinatorDetails.PrashantParashun.role}
              </p>
              <p className="text-gray-300 text-base font-medium">
                {coordinatorDetails.PrashantParashun.designation}
              </p>
              <div className="flex mt-2 space-x-4">
                {coordinatorDetails.PrashantParashun.linkedin && coordinatorDetails.PrashantParashun.linkedin !== "#" && (
                  <span
                    onClick={() => setModalMember(coordinatorDetails.PrashantParashun)}
                    className="text-blue-500 hover:text-blue-400 cursor-pointer"
                  >
                    <FaLinkedin size={24} />
                  </span>
                )}
                {coordinatorDetails.PrashantParashun.github && coordinatorDetails.PrashantParashun.github !== "#" && (
                  <span
                    onClick={() => setModalMember(coordinatorDetails.PrashantParashun)}
                    className="text-gray-500 hover:text-gray-400 cursor-pointer"
                  >
                    <FaGithub size={24} />
                  </span>
                )}
              </div>
            </div>
          </div>
      
          <TEAM />
          <Gallery />
          <Footer />
        </div>
      </div>
    )}

      {/* Modal for Coordinator Details */}
      {modalMember && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={() => setModalMember(null)}
        >
          <div
            className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => setModalMember(null)}
            >
              ✕
            </button>
            <div className="text-center">
              <img
                src={modalMember.img}
                alt={modalMember.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white"
              />
              <h2 className="text-white text-2xl font-bold mb-2">{modalMember.name}</h2>
              <p className="text-blue-400 text-lg font-semibold mb-1">{modalMember.role}</p>
              <p className="text-gray-300 text-base mb-4">{modalMember.designation}</p>
              <p className="text-gray-300 text-sm mb-4">{modalMember.bio}</p>
              <blockquote className="text-yellow-500 italic text-sm mb-4">
                "{modalMember.quote}"
              </blockquote>
              <div className="flex justify-center space-x-4">
                {modalMember.linkedin && modalMember.linkedin !== "#" && (
                  <a
                    href={modalMember.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-400"
                  >
                    <FaLinkedin size={24} />
                  </a>
                )}
                {modalMember.github && modalMember.github !== "#" && (
                  <a
                    href={modalMember.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-400"
                  >
                    <FaGithub size={24} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
