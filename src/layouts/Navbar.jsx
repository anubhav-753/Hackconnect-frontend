// src/layouts/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth(); // Get user object from context

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    closeMobileMenu();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        {/* Logo/Brand Name */}
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          HackConnect
        </Link>

        {/* Desktop Navigation Links */}
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

        {/* Desktop Auth Buttons / User Info */}
        <div className="navbar-auth-buttons-desktop">
          {isLoggedIn ? (
            <>
              <span className="navbar-welcome-text">
                Hi, {user.name.split(" ")[0]}!
              </span>
              {/* NEW: My Profile Link */}
              <Link
                to={`/profile/${user.id}`}
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

      {/* Mobile Menu Overlay/Drawer */}
      {isMobileMenuOpen && (
        <div className="navbar-mobile-menu-overlay transition-ease">
          <div className="navbar-mobile-links">
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
            <Link
              to="/about"
              className="navbar-mobile-link"
              onClick={closeMobileMenu}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="navbar-mobile-link"
              onClick={closeMobileMenu}
            >
              Contact
            </Link>
            <Link
              to="/chat"
              className="navbar-mobile-link"
              onClick={closeMobileMenu}
            >
              Chat
            </Link>
          </div>
          <div className="navbar-mobile-auth-buttons">
            {isLoggedIn ? (
              <>
                <span className="navbar-mobile-welcome-text">
                  Hi, {user.name.split(" ")[0]}!
                </span>
                {/* NEW: My Profile Link in Mobile Menu */}
                <Link
                  to={`/profile/${user.id}`}
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
