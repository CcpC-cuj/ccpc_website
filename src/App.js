// App.jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Lazy load components
const Home = lazy(() => import("./pages/home"));
const Project = lazy(() => import("./pages/project"));
const Blogs = lazy(() => import("./pages/blogs"));
const ReachUs = lazy(() => import("./pages/reachus"));
const NotFound = lazy(() => import("./pages/NotFound"));
const SoC = lazy(() => import("./pages/sochome"));
const Profile = lazy(() => import('./components/SOC/profile/profile'));
const Members = lazy(() => import('./pages/Members'));
const CompleteProfile = lazy(() => import("./components/SOC/auth/CompleteProfile")); // Import Complete Profile Page
const ForgotPassword = lazy(() => import("./components/SOC/auth/ForgotPassword")); // Import Forgot Password Page
const LoginPage = lazy(() => import("./components/SOC/auth/LoginPage"));
const Dashboard = lazy(() => import("./components/SOC/Dashboard"));
const RegistrationForm = lazy(() => import("./pages/registrationform"));
const ThreadsSignin = lazy(() => import("./components/threads/signinThreads"));
const CreatePost = lazy(() => import("./components/threads/CreatePost"));
const ThreadsProfile = lazy(() => import("./components/threads/ThreadsProfile.js"));
const ThreadsMessages = lazy(() => import("./components/threads/ThreadsMessages.js"));
const SharedPost = lazy(() => import("./pages/SharedPost"));
const ThreadsWrapper = lazy(() => import("./pages/ThreadsWrapper"));
const ResetPassword = lazy(() => import("./components/SOC/auth/ResetPassword"));
const AdminHome = lazy(() => import("./pages/Admin/Home"));
const AdminUsers = lazy(() => import("./pages/Admin/User"));
const AdminEmail = lazy(() => import("./pages/Admin/Email"));
const AdminLogin = lazy(() => import("./pages/Admin/AdminLogin"));
const GalleryUpload = lazy(() => import("./pages/Admin/GalleryUpload"));
const AdminProtectedRoute = lazy(() => import("./components/Admin/AdminProtectedRoute"));

const TeamPage = lazy(() => import("./pages/TeamPage"));
function App() {
  return (
    <Router>
      <div>
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
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
          
          {/* Admin Routes - Protected */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminHome />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminProtectedRoute>
                <AdminUsers />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/email"
            element={
              <AdminProtectedRoute>
                <AdminEmail />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/gallery"
            element={
              <AdminProtectedRoute>
                <GalleryUpload />
              </AdminProtectedRoute>
            }
          />
          <Route path="/team" element={<TeamPage />} /> {/* TeamPage Route */}
        </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
