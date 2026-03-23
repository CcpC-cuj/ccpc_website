// import React, { useState } from "react";
// import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaChevronLeft, FaChevronRight, FaUsers, FaArrowRight} from "react-icons/fa";
// import img_new_reg from "../assets/upcoming events/new_reg.jpeg";
// import img_cloud_native from "../assets/upcoming events/cloud_native.jpeg";
// const UpcomingEvents = () => {
//   const [currentEventIndex, setCurrentEventIndex] = useState(0);

//   const events = [
    
//     {
//       id: 1,
//         title: "CcpC New Member Recruitment",
//         description: "Ready to level up your coding journey? Join Code Crafters Programming Club (CcpC) and gain hands-on experience, real-world projects, mentorship, and a community that grows together. Code. Create. Collaborate.",
//         date: "27th Jan 2026 to 15th Feb 2026",
//         location: "Central University Of Jharkhand",
//         type: "",
//         image: img_new_reg,
//         registrationLink: "https://ccpc-cuj.web.app/registration",
//         featured: false
//     },
//     {
//       id: 2,
//         title: "Cloud Native Computing Workshop-Register for the Quiz",
//         description: "CcpC, in collaboration with CNCG Ranchi, is organizing a Cloud Native Computing Workshop covering Kubernetes basics and GitOps for modern cloud projects. The session will be hands-on and beginner-friendly, offering students practical exposure to industry-relevant cloud technologies.",
//         date: "14th Feb 2026",
//         time: "11:00 AM to 04:00 PM",
//         location: "Room No. 327, Science Building, Central University Of Jharkhand, Ranchi",
//         type: "Workshop",
//         image: img_cloud_native,
//         registrationLink: "https://app.sli.do/event/1TvhifcpTD7fr1zVDbMySa",
//         featured: false
//     },
//     /*
//     {
//       id: 1,
//       title: "CyberSec Meme-athon",
//       description: "In this event, you’ll create memes that spread awareness about the risks and mishappenings in the cyber world — from phishing and weak passwords to online scams",
//       date: "16 Oct 2025",
//       time: "10:00 AM",
//       location: "CSE Lab (room no. 323), Science Building",
//       type: "Competition",
//       image: meme,
//       registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSfsT_RILNvit1lNuuuL-HiITAAm5zoqBiQ_-BCSFCvrohd-Sw/viewform?usp=header",
//       submissionLink: "https://docs.google.com/forms/d/e/1FAIpQLSfsT_RILNvit1lNuuuL-HiITAAm5zoqBiQ_-BCSFCvrohd-Sw/viewform?usp=header",
//       featured: true
//     },
//     {
//       id: 4,
//       title: "Coding Contest",
//       description: "Test your problem-solving skills in our monthly coding contest. Participate in algorithmic challenges and climb the leaderboard!",
//       date: "2025-01-30",
//       time: "10:00 AM",
//       location: "Online",
//       maxParticipants: 150,
//       currentParticipants: 89,
//       type: "Contest",
//       image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
//       registrationLink: "#",
//       featured: false
//     }*/
//   ];

 
//   const nextEvent = () => {
//     setCurrentEventIndex((prev) => (prev + 1) % events.length);
//   };

//   const prevEvent = () => {
//     setCurrentEventIndex((prev) => (prev - 1 + events.length) % events.length);
//   };

 

//   const currentEvent = events[currentEventIndex];

//   const getEventTypeColor = (type) => {
//     switch (type) {
//       case "Competition": return "bg-red-500";
//       case "Workshop": return "bg-blue-500";
//       case "Live Event": return "bg-green-500";
//       case "Contest": return "bg-purple-500";
//       case "Seminar": return "bg-yellow-500";
//       default: return "";
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       month: 'short', 
//       day: 'numeric', 
//       year: 'numeric' 
//     });
//   };

//   // treat plain ISO yyyy-mm-dd strings as dates to format; otherwise display raw string
//   const isIsoDateString = (s) => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s);

