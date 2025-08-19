import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./UserProfilePage.css";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";

const UserProfilePage = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("about");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const handleEdit = () => {
    setFormData({
      name: user.name || "",
      profilePicture:
        user.profilePicture || "https://randomuser.me/api/portraits/lego/1.jpg", // This line fixes the bug
      status: user.status || "",
      bio: user.bio || "",
      achievements: user.achievements || "",
      skills: (user.skills || []).join(", "),
      socialLinks: user.socialLinks || {
        linkedin: "",
        github: "",
        portfolio: "",
      },
      projects: user.projects || [],
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      ...formData,
      skills: formData.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    console.log("Saving user data:", updatedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
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

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const displayUser = isEditing
    ? formData
    : {
        name: user.name || "User Name",
        profilePicture:
          user.profilePicture ||
          "https://randomuser.me/api/portraits/lego/1.jpg",
        status: user.status || "Ready to connect!",
        bio:
          user.bio ||
          "This is your bio. Click 'Edit Profile' to tell everyone about yourself!",
        skills: user.skills || ["Add your skills"],
        achievements: user.achievements || "No achievements listed yet.",
        socialLinks: user.socialLinks || {
          linkedin: "#",
          github: "#",
          portfolio: "#",
        },
        projects: user.projects || [],
      };

  return (
    <div className="user-profile-page">
      <div className="profile-container">
        <aside className="profile-sidebar">
          <div className="profile-card">
            <img
              src={displayUser.profilePicture}
              alt={displayUser.name}
              className="profile-picture"
            />
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                className="profile-name-input"
              />
            ) : (
              <h1 className="profile-name">{displayUser.name}</h1>
            )}
            {isEditing ? (
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleFormChange}
                className="profile-status-input"
              />
            ) : (
              <p className="profile-status">{displayUser.status}</p>
            )}
            <div className="social-links">
              <a
                href={displayUser.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
              <a
                href={displayUser.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href={displayUser.socialLinks.portfolio}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGlobe />
              </a>
            </div>
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
          </div>
        </aside>
        <main className="profile-main">
          <div className="profile-tabs">
            <button
              className={`tab-button ${activeTab === "about" ? "active" : ""}`}
              onClick={() => setActiveTab("about")}
            >
              About
            </button>
            <button
              className={`tab-button ${activeTab === "skills" ? "active" : ""}`}
              onClick={() => setActiveTab("skills")}
            >
              Skills
            </button>
            <button
              className={`tab-button ${
                activeTab === "projects" ? "active" : ""
              }`}
              onClick={() => setActiveTab("projects")}
            >
              Projects
            </button>
          </div>
          <div className="tab-content">
            {activeTab === "about" && (
              <div className="about-section">
                <h2>Bio</h2>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleFormChange}
                    className="bio-textarea"
                    rows="5"
                  ></textarea>
                ) : (
                  <p>{displayUser.bio}</p>
                )}
                <h2>Achievements</h2>
                {isEditing ? (
                  <input
                    name="achievements"
                    value={formData.achievements}
                    onChange={handleFormChange}
                    className="achievements-input"
                  />
                ) : (
                  <p>{displayUser.achievements}</p>
                )}
              </div>
            )}
            {activeTab === "skills" && (
              <div className="skills-section">
                <h2>Skills</h2>
                {isEditing ? (
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleFormChange}
                    className="skills-input"
                    placeholder="Comma, separated, skills"
                  />
                ) : (
                  <div className="skills-grid">
                    {displayUser.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
            {activeTab === "projects" && (
              <div className="projects-section">
                <h2>Projects</h2>
                {displayUser.projects.length > 0 ? (
                  <div className="projects-grid">
                    {displayUser.projects.map((project, index) => (
                      <div key={index} className="project-card">
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <div className="project-technologies">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="tech-tag">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No projects added yet. Edit your profile to add them!</p>
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
