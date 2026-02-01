import React, { useState, useEffect } from 'react';
import Starfield from '../components/Starfield';

const API_BASE_URL = 'https://ccpccuj-mem-reg-2026.hf.space';

// reCAPTCHA v3 Site Key from environment variable
const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

// Function to load reCAPTCHA script dynamically
const loadRecaptchaScript = () => {
  return new Promise((resolve, reject) => {
    if (typeof window.grecaptcha !== 'undefined') {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load reCAPTCHA'));
    document.head.appendChild(script);
  });
};

// Function to get reCAPTCHA token
const getRecaptchaToken = () => {
  return new Promise((resolve, reject) => {
    if (typeof window.grecaptcha === 'undefined') {
      console.error('❌ reCAPTCHA not loaded');
      reject(new Error('reCAPTCHA not loaded'));
      return;
    }
    
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(RECAPTCHA_SITE_KEY, { action: 'submit' })
        .then((token) => {
          console.log('✅ reCAPTCHA token received');
          resolve(token);
        })
        .catch((error) => {
          console.error('❌ reCAPTCHA error:', error);
          reject(error);
        });
    });
  });
};

const RegistrationForm = () => {
  // Check registration status from API
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [PreferedLanguage, setPreferedLanguage] = useState('');
  const [Skills, setSkills] = useState('');
  const [reg_no, setRegNo] = useState('');
  const [Batch, setBatch] = useState('');

  useEffect(() => {
    fetchRegistrationStatus();
    // Load reCAPTCHA script
    loadRecaptchaScript().catch((error) => {
      console.error('Failed to load reCAPTCHA:', error);
    });
  }, []);

  const fetchRegistrationStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/settings/registration-status`);
      const data = await response.json();
      setIsFormOpen(data.isOpen); // Respect exact backend value
    } catch (error) {
      console.error("Error fetching registration status:", error);
      setIsFormOpen(true); // Default to open on error
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email');
      return;
    }

    try {
      // Get reCAPTCHA token before submitting
      const recaptchaToken = await getRecaptchaToken();

      const data = {
        name,
        email,
        password,
        phone,
        PreferedLanguage,
        Skills,
        reg_no,
        Batch,
        recaptchaToken // Include reCAPTCHA token
      };

      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      // Handle bot detection (403)
      if (response.status === 403) {
        alert('❌ Bot detection triggered. Please try again.');
        return;
      }

      // Handle rate limiting (429)
      if (response.status === 429) {
        alert('⚠️ Too many registration attempts. Please try again after 1 hour.');
        return;
      }

      if (response.ok && result.ok) {
        alert(result.message || "✅ Registration successful! Check your email.");
        // Reset form
        setName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setSkills("");
        setPreferedLanguage("");
        setRegNo("");
        setBatch("");
      } else {
        alert(result.message || "❌ Registration failed");
      }
    } catch (error) {
      console.error('Registration error:', error);
      if (error.message === 'reCAPTCHA not loaded') {
        alert("❌ Security verification failed. Please refresh the page and try again.");
      } else {
        alert("❌ An error occurred. Please try again.");
      }
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen relative z-10 bg-black">
        <Starfield className="z-0 absolute inset-0" />
        <div className="text-white text-xl z-10">Loading...</div>
      </div>
    );
  }

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
          <div className="mb-4 form-field">
            <label htmlFor="password" className="block text-white mb-2">
              Department
            </label>
            <select
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="peer w-full border border-gray-300 text-white p-3 bg-black rounded focus:outline-none focus:border-indigo-300"
            >
              <option value="" disabled>
                Select Department
              </option>
              <option value="CSE">CSE</option>
              <option value="MME">MME</option>
              <option value="CE">CE</option>
              <option value="EE">EE</option>
              {/* add other departments as needed */}
            </select>
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
              <option value="2025">2025</option>
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
          
          {/* reCAPTCHA v3 Notice */}
          <p className="text-xs text-gray-400 text-center mt-4">
            This site is protected by reCAPTCHA and the Google{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
              Terms of Service
            </a>{' '}
            apply.
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
