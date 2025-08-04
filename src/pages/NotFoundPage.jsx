// src/pages/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.css"; // Create this CSS file next

function NotFoundPage() {
  return (
    <div className="page-section not-found-page flex-center">
      {" "}
      {/* Using flex-center from global CSS */}
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="not-found-home-btn primary-btn transition-ease">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
