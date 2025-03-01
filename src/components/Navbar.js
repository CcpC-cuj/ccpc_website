import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import NavLogo from "./logo/navlogo";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [currentSentence, setCurrentSentence] = useState("");
  const [blink, setBlink] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      navigate("/members");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  // Typewriter Effect
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

    return () => {
      clearInterval(blinkCursor);
    };
  }, []);

  // Define navigation links dynamically
  const links = [
    { name: "Home", path: "/" },
    { name: "SOC", path: "/soc" },
    { name: "Projects", path: "/projects" },
    { name: "Blogs", path: "/blogs" },
    { name: "Threads", path: "/threads" },
    { name: "Reach Us", path: "/reachus" },
  ];

  // Handle Members Page Logic
  if (location.pathname === "/members") {
    if (user) {
      links.push({ name: "Profile", path: `/u/${user.uid}` }); // Show Profile if logged in
    } else {
      links.push({ name: "Login", path: "/login/auth" }); // Show Login if NOT logged in
    }
  } else {
    links.push({ name: "Members", path: "/members" }); // Show Members for other pages
  }

  return (
    <nav className="bg-black text-white transition-all relative">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo with Typewriter Effect */}
        <Link to="/" className="flex flex-col items-start mt-2">
          <NavLogo className="w-16 h-10" />
          <div className="text-xs font-mono text-gray-400">
            {currentSentence}
            <span className={`ml-1 ${blink ? "opacity-100" : "opacity-0"}`}>_</span>
          </div>
        </Link>

        {/* Hamburger Menu Button for Mobile */}
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

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 items-center">
          {links
            .filter((link) => link.path !== location.pathname) // Hide current page link
            .map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="group relative">
                  <span className="text-gray-400 hover:text-blue-500 transition duration-200">{link.name}</span>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            ))}

          {user && (
            <li>
              <button
                className="group relative text-gray-400 hover:text-blue-500 transition duration-200"
                onClick={handleLogout}
              >
                <span>Logout</span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
              </button>
            </li>
          )}
        </ul>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <ul className="md:hidden absolute top-16 left-0 w-full bg-black text-white flex flex-col pr-10 text-right">
            {links
              .filter((link) => link.path !== location.pathname)
              .map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="group relative">
                    <span className="text-gray-400 hover:text-blue-500 transition duration-200">{link.name}</span>
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
              ))}

            {user && (
              <li>
                <button
                  className="group relative text-gray-400 hover:text-blue-500 transition duration-200"
                  onClick={handleLogout}
                >
                  <span>Logout</span>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </button>
              </li>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
