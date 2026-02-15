import React from "react";
import { Link } from "react-router-dom";
import "./HackathonCard.css";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

function HackathonCard({ hackathon }) {
  return (
    <div className="hackathon-card shadow-md transition-ease">
      <div className="card-content">
        <h3 className="card-title">{hackathon.title}</h3>
        <p className="card-description">
          {hackathon.description.substring(0, 100)}...
        </p>
        <div className="card-details">
          <p>
            <strong>🗓️ Starts:</strong> {formatDate(hackathon.startDate)}
          </p>
          <p>
            <strong>📍 Location:</strong> {hackathon.location}
          </p>
        </div>
        <div className="card-themes">
          {hackathon.themes.slice(0, 3).map((theme) => (
            <span key={theme} className="theme-badge">
              {theme}
            </span>
          ))}
        </div>
      </div>
      <div className="card-actions">
        <Link
          to={`/hackathons/${hackathon._id}`}
          className="btn-details"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default HackathonCard;
