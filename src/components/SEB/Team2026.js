import React, { useState } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import Hemant from "../assets/SEB Profile Photo/SEB2026/Hemant.png";
import Sanskar from "../assets/SEB Profile Photo/SEB2026/Sanskar.jpg";
import Apurba from "../assets/SEB Profile Photo/SEB2025/Apurba.png";
import Diwakar from "../assets/SEB Profile Photo/SEB2026/Diwakar.png";
import Krish from "../assets/SEB Profile Photo/SEB2025/Krish.png";
import Raj from "../assets/SEB Profile Photo/SEB2026/Raj.png";
import Basil from "../assets/SEB Profile Photo/SEB2025/Basil.png";
import Samridhi from "../assets/SEB Profile Photo/SEB2026/Samridhi.png";
import Abhishek from "../assets/SEB Profile Photo/SEB2026/Abhishek.png";
import Abhiraj from "../assets/SEB Profile Photo/SEB2026/Abhiraj.png";
import Priyanshi from "../assets/SEB Profile Photo/SEB2026/Priyanshi.png";
import Kundan from "../assets/SEB Profile Photo/SEB2026/Kundan.png";
import Ujit from "../assets/SEB Profile Photo/SEB2026/Ujith.png";
import Priyanshu from "../assets/SEB Profile Photo/SEB2025/Priyanshu.png"
const studentDetails = {
  Krish: {
    name: "Krish Kumar",
    role: "President",
    linkedin: "https://www.linkedin.com/in/imkkrish/",
    github: "https://github.com/Imkkrish",
    link: "https://ccpc-cuj.web.app/profile/FE9FO4dLssN22QBPz8liIIgj04C2",
    img: Krish,
    bio: "Always ready to innovate and collaborate.",
    quote: "Teamwork and curiosity drive our success."
  },
  Basil: {
    name: "Basil Joy",
    role: "Vice-President",
    linkedin: "https://www.linkedin.com/in/basil-joy-6b07511a7/",
    github: "https://github.com/basiljoy91",
    link: "https://ccpc-cuj.web.app/profile/ZnStO6ic3fM6MQLiI5iUBZnyyC63",
    img: Basil,
    bio: "Eager to help and grow.",
    quote: "Every challenge is a new opportunity."
  },
  Apurba: {
    name: "Apurba Das",
    role: "Vice-President",
    linkedin: "https://www.linkedin.com/in/apurbasbjk30/",
    github: "https://github.com/apurbasbjk30",
    link: "https://ccpc-cuj.web.app/profile/3UZdnFrZSJZByPREjytOetCtb9S2",
    img: Apurba,
    bio: "Driven by curiosity and learning.",
    quote: "Growth comes from sharing knowledge."
  },
  Diwakar: {
    name: "Diwakar Singh",
    role: "Secretary",
    linkedin: "https://www.linkedin.com/in/diwakar-singh16/",
    github: "https://github.com/DiwakarSingh16",
    link: "https://ccpc-cuj.web.app/profile/Znx0hbCu8tcrtVvd5Ut3afkprdC3",
    img: Diwakar,
    bio: "Building smart systems and stronger tech communities.",
    quote: "Consistency builds excellence."
  },
  Raj: {
   name: "Raj Vardhan Jha",
   role: "Joint Secretary",
   linkedin: "https://www.linkedin.com/in/raj-vardhan-jha-4b2235329?utm_source=share_via&utm_content=profile&utm_medium=member_android",
   github: "https://github.com/raj-vardhanjha",
   link: "https://ccpc-cuj.web.app/profile/wsm6pmqWGVXe8KB05p2RKj4WzcD2",
   img: Raj,
   bio: "Code; Debug; Repeat;",
   quote: "Stop thinking about doing it and do it!"
 },
  Sanskar: {
    name: "Sanskar",
    role: "Joint Secretary",
    linkedin: "https://www.linkedin.com/in/sanskarsahay/",
    github: "https://github.com/sanskarsahay4/",
    link: "https://ccpc-cuj.web.app/profile/T7znNjW9N3ZUDO7UFyUF0gWC2nz1",
    img: Sanskar,
    bio: "Focused on learning, building, and evolving every single day.",
    quote: "Responsibility creates character."
  },
  Hemant: {
    name: "Hemant Prakash",
    role: "Treasurer",
    linkedin: "https://www.linkedin.com/in/hemant-prakash-74381929b/",
    github: "https://github.com/hemantprakash2005",
    link: "https://ccpc-cuj.web.app/profile/MhwocZMiclcWoutneIDVVDbFw193",
    img: Hemant,
    bio: "Learning by Doing",
    quote: "..."
  },
  Priyanshu: {
    name: "Priyanshu Verma",
    role: "Treasurer",
    linkedin: "https://www.linkedin.com/in/priyanshuverma17/",
    github: "https://github.com/PriyanshuV17",
    link: "https://ccpc-cuj.web.app/profile/VyRgQ4vRlrQRnPm540bEsdjYzR92",
    img: Priyanshu,
    bio: "Passionate about coding and community.",
    quote: "Let's build something amazing together!"
  },
  Abhishek: {
    name: "Abhishek",
    role: "Technical Executive",
    linkedin: "https://www.linkedin.com/in/abhishek-aiml",
    github: "https://github.com/MeAbhishek09",
    link: "https://ccpc-cuj.web.app/profile/5pEiWGlT30RUlHcMFqP77xOO0T13",
    img: Abhishek,
    bio: "Eager to help and grow.",
    quote: "The best way to predict the future is to create it"
  },
  Abhiraj: {
    name: "Abhi Raj Gupta",
    role: "Technical Executive",
    linkedin: "https://www.linkedin.com/in/abhi-raj-gupta-bb6a65379/",
    github:"https://github.com/Abhi-raj-gupta",
    link: "https://ccpc-cuj.web.app/profile/wcYdLeaZwYXEsbRMqDTDSAqrUIX2",
    img: Abhiraj,
    bio: "Learning today, leading tomorrow.",
    quote: "I don’t wait for opportunities — I build them."
  },
  Priyanshi: {
   name: "Priyanshi Chaurasia",
   role: "Design Executive",
   linkedin: "https://www.linkedin.com/in/priyanshi-chaurasia-aa9ab4338?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
   github: "https://github.com/Priyanshi110207",
   link: "https://ccpc-cuj.web.app/profile/I87C3CSJswXWynQSC2Q8cGNPr8k2",
   img: Priyanshi,
   bio: "you could be the master of your fate, the captain of your soul but you have to realize that life is coming from you not at you?",
   quote: "Go for it! No time is better than now."
  },
  Kundan: {
    name : "Kundan Kumar",
    role: "Design Executive",
    linkedin: "https://www.linkedin.com/in/kundankumar015/",
    github: "https://github.com/Kundan311",
    link: "https://ccpc-cuj.web.app/profile/wfT41e7CD0OQ8C8n2sbTB3BX79H2",
    img: Kundan,
    bio: "Detail-oriented and reliable.",
    quote: "Alone we learn, together we lead"
  },
  Ujit: {
    name: "Ujit Raj Rathore",
    role: "PR Executive",
    linkedin: "https://www.linkedin.com/in/urrathore825/",
    github: "https://github.com/urrathore",
    link: "https://ccpc-cuj.web.app/profile/rGNgf8YGw1gLlRbrmGIZCrs8Msm2",
    img: Ujit,
    bio: "Turning stories into influence and reputation into advantage.",
    quote: "Make money so that you walk out of situation you don’t like."
  },
  Samridhi: {
    name: "Samridhi Tripathi",
    role: "PR executive",
    linkedin: "https://www.linkedin.com/in/samridhi-tripathi-823568373/",
    github: "https://github.com/Samridhi2006",
    link: "https://ccpc-cuj.web.app/profile/9lhmZgNefSPtO2aTwTWY7XH66MC3",
    img: Samridhi,
    bio: "Leading with vision and passion.",
    quote: "I believe in empowering every coder to reach their potential."
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
