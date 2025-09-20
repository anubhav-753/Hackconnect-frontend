import React, { useState, useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./UserProfilePage.css";
import { FaCamera, FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";

const UserProfilePage = () => {
  const { user, loading, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");

  // ✅ useCallback prevents useEffect warnings
  const setupForm = useCallback(() => {
    setFormData({
      name: user.name || "",
      avatar: user.avatar || "/uploads/default.png",
      status: user.status || "available",
      bio: user.bio || "",
      achievements: user.achievements || "",
      skills: (user.skills || []).join(", "),
      socialLinks: {
        linkedin: user.socialLinks?.linkedin || "",
        github: user.socialLinks?.github || "",
        portfolio: user.socialLinks?.portfolio || "",
      },
    });
  }, [user]);

  useEffect(() => {
    if (user) {
      setupForm();
    }
  }, [user, setupForm]); // ✅ no missing deps warning

  const handleEdit = () => {
    setMessage("");
    setupForm();
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const skillsArray = (formData.skills || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const updatedData = { ...formData, skills: skillsArray };

      await updateUser(updatedData);
      setIsEditing(false);
      setMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      setMessage("Failed to update profile. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setMessage("");
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="user-profile-page">
      {message && (
        <p
          className={`profile-message ${
            message.includes("successfully") ? "success" : "error"
          }`}
        >
          {message}
        </p>
      )}

      <div className="profile-container">
        <aside className="profile-sidebar">
          <div className="profile-picture-container">
            <img
              src={isEditing ? formData.avatar : user.avatar}
              alt={user.name}
              className="profile-picture"
            />
            {isEditing && (
              <label htmlFor="avatar-upload" className="profile-picture-upload">
                <FaCamera />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: "none" }}
                />
              </label>
            )}
          </div>

          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleFormChange}
              className="profile-name-input"
            />
          ) : (
            <h1 className="profile-name">{user.name}</h1>
          )}

          {isEditing ? (
            <div className="social-links-edit">
              <div className="social-input-group">
                <FaLinkedin />
                <input
                  type="text"
                  name="socialLinks.linkedin"
                  placeholder="LinkedIn URL"
                  value={formData.socialLinks?.linkedin || ""}
                  onChange={handleFormChange}
                />
              </div>
              <div className="social-input-group">
                <FaGithub />
                <input
                  type="text"
                  name="socialLinks.github"
                  placeholder="GitHub URL"
                  value={formData.socialLinks?.github || ""}
                  onChange={handleFormChange}
                />
              </div>
              <div className="social-input-group">
                <FaGlobe />
                <input
                  type="text"
                  name="socialLinks.portfolio"
                  placeholder="Portfolio URL"
                  value={formData.socialLinks?.portfolio || ""}
                  onChange={handleFormChange}
                />
              </div>
            </div>
          ) : (
            <div className="social-links">
              <a
                href={user.socialLinks?.linkedin || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
              <a
                href={user.socialLinks?.github || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href={user.socialLinks?.portfolio || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGlobe />
              </a>
            </div>
          )}

          {isEditing ? (
            <div className="edit-buttons">
              <button onClick={handleSave} className="save-button">
                Save
              </button>
              <button onClick={handleCancel} className="cancel-button">
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={handleEdit} className="edit-profile-button">
              Edit Profile
            </button>
          )}
        </aside>

        <main className="profile-main">
          <div className="status-section">
            <h2>Status</h2>
            {isEditing ? (
              <select
                name="status"
                value={formData.status}
                onChange={handleFormChange}
                className="status-select"
              >
                <option value="available">Available for Hackathons</option>
                <option value="not-available">Not Available</option>
              </select>
            ) : (
              <p className={`status-display status-${user.status}`}>
                {user.status === "available"
                  ? "Available for Hackathons"
                  : "Not Available"}
              </p>
            )}
          </div>

          <div className="about-section">
            <h2>Bio</h2>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio || ""}
                onChange={handleFormChange}
                className="bio-textarea"
                rows="5"
              ></textarea>
            ) : (
              <p>{user.bio || "No bio yet."}</p>
            )}

            <h2>Achievements</h2>
            {isEditing ? (
              <textarea
                name="achievements"
                value={formData.achievements || ""}
                onChange={handleFormChange}
                className="achievements-textarea"
                rows="3"
              ></textarea>
            ) : (
              <p>{user.achievements || "No achievements listed yet."}</p>
            )}
          </div>

          <div className="skills-section">
            <h2>Skills</h2>
            {isEditing ? (
              <input
                type="text"
                name="skills"
                value={formData.skills || ""}
                onChange={handleFormChange}
                className="skills-input"
                placeholder="Comma, separated, skills"
              />
            ) : (
              <div className="skills-grid">
                {user.skills && user.skills.length > 0 ? (
                  user.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span>No skills listed yet.</span>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserProfilePage;
