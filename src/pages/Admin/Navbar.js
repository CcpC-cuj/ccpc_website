import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear admin authentication
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    
    // Redirect to login page
    navigate("/admin/login");
  };

  return (
    <nav className="bg-gray-900 p-4 flex justify-between items-center">
      <h1 className="text-white text-xl font-bold">CCPC Admin</h1>
      <ul className="flex space-x-4 items-center">
        <li>
          <Link to="/admin" className="text-white hover:text-gray-300">
            Home
          </Link>
        </li>
        <li>
          <Link to="/admin/registration" className="text-white hover:text-gray-300">
            RegistrationForm
          </Link>
        </li>
        <li>
          <Link to="/admin/users" className="text-white hover:text-gray-300">
            Users
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
