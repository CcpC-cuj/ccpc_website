import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // adjust path

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white w-full">
      <Navbar />
      <main className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold">Manage Users</h2>
          <p className="text-gray-400">Add, remove, and update members.</p>
          <button
            onClick={() => navigate("/users")}
            className="mt-4 bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700"
          >
            View All Users
          </button>
        </div>
      </main>
    </div>
  );
}
