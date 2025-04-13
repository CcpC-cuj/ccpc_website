import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "../firebaseConfig.js";
import { useNavigate } from "react-router-dom";
import { FaLogin } from "react-icons/fa"; 
import Footer from "../components/Footer.js";
import NAVBAR from "../components/Navbar.js";
import STARFIELD from "../components/Starfield";


const Members = () => {
  const [users, setUsers] = useState([]);
  const [alumni, setAlumni] = useState([]); // State for alumni
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlumni, setShowAlumni] = useState(false); // Toggle state for showing alumni
  const navigate = useNavigate();

  // Fetch all users from the Firebase database
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = ref(database, "users");
        const snapshot = await get(usersRef);
  
        if (snapshot.exists()) {
          const data = snapshot.val();
          const userArray = Object.keys(data).map((key) => ({
            id: key,
            name: data[key].name,
            isAlumni: data[key].isAlumni || false, // Check if the user is an alumni
            isMember: data[key].isMember || false, // Check if the user is a member
          }));
  
          // Separate members and alumni based on the new fields
          const memberArray = userArray
            .filter((user) => user.isMember === true)
            .sort((a, b) => a.name.localeCompare(b.name)); // Sort members alphabetically
  
          const alumniArray = userArray
            .filter((user) => user.isAlumni === true)
            .sort((a, b) => a.name.localeCompare(b.name)); // Sort alumni alphabetically
  
          setUsers(memberArray);
          setAlumni(alumniArray);
        } else {
          setError("No users found.");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("An error occurred while fetching users.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchUsers();
  }, []);
  
  // Handle redirection to the selected user's profile page
  const handleClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  // Google Form link for adding new member
  const registarionLink = "/" //registetion

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div>
    <STARFIELD className="z-0" />
    <div className="min-h-screen text-white bg-black z-10">
    <NAVBAR />
      <div className="text-white pt-10 mb-10 rounded-lg shadow-lg p-8 max-w-5xl w-full mx-auto">
        {/* Header Section */}
        
        <div className="flex justify-between items-center mb-8">
          <h1
            onClick={() => setShowAlumni(false)} // Show Members
            className={`text-3xl font-bold cursor-pointer ${
              !showAlumni ? "text-blue-500" : "text-white text-xl"
            }`}
          >
            Members
          </h1>
          <h1
            onClick={() => setShowAlumni(true)} // Show Alumni
            className={`text-3xl font-bold cursor-pointer  ${
              showAlumni ? "text-blue-500" : "text-white text-xl"
            }`}
          >
            Alumni
          </h1>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {(showAlumni ? alumni : users).map((user) => (
            <div
              key={user.id}
              className="p-2 bg-gray-800 rounded-lg text-center hover:bg-gray-700 transition duration-200 cursor-pointer"
              onClick={() => handleClick(user.id)}
            >
              <h2 className="text-xl font-semibold">{user.name}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <h1>
       Wanna Join CcpC,(Registration deadline extended to April 5th, 2025) <a href="/registration" className="text-red-500 px-1 hover:text-yellow-500">Click here! </a>
       </h1>
       </div>
      <Footer />
    </div>
    </div>
  );
};

export default Members;
