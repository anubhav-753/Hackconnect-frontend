import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa"; // For mobile menu icons
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const LoggedOutLinks = ({ isMobile }) => (
    <>
      <div
        className={
          isMobile
            ? "navbar-mobile-auth-buttons"
            : "navbar-auth-buttons-desktop"
        }
      >
        <NavLink
          to="/login"
          className={isMobile ? "navbar-mobile-login-btn" : "navbar-login-btn"}
          onClick={closeMobileMenu}
        >
          Login
        </NavLink>
        <NavLink
          to="/signup"
          className={
            isMobile ? "navbar-mobile-signup-btn" : "navbar-signup-btn"
          }
          onClick={closeMobileMenu}
        >
          Sign Up
        </NavLink>
      </div>
    </>
  );

  const LoggedInLinks = ({ isMobile }) => (
    <>
      {isMobile ? (
        // Mobile view for logged-in user
        <>
          <p className="navbar-mobile-welcome-text">Welcome, {user.name}!</p>
          <NavLink
            to="/profile"
            className="navbar-mobile-profile-link"
            onClick={closeMobileMenu}
          >
            My Profile
          </NavLink>
          <Link
            to="/"
            className="navbar-mobile-login-btn"
            style={{ marginTop: "1rem" }}
            onClick={() => {
              logout();
              closeMobileMenu();
            }}
          >
            Logout
          </Link>
        </>
      ) : (
        // Desktop view for logged-in user
        <>
          <span className="navbar-welcome-text">Welcome, {user.name}!</span>
          <NavLink
            to="/profile"
            className="navbar-profile-link"
            onClick={closeMobileMenu}
          >
            My Profile
          </NavLink>
          <button onClick={logout} className="navbar-login-btn">
            Logout
          </button>
        </>
      )}
    </>
  );

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container container">
          {/* Brand Logo */}
          <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
            HackConnect
          </Link>

          {/* Desktop Menu */}
          <div className="navbar-links-desktop">
            <NavLink to="/hackathons" className="navbar-link">
              Hackathons
            </NavLink>
            {user && (
              <NavLink to="/teammaker" className="navbar-link">
                Team Maker
              </NavLink>
            )}
          </div>

          <div className="navbar-auth-buttons-desktop">
            {user ? (
              <LoggedInLinks isMobile={false} />
            ) : (
              <LoggedOutLinks isMobile={false} />
            )}
          </div>

          {/* Mobile Menu Toggle */}
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
          <div className="navbar-mobile-links">
            <NavLink
              to="/hackathons"
              className="navbar-mobile-link"
              onClick={closeMobileMenu}
            >
              Hackathons
            </NavLink>
            {user && (
              <NavLink
                to="/teammaker"
                className="navbar-mobile-link"
                onClick={closeMobileMenu}
              >
                Team Maker
              </NavLink>
            )}
          </div>
          {user ? (
            <LoggedInLinks isMobile={true} />
          ) : (
            <LoggedOutLinks isMobile={true} />
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
