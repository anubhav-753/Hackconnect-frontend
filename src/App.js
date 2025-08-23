import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HackathonListingPage from './pages/HackathonListingPage';
import HackathonDetailPage from './pages/HackathonDetailPage';
import UserProfilePage from './pages/UserProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import CreateHackathonPage from './pages/HackathonPage';
import TeamMakerPage from './pages/TeamMakerPage'; // 1. Import the TeamMakerPage component

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/hackathons" element={<HackathonListingPage />} />
          <Route path="/hackathons/:id" element={<HackathonDetailPage />} />
          <Route path="/create-hackathon" element={<CreateHackathonPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/teammaker" element={<TeamMakerPage />} /> {/* 2. Add the new route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;