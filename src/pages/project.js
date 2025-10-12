import React from "react";
import NAVBAR from "../components/Navbar";
import STARFIELD from "../components/Starfield";
import SEO from "../components/common/SEO";
import OptimizedImage from "../components/common/OptimizedImage";

const Projects = () => {
    const cardsData1 = [
        { 
            id: 3, 
            top: 100, 
            left: 240, 
            img: 'https://via.placeholder.com/150', 
            text: 'Web-Development', 
            githubLink: 'https://github.com/CcpC-cuj/Webdev' 
        },
        { 
            id: 5, 
            top: 200, 
            left: 480, 
            img: 'https://via.placeholder.com/150', 
            text: 'Graphics', 
            githubLink: 'https://github.com/CcpC-cuj/Car_game_Opengl.py' 
        }
    ];
    
    return (
        <div className="relative min-h-screen bg-black text-white">
            <SEO 
                title="Projects | Code Crafters Programming Club"
                description="Explore amazing projects built by Code Crafters Programming Club members. From web development to graphics programming, discover our innovative solutions."
                keywords="programming projects, web development, graphics, coding examples, student projects, open source"
            />
            {/* Background Starfield */}
            <STARFIELD />
            
            {/* Navbar */}
            <div className="relative z-20">
                <NAVBAR />
            </div>

            {/* Main Content */}
            <div className="absolute inset-0 flex items-center justify-center z-10 px-4 py-8 md:py-16">
                <div className="max-w-6xl w-full text-center">
                    <h1 className="text-4xl mt-80 lg:mt-10 md:text-5xl font-bold leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                        Our Amazing Projects
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 mb-10">
                        Explore the projects we've worked on. We focus on quality, innovation, and cutting-edge technologies.
                    </p>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {cardsData1.map((project) => (
                            <article 
                                key={project.id} 
                                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-black"
                            >
                                <OptimizedImage
                                    src={project.img}
                                    alt={`${project.text} project preview - Code Crafters Programming Club`}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                    fallbackSrc="/api/placeholder/400/300"
                                />
                                <h2 className="text-xl font-semibold text-white mb-2">{project.text}</h2>
                                <p className="text-gray-400 mb-4">A brief description of the {project.text} project.</p>
                                <a
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-blue-500 hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 rounded px-2 py-1"
                                    aria-label={`View ${project.text} project source code on GitHub`}
                                >
                                    View on GitHub
                                    <svg 
                                        className="w-4 h-4 ml-1" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;
