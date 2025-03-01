// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Project from "./pages/project";
import Blogs from "./pages/blogs";
import ReachUs from "./pages/reachus";
import NotFound from "./pages/NotFound";
import SoC from "./pages/sochome"
import Profile from './components/SOC/profile/profile';
import Threads from './components/SOC/threads';
import Members from './pages/Members'
import CompleteProfile from "./components/SOC/auth/CompleteProfile"; // Import Complete Profile Page
import ForgotPassword from "./components/SOC/auth/ForgotPassword"; // Import Forgot Password Page
import LoginPage from "./components/SOC/auth/LoginPage";
import Dashboard from "./components/SOC/Dashboard";
import RegistrationForm from "./pages/registrationform";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/reachus" element={<ReachUs />} />
          <Route path="/soc" element={<SoC />} />
          <Route path="/members" element={<Members />} />
          <Route path="/threads" element={<Threads />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/login/auth" element={<LoginPage />} /> {/* Login Page Route */}
          <Route path="/u/:userId"  element={<Dashboard />} /> {/* Dashboard Route */}
          <Route path="/login/auth/complete-profile" element={<CompleteProfile />} /> {/* Complete Profile Page Route */}
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Forgot Password Page Route */}
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
