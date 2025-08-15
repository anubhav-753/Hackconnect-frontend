// src/layouts/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "./Navbar.css";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // CHANGED: Renamed isLoggedIn to isAuthenticated to match AuthContext
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate(); // Get navigate function

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMobileMenu();
    navigate("/"); // Redirect to home after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          HackConnect
        </Link>

        {/* Desktop Links */}
        <div className="navbar-links-desktop">
          <Link to="/hackathons" className="navbar-link">
            Hackathons
          </Link>
          <Link to="/team-maker" className="navbar-link">
            Team Maker
          </Link>
          <Link to="/about" className="navbar-link">
            About
          </Link>
          <Link to="/contact" className="navbar-link">
            Contact
          </Link>
          <Link to="/chat" className="navbar-link">
            Chat
          </Link>
        </div>

        {/* Desktop Auth */}
        <div className="navbar-auth-buttons-desktop">
          {/* CHANGED: Check for isAuthenticated and user object */}
          {isAuthenticated && user ? (
            <>
              <span className="navbar-welcome-text">
                Hi, {user.name.split(" ")[0]}!
              </span>
              {/* CHANGED: Link to user._id instead of user.id */}
              <Link
                to={`/profile/${user._id}`}
                className="navbar-profile-link transition-ease"
              >
                My Profile
              </Link>
              <button
                onClick={handleLogout}
                className="navbar-login-btn transition-ease"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-login-btn transition-ease">
                Login
              </Link>
              <Link to="/signup" className="navbar-signup-btn transition-ease">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="navbar-mobile-toggle">
          <button className="navbar-hamburger" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="navbar-mobile-menu-overlay transition-ease">
          <div className="navbar-mobile-links">
            {/* Links for mobile */}
            <Link
              to="/hackathons"
              className="navbar-mobile-link"
              onClick={closeMobileMenu}
            >
              Hackathons
            </Link>
            <Link
              to="/team-maker"
              className="navbar-mobile-link"
              onClick={closeMobileMenu}
            >
              Team Maker
            </Link>
            {/* ... other links */}
          </div>
          <div className="navbar-mobile-auth-buttons">
            {isAuthenticated && user ? (
              <>
                <span className="navbar-mobile-welcome-text">
                  Hi, {user.name.split(" ")[0]}!
                </span>
                <Link
                  to={`/profile/${user._id}`}
                  className="navbar-mobile-link"
                  onClick={closeMobileMenu}
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="navbar-mobile-login-btn transition-ease"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="navbar-mobile-login-btn transition-ease"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="navbar-mobile-signup-btn transition-ease"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
