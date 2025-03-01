import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../../../firebaseConfig";
import { ref, get, set } from "firebase/database";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import STARFIELD from "../../../components/Starfield";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      const userRef = ref(database, `users/${userId}`);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        await set(userRef, { completeProfile: false });
        navigate("/login/auth/complete-profile");
      } else {
        const userData = snapshot.val();
        if (userData.completeProfile === false) {
          navigate("/login/auth/complete-profile");
        } else {
          navigate(`/u/${auth.currentUser.uid}`);
        }
      }
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <STARFIELD className="z-0" />
      <div className="backdrop-blur-lg bg-white/10 shadow-lg rounded-lg px-8 py-6 w-full max-w-md z-10">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Login</h2>
        
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 text-white bg-transparent border border-white/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/70"
          />
        </div>

        <div className="mb-6 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 text-white bg-transparent border border-white/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/70"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-2.5 right-3 text-white cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-md hover:from-purple-600 hover:to-blue-500 transition-colors"
        >
          Login
        </button>

        {error && <p className="mt-4 text-sm text-red-400 text-center">{error}</p>}

        <p className="mt-6 text-sm text-center text-white/70">
          Forgot your password?{" "}
          <Link to="/forgot-password" className="text-blue-400 hover:text-blue-500">
            Reset it here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
