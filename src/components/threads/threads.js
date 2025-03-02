import React from 'react';
import Footer from "../Footer";
import SignIn from "./signinThreads"; // Adjust the path as needed
import Starfield from "../Starfield";
import THREADSLOGO from '../logo/threads';
const Threads = () => {
  return (
    <div className="relative overflow-hidden">
      <Starfield className="absolute inset-0 -z-10" />

      <div className="min-h-screen flex flex-col items-center justify-start pt-16 pb-8 px-4">
        {/* Hero Section */}
        <div className="rounded-xl shadow-xl p-8 max-w-4xl w-full mb-12">
          <div className="flex flex-col items-center">
            {/* Curved Thread Icon */}
            <THREADSLOGO  />
            <h1 className="text-5xl font-extrabold font-jose text-gray-100 mt-2">threads</h1>
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
          <h2 className="text-3xl font-bold text-blue-700 mb-4">What is threads?</h2>
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
