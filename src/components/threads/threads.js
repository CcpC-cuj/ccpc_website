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
            <THREADSLOGO  />
            <h1 className="text-5xl font-extrabold font-jose text-gray-100 mt-2">threads</h1>
            <p className="mt-4 text-xl text-gray-400 text-center">
              A vibrant space where every story is visible. Club members post their daily moments while everyone can browse and get inspired.
            </p>
            <div className="mt-6">
              <SignIn />
            </div>
          </div>
        </div>

        {/* What is Threads Section */}
        <div className="rounded-xl shadow-lg p-8 max-w-4xl w-full mb-12">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">What is Threads?</h2>
          <p className="text-lg text-white mb-6">
            Threads is an interactive platform where club members share photos, text updates, and daily stories. 
            All posts are openly visible so outsiders can explore and enjoy the content, while posting rights remain exclusive to club members.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-300 mb-2">Visual Stories</h3>
              <p className="text-white">
                Club members capture and share their day-to-day experiences with engaging images and updates. Everyone can view these stories.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-300 mb-2">Interactive Discussions</h3>
              <p className="text-white">
                Comment, react, and join lively conversations. While only club members can post, every visitor can interact and be part of the discussion.
              </p>
            </div>
          </div>
        </div>

        {/* Community Guidelines Section */}
        <div className="rounded-xl shadow-lg p-8 max-w-4xl w-full mb-12">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Community Guidelines</h2>
          <ul className="list-disc list-inside space-y-2 text-lg text-white">
            <li>Respect all members and their shared stories.</li>
            <li>Keep posts and comments positive and on-topic.</li>
            <li>No hate speech, harassment, or abusive language.</li>
            <li>Avoid spam and excessive self-promotion.</li>
            <li>Encourage and support your community with every interaction.</li>
          </ul>
        </div>

        {/* Get Started Section */}
        <div className="rounded-xl shadow-xl p-8 max-w-4xl w-full">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Get Started</h2>
          <p className="text-lg text-white mb-6">
            Are you a club member? Sign in with Google to post your daily updates, images, and more. Not a member? Feel free to browse and join the conversation as you explore inspiring stories.
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
