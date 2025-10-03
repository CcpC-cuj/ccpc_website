import React, { useEffect, useState } from "react";
import { ref, get, update } from "firebase/database";
import { database } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import NAVBAR from "../Navbar.js";
import PROJECT from "./profile/project.js";
import { FaShareAlt, FaEdit, FaCamera } from "react-icons/fa";
// Remove Firebase Storage for new uploads
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer.js";
import STARFIELD from "../../components/Starfield";
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
  const [flashMessage, setFlashMessage] = useState(null);
  const [isAlumni, setIsAlumni] = useState(profileData.isAlumni || false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        const userRef = ref(database, `users/${userId}`);
        get(userRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              setProfileData(snapshot.val());
              setUpdatedProfile(snapshot.val());
              const links = Object.keys(snapshot.val().socialLinks || {}).map(
                (key) => snapshot.val().socialLinks[key]
              );
              setSocialLinks(links);
            } else {
              setError("No profile data found.");
            }
          })
          .catch((error) => {
            console.error("Error fetching profile data:", error);
            setError("Error fetching profile data.");
          })
          .finally(() => setLoading(false));
      } else {
        navigate("/login/auth");
      }
    });

    // Listen for back button press or navigation
    const handlePopState = () => {
      navigate("/"); // Redirect to home page if user presses back
    };

    // Add event listener
    window.addEventListener("popstate", handlePopState);

    // Cleanup event listener
    return () => {
      window.removeEventListener("popstate", handlePopState);
      unsubscribe(); // Unsubscribe from auth state change
    };
  }, [navigate]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleAddLink = () => {
    setSocialLinks([...socialLinks, ""]); // Adds an empty string as a placeholder for the new link
  };

  const handleSaveClick = async () => {
    try {
      setIsSaving(true);
      const auth = getAuth();
      const user = auth.currentUser;
      const userId = user.uid;

      // Check if a new image is being uploaded
      if (newImage) {
        // Delete old image from Supabase if it exists
        if (profileData.imageUrl && profileData.imageUrl.includes("/storage/v1/object/public/CcpC/")) {
          const oldPath = profileData.imageUrl.split("/storage/v1/object/public/CcpC/")[1];
          if (oldPath) {
            await supabase.storage.from("CcpC").remove([oldPath]);
          }
        }
        // Upload the new image and get the image URL
        const imageUrl = await uploadImage(newImage);
        updatedProfile.imageUrl = imageUrl; // Set the new image URL
      } else {
        updatedProfile.imageUrl = profileData.imageUrl; // Retain old image if no new image is uploaded
      }

      // Update other profile data
      updatedProfile.isAlumni = isAlumni;

      // Update the profile in the Firebase database
      const userRef = ref(database, `users/${userId}`);
      await update(userRef, updatedProfile);

      // Update local profile state
      setProfileData(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile data:", error);
      setError("Error saving profile data.");
    } finally {
      setIsSaving(false);
    }
  };

  const uploadImage = async (file) => {
    // Upload to Supabase Storage
    const filePath = `members_images/${Date.now()}-${file.name}`;
  const { error } = await supabase.storage.from("CcpC").upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });
    if (error) {
      console.error("Supabase upload error:", error);
      throw new Error("Error uploading image.");
    }
    // Get public URL
    const { data: urlData } = supabase.storage.from("CcpC").getPublicUrl(filePath);
    return urlData.publicUrl;
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

  const handleShareClick = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (!user) {
        setFlashMessage("User not authenticated.");
        return;
      }
  
      const userId = user.uid; // Get userId from the current user
      const publicProfileUrl = `${window.location.origin}/profile/${userId}`;
  
      // Copy the public profile URL to the clipboard
      await navigator.clipboard.writeText(publicProfileUrl);
  
      // Show flash message
      setFlashMessage("Copied to clipboard!");
  
      // Check if the device supports the Share API
      if (navigator.share) {
        await navigator.share({
          title: "Check out this Profile",
          url: publicProfileUrl,
        });
      }
    } catch (error) {
      console.error("Error sharing or copying link:", error);
      setFlashMessage("Failed to copy link.");
    }
  
    // Hide flash message after 3 seconds
    setTimeout(() => setFlashMessage(null), 3000);
  };

  const getUsernameFromLink = (link) => {
    try {
      const url = new URL(link);
      return url.pathname.slice(1); // Remove the leading '/'
    } catch (error) {
      console.error("Invalid URL format:", link);
      return link;
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">Loading...</div>
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
    <div>
    <div className="relative">
      <STARFIELD />
      <div className="relative z-10">
        <NAVBAR />
        {flashMessage && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
              {flashMessage}
            </div>
          )}

        <div className="container mx-auto px-4 py-16 z-20">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-yellow-500">Your Profile</h1>
            <p className="text-lg text-yellow-600 mt-2">
              Manage your Account Information and Projects.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-gray-400 shadow-lg rounded-lg p-8">
            {/* Profile Image */}
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
                <h2 className="text-2xl font-semibold text-gray-800">
                  {profileData.name || "N/A"}
                </h2>
                <p className="text-gray-700">
                  {profileData.email}
                </p>
                <div className="flex items-center">
                    <strong className="text-black">
                      {isEditing ? (
                        // If in editing mode, display select options
                        <select
                          value={isAlumni ? "Alumni" : "Member"}
                          onChange={(e) => {
                            const value = e.target.value;
                            const updatedIsAlumni = value === "Alumni";
                            setIsAlumni(updatedIsAlumni);

                            // Set the member status to false when changing to alumni
                            setUpdatedProfile((prev) => ({
                              ...prev,
                              isAlumni: updatedIsAlumni,
                              isMember: !updatedIsAlumni, // Set isMember to false when changing to alumni
                            }));
                          }}
                          className="border rounded-md px-2 py-1"
                        >
                          <option value="Member">Member</option>
                          <option value="Alumni">Alumni</option>
                        </select>
                      ) : (
                        // Default view when not editing
                        <span>{profileData.isAlumni ? "Alumni" : "Member"}-CcpC</span>
                      )}
                    </strong>
                  </div>
                <div className="mt-2 flex">
                  <button
                    className="mr-4 text-blue-600 hover:text-blue-800"
                    onClick={handleShareClick}
                  >
                    <FaShareAlt size={20} />
                  </button>
                  
                  <button
                    className="mr-4 text-blue-600 hover:text-blue-800"
                    onClick={handleEditClick}
                  >
                    <FaEdit size={20} />
                  </button>
                  {isEditing && (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="profileImageInput"
                      />
                      <label
                        htmlFor="profileImageInput"
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        <FaCamera size={20} />
                      </label>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Account Information
                </h3>
                <ul className="text-gray-600 space-y-2">
                  <li>
                    <strong>Name:</strong>{" "}
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
                    <strong>Phone:</strong>{" "}
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
                      <select
                        id="color-group"
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={updatedProfile.colorGroup || ""}
                        onChange={(e) => {
                          setUpdatedProfile({
                            ...updatedProfile,
                            colorGroup: e.target.value
                          });
                        }}
                      >
                        <option value="">Choose your group</option>
                        <option value="Not allocated">Not allocated</option>
                        {/* Add more options as necessary */}
                        <option value="Crypto knights ">Crypto knights </option>
                        <option value="Greedy coders ">Greedy coders </option>
                        <option value="Hash hacker">Hash hacker</option>
                        <option value="Recursion rangers">Recursion rangers</option>
                        <option value="Stack overflowers">Stack overflowers</option>
                      </select>
                    ) : (
                      profileData.colorGroup || "N/A"
                    )}
                  </li>

                </ul>
                
              </div>

              {/* Links Section */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Links</h3>
                {socialLinks && socialLinks.length > 0 && socialLinks.map((link, index) => (
                  <div key={index} className="flex items-center text-gray-700 mb-2">
                    {isEditing ? (
                      <input
                        type="text"
                        value={link || ""}
                        onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                        className="border border-gray-300 rounded p-2 flex-1"
                      />
                    ) : (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {getUsernameFromLink(link)}
                      </a>
                    )}
                  </div>
                ))}

              {isEditing && (
                <button
                  onClick={handleAddLink}
                  className="mt-2 text-blue-600 hover:text-blue-800"
                >
                  Add Another Link
                </button>
              )}
            </div>
            
            </div>

            {/* Save Button */}
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
      <Footer />
    </div>
  );
};

export default Profile;
