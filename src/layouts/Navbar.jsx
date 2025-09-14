// src/layouts/Navbar.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    closeMobileMenu();
    navigate("/login");
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container container">
          {/* Brand Logo */}
          <NavLink to="/" className="navbar-brand" onClick={closeMobileMenu}>
            HackConnect
          </NavLink>

          {/* Desktop Links */}
          <div className="navbar-links-desktop">
            <NavLink to="/hackathons" className="navbar-link">
              Hackathons
            </NavLink>
            <NavLink to="/teammaker" className="navbar-link">
              Team Maker
            </NavLink>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="navbar-auth-buttons-desktop">
            {user ? (
              <>
                <span className="navbar-welcome-text">Hi, {user.name}!</span>
                <NavLink to="/profile" className="navbar-profile-link">
                  Profile
                </NavLink>
                <button onClick={handleLogout} className="navbar-login-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="navbar-login-btn">
                  Login
                </NavLink>
                <NavLink to="/signup" className="navbar-signup-btn">
                  Sign Up
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle (Hamburger Icon) */}
          <div className="navbar-mobile-toggle">
            <button onClick={toggleMobileMenu} className="navbar-hamburger">
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="navbar-mobile-menu-overlay">
          {user && (
            <p className="navbar-mobile-welcome-text">Hi, {user.name}!</p>
          )}
          <div className="navbar-mobile-links">
            <NavLink
              to="/hackathons"
              className="navbar-mobile-link"
              onClick={closeMobileMenu}
            >
              Hackathons
            </NavLink>
            <NavLink
              to="/teammaker"
              className="navbar-mobile-link"
              onClick={closeMobileMenu}
            >
              Team Maker
            </NavLink>
            {user && (
              <NavLink
                to="/profile"
                className="navbar-mobile-profile-link"
                onClick={closeMobileMenu}
              >
                Profile
              </NavLink>
            )}
          </div>
          <div className="navbar-mobile-auth-buttons">
            {user ? (
              <button
                onClick={handleLogout}
                className="navbar-mobile-login-btn"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="navbar-mobile-login-btn"
                  onClick={closeMobileMenu}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="navbar-mobile-signup-btn"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
