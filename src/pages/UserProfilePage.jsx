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

  // ✅ setup form with callback
  const setupForm = useCallback(() => {
    setFormData({
      name: user.name || "",
      avatar: user.avatar || "/uploads/default.png",
      status: user.status || "available",
      bio: user.bio || "",
      achievements: user.achievements || "",
      skills: (user.skills || []).join(", "),
      college: user.college || "",
      state: user.state || "",
      branch: user.branch || "",
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
  }, [user, setupForm]);

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
      const serverMessage = error.response?.data?.message || error.message;
      setMessage(`Failed to update profile: ${serverMessage}`);
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

  // Handle avatar upload with client-side compression
  const handleAvatarChange = (e) => {
    setMessage(""); // Clear any previous errors
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // Resize logic
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const MAX_WIDTH = 400; // Resize to reasonable dimensions
          const MAX_HEIGHT = 400;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to base64 JPEG with compression
          const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
          setFormData((prev) => ({ ...prev, avatar: dataUrl }));
        };
        img.src = event.target.result;
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
        {/* LEFT SIDEBAR */}
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

        {/* MAIN SECTION */}
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

          {/* College Section */}
          <div className="college-section">
            <h2>College</h2>
            {isEditing ? (
              <input
                type="text"
                name="college"
                value={formData.college || ""}
                onChange={handleFormChange}
                className="skills-input"
                placeholder="Enter your college"
              />
            ) : (
              <div className="tag-display">
                {user.college ? (
                  <span className="skill-tag">{user.college}</span>
                ) : (
                  <span>No college specified</span>
                )}
              </div>
            )}
          </div>

          {/* State Section */}
          <div className="state-section">
            <h2>State</h2>
            {isEditing ? (
              <input
                type="text"
                name="state"
                value={formData.state || ""}
                onChange={handleFormChange}
                className="skills-input"
                placeholder="Enter your state"
              />
            ) : (
              <div className="tag-display">
                {user.state ? (
                  <span className="skill-tag">{user.state}</span>
                ) : (
                  <span>No state specified</span>
                )}
              </div>
            )}
          </div>

          {/* Branch Section */}
          <div className="branch-section">
            <h2>Branch</h2>
            {isEditing ? (
              <input
                type="text"
                name="branch"
                value={formData.branch || ""}
                onChange={handleFormChange}
                className="skills-input"
                placeholder="Enter your branch"
              />
            ) : (
              <div className="tag-display">
                {user.branch ? (
                  <span className="skill-tag">{user.branch}</span>
                ) : (
                  <span>No branch specified</span>
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
