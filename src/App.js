import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Import Layouts
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';

// Import Pages
import HomePage from './pages/HomePage';
import HackathonListingPage from './pages/HackathonListingPage';
import HackathonDetailPage from './pages/HackathonDetailPage'; // NEW
import CreateHackathonPage from './pages/CreateHackathonPage'; // NEW
import EditHackathonPage from './pages/EditHackathonPage'; // NEW
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
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/hackathons" element={<HackathonListingPage />} />
              <Route path="/hackathons/:id" element={<HackathonDetailPage />} />
              <Route path="/create-hackathon" element={<CreateHackathonPage />} />
              <Route path="/hackathons/edit/:id" element={<EditHackathonPage />} />
              <Route path="/team-maker" element={<TeamMakerPage />} />
              <Route path="/profile/:id" element={<UserProfilePage />} />
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