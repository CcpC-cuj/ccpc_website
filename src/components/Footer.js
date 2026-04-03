import React from "react";
import { FaInstagram, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-black text-white">
      {/* Quick Links Section */}
      <div className="bg-black py-4">
        <div className="max-w-5xl mx-auto px-4 flex space-x-3">
        </div>
      </div>

      {/* Footer Section */}
      <footer className="py-6">
        <div className="max-w-5xl mx-auto px-4">
          {/* Links Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center">
            {/* Social Links */}
            <div className="flex space-x-6 mb-4 sm:mb-0">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/codecraftercuj/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition duration-200 text-xl"
              >
                <FaLinkedin />
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/ccpc_cuj/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition duration-200 text-xl"
              >
                <FaInstagram />
              </a>
              {/* GitHub */}
              <a
                href="https://github.com/CcpC-cuj"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition duration-200 text-xl"
              >
                <FaGithub />
              </a>
              {/* Email */}
              <a
                href="mailto:codecrafter.cuj@gmail.com"
                className="text-gray-400 hover:text-red-500 transition duration-200 text-xl"
              >
                <FaEnvelope />
              </a>
            </div>

            {/* Team Page Link */}
            {/* <div className="w-full flex justify-center mt-4">
              <a
                href="/team"
                className="text-blue-400 hover:underline text-base font-medium"
              >
                Meet the Student Body
              </a>
            </div> */}

             <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
                <a href="/team" 
                    className="hover:underline text-blue-400">
                  Meet the Student Body
                </a>

                <a
                  href="/policy"
                  className="hover:underline text-blue-400"
                >
                  Policy
                </a>
              </div>

            {/* Address Section */}
            <div className="text-center sm:text-right text-sm">
              <p>
                <a
                  href="https://cuj.ac.in/DCSE/CS&Edepartment.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-400"
                >
                  DCSE | CUJ
                </a>
              </p>
              <p>Academic Block 1</p>
              <p>Central University of Jharkhand,</p>
              <p>Ranchi, Jharkhand, India - 835222</p>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-700 my-6" />

          {/* Copyright Section */}
          <div className="text-center">
            <p className="text-sm" style={{ color: "rgb(95, 110, 171)" }}>
              © 2025 CcpC - Central University of Jharkhand
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
