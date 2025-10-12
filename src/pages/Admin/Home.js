import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // adjust path

export default function Home() {
  const navigate = useNavigate();
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrationStatus();
  }, []);

  const fetchRegistrationStatus = async () => {
    try {
      const apiBase = (process.env.REACT_APP_API_BASE_URL || "http://localhost:5002").split("||")[0];
      const response = await fetch(`${apiBase}/api/settings/registration-status`);
      const data = await response.json();
      setIsRegistrationOpen(data.isOpen);
    } catch (error) {
      console.error("Error fetching registration status:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleRegistration = async () => {
    try {
      const apiBase = (process.env.REACT_APP_API_BASE_URL || "http://localhost:5002").split("||")[0];
      const response = await fetch(`${apiBase}/api/settings/registration-status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isOpen: !isRegistrationOpen })
      });
      const data = await response.json();
      setIsRegistrationOpen(data.isOpen);
      alert(data.message);
    } catch (error) {
      console.error("Error toggling registration:", error);
      alert("Failed to update registration status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white w-full">
      <Navbar />
      <main className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold">Manage Users</h2>
          <p className="text-gray-400">Add, remove, and update members.</p>
          <button
            onClick={() => navigate("/admin/users")}
            className="mt-4 bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700"
          >
            View All Users
          </button>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold">Registration Form</h2>
          <p className="text-gray-400">Control registration form access.</p>
          <div className="mt-4 flex items-center gap-4">
            <span className="text-sm">Status:</span>
            <span className={`font-bold ${isRegistrationOpen ? 'text-green-400' : 'text-red-400'}`}>
              {loading ? 'Loading...' : (isRegistrationOpen ? 'OPEN' : 'CLOSED')}
            </span>
          </div>
          <button
            onClick={toggleRegistration}
            disabled={loading}
            className={`mt-4 px-4 py-2 rounded transition-colors ${
              isRegistrationOpen 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-green-600 hover:bg-green-700'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Loading...' : (isRegistrationOpen ? 'Close Registration' : 'Open Registration')}
          </button>
        </div>
      </main>
    </div>
  );
}
