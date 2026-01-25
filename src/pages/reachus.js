// ReachUs.jsx
import React from 'react';
import Starfield from '../components/Starfield';
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

const ReachUs = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Starfield />

      {/* Main container */}
      <div className="relative z-10 bg-/10 bg-opacity-5 backdrop-blur-sm rounded-xl shadow-2xl p-8 mx-4 md:flex md:w-3/4 border border-white border-opacity-20">
        {/* Left side: Social & Info */}
        <div className="md:w-1/2 p-4 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold mb-4 text-white">Reach Us</h2>
          <p className="mb-6 text-gray-300 text-lg">
            Whether you have a question, comment, or just want to say hi, our team is here to help!
          </p>
          <div className="space-y-4">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/codecraftercuj/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-white hover:text-blue-500 transition transform hover:scale-105"
            >
              <FaLinkedin className="text-2xl" />
              <span className="text-xl">LinkedIn</span>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/ccpc_cuj/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-white hover:text-pink-500 transition transform hover:scale-105"
            >
              <FaInstagram className="text-2xl" />
              <span className="text-xl">Instagram</span>
            </a>
            {/* GitHub */}
            <a
              href="https://github.com/CcpC-cuj"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-white hover:text-gray-300 transition transform hover:scale-105"
            >
              <FaGithub className="text-2xl" />
              <span className="text-xl">GitHub</span>
            </a>
          </div>
        </div>

        {/* Divider: Horizontal on mobile, vertical on md and up */}
        <div className="bg-white opacity-20 mx-4 my-4 h-px w-full md:h-auto md:w-px" />

        {/* Right side: Contact Form */}
        <div className="md:w-1/2 p-4 mt-8 md:mt-0">
          <form
            action="https://formsubmit.co/codecrafter.cuj@gmail.com"
            method="POST"
            className="space-y-5"
          >
            <div>
              <label htmlFor="user_name" className="block text-white font-semibold mb-1">
                Name
              </label>
              <input
                type="text"
                id="user_name"
                name="name"
                placeholder="Your full name"
                required
                className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label htmlFor="semester" className="block text-white font-semibold mb-1">
                Semester
              </label>
              <select
                id="semester"
                name="semester"
                required
                className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="" className="text-gray-700">
                  Select Semester
                </option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <option key={sem} value={sem} className="text-gray-900">
                    {sem}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="dept" className="block text-white font-semibold mb-1">
                Department
              </label>
              <input
                type="text"
                id="dept"
                name="dept"
                placeholder="Your department"
                required
                className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-white font-semibold mb-1">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Your phone number"
                required
                className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-white font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your email address"
                required
                className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-white font-semibold mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Type your message here..."
                required
                className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-md bg-pink-500 text-white font-bold hover:bg-pink-600 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReachUs;
