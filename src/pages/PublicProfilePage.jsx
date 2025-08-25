import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api"; // Your axios instance
import "./UserProfilePage.css"; // We can reuse the same CSS
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import NotFoundPage from "./NotFoundPage";

const PublicProfilePage = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        // You'll need a backend route like GET /api/users/:id
        const { data } = await api.get(`/users/${id}`);
        setProfileUser(data);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
        setError("User profile not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error || !profileUser) return <NotFoundPage />; // Show 404 if user not found

  return (
    <div className="user-profile-page">
      <div className="profile-container">
        <aside className="profile-sidebar">
          <div className="profile-picture-container">
            <img
              src={
                profileUser.profilePicture ||
                "https://randomuser.me/api/portraits/lego/1.jpg"
              }
              alt={profileUser.name}
              className="profile-picture"
            />
          </div>

          <h1 className="profile-name">{profileUser.name}</h1>

          <div className="social-links">
            {profileUser.socialLinks?.linkedin && (
              <a
                href={profileUser.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            )}
            {profileUser.socialLinks?.github && (
              <a
                href={profileUser.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
            )}
            {profileUser.socialLinks?.portfolio && (
              <a
                href={profileUser.socialLinks.portfolio}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGlobe />
              </a>
            )}
          </div>

          <Link to="/teammaker" className="edit-profile-button">
            Back to Team Maker
          </Link>
        </aside>

        <main className="profile-main">
          <div className="status-section">
            <h2>Status</h2>
            <p className={`status-display status-${profileUser.status}`}>
              {profileUser.status === "available"
                ? "Available for Hackathons"
                : "Not Available"}
            </p>
          </div>
          <div className="about-section">
            <h2>Bio</h2>
            <p>{profileUser.bio || "No bio yet."}</p>
            <h2>Achievements</h2>
            <p>{profileUser.achievements || "No achievements listed yet."}</p>
          </div>
          <div className="skills-section">
            <h2>Skills</h2>
            <div className="skills-grid">
              {profileUser.skills && profileUser.skills.length > 0 ? (
                profileUser.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))
              ) : (
                <span>No skills listed yet.</span>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PublicProfilePage;
