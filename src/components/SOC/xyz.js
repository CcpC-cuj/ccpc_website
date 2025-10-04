import React, { useEffect, useState } from "react";
import { ref, get, update } from "firebase/database";
import { database } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import NAVBAR from "../socnavbar.js";
import PROJECT from "./profile/project.js";
import { FaShareAlt, FaEdit, FaCamera } from "react-icons/fa";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [socialLinks, setSocialLinks] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    
    const fetchProfileData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          navigate('/login/auth'); // Redirect to the login page if no user is logged in
          return;
        }

        const userId = user.uid;
        const userRef = ref(database, `users/${userId}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          setProfileData(data);
          setUpdatedProfile(data);

          // Fetch and format social links
          const links = Object.keys(data.socialLinks || {})
            .map((key) => data.socialLinks[key])
            .filter((link) => !!link); // Filter out null/empty links
          setSocialLinks(links);
        } else {
          setError("No profile data found.");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Error fetching profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const getLinkTitle = (link) => {
    if (link.includes("github.com")) return "GitHub";
    if (link.includes("linkedin.com")) return "LinkedIn";
    if (link.includes("leetcode.com")) return "LeetCode";
    if (link.includes("codechef.com")) return "CodeChef";
    if (link.includes("instagram.com")) return "Instagram";
    return "Custom Link"; // Default title if no known domain is found
  };
  const handleSaveClick = async () => {
    try {
      setIsSaving(true);
      const auth = getAuth();
      const user = auth.currentUser;
      const userId = user.uid;

      if (newImage) {
        // Delete the old image if it exists
        if (profileData.imageUrl) {
          try {
            const oldImageRef = storageRef(getStorage(), profileData.imageUrl);
            await deleteObject(oldImageRef);
            console.log("Old image deleted successfully.");
          } catch (error) {
            console.error("Error deleting old image:", error);
          }
        }
        const imageUrl = await uploadImage(newImage);
        updatedProfile.imageUrl = imageUrl;
      }

      const userRef = ref(database, `users/${userId}`);
      await update(userRef, updatedProfile);
      setProfileData(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile data:", error);
      setError("Error saving profile data.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSocialLinkChange = (index, value) => {
    const newLinks = [...socialLinks];
    newLinks[index] = value;
    setSocialLinks(newLinks);

    setUpdatedProfile((prev) => ({
      ...prev,
      socialLinks: newLinks.reduce((acc, link, i) => {
        acc[i] = link;
        return acc;
      }, {}),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
    }
  };

  const handleShareClick = () => {
    const currentUrl = window.location.href;
    if (navigator.share) {
      navigator
        .share({
          title: "Check out my Profile",
          url: currentUrl,
        })
        .catch(console.error);
    } else {
      alert("Sharing is not supported in your browser. Copy this link: " + currentUrl);
    }
  };

  const uploadImage = async (file) => {
    const storage = getStorage();
    const imageRef = storageRef(storage, `profileImages/${file.name}`);
    await uploadBytes(imageRef, file);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-l from-blue-500 to-indigo-500 flex flex-col items-center text-white">
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <NAVBAR />

        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800">Your Profile</h1>
            <p className="text-lg text-gray-600 mt-2">Manage your account information and settings.</p>
          </div>

          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
            <div className="flex flex-col items-center justify-center mb-6 sm:flex-row sm:space-x-6">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-4 sm:mb-0">
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
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-semibold text-gray-800">{profileData.name || "N/A"}</h2>
                <p className="text-gray-600">{profileData.email || "email@example.com"}</p>
                <div className="mt-2 flex">
                  <button className="mr-4 text-blue-600 hover:text-blue-800" onClick={handleShareClick}>
                    <FaShareAlt size={20} />
                  </button>
                  <button className="mr-4 text-blue-600 hover:text-blue-800" onClick={handleEditClick}>
                    <FaEdit size={20} />
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="profileImageInput"
                  />
                  <label htmlFor="profileImageInput" className="text-blue-600 hover:text-blue-800 cursor-pointer">
                    <FaCamera size={20} />
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Account Information</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>
                    <strong>Name:</strong>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={updatedProfile.name || ""}
                        onChange={handleChange}
                        className="border-b border-gray-300 p-1 w-full"
                      />
                    ) : (
                      profileData.name || "N/A"
                    )}
                  </li>
                  <li>
                    <strong>Phone:</strong>
                    {isEditing ? (
                      <input
                        type="text"
                        name="phone"
                        value={updatedProfile.phone || ""}
                        onChange={handleChange}
                        className="border-b border-gray-300 p-1 w-full"
                      />
                    ) : (
                      profileData.phone || "N/A"
                    )}
                  </li>
                  <li>
                    <strong>Bio:</strong>
                    {isEditing ? (
                      <textarea
                        name="bio"
                        value={updatedProfile.bio || ""}
                        onChange={handleChange}
                        className="border-b border-gray-300 p-1 w-full"
                      />
                    ) : (
                      profileData.bio || "N/A"
                    )}
                  </li>
                  <li>
                    <strong>Location:</strong>
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={updatedProfile.location || ""}
                        onChange={handleChange}
                        className="border-b border-gray-300 p-1 w-full"
                      />
                    ) : (
                      profileData.location || "N/A"
                    )}
                  </li>
                  <li>
                    <strong>Designation:</strong>
                    {isEditing ? (
                      <input
                        type="text"
                        name="designation"
                        value={updatedProfile.designation || ""}
                        onChange={handleChange}
                        className="border-b border-gray-300 p-1 w-full"
                      />
                    ) : (
                      profileData.designation || "N/A"
                    )}
                  </li>
                  <li>
                  <strong>Group:</strong>
                  {isEditing ? (
                      <input
                        type="text"
                        name="group"
                        value={updatedProfile.colorGroup || ""}
                        onChange={handleChange}
                        className="border-b border-gray-300 p-1 w-full"
                      />
                    ) : (
                      profileData.colorGroup || "N/A"
                    )}
                  </li>
                </ul>
                
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Links</h3>
                {socialLinks.map((link, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <span className="mr-2 text-gray-600">{getLinkTitle(link)}</span>
                    {isEditing ? (
                      <input
                        type="text"
                        value={link || ""}
                        onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                        className="border-b border-gray-300 p-1 w-full text-black"
                      />
                    ) : (
                      <a
                        href={link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {link}
                      </a>
                    )}
                  </div>
                ))}
              </div>

            </div>
            {isEditing && (
              <div className="text-right mt-4">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mr-4"
                  onClick={handleSaveClick}
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          <PROJECT />
        </div>
      </div>
    </div>
  );
};

export default Profile;
