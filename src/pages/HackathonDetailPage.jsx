import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getHackathonById,
  deleteHackathon,
} from "../services/hackathonService";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import "./HackathonDetailPage.css";

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleString(undefined, options);
};

function HackathonDetailPage() {
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const response = await getHackathonById(id);
        setHackathon(response.data);
      } catch (err) {
        setError("Could not fetch hackathon details.");
      } finally {
        setLoading(false);
      }
    };
    fetchHackathon();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this hackathon?")) {
      try {
        await deleteHackathon(id);
        navigate("/hackathons");
      } catch (err) {
        setError("Failed to delete hackathon.");
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error)
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  if (!hackathon) return <p>Hackathon not found.</p>;

  const isCreator = user && user._id === hackathon.createdBy._id;

  return (
    <div className="page-section">
      <div className="container detail-container">
        <header className="detail-header">
          <h1 className="detail-title">{hackathon.title}</h1>
          <p className="detail-creator">
            Hosted by: {hackathon.createdBy.name}
          </p>
        </header>
        <div className="detail-content">
          <div className="main-content">
            <p className="detail-description">{hackathon.description}</p>
            <div className="detail-themes">
              <h3>Themes</h3>
              <div className="themes-list">
                {hackathon.themes.map((theme) => (
                  <span key={theme} className="theme-badge">
                    {theme}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <aside className="sidebar-content">
            <div className="info-box">
              <h3>Event Details</h3>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`status-badge status-${hackathon.status}`}>
                  {hackathon.status}
                </span>
              </p>
              <p>
                <strong>Starts:</strong> {formatDate(hackathon.startDate)}
              </p>
              <p>
                <strong>Ends:</strong> {formatDate(hackathon.endDate)}
              </p>
              <p>
                <strong>Location:</strong> {hackathon.location}
              </p>
              <a
                href={hackathon.website}
                target="_blank"
                rel="noopener noreferrer"
                className="primary-btn website-link"
              >
                Visit Website
              </a>
            </div>
            {isCreator && (
              <div className="creator-actions">
                <h3>Manage Event</h3>
                <Link
                  to={`/hackathons/edit/${hackathon._id}`}
                  className="secondary-btn edit-btn"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="danger-btn delete-btn"
                >
                  Delete
                </button>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

export default HackathonDetailPage;
