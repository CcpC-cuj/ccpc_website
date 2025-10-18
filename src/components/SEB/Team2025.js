import React, { useState } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import Sandeep from "../assets/Sandeep.png";
import Om from "../assets/Om.png";
import Apurba from "../assets/Apurba.png";
import AdityaSC from "../assets/AdityaSC.png";
import Priyanshu from "../assets/Priyanshu.png";
import Abhimaan from "../assets/Abhimaan.png";
import Krish from "../assets/Krish.png";
import Prashant from "../assets/Prashant.png";
import Basil from "../assets/Basil.png";
import Saket from "../assets/Saket.png";
import Siya from "../assets/Siya.png";
import PrashantPrashun from "../assets/prashantsir.jpg";
import hod_img from "../assets/hod_img.jpg";
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

const studentDetails = {
  Abhimaan: {
    name: "Abhimaan Kumar",
    role: "President",
    linkedin: "https://www.linkedin.com/in/abhimaan-kumar-287262247/",
    github: "https://github.com/Abhimaan-kumar",
    link: "https://ccpc-cuj.web.app/profile/WjaIg6rrBtPFHjttuTFanKmubZP2",
    img: Abhimaan,
    bio: "Leading with vision and passion.",
    quote: "I believe in empowering every coder to reach their potential."
  },
  Krish: {
    name: "Krish Kumar",
    role: "Vice-President",
    linkedin: "https://www.linkedin.com/in/imkkrish/",
    github: "https://github.com/Imkkrish",
    link: "https://ccpc-cuj.web.app/profile/FE9FO4dLssN22QBPz8liIIgj04C2",
    img: Krish,
    bio: "Always ready to innovate and collaborate.",
    quote: "Teamwork and curiosity drive our success."
  },
  Priyanshu: {
    name: "Priyanshu Verma",
    role: "Vice-President",
    linkedin: "https://www.linkedin.com/in/priyanshuverma17/",
    github: "https://github.com/PriyanshuV17",
    link: "https://ccpc-cuj.web.app/profile/VyRgQ4vRlrQRnPm540bEsdjYzR92",
    img: Priyanshu,
    bio: "Passionate about coding and community.",
    quote: "Let's build something amazing together!"
  },
  AdityaSC: {
    name: "Aditya Singh Chandel",
    role: "Secretary",
    linkedin: "https://www.linkedin.com/in/adityasc2004/",
    github: "https://github.com/adityasc2004",
    link: "https://ccpc-cuj.web.app/profile/iBdQw1IaMHY2urKixNsee8R7y4D3",
    img: AdityaSC,
    bio: "Organizing with precision and heart.",
    quote: "Every detail matters in a great team."
  },
  Apurba: {
    name: "Apurba Das",
    role: "Joint Secretary",
    linkedin: "https://www.linkedin.com/in/apurbasbjk30/",
    github: "https://github.com/apurbasbjk30",
    link: "https://ccpc-cuj.web.app/profile/3UZdnFrZSJZByPREjytOetCtb9S2",
    img: Apurba,
    bio: "Driven by curiosity and learning.",
    quote: "Growth comes from sharing knowledge."
  },
  Prashant: {
    name: "Prashant Dubey",
    role: "Joint Secretary",
    linkedin: "https://www.linkedin.com/in/prashantdubey2107/",
    github: "https://github.com/prashantdubeypng",
    link: "https://ccpc-cuj.web.app/profile/rOJOSJnLGYfNd5Tyi1wiZTFCk2z1",
    img: Prashant,
    bio: "Committed to excellence and support.",
    quote: "Together, we achieve more."
  },
  Basil: {
    name: "Basil Joy",
    role: "Executive",
    linkedin: "https://www.linkedin.com/in/basil-joy-6b07511a7/",
    github: "https://github.com/basiljoy91",
    link: "https://ccpc-cuj.web.app/profile/ZnStO6ic3fM6MQLiI5iUBZnyyC63",
    img: Basil,
    bio: "Eager to help and grow.",
    quote: "Every challenge is a new opportunity."
  },
  Om: {
    name: "Om Vishesh",
    role: "Executive",
    linkedin: "https://www.linkedin.com/in/omvishesh/",
    github: "https://github.com/Omvishesh",
    link: "https://ccpc-cuj.web.app/profile/g9xJ9JMy56XXJh4W1FKLXaTVdD52",
    img: Om,
    bio: "Focused on results and learning.",
    quote: "Persistence is the key to mastery."
  },
  Siya: {
    name: "Siya Mandal",
    role: "Executive",
    linkedin: "https://www.linkedin.com/in/siya-mandal-29ad10/",
    github: "https://github.com/siya2910",
    link: "https://ccpc-cuj.web.app/profile/gNC7e2F5AxNa9onJDzpBmBrgYBp1",
    img: Siya,
    bio: "Creative and enthusiastic.",
    quote: "Imagination fuels innovation."
  },
  Sandeep: {
    name: "Sandeep Mahato",
    role: "Treasurer",
    linkedin: "https://www.linkedin.com/in/sandeep-mahato-a31b4a256/",
    github: "https://github.com/sandeepmahato1",
    link: "https://ccpc-cuj.web.app/profile/2I3nncT3UERhG4ZMJxJwNEpoZ5y1",
    img: Sandeep,
    bio: "Managing resources with care.",
    quote: "Trust and transparency are our foundation."
  },
  Saket: {
    name: "Saket Tripathi",
    role: "Treasurer",
    linkedin: "https://www.linkedin.com/in/saket-tripathi-178819286/",
    github: "https://github.com/Tripathijii147",
    link: "https://ccpc-cuj.web.app/profile/tl7kpo2ijLP4JC7RlZAmKYyPdWA2",
    img: Saket,
    bio: "Detail-oriented and reliable.",
    quote: "Success is built on consistency."
  }
};

