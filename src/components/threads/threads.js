import React from 'react';
import Footer from "../Footer";
import SignIn from "./signinThreads"; // Adjust the path as needed
import Starfield from "../Starfield";

const Threads = () => {
  return (
    <div className="relative overflow-hidden">
      <Starfield className="absolute inset-0 -z-10" />

      <div className="min-h-screen flex flex-col items-center justify-start pt-16 pb-8 px-4">
        {/* Hero Section */}
        <div className="rounded-xl shadow-xl p-8 max-w-4xl w-full mb-12">
          <div className="flex flex-col items-center">
            {/* Curved Thread Icon */}
            <svg width="150" height="204" viewBox="0 0 204 204" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M102 202C157.228 202 202 157.228 202 102C202 46.7715 157.228 2 102 2C46.7715 2 2 46.7715 2 102C2 157.228 46.7715 202 102 202Z" stroke="url(#paint0_linear_0_1)" stroke-width="4"/>
              <path d="M2 102C68.6667 55.3333 135.333 55.3333 202 102" stroke="url(#paint1_linear_0_1)" stroke-width="3"/>
              <path d="M102 2C55.3333 68.6667 55.3333 135.333 102 202" stroke="url(#paint2_linear_0_1)" stroke-width="3"/>
              <path d="M42 42C82 82 122 82 162 42" stroke="url(#paint3_linear_0_1)" stroke-width="3"/>
              <path d="M102 107C104.761 107 107 104.761 107 102C107 99.2386 104.761 97 102 97C99.2386 97 97 99.2386 97 102C97 104.761 99.2386 107 102 107Z" fill="url(#paint4_linear_0_1)"/>
              <defs>
              <linearGradient id="paint0_linear_0_1" x1="2" y1="2" x2="20002" y2="2" gradientUnits="userSpaceOnUse">
              <stop stop-color="#0077BE"/>
              <stop offset="1" stop-color="#00C6FF"/>
              </linearGradient>
              <linearGradient id="paint1_linear_0_1" x1="2" y1="67" x2="20002" y2="67" gradientUnits="userSpaceOnUse">
              <stop stop-color="#0077BE"/>
              <stop offset="1" stop-color="#00C6FF"/>
              </linearGradient>
              <linearGradient id="paint2_linear_0_1" x1="67" y1="2" x2="3567" y2="2" gradientUnits="userSpaceOnUse">
              <stop stop-color="#0077BE"/>
              <stop offset="1" stop-color="#00C6FF"/>
              </linearGradient>
              <linearGradient id="paint3_linear_0_1" x1="42" y1="42" x2="12042" y2="42" gradientUnits="userSpaceOnUse">
              <stop stop-color="#0077BE"/>
              <stop offset="1" stop-color="#00C6FF"/>
              </linearGradient>
              <linearGradient id="paint4_linear_0_1" x1="97" y1="97" x2="1097" y2="97" gradientUnits="userSpaceOnUse">
              <stop stop-color="#0077BE"/>
              <stop offset="1" stop-color="#00C6FF"/>
              </linearGradient>
              </defs>
              </svg>


            <h1 className="text-5xl font-extrabold font-sans text-gray-100 mt-2">threads</h1>
            <p className="mt-4 text-xl text-gray-400 text-center">
              Engage, share, and connect with a vibrant community of thinkers and creators.
              Discover discussions, collaborate on ideas, and enjoy a space where every voice matters.
            </p>
            <div className="mt-6">
              <SignIn />
            </div>
          </div>
        </div>

        {/* What is Threads Section */}
        <div className=" rounded-xl shadow-lg p-8 max-w-4xl w-full mb-12">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">What is Threads?</h2>
          <p className="text-lg text-white mb-6">
            Threads is your go-to platform for meaningful conversations and creative sharing. 
            Whether you're here to learn, share your projects, or simply explore new ideas, 
            Threads provides a welcoming space for everyone—from students and professionals to hobbyists.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-300 mb-2">Dynamic Discussions</h3>
              <p className="text-white">
                Join lively debates and explore diverse topics. Every conversation is an opportunity to grow and learn.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-300 mb-2">Collaborative Content</h3>
              <p className="text-white">
                Share your ideas and projects in a supportive environment. Build lasting connections with like-minded peers.
              </p>
            </div>
          </div>
        </div>

        {/* Community Guidelines Section */}
        <div className=" rounded-xl shadow-lg p-8 max-w-4xl w-full mb-12">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Community Guidelines</h2>
          <ul className="list-disc list-inside space-y-2 text-lg text-white">
            <li>Always be respectful and considerate.</li>
            <li>Keep discussions constructive and on-topic.</li>
            <li>No hate speech, harassment, or abusive language.</li>
            <li>Avoid spam and excessive self-promotion.</li>
            <li>Encourage and support fellow members.</li>
          </ul>
        </div>

        {/* Get Started Section */}
        <div className="rounded-xl shadow-xl p-8 max-w-4xl w-full">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Get Started</h2>
          <p className="text-lg text-white mb-6">
            Ready to experience Threads? Sign in with Google to unlock full access: view posts, create new content, 
            and join a community that values your ideas. Your journey into insightful discussions starts here.
          </p>
          <div className="flex justify-center">
            <SignIn />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Threads;
