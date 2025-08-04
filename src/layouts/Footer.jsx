import React from "react";
import "./Footer.css"; // Import Footer's specific CSS

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container container">
        <p className="footer-brand">HackConnect</p>
        <p className="footer-tagline">
          Connecting Innovators, Building the Future.
        </p>
        <div className="footer-links">
          <a href="#" className="footer-link transition-ease">
            Privacy Policy
          </a>
          <span className="footer-link-separator">|</span>
          <a href="#" className="footer-link transition-ease">
            Terms of Service
          </a>
        </div>
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} HackConnect. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
