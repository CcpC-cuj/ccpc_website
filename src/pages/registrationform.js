import React, { useState } from 'react';
import Starfield from '../components/Starfield';
const RegistrationForm = () => {
  // Toggle the registration form. Set to false to display the closed message.
  // ...existing code...

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [PreferedLanguage, setPreferedLanguage] = useState('');
  const [Skills, setSkills] = useState('');
  const [reg_no, setRegNo] = useState('');
  const [Batch, setBatch] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email');
      return;
    }
    try {
      const response = await fetch('https://ccpc-member-registration.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone, PreferedLanguage, Skills, reg_no, Batch }),
      });
      const data = await response.json();
      if (data.ok) {
        alert(data.message);
        window.location.href = 'https://ccpc-cuj.web.app/';
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Try again!');
    }
  };

  // Render the closed screen when the registration form is off
  if (!isFormOpen) {
    return (
      <div className="flex items-center justify-center min-h-screen relative z-10 bg-black">
        <Starfield className="z-0 absolute inset-0" />
        <div className="max-w-md p-8 rounded-lg shadow-lg z-10 text-center bg-black">
          <h1 className="text-3xl font-bold mb-4 text-green-400">
            Registration Closed
          </h1>
          <p className="text-gray-400">
            The registration window has ended for now. Please check back later for your next chance to join the Code Crafters Programming Club!
          </p>
        </div>
      </div>
    );
  }

  // Render the registration form when open
  return (
    <div className="flex items-center justify-center min-h-screen relative z-10 bg-black">
      <Starfield className="z-0 absolute inset-0" />
      <div className="form-container w-full max-w-md bg-white/5 p-8 rounded-lg shadow-lg z-10">
        <h1 className="text-3xl font-bold mb-4 text-white text-center">
          Join <span className="text-indigo-600">Code Crafters Programming Club</span>
        </h1>
        <p className="mb-6 text-center text-gray-300">
          Become a part of an elite programming community exploring the cosmos of code!
        </p>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="relative mb-4 form-field">
            <input
              type="text"
              id="name"
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="peer w-full border border-gray-300 text-white p-3 bg-black rounded focus:outline-none focus:border-indigo-300"
            />
            <label
              htmlFor="name"
              className="absolute left-3 text-white text-sm bg-black rounded px-1 transform -translate-y-1/2 transition-all
                         peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0"
            >
              Full Name
            </label>
          </div>
          {/* Email Address */}
          <div className="relative mb-4 form-field">
            <input
              type="email"
              id="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="peer w-full border border-gray-300 p-3 text-white bg-black rounded focus:outline-none focus:border-indigo-300"
            />
            <label
              htmlFor="email"
              className="absolute left-3 text-white text-sm bg-black rounded px-1 transform -translate-y-1/2 transition-all
                         peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0"
            >
              Email Address
            </label>
          </div>
          {/* Mobile Number */}
          <div className="relative mb-4 form-field">
            <input
              type="tel"
              id="mobile_number"
              placeholder=" "
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="peer w-full border border-gray-300 p-3 text-white bg-black rounded focus:outline-none focus:border-indigo-300"
            />
            <label
              htmlFor="mobile_number"
              className="absolute left-3 text-white text-sm bg-black rounded px-1 transform -translate-y-1/2 transition-all
                         peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0"
            >
              Mobile Number
            </label>
          </div>
          {/* Department */}
          <div className="relative mb-4 form-field">
            <input
              type="text"
              id="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="peer w-full border border-gray-300 p-3 bg-black text-white rounded focus:outline-none focus:border-indigo-300"
            />
            <label
              htmlFor="password"
              className="absolute left-3 text-white text-sm bg-black rounded px-1 transform -translate-y-1/2 transition-all
                         peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0"
            >
              Department
            </label>
          </div>
          {/* Registration Number */}
          <div className="relative mb-4 form-field">
            <input
              type="text"
              id="reg"
              placeholder=" "
              value={reg_no}
              onChange={(e) => setRegNo(e.target.value)}
              required
              className="peer w-full border border-gray-300 p-3 bg-black text-white rounded focus:outline-none focus:border-indigo-300"
            />
            <label
              htmlFor="reg"
              className="absolute left-3 text-white text-sm bg-black rounded px-1 transform -translate-y-1/2 transition-all
                         peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0"
            >
              Registration Number
            </label>
          </div>
          {/* About */}
          <div className="relative mb-4 form-field">
            <input
              type="text"
              id="skills"
              placeholder=" "
              value={Skills}
              onChange={(e) => setSkills(e.target.value)}
              required
              className="peer w-full border border-gray-300 p-3 bg-black text-white rounded focus:outline-none focus:border-indigo-300"
            />
            <label
              htmlFor="skills"
              className="absolute left-3 text-white text-sm bg-black rounded px-1 transform -translate-y-1/2 transition-all
                         peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0"
            >
              About (Specification)
            </label>
          </div>
          {/* Batch */}
          <div className="mb-4 form-field">
            <label htmlFor="Batch" className="block text-white mb-2">
              Batch
            </label>
            <select
              id="Batch"
              value={Batch}
              onChange={(e) => setBatch(e.target.value)}
              required
              className="peer w-full border border-gray-300 text-white p-3 bg-black rounded focus:outline-none focus:border-indigo-300"
            >
              <option value="" disabled>
                Select Batch
              </option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>
          {/* Preferred Language */}
          <div className="mb-6 form-field">
            <label htmlFor="language" className="block text-white mb-2">
              Preferred Language
            </label>
            <select
              id="language"
              value={PreferedLanguage}
              onChange={(e) => setPreferedLanguage(e.target.value)}
              required
              className="peer w-full border border-gray-300 text-white p-3 bg-black rounded focus:outline-none focus:border-indigo-300"
            >
              <option value="" disabled>
                Select
              </option>
              <option value="java">Java</option>
              <option value="c">C/C++</option>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="other">OTHER</option>
            </select>
          </div>
          <button
            type="submit"
            id="btn1"
            className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition-colors form-field"
          >
            Join Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
