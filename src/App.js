import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserProfilePage from './pages/UserProfilePage';
import HackathonListingPage from './pages/HackathonListingPage';
import HackathonDetailPage from './pages/HackathonDetailPage';
import TeamMakerPage from './pages/TeamMakerPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <AuthProvider> {/* Wrap everything in AuthProvider */}
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/profile" element={<UserProfilePage />} />
              <Route path="/hackathons" element={<HackathonListingPage />} />
              <Route path="/hackathon/:id" element={<HackathonDetailPage />} />
              <Route path="/teammaker" element={<TeamMakerPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;