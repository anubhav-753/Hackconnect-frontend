// src/pages/HackathonDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getHackathonById } from "../services/hackathonService";
import LoadingSpinner from "../components/LoadingSpinner";
import "./HackathonDetailPage.css";

const HackathonDetailPage = () => {
  const { id } = useParams();
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const { data } = await getHackathonById(id);
        setHackathon(data);
      } catch (err) {
        setError("Hackathon not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchHackathon();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message container">{error}</div>;
  if (!hackathon) return null;

  const startDate = new Date(hackathon.startDate);
  const endDate = new Date(hackathon.endDate);
  const now = new Date();
  
  let status = "upcoming";
  if (now > endDate) status = "past";
  else if (now >= startDate && now <= endDate) status = "ongoing";

  return (
    <div className="hackathon-detail-page page-section">
      <div className="detail-container container">
        <div className="detail-header">
          <span className={`status-badge status-${status}`}>{status}</span>
          <h1 className="detail-title">{hackathon.title}</h1>
          {hackathon.organizer && (
             <div className="detail-creator">
               Organized by <strong>{hackathon.organizer}</strong>
             </div>
          )}
        </div>

        <div className="detail-content">
          <div className="detail-left-column">
            <div className="detail-description">
              <h3>About this Hackathon</h3>
              <p>{hackathon.description}</p>
            </div>
            
            <div className="detail-themes">
              <h3>Themes</h3>
              <div className="card-themes">
                {hackathon.themes && hackathon.themes.map((theme) => (
                  <span key={theme} className="theme-badge">
                    {theme}
                  </span>
                ))}
              </div>
            </div>
            
            {/* You can add more sections here like rules, prizes etc if available */}
          </div>

          <aside className="sidebar">
            <div className="info-box">
              <h3>Event Details</h3>
              <p>
                <strong>🗓️ Start:</strong> {startDate.toLocaleDateString()}
              </p>
              <p>
                <strong>🏁 End:</strong> {endDate.toLocaleDateString()}
              </p>
              <p>
                <strong>📍 Location:</strong> {hackathon.location || "Online"}
              </p>
              
              {hackathon.website && (
                 <a href={hackathon.website} target="_blank" rel="noopener noreferrer" className="primary-btn website-link">
                   Official Website
                 </a>
              )}
               {/* Fallback button if no website */}
              {!hackathon.website && (
                  <button className="primary-btn website-link" disabled>Registration Closed</button>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default HackathonDetailPage;
