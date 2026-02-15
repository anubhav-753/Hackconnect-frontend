// src/pages/HackathonDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHackathonById, registerForHackathon } from "../services/hackathonService";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../contexts/AuthContext";
import "./HackathonDetailPage.css";

const HackathonDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registering, setRegistering] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const { data } = await getHackathonById(id);
        setHackathon(data);
        
        // Check if user is already registered
        if (user && data.participants) {
          const isUserRegistered = data.participants.some(
            p => (typeof p === 'string' ? p === user._id : p._id === user._id)
          );
          setIsRegistered(isUserRegistered);
        }
      } catch (err) {
        setError("Hackathon not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchHackathon();
  }, [id, user]);

  const handleRegister = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setRegistering(true);
    setRegistrationMessage("");

    try {
      await registerForHackathon(id);
      setIsRegistered(true);
      setRegistrationMessage("Successfully registered for the hackathon!");
      // Optionally refresh hackathon data to update participant count
    } catch (err) {
      setRegistrationMessage(
        err.response?.data?.message || "Failed to register. Please try again."
      );
    } finally {
      setRegistering(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message container">{error}</div>;
  if (!hackathon) return null;

  const startDate = new Date(hackathon.startDate);
  const endDate = new Date(hackathon.endDate);
  const now = new Date();
  
  let status = "upcoming";
  if (now > endDate) status = "past";
  else if (now >= startDate && now <= endDate) status = "ongoing";

  const isRegistrationOpen = status === "upcoming" || status === "ongoing";

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
              
              {registrationMessage && (
                <div className={`registration-message ${isRegistered ? 'success' : 'error'}`}>
                  {registrationMessage}
                </div>
              )}

              {isRegistered ? (
                <button className="primary-btn register-btn registered" disabled>
                  ✅ You are Registered
                </button>
              ) : (
                <button 
                  onClick={handleRegister} 
                  disabled={!isRegistrationOpen || registering}
                  className="primary-btn register-btn"
                >
                  {registering ? "Registering..." : isRegistrationOpen ? "Register Now" : "Registration Closed"}
                </button>
              )}

              {hackathon.website && (
                 <a href={hackathon.website} target="_blank" rel="noopener noreferrer" className="secondary-btn website-link">
                   Official Website
                 </a>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default HackathonDetailPage;
