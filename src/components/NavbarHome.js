import React, { useEffect, useState } from "react";
import NavLogo from "./logo/navlogo"; // Import your NavLogo component

const Navbar = () => {
  const [currentSentence, setCurrentSentence] = useState("");
  const [blink, setBlink] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const sentences = ["CU_Jharkhand", "Let's go out of the CodeSpace"];
    let sentenceIndex = 0;
    let charIndex = 0;
    let isRemoving = false;

    const typeInterval = 150;
    const pauseBetween = 1000;
    const blinkInterval = 500;

    const blinkCursor = setInterval(() => setBlink((prev) => !prev), blinkInterval);

    const typeSentence = () => {
      if (!isRemoving && charIndex <= sentences[sentenceIndex].length) {
        setCurrentSentence(sentences[sentenceIndex].substring(0, charIndex));
        charIndex++;
      } else if (isRemoving && charIndex >= 0) {
        setCurrentSentence(sentences[sentenceIndex].substring(0, charIndex));
        charIndex--;
      } else {
        isRemoving = !isRemoving;
        if (!isRemoving) {
          sentenceIndex = (sentenceIndex + 1) % sentences.length;
        }
        setTimeout(typeSentence, pauseBetween);
        return;
      }
      setTimeout(typeSentence, isRemoving ? 100 : typeInterval);
    };

    typeSentence();

    return () => clearInterval(blinkCursor);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`bg-black text-white transition-all ${isScrolled ? "fixed top-0 left-0 w-full z-50" : "absolute top-[-150px] w-full"}`}>
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo Section */}
        <a href="/" className="flex flex-col items-left mt-2">
          <NavLogo className="w-16 h-10" />
          <div className="text-12px font-mono text-gray-400">
            {currentSentence}
            <span className={`ml-1 ${blink ? "opacity-100" : "opacity-0"}`}>_</span>
          </div>
        </a>

        {/* Hamburger Menu Button for Mobile View */}
        <button
          className="block md:hidden text-gray-400 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>

        {/* Navigation Links for Desktop */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <a href="/" className="text-gray-400 hover:text-blue-500 transition duration-200 relative group">
              Home
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
          <li>
            <a href="/soc" className="text-gray-400 hover:text-blue-500 transition duration-200 relative group">
              SOC
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
          <li>
            <a href="/projects" className="text-gray-400 hover:text-blue-500 transition duration-200 relative group">
              Projects
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
          <li>
            <a href="/blogs" className="text-gray-400 hover:text-blue-500 transition duration-200 relative group">
              Blogs
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
          <li>
            <a href="/threads" className="text-gray-400 hover:text-blue-500 transition duration-200 relative group">
              Threads
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
          <li>
            <a href="/members" className="text-gray-400 hover:text-blue-500 transition duration-200 relative group">
              Members
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
          <li>
            <a href="/reachus" className="text-gray-400 hover:text-blue-500 transition duration-200 relative group">
              Reach Us
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
          {/* <li>
          <a href="/registration" className=" text-gray-400 hover:text-blue-500 transition duration-200 relative group">
            <span className="relative z-5">Register </span>
            <span className="absolute text-xs -top-3 -right-2 z-5 text-red-500 duration-200 ease-in-out animate-[blink_1s_infinite]">New</span>
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
          </a>
          </li> */}
        </ul>

        {/* Mobile Menu (Hamburger Menu) */}
        <ul className={`${isMenuOpen ? "block" : "hidden"} md:hidden absolute top-16 left-0 w-full bg-black text-white flex flex-col pr-10 text-right`}>
          <li>
            <a href="/" className="text-gray-400 hover:text-blue-500 transition duration-200 relative group">
              Home
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
          <li>
            <a href="/soc" className="text-gray-400 hover:text-blue-500 transition duration-200 relative group">
              SOC
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
          <li>
            <a href="/projects" className="text-gray-400 hover:text-blue-500 transition duration-200 relative group">
              Projects
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
          <li>
            <a href="/blogs" className="text-gray-400 hover:text-blue-500 transition duration-200 relative group">
              Blogs
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
          <li>
            <a href="/threads" className="text-gray-400 hover:text-blue-500 transition duration-200 relative group">
              Threads
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
          <li>
            <a href="/members" className="text-gray-400 hover:text-blue-500 transition duration-200 relative group">
              Members
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
          <li>
            <a href="/reachus" className="text-gray-400 hover:text-blue-500 transition duration-200 relative group">
              Reach Us
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>

          </li>
          {/* <li>
          <a href="/registration" className=" text-gray-400 hover:text-blue-500 transition duration-200 relative group">
            <span className="relative z-5">Register </span>
            <span className="absolute text-xs -top-3 -right-2 z-5 text-red-500 duration-200 ease-in-out animate-[blink_1s_infinite]">New</span>
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
          </a>
          </li> */}
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;
