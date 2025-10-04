import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, database } from "../../../firebaseConfig";
import { ref, set } from "firebase/database";
import { storage } from "../../../firebaseConfig";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { FaTimes } from "react-icons/fa";
import "../../../index.css";
import STARFIELD from "../../../components/Starfield";
const CompleteProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [designation, setDesignation] = useState("");
  const [socialLinks, setSocialLinks] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [colorGroup, setColorGroup] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Prefill email
  useEffect(() => {
    if (auth.currentUser) {
      setEmail(auth.currentUser.email);
    }
  }, []);

  const handleProfileSubmit = async () => {
    if (!name.trim() || !location.trim() || !designation.trim() || !colorGroup) {
      setError("Name, Location, Designation, and Color Group are required");
      return;
    }

    try {
      const userId = auth.currentUser.uid;

      let imageUrl = "";
      if (profileImage) {
        const imageRef = storageRef(storage, `profileImages/${userId}`);
        await uploadBytes(imageRef, profileImage);
        imageUrl = await getDownloadURL(imageRef);
      }

      // Save profile data to database
      await set(ref(database, `users/${userId}`), {
        completeProfile: true,
        name,
        email,
        phone,
        bio,
        location,
        designation,
        socialLinks, // Directly save socialLinks as an array
        imageUrl,
        colorGroup, // Saving color group to the database
        isMember: true, // Default to true
        isAlumni: false, // Default to false (not alumni)
      });

      navigate(`/u/${auth.currentUser.uid}`);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setPreviewImage("");
  };

  const handleSocialLinkChange = (e, index) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index] = e.target.value;
    setSocialLinks(updatedLinks);
  };

  const getLinkTitle = (link) => {
    if (link.includes("github.com")) return "GitHub";
    if (link.includes("linkedin.com")) return "LinkedIn";
    if (link.includes("leetcode.com")) return "LeetCode";
    if (link.includes("codechef.com")) return "CodeChef";
    if (link.includes("instagram.com")) return "Instagram";
    return "Custom Link"; // Default title if no known domain is found
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <STARFIELD className="z-0" />
      <div className="bg-white bg-opacity-60 backdrop-blur-lg rounded-xl shadow-lg p-8 w-full max-w-md z-10">
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">Complete Your Profile</h2>

        <div className="space-y-4">
          {/* Image Upload */}
          <div className="text-center p-2 border-2 rounded border-white/60"> Upload Profile Image
            {previewImage && (
              <div className="relative inline-block mb-4">
                <img src={previewImage} alt="Profile" className="rounded-full w-32 h-32 object-cover mx-auto" />
                <FaTimes
                  className="absolute top-0 right-0 text-white cursor-pointer"
                  onClick={handleRemoveImage}
                />
              </div>
            )}
            {!previewImage && <input type="file" onChange={handleFileChange} className="text-center mx-auto block" />}
          </div>

          <input
            type="text"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            value={email}
            readOnly
          />
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />

          {/* Dynamic Social Links */}
          <div className="space-y-2">
            {socialLinks.map((link, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter a social link (e.g., GitHub, LinkedIn, etc.)"
                  value={link}
                  onChange={(e) => handleSocialLinkChange(e, index)}
                />
                {link && <span className="text-sm text-gray-500">{getLinkTitle(link)}</span>}
              </div>
            ))}
            {/* Button to add more links */}
            <button
              type="button"
              className="w-full p-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setSocialLinks([...socialLinks, ""])}
            >
              Add Another Link
            </button>
          </div>

          {/* Color Group Dropdown */}
          <div>
            <label className="block text-gray-600 font-semibold mb-2">Select Color Group</label>
            <select
              id="color-group"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={colorGroup}
              onChange={(e) => setColorGroup(e.target.value)}
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
          </div>

          <button
            className="w-full py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
            onClick={handleProfileSubmit}
          >
            Save Profile
          </button>

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
