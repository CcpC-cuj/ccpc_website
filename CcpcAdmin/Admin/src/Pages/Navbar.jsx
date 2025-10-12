import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {

  return (
    <nav className="bg-gray-900 p-4 flex justify-between items-center">
      <h1 className="text-white text-xl font-bold">MyApp</h1>
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white">
            Home
          </Link>
        </li>
        <li>
          <Link to="/registration" className="text-white">
            RegistrationForm
          </Link>
        </li>
      </ul>
    </nav>
  );
}