const Team = () => {
  const [modalMember, setModalMember] = useState(null);
  return (
    <div className="relative flex flex-col items-center p-4">
    {/* Student Body Title */}
      <h2 className="text-white text-3xl font-semibold mb-6">Student Body</h2>

      {/* Student Council Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.keys(studentDetails).map((memberName) => {
          const member = studentDetails[memberName];
          return (
            <div key={memberName} className="flex flex-col items-center">
              <div
                className="cursor-pointer group"
                onClick={() => setModalMember(member)}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-32 h-32 rounded-full bg-white border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <h2 className="text-white text-lg font-semibold mt-2 cursor-pointer text-center" onClick={() => setModalMember(member)}>
                {member.name}
              </h2>
              <p className="text-gray-400 font-semibold">{member.role}</p>
              <div className="flex mt-2 space-x-4">
                {member.linkedin && (
                  <span
                    onClick={() => setModalMember(member)}
                    className="text-blue-500 hover:text-blue-400 cursor-pointer"
                  >
                    <FaLinkedin size={24} />
                  </span>
                )}
                {member.github && (
                  <span
                    onClick={() => setModalMember(member)}
                    className="text-gray-500 hover:text-gray-400 cursor-pointer"
                  >
                    <FaGithub size={24} />
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Modal */}
      {modalMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="bg-white bg-opacity-80 rounded-2xl shadow-2xl p-8 max-w-md w-full relative" style={{backdropFilter: 'blur(12px)'}}>
            <button
              className="absolute top-2 right-4 text-2xl text-gray-700 hover:text-red-500"
              onClick={() => setModalMember(null)}
            >
              &times;
            </button>
            <div className="flex flex-col items-center">
              <img
                src={modalMember.img}
                alt={modalMember.name}
                className="w-28 h-28 rounded-full border-4 border-white shadow-lg mb-4"
              />
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{modalMember.name}</h2>
              <p className="text-blue-600 font-semibold mb-2">{modalMember.role}</p>
              {modalMember.designation && (
                <p className="text-purple-600 font-medium mb-2">{modalMember.designation}</p>
              )}
              <p className="text-gray-700 text-center mb-2">{modalMember.bio}</p>
              <p className="italic text-gray-500 text-center mb-4">"{modalMember.quote}"</p>
              <div className="flex space-x-4 mb-4">
                {modalMember.linkedin && (
                  <a
                    href={modalMember.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaLinkedin size={28} />
                  </a>
                )}
                {modalMember.github && (
                  <a
                    href={modalMember.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-black"
                  >
                    <FaGithub size={28} />
                  </a>
                )}
              </div>
              <a
                href={modalMember.link}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                View Full Profile
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
