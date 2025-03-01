import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import NavLogo from "./../logo/navlogo"; // Your logo component
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [currentSentence, setCurrentSentence] = useState("");
  const [blink, setBlink] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsAuthenticated(false);
      navigate("/soc");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  // Typewriter effect for the nav logo subtitle
  useEffect(() => {
    const sentences = ["CU_Jharkhand", "Let's go out of the CodeSpace"];
    let sentenceIndex = 0;
    let charIndex = 0;
    let isRemoving = false;

    const typeInterval = 150; // Typing speed
    const pauseBetween = 1000; // Pause before removing text
    const blinkInterval = 500; // Cursor blink speed

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

  return (
    <nav className="bg-black text-white transition-all relative">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo with typewriter effect */}
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 items-center">
          {isAuthenticated && location.pathname === `/u/${auth.currentUser?.uid}` && (
            <li>
              <Link to="/" className="group relative">
                <span className="text-gray-400 hover:text-blue-500 transition duration-200">Home</span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
          )}
          {!isAuthenticated && location.pathname === "/soc" && (
              <li>
                <Link to="/" className="group relative">
                  <span className="nav-btn text-gray-400 hover:text-blue-500 transition duration-200">Home</span>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            )}
          {isAuthenticated && location.pathname === "/soc" && (
            <li>
              <Link to={`/u/${auth.currentUser?.uid}`} className="group relative">
                <span className="text-gray-400 hover:text-blue-500 transition duration-200">Profile</span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
          )}
            {!isAuthenticated && location.pathname === "/members" && (
              <li>
                <Link to="/" className="group relative">
                  <span className="nav-btn text-gray-400 hover:text-blue-500 transition duration-200">Home</span>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            )}

          {location.pathname !== "/threads" && (
            <li>
              <Link to="/threads" className="group relative">
                <span className="text-gray-400 hover:text-blue-500 transition duration-200">Threads</span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
          )}

          {!isAuthenticated && location.pathname === "/threads" && (
            <li>
              <Link to="/" className="group relative">
                <span className="text-gray-400 hover:text-blue-500 transition duration-200">Home</span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
          )}

          {location.pathname !== "/soc" && (
            <li>
              <Link to="/soc" className="group relative">
                <span className="text-gray-400 hover:text-blue-500 transition duration-200">SOC</span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
          )}

          <li>
            <Link to="/projects" className="group relative">
              <span className="text-gray-400 hover:text-blue-500 transition duration-200">Projects</span>
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
          <li>
            <Link to="/blogs" className="group relative">
              <span className="text-gray-400 hover:text-blue-500 transition duration-200">Blogs</span>
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
          <li>
            <Link to="/members" className="group relative">
              <span className="text-gray-400 hover:text-blue-500 transition duration-200">Members</span>
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
          <li>
            <a href="/reachus" className="group relative">
              <span className="text-gray-400 hover:text-blue-500 transition duration-200">Reach Us</span>
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
          {isAuthenticated ? (
            <li>
              <button
                className="group relative text-gray-400 hover:text-blue-500 transition duration-200"
                onClick={handleLogout}
              >
                <span>Logout</span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login/auth" className="group relative">
                <span className="text-gray-400 hover:text-blue-500 transition duration-200">Login</span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <ul className="md:hidden absolute top-16 left-0 w-full bg-black text-white flex flex-col pr-10 text-right">
            {isAuthenticated && location.pathname === `/u/${auth.currentUser?.uid}` && (
              <li>
                <Link to="/" className="group relative">
                  <span className="nav-btn text-gray-400 hover:text-blue-500 transition duration-200">Home</span>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            )}
            {!isAuthenticated && location.pathname === "/soc" && (
              <li>
                <Link to="/" className="group relative">
                  <span className="nav-btn text-gray-400 hover:text-blue-500 transition duration-200">Home</span>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            )}
            {isAuthenticated && location.pathname === "/soc" && (
              <li>
                <Link to={`/u/${auth.currentUser?.uid}`} className="group relative">
                  <span className="nav-btn text-gray-400 hover:text-blue-500 transition duration-200">Profile</span>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            )}
            {!isAuthenticated && location.pathname === "/members" && (
              <li>
                <Link to="/" className="group relative">
                  <span className="nav-btn text-gray-400 hover:text-blue-500 transition duration-200">Home</span>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            )}

            {location.pathname !== "/threads" && (
              <li>
                <Link to="/threads" className="group relative">
                  <span className="nav-btn text-gray-400 hover:text-blue-500 transition duration-200">Threads</span>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            )}

            {!isAuthenticated && location.pathname === "/threads" && (
              <li>
                <Link to="/" className="group relative">
                  <span className="nav-btn text-gray-400 hover:text-blue-500 transition duration-200">Home</span>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            )}

            {location.pathname !== "/soc" && (
              <li>
                <Link to="/soc" className="group relative">
                  <span className="text-gray-400 hover:text-blue-500 transition duration-200">SOC</span>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            )}

            <li>
              <Link to="/projects" className="group relative">
                <span className="text-gray-400 hover:text-blue-500 transition duration-200">Projects</span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="group relative">
                <span className="text-gray-400 hover:text-blue-500 transition duration-200">Blogs</span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
            <li>
              <Link to="/members" className="group relative">
                <span className="text-gray-400 hover:text-blue-500 transition duration-200">Members</span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
            <li>
              <a href="/reachus" className="group relative">
                <span className="text-gray-400 hover:text-blue-500 transition duration-200">Reach Us</span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            </li>
            {isAuthenticated ? (
              <li>
                <button
                  className="group relative nav-btn text-gray-400 hover:text-blue-500 transition duration-200"
                  onClick={handleLogout}
                >
                  <span>Logout</span>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </button>
              </li>
            ) : (
              <li>
                <Link to="/login/auth" className="group relative">
                  <span className="nav-btn text-gray-400 hover:text-blue-500 transition duration-200">Login</span>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
