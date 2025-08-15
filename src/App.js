import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // Make sure this is imported

import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import HomePage from './pages/HomePage';
import HackathonListingPage from './pages/HackathonListingPage';
import TeamMakerPage from './pages/TeamMakerPage';
import UserProfilePage from './pages/UserProfilePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    // AuthProvider must wrap the Router so all pages have access to the auth context
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/hackathons" element={<HackathonListingPage />} />
              <Route path="/team-maker" element={<TeamMakerPage />} />
              
              {/* This route is for viewing ANY user's profile by their ID */}
              <Route path="/profile/:id" element={<UserProfilePage />} />
              
              {/* It's also good practice to have a route for the LOGGED-IN user's own profile */}
              {/* You would need to create a ProtectedRoute component for this */}
              {/* <Route path="/profile" element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>} /> */}

              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;