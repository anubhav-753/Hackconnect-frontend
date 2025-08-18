import React, { useContext } from "react"; // Import useContext
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext"; // Import AuthContext
import "./Navbar.css";

const Navbar = () => {
  // Use the useContext hook here
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