//   return (
//     <div className="py-16 px-4 lg:px-16">
//       <div className="max-w-7xl mx-auto">
//         {/* Section Header */}
//         <div className="text-center mb-12">
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
//             Events on<span className="text-yellow-500"> Calendar</span>
//           </h2>
//           <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
//             Join our exciting lineup of coding events, workshops, and competitions designed to enhance your programming journey.
//           </p>
//         </div>

//         {/* Main Event Card */}
//         <div className="relative mb-8">
//           <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl overflow-hidden">
//             {/* Event Type Badge */}
//             <div className="absolute top-6 right-6">
//               <span className={`px-4 py-2 rounded-full text-white text-sm font-semibold ${getEventTypeColor(currentEvent.type)}`}>
//                 {currentEvent.type}
//               </span>
//             </div>

//             {/* Featured Badge */}
//             {currentEvent.featured && (
//               <div className="absolute top-6 left-6">
//                 <span className="px-4 py-2 rounded-full text-white text-sm font-semibold bg-yellow-500">
//                   ⭐ Featured
//                 </span>
//               </div>
//             )}

//             <div className="grid lg:grid-cols-2 gap-8 items-center">
//               {/* Event Image */}
//               <div className="relative">
//                 <img
//                   src={currentEvent.image}
//                   alt={currentEvent.title}
//                   className="w-full h-auto max-h object-contain rounded-2xl shadow-xl"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
//               </div>

//               {/* Event Details */}
//               <div className="space-y-6">
//                 <div>
//                   <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
//                     {currentEvent.title}
//                   </h3>
//                   <p className="text-gray-300 text-lg leading-relaxed">
//                     {currentEvent.description}
//                   </p>
//                 </div>

//                 {/* Event Info */}
//                 <div className="space-y-4">
//                   {currentEvent.date && (
//                     <div className="flex items-center space-x-3">
//                       <FaCalendarAlt className="text-yellow-500 text-xl" />
//                       <span className="text-white font-semibold">
//                         {isIsoDateString(currentEvent.date) ? formatDate(currentEvent.date) : currentEvent.date}
//                       </span>
//                     </div>
//                   )}

//                   {currentEvent.time && (
//                     <div className="flex items-center space-x-3">
//                       <FaClock className="text-blue-400 text-xl" />
//                       <span className="text-white font-semibold">{currentEvent.time}</span>
//                     </div>
//                   )}

//                   {currentEvent.location && (
//                     <div className="flex items-center space-x-3">
//                       <FaMapMarkerAlt className="text-red-400 text-xl" />
//                       <span className="text-white font-semibold">{currentEvent.location}</span>
//                     </div>
//                   )}

//                   {typeof currentEvent.currentParticipants === 'number' && typeof currentEvent.maxParticipants === 'number' && (
//                     <div className="flex items-center space-x-3">
//                       <FaUsers className="text-green-400 text-xl" />
//                       <span className="text-white font-semibold">
//                         {currentEvent.currentParticipants}/{currentEvent.maxParticipants} participants
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Progress Bar (render only when both participant numbers provided) */}
//                 {typeof currentEvent.currentParticipants === 'number' && typeof currentEvent.maxParticipants === 'number' && (
//                   <div className="space-y-2">
//                     <div className="flex justify-between text-sm text-gray-300">
//                       <span>Registration Progress</span>
//                       <span>{Math.round((currentEvent.currentParticipants / currentEvent.maxParticipants) * 100)}%</span>
//                     </div>
//                     <div className="w-full bg-gray-700 rounded-full h-3">
//                       <div 
//                         className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
//                         style={{ width: `${(currentEvent.currentParticipants / currentEvent.maxParticipants) * 100}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Registration / Submission buttons: render individually if present */}
//                 <div className="pt-4 flex flex-wrap items-center gap-4">
//                   {currentEvent.registrationLink && currentEvent.registrationLink !== '#' && (
//                     <a
//                       href={currentEvent.registrationLink}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="inline-block"
//                     >
//                       <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3">
//                         <span>Register Now</span>
//                         <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
//                       </button>
//                     </a>
//                   )}

