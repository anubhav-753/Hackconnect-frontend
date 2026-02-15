import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserProfilePage from './pages/UserProfilePage';
import PublicProfilePage from './pages/PublicProfilePage';  // ✅ Add this import
import HackathonListingPage from './pages/HackathonListingPage';
import HackathonDetailPage from './pages/HackathonDetailPage';
import TeamMakerPage from './pages/TeamMakerPage';
import ChatPage from './pages/ChatPage'; // ✅ Add ChatPage import
import NotFoundPage from './pages/NotFoundPage';


function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* ✅ User’s own profile */}
          <Route path="/profile" element={<UserProfilePage />} />

          {/* ✅ Public profile route (for viewing other users) */}
          <Route path="/profile/:id" element={<PublicProfilePage />} />

          <Route path="/hackathons" element={<HackathonListingPage />} />
          <Route path="/hackathons/:id" element={<HackathonDetailPage />} />
          <Route path="/teammaker" element={<TeamMakerPage />} />
          <Route path="/chat" element={<ChatPage />} />

          {/* Fallback route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;