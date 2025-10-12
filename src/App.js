// App.jsx
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorBoundary from './components/common/ErrorBoundary';

// Lazy load components for better performance
const Home = React.lazy(() => import("./pages/home"));
const Project = React.lazy(() => import("./pages/project"));
const Blogs = React.lazy(() => import("./pages/blogs"));
const ReachUs = React.lazy(() => import("./pages/reachus"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const SoC = React.lazy(() => import("./pages/sochome"));
const Profile = React.lazy(() => import('./components/SOC/profile/profile'));
const Members = React.lazy(() => import('./pages/Members'));
const CompleteProfile = React.lazy(() => import("./components/SOC/auth/CompleteProfile"));
const ForgotPassword = React.lazy(() => import("./components/SOC/auth/ForgotPassword"));
const LoginPage = React.lazy(() => import("./components/SOC/auth/LoginPage"));
const Dashboard = React.lazy(() => import("./components/SOC/Dashboard"));
const RegistrationForm = React.lazy(() => import("./pages/registrationform"));
const ThreadsSignin = React.lazy(() => import("./components/threads/signinThreads"));
const CreatePost = React.lazy(() => import("./components/threads/CreatePost"));
const ThreadsProfile = React.lazy(() => import("./components/threads/ThreadsProfile.js"));
const ThreadsMessages = React.lazy(() => import("./components/threads/ThreadsMessages.js"));
const SharedPost = React.lazy(() => import("./pages/SharedPost"));
const ThreadsWrapper = React.lazy(() => import("./pages/ThreadsWrapper"));
const ResetPassword = React.lazy(() => import("./components/SOC/auth/ResetPassword"));
const TeamPage = React.lazy(() => import("./pages/TeamPage"));
// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-900">
    <LoadingSpinner size="lg" color="blue" text="Loading..." />
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Router>
          <div>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Project />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/reachus" element={<ReachUs />} />
                <Route path="/soc" element={<SoC />} />
                <Route path="/members" element={<Members />} />
                <Route path="/threads" element={<ThreadsWrapper />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/login/auth" element={<LoginPage />} />
                <Route path="/u/:userId" element={<Dashboard />} />
                <Route path="/login/auth/complete-profile" element={<CompleteProfile />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/registration" element={<RegistrationForm />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/threads/signin" element={<ThreadsSignin />} />
                <Route path="/threads/profile/:id" element={<ThreadsProfile />} />
                <Route path="/threads/create/:id" element={<CreatePost />} />
                <Route path="/threads/forum/:id" element={<ThreadsMessages />} />
                <Route path="/post/:postId" element={<SharedPost />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/team" element={<TeamPage />} />
              </Routes>
            </Suspense>
          </div>
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
