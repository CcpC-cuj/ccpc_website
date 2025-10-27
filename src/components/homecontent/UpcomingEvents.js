import React, { useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaChevronLeft, FaChevronRight, FaUsers, FaArrowRight} from "react-icons/fa";
import techfestmart from "../assets/upcoming events/martreg Large.jpeg";
import aminsession from "../assets/upcoming events/MARtinovation Large.jpeg";
import comminpart from "../assets/upcoming events/comunity_partner Large.jpeg";
const UpcomingEvents = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  const events = [
    
    {
      id: 1,
        title: "MARTINOVATION 2025 – Tech Fest",
        description: "Gear up for the ultimate celebration of innovation, creativity, and technology! Usha Martin University, Ranchi, presents its flagship annual Tech Fest — MARTINOVATION 2025. Experience a dynamic fusion of competitions and challenges that push the limits of imagination and skill. From hackathons and gaming tournaments to web development sprints and quizzes it’s a playground for creators, coders, and changemakers. Proudly partnered with CcpC, the Official Community Partner, empowering collaboration and innovation across campuses. Win exciting prizes, earn recognition, and be part of the genesis of tomorrow!",
        date: "3 Nov 2025 to 7 Nov 2025",
        location: "Usha Martin University, Ranchi",
        type: "Tech Fest",
        image: techfestmart,
        registrationLink: "https://www.umutechfest.co.in",
        featured: false
    },
    {
      id: 2,
        title: "Generative AI Workshop – MARTINOVATION 2025",
        description: "Unlock the power of Generative AI with Mr. Aamin Uddin, Founder of Badge Monster and alumnus of IIT Guwahati. This exclusive workshop dives into how creativity and technology come together through real-world applications and hands-on learning. Join us to explore the limitless possibilities of AI and innovation. Organized as part of MARTINOVATION 2025 and proudly powered by CcpC, the Official Community Partner driving collaboration and tech learning at Usha Martin University.",
        date: "4 Nov 2025",
        location: "Usha Martin University, Ranchi, Jharkhand",
        type: "Workshop",
        image: aminsession,
        registrationLink: "https://www.umutechfest.co.in",
        featured: false
    },
    {
      id: 3,
        title: "Official Community Partner – Code Crafters Programming Club (CcpC)",
        description: "We’re thrilled to announce that the Code Crafters Programming Club (CcpC) is the official Community Partner for MARTINOVATION 2025! Together, we’re set to create an inspiring journey of innovation, learning, and collaboration. From hands-on workshops to tech challenges, CcpC will be at the forefront empowering participants to learn, build, and grow throughout the fest.",
        date: "3 Nov 2025 to 7 Nov 2025",
        location: "Usha Martin University, Ranchi, Jharkhand",
        type: "Live Event",
        image: comminpart,
        registrationLink: "https://www.umutechfest.co.in",
        featured: false
    },
    
    /*
    {
      id: 1,
      title: "CyberSec Meme-athon",
      description: "In this event, you’ll create memes that spread awareness about the risks and mishappenings in the cyber world — from phishing and weak passwords to online scams",
      date: "16 Oct 2025",
      time: "10:00 AM",
      location: "CSE Lab (room no. 323), Science Building",
      type: "Competition",
      image: meme,
      registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSfsT_RILNvit1lNuuuL-HiITAAm5zoqBiQ_-BCSFCvrohd-Sw/viewform?usp=header",
      submissionLink: "https://docs.google.com/forms/d/e/1FAIpQLSfsT_RILNvit1lNuuuL-HiITAAm5zoqBiQ_-BCSFCvrohd-Sw/viewform?usp=header",
      featured: true
    },
    {
      id: 4,
      title: "Coding Contest",
      description: "Test your problem-solving skills in our monthly coding contest. Participate in algorithmic challenges and climb the leaderboard!",
      date: "2025-01-30",
      time: "10:00 AM",
      location: "Online",
      maxParticipants: 150,
      currentParticipants: 89,
      type: "Contest",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      registrationLink: "#",
      featured: false
    }*/
  ];

 
  const nextEvent = () => {
    setCurrentEventIndex((prev) => (prev + 1) % events.length);
  };

  const prevEvent = () => {
    setCurrentEventIndex((prev) => (prev - 1 + events.length) % events.length);
  };

 

  const currentEvent = events[currentEventIndex];

  const getEventTypeColor = (type) => {
    switch (type) {
      case "Competition": return "bg-red-500";
      case "Workshop": return "bg-blue-500";
      case "Live Event": return "bg-green-500";
      case "Contest": return "bg-purple-500";
      case "Seminar": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // treat plain ISO yyyy-mm-dd strings as dates to format; otherwise display raw string
  const isIsoDateString = (s) => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s);

  return (
    <div className="py-16 px-4 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Upcoming <span className="text-yellow-500">Events</span>
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Join our exciting lineup of coding events, workshops, and competitions designed to enhance your programming journey.
          </p>
        </div>

        {/* Main Event Card */}
        <div className="relative mb-8">
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl overflow-hidden">
            {/* Event Type Badge */}
            <div className="absolute top-6 right-6">
              <span className={`px-4 py-2 rounded-full text-white text-sm font-semibold ${getEventTypeColor(currentEvent.type)}`}>
                {currentEvent.type}
              </span>
            </div>

            {/* Featured Badge */}
            {currentEvent.featured && (
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 rounded-full text-white text-sm font-semibold bg-yellow-500">
                  ⭐ Featured
                </span>
              </div>
            )}

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Event Image */}
              <div className="relative">
                <img
                  src={currentEvent.image}
                  alt={currentEvent.title}
                  className="w-full h-auto max-h object-contain rounded-2xl shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
              </div>

              {/* Event Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                    {currentEvent.title}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {currentEvent.description}
                  </p>
                </div>

                {/* Event Info */}
                <div className="space-y-4">
                  {currentEvent.date && (
                    <div className="flex items-center space-x-3">
                      <FaCalendarAlt className="text-yellow-500 text-xl" />
                      <span className="text-white font-semibold">
                        {isIsoDateString(currentEvent.date) ? formatDate(currentEvent.date) : currentEvent.date}
                      </span>
                    </div>
                  )}

                  {currentEvent.time && (
                    <div className="flex items-center space-x-3">
                      <FaClock className="text-blue-400 text-xl" />
                      <span className="text-white font-semibold">{currentEvent.time}</span>
                    </div>
                  )}

                  {currentEvent.location && (
                    <div className="flex items-center space-x-3">
                      <FaMapMarkerAlt className="text-red-400 text-xl" />
                      <span className="text-white font-semibold">{currentEvent.location}</span>
                    </div>
                  )}

                  {typeof currentEvent.currentParticipants === 'number' && typeof currentEvent.maxParticipants === 'number' && (
                    <div className="flex items-center space-x-3">
                      <FaUsers className="text-green-400 text-xl" />
                      <span className="text-white font-semibold">
                        {currentEvent.currentParticipants}/{currentEvent.maxParticipants} participants
                      </span>
                    </div>
                  )}
                </div>

                {/* Progress Bar (render only when both participant numbers provided) */}
                {typeof currentEvent.currentParticipants === 'number' && typeof currentEvent.maxParticipants === 'number' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-300">
                      <span>Registration Progress</span>
                      <span>{Math.round((currentEvent.currentParticipants / currentEvent.maxParticipants) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(currentEvent.currentParticipants / currentEvent.maxParticipants) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Registration / Submission buttons: render individually if present */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  {currentEvent.registrationLink && currentEvent.registrationLink !== '#' && (
                    <a
                      href={currentEvent.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3">
                        <span>Register Now</span>
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </a>
                  )}

                  {currentEvent.submissionLink && currentEvent.submissionLink !== '#' && (
                    <a
                      href={currentEvent.submissionLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2">
                        <span>Submit Entry</span>
                      </button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevEvent}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300 hover:scale-110"
          >
            <FaChevronLeft className="text-xl" />
          </button>
          <button
            onClick={nextEvent}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300 hover:scale-110"
          >
            <FaChevronRight className="text-xl" />
          </button>
          
        </div>
        

        {/* Event Indicators */}
        <div className="flex justify-center space-x-3 mb-8">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentEventIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentEventIndex 
                  ? 'bg-yellow-500 scale-125' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

{/*         
  All Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div
              key={event.id}
              onClick={() => setCurrentEventIndex(index)}
              className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-white/10 ${
                index === currentEventIndex ? 'ring-2 ring-yellow-500' : ''
              }`}
            >
              <div className="relative mb-4">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-80 object-contain rounded-xl"
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${getEventTypeColor(event.type)}`}>
                    {event.type}
                  </span>
                </div>
              </div>
              <h4 className="text-white font-bold text-lg mb-2">{event.title}</h4>
              <div className="space-y-2 text-sm text-gray-300">
                {event.date && (
                  <div className="flex items-center space-x-2">
                    <FaCalendarAlt className="text-yellow-500" />
                    <span>{isIsoDateString(event.date) ? formatDate(event.date) : event.date}</span>
                  </div>
                )}
                {event.location && (
                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-red-400" />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>  
        
      </div>
    </div>
  );
};

export default UpcomingEvents;
