// src/components/FeatureCard.jsx
import React from "react";
import "./FeatureCard.css"; // This file should also exist

function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-card shadow-md rounded-md">
      <div className="feature-icon">{icon}</div> {/* Placeholder for icon */}
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
}

export default FeatureCard;
