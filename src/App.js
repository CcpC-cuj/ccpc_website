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
import Members from './pages/Members'
import CompleteProfile from "./components/SOC/auth/CompleteProfile"; // Import Complete Profile Page
import ForgotPassword from "./components/SOC/auth/ForgotPassword"; // Import Forgot Password Page
import LoginPage from "./components/SOC/auth/LoginPage";
import Dashboard from "./components/SOC/Dashboard";
import RegistrationForm from "./pages/registrationform";
import ThreadsSignin from "./components/threads/signinThreads";
import CreatePost from "./components/threads/CreatePost";
import ThreadsProfile from "./components/threads/ThreadsProfile.js";
import ThreadsMessages from "./components/threads/ThreadsMessages.js";
import SharedPost from "./pages/SharedPost";
import ThreadsWrapper from "./pages/ThreadsWrapper";
import ResetPassword from "./components/SOC/auth/ResetPassword";
import TeamPage from "./pages/TeamPage";
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
          <Route path="/threads" element={<ThreadsWrapper />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/login/auth" element={<LoginPage />} /> {/* Login Page Route */}
          <Route path="/u/:userId"  element={<Dashboard />} /> {/* Dashboard Route */}
          <Route path="/login/auth/complete-profile" element={<CompleteProfile />} /> {/* Complete Profile Page Route */}
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Forgot Password Page Route */}
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/threads/signin" element={<ThreadsSignin />} />
          <Route path="/threads/profile/:id" element={<ThreadsProfile />} />
          <Route path="/threads/create/:id" element={<CreatePost />} />
          <Route path="/threads/forum/:id" element={<ThreadsMessages />} />
          <Route path="/post/:postId" element={<SharedPost />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/team" element={<TeamPage />} /> {/* TeamPage Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
