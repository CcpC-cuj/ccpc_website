import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "../../../firebaseConfig";
import { FaEdit, FaTrash } from "react-icons/fa";
import STARFIELD from "../../../components/Starfield";

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedDescription, setExpandedDescription] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userId = window.location.pathname.split("/").pop();
        const userRef = ref(database, `users/${userId}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          setProfileData(snapshot.val());
        } else {
          setError("Profile not found.");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("An error occurred while fetching the profile.");
      } finally {
        setLoading(false);
      }
    };

    const fetchProjects = async () => {
      try {
        const userId = window.location.pathname.split("/").pop();
        const projectsRef = ref(database, `users/${userId}/projects`);
        const snapshot = await get(projectsRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const projectArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setProjects(projectArray);
        } else {
          console.log("No projects found.");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProfileData();
    fetchProjects();
  }, []);

  const truncateDescription = (description) => {
    return description.length > 150 ? description.slice(0, 150) + "..." : description;
  };

  const toggleDescription = (index) => {
    setExpandedDescription(expandedDescription === index ? null : index);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
            <STARFIELD className="z-0" />
      <div className="bg-gray-800 text-white mt-10 mb-10 rounded-lg shadow-lg p-8 max-w-3xl w-full z-10 ">
        {/* Profile Section */}
        <div className="flex justify-center mb-6">
          <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-700 border-4 border-gray-600">
            {profileData.imageUrl ? (
              <img
                src={profileData.imageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <span>No Image</span>
              </div>
            )}
          </div>
        </div>

        <div className="text-left mb-2 ml-4">
          <h1 className="text-3xl mb-2 font-bold">{profileData.name || "N/A"}</h1>
          {profileData.bio && (
            <p className="text-xl mb-1 text-gray-300">{profileData.bio}</p>
          )}
          {profileData.location && (
            <p className="text-lg">{profileData.location}</p>
          )}
          {profileData.designation && (
            <p className="text-xl mb-1 text-gray-300">{profileData.designation}, CcpC, CUJ</p>
          )}
          <div className="space-y-2">
            {profileData.phone && (
              <p>
                <span className="font-semibold text-gray-400">Phone:</span>{" "}
                {profileData.phone}
              </p>
            )}
            {profileData.email && (
              <p>
                <span className="font-semibold text-gray-400">Email:</span>{" "}
                {profileData.email}
              </p>
            )}
            {(profileData.socialLinks || []).map((link, index) => (
              <p key={index}>
                <span className="font-semibold text-gray-400">Link:</span>{" "}
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-600"
                >
                  {link}
                </a>
              </p>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Projects</h2>
          {projects.length === 0 ? (
            <p className="text-gray-400">No projects to display.</p>
          ) : (
            projects.map((project, index) => (
              <div
                key={project.id}
                className="border p-4 mb-2 rounded bg-gray-800 text-white"
              >
                <h3 className="font-bold text-lg">{project.title}</h3>
                <p>Skills: {project.skills}</p>
                <p style={{ whiteSpace: 'pre-line' }}>Discription:<span> </span>
                  {expandedDescription === index
                    ? project.description
                    : truncateDescription(project.description)}
                  <button
                    onClick={() => toggleDescription(index)}
                    className="text-blue-500 ml-2"
                  >
                    {expandedDescription === index ? "Show Less" : "Show More"}
                  </button>
                </p>
                <p>
                   Date: {project.startDate} to {project.endDate || "Present"}
                </p>
                {project.deployedLink && (
                  <p>
                    <strong>Deployed Link:</strong>{" "}
                    <a href={project.deployedLink} target="_blank" rel="noopener noreferrer" className="text-red-50 hover:text-red-500">
                      View Project
                    </a>
                  </p>
                )}
                {project.repositoryLink && (
                  <p>
                    <strong>Repository:</strong>{" "}
                    <a href={project.repositoryLink} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-500">
                      View Code
                    </a>
                  </p>
                )}
                <div className="flex justify-between mt-2">
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
