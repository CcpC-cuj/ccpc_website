import React from "react";
import { Helmet } from "react-helmet";
import NAVBAR from "../components/Navbar";
import STARFIELD from "../components/Starfield";

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
        <>
            <Helmet>
                <title>Projects | CCPC - Code Crafters Programming Club</title>
                <meta name="description" content="Explore amazing coding projects by CCPC members at Central University of Jharkhand. Web development, graphics, and innovative tech solutions." />
                <meta name="keywords" content="coding projects, web development, graphics, CCPC projects, Central University of Jharkhand" />
                <meta property="og:title" content="Projects | CCPC - Code Crafters Programming Club" />
                <meta property="og:description" content="Explore amazing coding projects by CCPC members at Central University of Jharkhand. Web development, graphics, and innovative tech solutions." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://ccpc-cuj.web.app/projects" />
                <meta property="og:image" content="https://ccpc-cuj.web.app/logo.svg" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Projects | CCPC - Code Crafters Programming Club" />
                <meta name="twitter:description" content="Explore amazing coding projects by CCPC members at Central University of Jharkhand. Web development, graphics, and innovative tech solutions." />
                <link rel="canonical" href="https://ccpc-cuj.web.app/projects" />
            </Helmet>
        <div className="relative min-h-screen bg-black text-white">
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
                            <div key={project.id} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out">
                                <img
                                    src={project.img}
                                    alt={project.text}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                                <h2 className="text-xl font-semibold text-white mb-2">{project.text}</h2>
                                <p className="text-gray-400 mb-4">A brief description of the {project.text} project.</p>
                                <a
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    View on GitHub
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Projects;
