import React from "react";
import { FaHome, FaPlusSquare, FaEnvelope, FaUser } from "react-icons/fa";
import NavLogo from "../logo/navlogo";
// Left side navigation for desktop view.
export const LeftNavigation = ({ onNavigate, user, isMember }) => {
  return (
    <div className="flex w-1/5">
      <div className="relative">
        <nav className="border-r border-gray-700 min-h-[calc(100vh-8rem)] ml-12 pt-10 pr-20 p-4 sticky top-0">
          <ul className="space-y-8 text-xl">
            <li>
              <button
                onClick={() => onNavigate("/")}
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <NavLogo className="w-16 h-10" />
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate("/threads")}
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <FaHome size={20} />
                <span>Home</span>
              </button>
            </li>
            {isMember && (
              <li>
                <button
                  onClick={() =>
                    onNavigate("/threads/create/" + (user && user.uid ? user.uid : ""))
                  }
                  className="flex items-center space-x-2 hover:text-gray-300"
                >
                  <FaPlusSquare size={20} />
                  <span>Create</span>
                </button>
              </li>
            )}
            <li>
              <button
                onClick={() =>
                  onNavigate("/threads/forum/" + (user && user.uid ? user.uid : ""))
                }
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <FaEnvelope size={20} />
                <span>Messages</span>
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  onNavigate("/threads/profile/" + (user && user.uid ? user.uid : ""))
                }
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                {user && user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-6 h-6 rounded-full"
                  />
                ) : (
                  <FaUser size={20} />
                )}
                <span>Profile</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
// BottomNavigation.js
export const BottomNavigation = ({ onNavigate, user, isMember }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 py-2 flex justify-around">
      <button onClick={() => onNavigate("/threads")} className="flex flex-col items-center">
        <FaHome size={20} />
        <span className="text-xs mt-1">Home</span>
      </button>
      {isMember && (
        <button
          onClick={() =>
            onNavigate("/threads/create/" + (user && user.uid ? user.uid : ""))
          }
          className="flex flex-col items-center"
        >
          <FaPlusSquare size={20} />
          <span className="text-xs mt-1">Create</span>
        </button>
      )}
      <button onClick={() => onNavigate("/threads/forum/" + (user && user.uid ? user.uid : ""))} className="flex flex-col items-center">
        <FaEnvelope size={20} />
        <span className="text-xs mt-1">Messages</span>
      </button>
      <button
        onClick={() =>
          onNavigate("/threads/profile/" + (user && user.uid ? user.uid : ""))
        }
        className="flex flex-col items-center"
      >
        {user && user.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-6 h-6 rounded-full"
          />
        ) : (
          <FaUser size={20} />
        )}
        <span className="text-xs mt-1">Profile</span>
      </button>
    </nav>
  );
};
