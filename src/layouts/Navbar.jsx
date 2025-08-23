import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          HackConnect
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to="/hackathons" className="nav-links">
              Hackathons
            </NavLink>
          </li>
          {user ? (
            <>
              {/* Add the Team Maker link here */}
              <li className="nav-item">
                <NavLink to="/teammaker" className="nav-links">
                  Team Maker
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/profile" className="nav-links">
                  Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={logout}>
                  Logout
                </Link>
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
