import React from "react";
import { Link } from "react-router-dom"; // Import Link
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container container">
        <p className="footer-brand">HackConnect</p>
        <p className="footer-tagline">
          Connecting Innovators, Building the Future.
        </p>
        <div className="footer-links">
          {/* FIX: Replaced <a> with <Link> and used a real path */}
          <Link to="/privacy-policy" className="footer-link transition-ease">
            Privacy Policy
          </Link>
          <span className="footer-link-separator">|</span>
          {/* FIX: Replaced <a> with <Link> and used a real path */}
          <Link to="/terms-of-service" className="footer-link transition-ease">
            Terms of Service
          </Link>
        </div>
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} HackConnect. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
