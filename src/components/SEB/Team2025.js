import React from "react";
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
const studentDetails = {
    Abhimaan: {
        name: "Abhimaan Kumar",
        role: "President",
        linkedin: "https://www.linkedin.com/in/abhimaan-kumar-287262247/",
        github: "https://github.com/Abhimaan-kumar",
        link:"https://ccpc-cuj.web.app/profile/WjaIg6rrBtPFHjttuTFanKmubZP2",
        img: Abhimaan,
    },
    Krish: {
        name: "Krish Kumar",
        role: "Vice-President",
        linkedin: "https://www.linkedin.com/in/imkkrish/",
        github: "https://github.com/Imkkrish",
        link:"https://ccpc-cuj.web.app/profile/FE9FO4dLssN22QBPz8liIIgj04C2",
        img: Krish,
    },
    Priyanshu: {
        name: "Priyanshu Verma",
        role: "Vice-President",
        linkedin: "https://www.linkedin.com/in/priyanshuverma17/",
        github: "https://github.com/PriyanshuV17",
        link:"https://ccpc-cuj.web.app/profile/VyRgQ4vRlrQRnPm540bEsdjYzR92",
        img: Priyanshu,
      },
      AdityaSC: {
        name: "Aditya Singh Chandel",
        role: "Secretary",
        linkedin: "https://www.linkedin.com/in/adityasc2004/",
        github: "https://github.com/adityasc2004",
        link:"https://ccpc-cuj.web.app/profile/iBdQw1IaMHY2urKixNsee8R7y4D3",
        img: AdityaSC,
      },
      Apurba: {
        name: "Apurba Das",
        role: "Joint Secretary",
        linkedin: "https://www.linkedin.com/in/apurbasbjk30/",
        github: "https://github.com/apurbasbjk30",
        link:"https://ccpc-cuj.web.app/profile/3UZdnFrZSJZByPREjytOetCtb9S2",
        img: Apurba,
      },
      Prashant: {
        name: "Prashant Dubey",
        role: "Joint Secretary",
        linkedin: "https://www.linkedin.com/in/prashantdubey2107/",
        github: "https://github.com/prashantdubeypng",
        link:"https://ccpc-cuj.web.app/profile/rOJOSJnLGYfNd5Tyi1wiZTFCk2z1",
        img: Prashant,
      },
      Basil: {
        name: "Basil Joy",
        role: "Executive",
        linkedin: "https://www.linkedin.com/in/basil-joy-6b07511a7/",
        github: "https://github.com/basiljoy91",
        link:"https://ccpc-cuj.web.app/profile/ZnStO6ic3fM6MQLiI5iUBZnyyC63",
        img: Basil,
      },
      Om: {
        name: "Om Vishesh",
        role: "Executive",
        linkedin: "https://www.linkedin.com/in/omvishesh/",
        github: "https://github.com/Omvishesh",
        link:"https://ccpc-cuj.web.app/profile/g9xJ9JMy56XXJh4W1FKLXaTVdD52",
        img: Om,
      },
      Siya:{
        name: "Siya Mandal",
        role: "Executive",
        linkedin: "https://www.linkedin.com/in/siya-mandal-29ad10/",
        github: "https://github.com/siya2910",
        link:"https://ccpc-cuj.web.app/profile/gNC7e2F5AxNa9onJDzpBmBrgYBp1",
        img: Siya,
      },
      Sandeep: {
        name: "Sandeep Mahato",
        role: "Treasurer",
        linkedin: "https://www.linkedin.com/in/sandeep-mahato-a31b4a256/",
        github: "https://github.com/sandeepmahato1",
        link:"https://ccpc-cuj.web.app/profile/2I3nncT3UERhG4ZMJxJwNEpoZ5y1",
        img: Sandeep,
      },
      Saket:{
        name: "Saket Tripathi",
        role: "Treasurer",
        linkedin: "https://www.linkedin.com/in/saket-tripathi-178819286/",
        github: "https://github.com/Tripathijii147",
        link:"https://ccpc-cuj.web.app/profile/tl7kpo2ijLP4JC7RlZAmKYyPdWA2",
        img:Saket,
      }

};

const Team = () => {
  return (
    <div className="relative flex flex-col items-center p-4">
      <h1 className="text-white text-3xl mb-6">Student Body</h1>

      {/* Grid for all screen sizes */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Object.keys(studentDetails).map((memberName) => {
          const member = studentDetails[memberName];
          return (
            <div key={memberName} className="flex flex-col items-center">
                <a href={member.link} target="_blank" rel="noopener noreferrer">
                <img
                    src={member.img}
                    alt={member.name}
                    className="w-32 h-32 rounded-full bg-white border-4 border-white shadow-lg"
                    />
                </a>

              <h2 className="text-white text-lg font-semibold mt-2">{member.name}</h2>
              <p className="text-gray-400">{member.role}</p>
              <div className="flex mt-2 space-x-4">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-400"
                  >
                    <FaLinkedin size={24} />
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-400"
                  >
                    <FaGithub size={24} />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Team;
