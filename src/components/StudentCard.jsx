import React from "react";
import "./StudentCard.css";
import {
  FaCode,
  FaBrain,
  FaCamera,
  FaDatabase,
  FaReact,
  FaPaintBrush,
  FaMobileAlt,
  FaJava,
  FaPython,
  FaLeaf,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Helper to map skills to icons
const skillIconMap = {
  "AI/ML": <FaBrain />,
  Frontend: <FaCode />,
  Backend: <FaDatabase />,
  "Computer Vision": <FaCamera />,
  React: <FaReact />,
  "UI/UX": <FaPaintBrush />,
  "Mobile Dev": <FaMobileAlt />,
  Java: <FaJava />,
  Python: <FaPython />,
  "Spring Boot": <FaLeaf />,
  default: <FaCode />,
};

const getSkillIcon = (skill) => skillIconMap[skill] || skillIconMap["default"];

const StudentCard = ({ student }) => {
  const { id, name, profilePicture, college, branch, skills, status } = student;
  const navigate = useNavigate();

  // THE FIX: Navigate to the correct public user profile route
  const handleViewProfile = () => {
    navigate(`/user/${id}`);
  };

  // THE FIX: Added a handler for sending a request
  const handleSendRequest = () => {
    // This is where you would implement the logic to send a connection request.
    // For now, it will just log to the console.
    // Example: sendTeamRequest(id).then(...).catch(...);
    alert(`Connection request sent to ${name}! (Backend logic needed)`);
    console.log(`Sending team-up request to student ID: ${id}`);
  };

  return (
    <div
      className="student-card"
      tabIndex="0"
      aria-labelledby={`student-name-${id}`}
    >
      <div className="student-card-header">
        <img src={profilePicture} alt={name} className="student-profile-img" />
        <div className="student-info">
          <h3 id={`student-name-${id}`} className="student-name">
            {name}
          </h3>
          <p className="student-details">
            {college} • {branch}
          </p>
        </div>
        <span
          className={`status-badge ${
            status === "available" ? "status-available" : "status-busy"
          }`}
        >
          {status === "available" ? "Available" : "In a Team"}
        </span>
      </div>

      <div className="student-card-body">
        <h4 className="skills-title">Skills</h4>
        <div className="skills-container">
          {skills.slice(0, 5).map((skill) => (
            <span key={skill} className="skill-tag">
              {getSkillIcon(skill)}
              {skill}
            </span>
          ))}
          {skills.length > 5 && (
            <span className="skill-tag-more">+{skills.length - 5} more</span>
          )}
        </div>
      </div>

      <div className="student-card-actions">
        {/* THE FIX: onClick handlers are now correctly implemented */}
        <button className="btn btn-outline" onClick={handleViewProfile}>
          View Profile
        </button>
        <button className="btn btn-gradient" onClick={handleSendRequest}>
          Send Request
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
