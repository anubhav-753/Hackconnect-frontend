import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          HackConnect
        </NavLink>
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to="/" className="nav-links" end>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/hackathons" className="nav-links">
              Hackathons
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/teammaker" className="nav-links">
              Team Maker
            </NavLink>
          </li>
          {user ? (
            <>
              <li className="nav-item">
                <NavLink to="/profile" className="nav-links">
                  Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-links-button">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink to="/login" className="nav-links">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/signup" className="nav-links">
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
