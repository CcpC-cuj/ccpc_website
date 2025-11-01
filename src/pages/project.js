import React, { useMemo, useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet";
import NAVBAR from "../components/Navbar";
import STARFIELD from "../components/Starfield";
import { motion, AnimatePresence } from "framer-motion";
import doodlerush from "../components/assets/Projects/Doodle Rush .jpeg";
import swastik from "../components/assets/Projects/sastik.jpeg";
import cargame from "../components/assets/Projects/cargame.jpeg";
import atendentracker from "../components/assets/Projects/Attendance tracker.jpeg";

/**
 * Projects page — improved UX/UI and fixes:
 * - Single tag filter area (no duplicates)
 * - Search input with visible characters
 * - Modal is accessible, scrollable, and image stays placed correctly even when text is long
 * - Responsive grid and clean visual styling
 * - Extra features: copy link, download image, tag click filtering
 *
 * Requirements: Tailwind CSS + framer-motion + react-helmet
 */

const Projects = () => {
  // initial data (replace with actual data or fetch later)
  const initialProjects = [
    {
      id: 1,
      img: swastik,
      title: "We Development",
      short: "Modern responsive websites and web apps built with React.",
      description:
        "A collection of web development projects including single-page apps, full-stack demos and component libraries. Edit this description later to add project-specific details. This is extended text to simulate a long description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut urna venenatis, tincidunt risus non, pellentesque magna. Integer vitae libero sed augue fermentum varius. Praesent vulputate fermentum augue, at tempor erat tincidunt nec. Curabitur a gravida arcu, id lobortis odio. Proin sed risus nec lorem condimentum volutpat. Donec ut dapibus lorem. Sed rutrum libero vel sapien tincidunt, sit amet hendrerit lorem feugiat.",
      githubLink: "https://github.com/CcpC-cuj/Webdev",
    tags: ["web", "html"],
      authors: [
        { name: "Krish Kumar", avatar: "https://firebasestorage.googleapis.com/v0/b/soc-ccpc-cuj.appspot.com/o/profile_images%2FKrish.png?alt=media&token=ef05b24c-402f-486a-8677-b4bfebd89f4c", title: "Frontend Developer", link: "https://ccpc-cuj.web.app/profile/FE9FO4dLssN22QBPz8liIIgj04C2"},
        { name: "Apurba Das", avatar: "https://firebasestorage.googleapis.com/v0/b/soc-ccpc-cuj.appspot.com/o/profile_images%2F1000281115.heic?alt=media&token=c90901f7-a6df-4ab8-af7f-58a01f45ca4b", title: "Frontend Developer", link: "https://ccpc-cuj.web.app/profile/3UZdnFrZSJZByPREjytOetCtb9S2" },
        { name: "Akash Kumar", avatar: "https://firebasestorage.googleapis.com/v0/b/soc-ccpc-cuj.appspot.com/o/profile_images%2FIMG_20241128_114003_027~2.jpg?alt=media&token=bbb88881-5270-488f-a19e-348ae5f18ebb", title: "Frontend Developer", link: "https://firebasestorage.googleapis.com/v0/b/soc-ccpc-cuj.appspot.com/o/profile_images%2FIMG_20241128_114003_027~2.jpg?alt=media&token=bbb88881-5270-488f-a19e-348ae5f18ebb" },
        { name: "Siya Mandal", avatar: "https://firebasestorage.googleapis.com/v0/b/soc-ccpc-cuj.appspot.com/o/profileImages%2FgNC7e2F5AxNa9onJDzpBmBrgYBp1?alt=media&token=b5f0b658-2931-44fb-b4b5-fd8baac8a45c", title: "Graphics Lead", link: "https://ccpc-cuj.web.app/profile/gNC7e2F5AxNa9onJDzpBmBrgYBp1" },
      ],
      websiteLink: "https://ccpc-cuj.github.io/Webdev/",
    },
    {
      id: 2,
      img: cargame,
      title: "Graphics & OpenGL",
      short: "Graphics experiments and small games using OpenGL / three.js.",
      description:
        "Graphics-focused projects showcasing rendering, shaders and interactive visualizations. Extended description to test long content behavior in modal. Vivamus dictum odio non mi aliquet, a pulvinar massa volutpat. Nulla facilisi. Maecenas laoreet magna at lorem efficitur, vitae hendrerit mauris pharetra. Curabitur congue.",
      githubLink: "https://github.com/CcpC-cuj/Car_game_Opengl.py",
      tags: ["graphics", "opengl"],
      authors: [{ name: "Priyanshu Verma", avatar: "https://vlycbxrafcccxqyvnifb.supabase.co/storage/v1/object/public/CcpC/members_images/1757240271131-IMG-20250316-WA0013.jpg", title: "Graphics Lead", link: "https://ccpc-cuj.web.app/profile/VyRgQ4vRlrQRnPm540bEsdjYzR92" }],
      websiteLink: "https://ccpc-cuj.github.io/Car_game_Opengl.py/",
    },
    {
      id: 3,
      img: atendentracker,
      title: "Attendance Management System",
      short:
        "A full-stack QR-based Attendance Management System that automates attendance tracking for both online and offline events with real-time updates, admin control, and API integrations for Zoom, Google Meet, and Microsoft Teams.",
      description:
        "The Attendance Management System is a full-stack platform designed to simplify and automate attendance tracking for events, classes, and corporate meetings, whether conducted online or offline. Developed using Next.js, Node.js/Express.js, and MongoDB Atlas, it provides a scalable and secure solution with real-time updates via Socket.io. Admins can create and manage events, generate unique event IDs, assign co-admins with limited privileges, and monitor attendance through a centralized dashboard. Participants register using event IDs, receive unique QR codes for offline events, and are automatically marked present during online sessions via integrated APIs for Zoom, Google Meet, and Microsoft Teams. The system supports QR-based offline validation, CSV and PDF report exports, and includes JWT authentication, email verification, and anti-fraud measures for enhanced security. Deployed using Vercel (frontend) and Render/AWS (backend), the project ensures seamless operation, real-time monitoring, and accurate record-keeping—making it ideal for educational institutions, organizations, and event managers aiming to eliminate manual errors and streamline attendance processes across physical and virtual environments.",
      githubLink: "https://github.com/MeAbhishek09/Attendance-system",
      tags: ["full-stack", "nextjs", "nodejs", "mongodb", "automation" , "mern"],
      authors: [
        { name: "Krrish Goswami", avatar: "https://vlycbxrafcccxqyvnifb.supabase.co/storage/v1/object/public/CcpC/members_images/1757611370965-1000042260.webp", title: "Backend Developer", link: "https://ccpc-cuj.web.app/profile/wCL4vvpVZuX9gPZLWbX7ROVxj6z1"},
        { name: "Raj Vardhan Jha", avatar: "https://firebasestorage.googleapis.com/v0/b/soc-ccpc-cuj.appspot.com/o/profileImages%2Fwsm6pmqWGVXe8KB05p2RKj4WzcD2?alt=media&token=2f2fe5f0-6a31-48a6-9432-ba9042874725", title: "Frontend Developer", link: "https://ccpc-cuj.web.app/profile/5pEiWGlT30RUlHcMFqP77xOO0T13" },
        { name: "Abhishek", avatar: "https://vlycbxrafcccxqyvnifb.supabase.co/storage/v1/object/public/CcpC/members_images/5pEiWGlT30RUlHcMFqP77xOO0T13-1757237839408-IMG_20240523_123859_167.jpg", title: "Backend Developer", link: "https://firebasestorage.googleapis.com/v0/b/soc-ccpc-cuj.appspot.com/o/profile_images%2FIMG_20241128_114003_027~2.jpg?alt=media&token=bbb88881-5270-488f-a19e-348ae5f18ebb" },
        { name: "Kundan Kumar", avatar: "https://firebasestorage.googleapis.com/v0/b/soc-ccpc-cuj.appspot.com/o/profileImages%2FwfT41e7CD0OQ8C8n2sbTB3BX79H2?alt=media&token=bbe3a7e8-bb24-438f-b681-a5c8e5bb062f", title: "UI/UX designer", link: "https://ccpc-cuj.web.app/profile/wfT41e7CD0OQ8C8n2sbTB3BX79H2" },
        { name: "Samridhi Tripathi", avatar: "#", title: "UI/UX designer", link: "https://ccpc-cuj.web.app/profile/9lhmZgNefSPtO2aTwTWY7XH66MC3"},
        { name: "Priyanshi Chaurasia", avatar: "#", title: "Database and UX designer", link: "https://ccpc-cuj.web.app/profile/I87C3CSJswXWynQSC2Q8cGNPr8k2" },
      ],
      websiteLink: "https://attendance-system-frontend-pqt4.onrender.com",
    },
    {
      id: 4,
      img: doodlerush,
      title: "Doodle Rush (Real-Time Multiplayer Drawing & Guessing Game)",
      short: "A Pictionary-style web app with responsive UI, reliable real-time drawing and chat, secure private word handling, automated round flow, and live leaderboards..",
      description:
        "This project is a real-time web application that utilizes a robust tech stack to deliver a seamless user experience. The application features a dynamic frontend built with React.js and a Spring Boot backend, connected through WebSockets for real-time communication.",
      githubLink: "https://github.com/msaditya1510/Doodle_Rush",
      tags: [ "HTML5", "CSS3" , "JavaScript", "HTML5 Canvas", "React.js (functional components, hooks)", "Tailwind CSS", "Spring Boot (Java) with Java WebSockets (STOMP)", "SockJS + STOMP.js (WebSocket + fallback)", "Maven (backend)", "Spring Tool Suite (STS)", "Postman", "Chrome DevTools"],
      authors: [
        { name: "Ujit Raj Rathore ", avatar: "https://firebasestorage.googleapis.com/v0/b/soc-ccpc-cuj.appspot.com/o/profileImages%2FrGNgf8YGw1gLlRbrmGIZCrs8Msm2?alt=media&token=c19231ef-86ff-4d94-9dc4-6e3221a6e069", title: "React Conversion ", link: "https://ccpc-cuj.web.app/profile/rGNgf8YGw1gLlRbrmGIZCrs8Msm2" },
        { name: "Munukutla Sri Shanmukha Aditya", avatar: "#", title: "Backend Developer (Spring Boot)", link: "https://ccpc-cuj.web.app/profile/3OSllyK7okV4S6h35LpIPVC1MCB2" },
        { name: "Abhi Raj Gupta ", avatar: "#", title: "Frontend Developers (HTML/CSS/JS)", link: "https://ccpc-cuj.web.app/profile/wcYdLeaZwYXEsbRMqDTDSAqrUIX2" },
        { name: "Dheeraj Bharadwaj", avatar: "https://firebasestorage.googleapis.com/v0/b/soc-ccpc-cuj.appspot.com/o/profileImages%2Fwt7vH1R4BsgeqzUTafFHSzFTawr1?alt=media&token=b42002bb-8e8a-4703-aae4-ef49ab164cbf", title: "Frontend Developers (HTML/CSS/JS)", link: "https://ccpc-cuj.web.app/profile/wt7vH1R4BsgeqzUTafFHSzFTawr1" },
        { name: "Shashi Kumari Verma", avatar: "#", title: "Frontend Developers (HTML/CSS/JS)", link: "https://ccpc-cuj.web.app/profile/s8ZKdaxsWPWl1hQoTDhon47uy9O2" }
      ],
      websiteLink: "https://doodle-rush.vercel.app/",
    },
  ];

  const [projects] = useState(initialProjects);
  // use a Set for multi-select tags
  const [selectedTags, setSelectedTags] = useState(new Set());
  const [search, setSearch] = useState("");
  const [modalProject, setModalProject] = useState(null);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const modalRef = useRef(null);
  const lastFocusedRef = useRef(null);

  // unified tag list
  const tags = useMemo(() => {
    const t = new Set();
    projects.forEach((p) => (p.tags || []).forEach((tag) => t.add(tag)));
    return Array.from(t);
  }, [projects]);
  // filtering logic (tags + search)
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return projects.filter((p) => {
      const pTags = (p.tags || []).map((t) => t.toLowerCase());
      const matchesTag = selectedTags.size === 0 || pTags.some((t) => selectedTags.has(t));
      const matchesSearch =
        q.length === 0 ||
        p.title.toLowerCase().includes(q) ||
        p.short.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(q));
      return matchesTag && matchesSearch;
    });
  }, [projects, selectedTags, search]);

  // keyboard: close modal on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setModalProject(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // focus management when opening modal
  useEffect(() => {
    if (modalProject) {
      lastFocusedRef.current = document.activeElement;
      // slight delay to ensure modal exists in DOM
      setTimeout(() => {
        modalRef.current?.focus();
      }, 10);
    } else {
      // restore focus
      lastFocusedRef.current?.focus?.();
    }
  }, [modalProject]);

  const clearFilters = () => {
    setSelectedTags(new Set());
    setSearch("");
  };

  const handleTagClick = (tag) => {
    const lower = tag.toLowerCase();
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(lower)) next.delete(lower);
      else next.add(lower);
      return next;
    });
  };

  /*const copyProjectLink = (project) => {
    const url = `${window.location.origin}/projects#${project.id}`;
    navigator.clipboard?.writeText(url).then(() => {
      // small notification (could be improved with toast)
      alert("Project link copied to clipboard");
    });
  };

  const downloadImage = (imgUrl, title = "project-image") => {
    // create link and click
    const link = document.createElement("a");
    link.href = imgUrl;
    link.download = title.replace(/\s+/g, "-").toLowerCase() + ".jpg";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };*/

  return (
    <>
      <Helmet>
        <title>Projects | CCPC - Code Crafters Programming Club</title>
        <meta name="description" content="Explore amazing coding projects by CCPC members at Central University of Jharkhand. Web development, graphics, and innovative tech solutions." />
      </Helmet>

      <div className="min-h-screen bg-black text-white relative">
        <STARFIELD />

        <div className="relative z-20">
          <NAVBAR />
        </div>

        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <header className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              Our Amazing Projects
            </h1>
            <p className="mt-3 text-gray-300 max-w-2xl mx-auto">
              Explore projects from CCPC members — web, graphics, and more. Click a card for details or use the filters to narrow down results.
            </p>
          </header>

          {/* Controls */}
          <section className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div className="flex-1 relative">
                <input
                  type="search"
                  aria-label="Search projects"
                  placeholder="Search projects, tags, descriptions..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white/6 placeholder:text-gray-400 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-300 px-2 py-1 rounded hover:bg-white/5">
                    Clear
                  </button>
                )}
              </div>

              <div className="md:w-auto flex items-center justify-between md:justify-end gap-3">
                <button
                  className="md:hidden px-3 py-2 rounded-lg bg-white/6 text-sm"
                  onClick={() => setShowFiltersMobile((s) => !s)}
                  aria-expanded={showFiltersMobile}
                  aria-controls="project-filters"
                >
                  {showFiltersMobile ? "Hide filters" : "Show filters"}
                </button>
                {(selectedTags.size > 0 || search) && (
                  <button
                    onClick={clearFilters}
                    className="px-3 py-2 rounded-lg bg-white/6 text-sm hover:bg-white/10"
                    title="Clear all filters"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            <div
              id="project-filters"
              className={`mt-3 ${showFiltersMobile ? "block" : "hidden md:block"}`}
            >
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">Tags</div>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                <button
                  onClick={() => setSelectedTags(new Set())}
                  className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${selectedTags.size === 0 ? "bg-yellow-500 text-black" : "bg-white/6"}`}
                >
                  All
                </button>
                {tags.map((t) => (
                  <button
                    key={t}
                    onClick={() => handleTagClick(t)}
                    className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition ${
                      selectedTags.has(t.toLowerCase()) ? "bg-yellow-500 text-black" : "bg-white/6 text-white hover:bg-white/10"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {(selectedTags.size > 0 || search) && (
                <div className="mt-2 text-xs text-gray-400">
                  {selectedTags.size > 0 && <span>{selectedTags.size} tag(s) selected</span>}
                  {selectedTags.size > 0 && search && <span> · </span>}
                  {search && <span>search: “{search}”</span>}
                </div>
              )}
            </div>
          </section>

          {/* Projects grid */}
          <section>
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-gray-400">No projects found. Try clearing filters.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                  {filtered.map((project) => (
                    <motion.article
                      key={project.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.25 }}
                      className="bg-gradient-to-b from-gray-900/60 to-gray-800/40 p-5 rounded-2xl shadow-2xl border border-white/5 flex flex-col"
                    >
                      <div className="relative rounded-lg overflow-hidden mb-4 bg-gray-900">
                        <div className="relative pt-[66%]">
                          <img
                            src={project.img}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                        <p className="text-gray-400 mt-2">{project.short}</p>

                        {/* authors cluster */}
                        {project.authors && project.authors.length > 0 && (
                          <div className="flex items-center gap-3 mt-4">
                            <div className="flex -space-x-2">
                              {project.authors.slice(0, 3).map((a, i) => (
                                <img key={i} src={a.avatar} alt={a.name} className="w-8 h-8 rounded-full border-2 border-white/10 bg-gray-800" />
                              ))}
                            </div>
                            <div className="text-sm text-gray-300">
                              {(() => {
                                const total = project.authors.length;
                                const first = project.authors[0]?.name || "";
                                return total > 1 ? `${first} +${total - 1}` : first;
                              })()}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {project.githubLink && (
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:underline">
                              GitHub
                            </a>
                          )}
                          {project.websiteLink && (
                            <a href={project.websiteLink} target="_blank" rel="noopener noreferrer" className="text-sm text-green-400 hover:underline">
                              Website
                            </a>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setModalProject(project);
                            }}
                            className="px-3 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-md text-sm font-semibold hover:brightness-95"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </section>

          {/* Modal */}
          <AnimatePresence>
            {modalProject && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                aria-modal="true"
                role="dialog"
              >
                {/* backdrop */}
                <div
                  className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                  onClick={() => setModalProject(null)}
                  aria-hidden="true"
                />

                <motion.div
                  ref={modalRef}
                  tabIndex={-1}
                  className="relative z-60 max-w-3xl w-full bg-white/8 rounded-2xl shadow-2xl border border-white/10 overflow-hidden max-h-[90vh] flex flex-col"
                  initial={{ scale: 0.98, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.98, y: 10, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <button
                    onClick={() => setModalProject(null)}
                    aria-label="Close"
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center"
                  >
                    ×
                  </button>

                  {/* Image */}
                  <div className="bg-gray-900/60">
                    <div className="relative pt-[56.25%]">
                      <img
                        src={modalProject.img}
                        alt={modalProject.title}
                        className="absolute inset-0 w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col overflow-y-auto">
                    <h2 className="text-2xl font-bold text-white">{modalProject.title}</h2>
                    {modalProject.authors && modalProject.authors.length > 0 && (
                      <div className="mt-1 text-xs text-gray-400">
                        {modalProject.authors.length} contributor{modalProject.authors.length > 1 ? "s" : ""}
                      </div>
                    )}
                    {(modalProject.tags || []).length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(modalProject.tags || []).map((tag) => (
                          <button
                            key={tag}
                            onClick={() => {
                              handleTagClick(tag);
                              setModalProject(null);
                            }}
                            className="px-3 py-1 rounded-full bg-white/8 text-xs"
                            title={`Filter by ${tag}`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    )}

                    {modalProject.authors && modalProject.authors.length > 0 && (
                      <div className="mt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {modalProject.authors.map((a, i) => (
                            <div key={i} className="flex items-center gap-3">
                              {a.avatar ? (
                                <img src={a.avatar} alt={a.name} className="w-10 h-10 rounded-full bg-gray-900 p-1" />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center">
                                  {(a.name || "")
                                    .split(" ")
                                    .map((n) => n[0])
                                    .slice(0, 2)
                                    .join("")
                                    .toUpperCase()}
                                </div>
                              )}
                              <div className="flex-1">
                                <div className="font-medium text-white">{a.name}</div>
                                {a.title && <div className="text-xs text-gray-400">{a.title}</div>}
                              </div>
                              {a.link && (
                                <a href={a.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm hover:underline">
                                  Profile
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="my-4 border-t border-white/10" />

                    <div className="prose prose-invert text-sm text-gray-300">
                      <p>{modalProject.description}</p>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3 mt-auto">
                      {modalProject.githubLink && (
                        <a href={modalProject.githubLink} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-600/90 hover:bg-blue-600 rounded-md text-white">
                          View GitHub
                        </a>
                      )}
                      {modalProject.websiteLink && (
                        <a href={modalProject.websiteLink} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-green-600/90 hover:bg-green-600 rounded-md text-white">
                          Visit Website
                        </a>
                      )}
                      <button
                        onClick={() => setModalProject(null)}
                        className="px-4 py-2 bg-white/10 hover:bg-white/15 rounded-md text-white"
                      >
                        Close
                      </button>
                    </div>

                    <div className="mt-6 text-xs text-gray-500">Press Esc or click outside to close.</div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </>
  );
};

export default Projects;
