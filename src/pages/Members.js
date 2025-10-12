import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "../firebaseConfig.js";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer.js";
import NAVBAR from "../components/Navbar.js";
import STARFIELD from "../components/Starfield";
import Team2024 from "../components/SEB/Team2025";
// Add future imports here, e.g.:
// import Team2026 from "../components/SEB/Team2026";

const CACHE_KEY = "ccpc_members_cache_v1";
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in ms

const TEAM_COMPONENTS = [
  { year: 2025, Component: Team2024 },
  // { year: 2026, Component: Team2026 },
];

const Members = () => {
  const [users, setUsers] = useState([]);
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlumni, setShowAlumni] = useState(false);
  const [selectedYear, setSelectedYear] = useState(TEAM_COMPONENTS[0].year);
  const [showStudentBody, setShowStudentBody] = useState(false);
  const navigate = useNavigate();

  // Try to load from cache first
  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) {
        setUsers(data.users);
        setAlumni(data.alumni);
        setLoading(false);
      }
    }
  }, []);

  // Always fetch fresh data in background
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
            isAlumni: data[key].isAlumni || false,
            isMember: data[key].isMember || false,
          }));
          const memberArray = userArray
            .filter((user) => user.isMember === true)
            .sort((a, b) => a.name.localeCompare(b.name));
          const alumniArray = userArray
            .filter((user) => user.isAlumni === true)
            .sort((a, b) => a.name.localeCompare(b.name));
          setUsers(memberArray);
          setAlumni(alumniArray);
          // Update cache
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              data: { users: memberArray, alumni: alumniArray },
              timestamp: Date.now(),
            })
          );
        } else {
          setError("No users found.");
        }
      } catch (error) {
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <STARFIELD className="z-0" />
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
              onClick={() => {
                setShowAlumni(false);
                setShowStudentBody(false);
              }}
              className={`text-3xl font-bold cursor-pointer ${
                !showAlumni && !showStudentBody
                  ? "text-blue-500"
                  : "text-white text-xl"
              }`}
            >
              Members
            </h1>
            <h1
              onClick={() => {
                setShowAlumni(false);
                setShowStudentBody(true);
              }}
              className={`text-3xl font-bold cursor-pointer ${
                showStudentBody ? "text-blue-500" : "text-white text-xl"
              }`}
            >
              Student Body Year Wise
            </h1>
            <h1
              onClick={() => {
                setShowAlumni(true);
                setShowStudentBody(false);
              }}
              className={`text-3xl font-bold cursor-pointer  ${
                showAlumni && !showStudentBody
                  ? "text-blue-500"
                  : "text-white text-xl"
              }`}
            >
              Alumni
            </h1>
          </div>
          {/* Grid Section or Student Body Section */}
          {showStudentBody ? (
            <div className="mt-8">
              <div className="flex flex-col items-center mb-6">
                <label
                  htmlFor="team-year-select"
                  className="mb-2 text-lg font-semibold text-white"
                >
                  Select Year
                </label>
                <select
                  id="team-year-select"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="text-black px-3 py-2 rounded"
                >
                  {TEAM_COMPONENTS.sort((a, b) => b.year - a.year).map(
                    ({ year }) => (
                      <option key={year} value={year}>
                        Student Body - {year}
                      </option>
                    )
                  )}
                </select>
              </div>
              {TEAM_COMPONENTS.find((t) => t.year === selectedYear)?.Component &&
                React.createElement(
                  TEAM_COMPONENTS.find((t) => t.year === selectedYear).Component
                )}
            </div>
          ) : (
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
          )}
        </div>
        <div className="flex justify-center">
          <h1>
            Wanna Join CcpC (Registration{" "}
            <a
              href="/registration"
              className="text-red-500 px-1 hover:text-yellow-500"
            >
              Click here!{" "}
            </a>
            )
          </h1>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Members;