//                   {currentEvent.submissionLink && currentEvent.submissionLink !== '#' && (
//                     <a
//                       href={currentEvent.submissionLink}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="inline-block"
//                     >
//                       <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2">
//                         <span>Submit Entry</span>
//                       </button>
//                     </a>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Navigation Arrows */}
//           <button
//             onClick={prevEvent}
//             className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300 hover:scale-110"
//           >
//             <FaChevronLeft className="text-xl" />
//           </button>
//           <button
//             onClick={nextEvent}
//             className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300 hover:scale-110"
//           >
//             <FaChevronRight className="text-xl" />
//           </button>
          
//         </div>
        

//         {/* Event Indicators */}
//         <div className="flex justify-center space-x-3 mb-8">
//           {events.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentEventIndex(index)}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                 index === currentEventIndex 
//                   ? 'bg-yellow-500 scale-125' 
//                   : 'bg-white/30 hover:bg-white/50'
//               }`}
//             />
//           ))}
//         </div>

// {/*         
//   All Events Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {events.map((event, index) => (
//             <div
//               key={event.id}
//               onClick={() => setCurrentEventIndex(index)}
//               className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-white/10 ${
//                 index === currentEventIndex ? 'ring-2 ring-yellow-500' : ''
//               }`}
//             >
//               <div className="relative mb-4">
//                 <img
//                   src={event.image}
//                   alt={event.title}
//                   className="w-full h-80 object-contain rounded-xl"
//                 />
//                 <div className="absolute top-2 right-2">
//                   <span className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${getEventTypeColor(event.type)}`}>
//                     {event.type}
//                   </span>
//                 </div>
//               </div>
//               <h4 className="text-white font-bold text-lg mb-2">{event.title}</h4>
//               <div className="space-y-2 text-sm text-gray-300">
//                 {event.date && (
//                   <div className="flex items-center space-x-2">
//                     <FaCalendarAlt className="text-yellow-500" />
//                     <span>{isIsoDateString(event.date) ? formatDate(event.date) : event.date}</span>
//                   </div>
//                 )}
//                 {event.location && (
//                   <div className="flex items-center space-x-2">
//                     <FaMapMarkerAlt className="text-red-400" />
//                     <span>{event.location}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>  
        
//       </div>
//     </div>
//   );
// };

// export default UpcomingEvents;










import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import image from "../../assets/image.png";
import devsprint from "../assets/upcoming events/Devsprint.png";

export default function UpcomingEvents() {

  const events = {
     
    // "2026-03-24":[
    //   {
    //     title: "Tech Talk - Emerging Technologies",
    //     theme: "Technology & Innovation",
    //     objective:
    //       "An engaging tech talk aimed at exploring emerging technologies, sharing industry insights, and inspiring students to build impactful solutions. The session will include discussions, real-world examples, and interactive Q&A.",
    //     date: "2026-03-24",
    //     time: "03:00 PM - 05:00 PM",
    //     last_date_reg: null,
    //     submission_deadline: null,
    //     place: "Science Building, Room No. 327",
    //     registration: null,
    //     image: devsprint
    //   }
    // ],
     "2026-03-27": [
      {
        title: "Dev Sprint – Online Web Development Hackathon",
        theme: "Web Development",
        objective:
          "A 24-hour online hackathon focused on building innovative web applications. Participants will collaborate, design, and develop creative solutions using modern web technologies.",
        date: "2026-03-27",
        time: "2026-03-27 08:00 PM - 2026-03-28 08:00 PM",
        last_date_reg: "2026-03-27 10:00 PM",
        submission_deadline: "2026-03-27 02:00 PM",
        place: "Online",
        registration: "https://dev-sprint.pages.dev/",
        image: devsprint
      }
    ],
    
  };

  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const formatDate = (day) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`;

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  // const nextEvent = Object.values(events).flat()[0];
  const [showAllEvents, setShowAllEvents] = useState(false);

  const todayDate = new Date().toISOString().split("T")[0];

  const allEvents = Object.entries(events)
    .flatMap(([date, evts]) =>
      evts.map((e) => ({ ...e, date }))
    );

  const upcomingEvents = allEvents
    .filter((e) => new Date(e.date) >= new Date(todayDate))
    .sort((a, b) => new Date(a.date) - new Date(b.date));


    const displayedEvents = showAllEvents
  ? upcomingEvents
  : upcomingEvents.slice(0, 3);

  const nextEvent = upcomingEvents[0];
  
const handleNextEventClick = () => {
  if (!nextEvent) return;
  setSelectedDate(nextEvent.date);
};


  return (
    <section className="w-full px-4 lg:px-16 text-white py-12">

      <div className=" mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-yellow-500">
            Upcoming Events
          </h2>
          <p className="text-slate-400 mt-2">
            Workshops, hackathons and competitions organized by our club.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* MINI CALENDAR */}
          <div className="bg-blue-500/20 border backdrop-blur-sm border-slate-800 rounded-2xl p-6">

            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() =>
                  setCurrentDate(new Date(year, month - 1, 1))
                }
              >
                ◀
              </button>

              <h3 className="font-semibold">
                {currentDate.toLocaleString("default", {
                  month: "long"
                })}{" "}
                {year}
              </h3>

              <button
                onClick={() =>
                  setCurrentDate(new Date(year, month + 1, 1))
                }
              >
                ▶
              </button>
            </div>

            <div className="grid grid-cols-7 text-xs text-center gap-2">

              {["S","M","T","W","T","F","S"].map(d=>(
                <div key={d} className="text-slate-200">{d}</div>
              ))}

              {days.map((day, index) => {

                const dateKey = day ? formatDate(day) : null;
                const hasEvent = dateKey && events[dateKey];

                return (
                  <div
                    key={index}
                    onClick={() => day && setSelectedDate(dateKey)}
                    className={`h-10 rounded-md flex items-center justify-center cursor-pointer
                    ${!day && "bg-transparent"}
                    ${day && !hasEvent && "bg-slate-800"}
                    ${hasEvent && "bg-yellow-500 hover:scale-105"}
                    `}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>


          {/* NEXT EVENT CARD */}
          <div className="bg-blue-500/20 border backdrop-blur-sm border-slate-800 rounded-2xl p-8 flex flex-col justify-between">

            <div>
              <span className="text-yellow-500 text-sm">
                Next Event
              </span>

              <h3
                onClick={handleNextEventClick}
                className={`text-2xl font-bold mt-2 transition
                  ${nextEvent ? "cursor-pointer hover:text-yellow-400" : "text-slate-500"}
                `}
              >
                {nextEvent?.title || "No upcoming events"}
              </h3>

              <p className="text-slate-400 mt-2">
                {nextEvent?.objective}
              </p>

              {nextEvent?.last_date_reg && (
                <p className="text-slate-300">
                  <span className="text-yellow-500 font-semibold">
                    Last Date of Registration:
                  </span>{" "}
                  {nextEvent?.last_date_reg}
                </p>
              )}

              {nextEvent?.date && (
                  <p className="text-slate-300">
                  <span className="text-yellow-500 font-semibold">
                    Date:
                  </span>{" "}
                  {nextEvent?.date}
                </p>
              )}


              {nextEvent?.time && (
              <p className="text-slate-300">
                <span className="text-yellow-500 font-semibold">
                  Time:
                </span>{" "}
                {nextEvent.time}
              </p>
            )}

            {nextEvent?.place && (
              <p className="text-slate-300">
                <span className="text-yellow-500 font-semibold">
                  Venue:
                </span>{" "}
                {nextEvent?.place}
              </p>
            )}


            </div>

            {nextEvent?.registration && (
              <a
                href={nextEvent?.registration}
                className="mt-3 px-6 py-3 bg-yellow-500 rounded-lg w-fit hover:bg-yellow-400"
              >
                Register
              </a>)}

          </div>


          {/* EVENT LIST */}
          <div className="bg-blue-500/20 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">

            <h3 className="font-semibold mb-4">
              Upcoming
            </h3>

            <div className="space-y-4">

              {
              // Object.values(events).flat().map((event, i)=>(
                displayedEvents.map((event, i) => (
                <div
                  key={i}
                   onClick={() => setSelectedDate(event.date)}
                  className="flex justify-between border-b border-slate-800 pb-3 cursor-pointer hover:bg-slate-800/40 p-2 rounded-lg transition"
                >
                  <div>
                   
                    <p className="font-medium">
                      {event.title}
                    </p>
                    <p className="text-sm text-slate-400">
                      {event.theme}
                    </p>
                  </div>

                  <span className="text-sm text-yellow-500 w-32 text-right">
                    {event.date}
                  </span>
                </div>
              ))}

               {upcomingEvents.length > 3 && (
                <button
                  onClick={() => setShowAllEvents(!showAllEvents)}
                  className="mt-4 text-yellow-500 hover:text-yellow-400 text-sm font-medium"
                >
                  {showAllEvents ? "Show less ▲" : "See more ▼"}
                </button>
              )}

            </div>

          </div>

        </div>

      </div>

      <AnimatePresence>
        {selectedDate && events[selectedDate] && (
          <EventModal
            events={events[selectedDate]}
            onClose={() => setSelectedDate(null)}
          />
        )}
      </AnimatePresence>

    </section>
  );
}


function EventModal({ events, onClose }) {

  const [index, setIndex] = useState(0);
  const event = events[index];

  const next = () =>
    setIndex((prev) => (prev + 1) % events.length);

  const prev = () =>
    setIndex((prev) =>
      prev === 0 ? events.length - 1 : prev - 1
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex justify-center items-start md:items-center p-4 overflow-y-auto"
    >

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="
        relative
        w-full
        max-w-6xl
        bg-slate-900
        rounded-2xl
        grid
        md:grid-cols-2
        shadow-2xl
        max-h-[90vh]
        overflow-y-auto
        "
      >

        {/* POSTER */}
        <div className="bg-black flex items-center justify-center p-4">

          <img
            src={event.image}
            alt={event.title}
            className="
            max-h-[50vh] md:max-h-[80vh]
            object-contain
            rounded-lg
            shadow-lg
            "
          />

        </div>


        {/* EVENT DETAILS */}
        <div className="p-6 sm:p-8 flex flex-col justify-between bg-slate-900">

          <div>

            <h3 className="text-3xl font-bold mb-4">
              {event.title}
            </h3>

            <p className="text-slate-300 mb-4">
              {event.objective}
            </p>

            <p className="mb-2">
              <span className="text-yellow-500 font-semibold">
                Theme:
              </span>{" "}
              {event.theme}
            </p>

            {event.last_date_reg && (
              <p className="mb-2">
                  <span className="text-yellow-500 font-semibold">
                    Last Date of Registration:
                  </span>{" "}
                  {event?.last_date_reg}
              </p>
            )}

            <p className="mb-2">
              <span className="text-yellow-500 font-semibold">
                Date:
              </span>{" "}
              {event.date}
            </p>

            {event.time && (
              <p className="mb-2">
                <span className="text-yellow-500 font-semibold">
                  Time:
                </span>{" "}
                {event.time}
              </p>
            )}

            {event.place && (
              <p className="mb-2">
                <span className="text-yellow-500 font-semibold">
                  Venue:
                </span>{" "}
                {event.place}
              </p>
            )}

          </div>


          {/* BUTTON */}
          {event.registration && (
            <a
              href={event.registration}
              className="
              mt-6
              px-6
              py-3
              bg-yellow-500
              rounded-xl
              hover:bg-yellow-400
              transition
              w-fit
              "
            >
              Register Now
            </a>
          )}

        </div>


        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="
          absolute
          top-4
          right-4
          bg-white/20
          hover:bg-white/40
          p-2
          rounded-full
          "
        >
          ✕
        </button>


        {/* SLIDER CONTROLS */}
        {events.length > 1 && (
          <>
            <button
              onClick={prev}
              className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              bg-white/20
              hover:bg-white/40
              p-3
              rounded-full
              "
            >
              ◀
            </button>

            <button
              onClick={next}
              className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              bg-white/20
              hover:bg-white/40
              p-3
              rounded-full
              "
            >
              ▶
            </button>
          </>
        )}

      </motion.div>

    </motion.div>
  );
}