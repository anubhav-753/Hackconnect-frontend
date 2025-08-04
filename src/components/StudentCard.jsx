// src/components/StudentCard/StudentCard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./StudentCard.css";

const StudentCard = ({ student }) => {
  const [isRequestSent, setIsRequestSent] = useState(false);
  const isAvailable = student.status === "available";
  const statusClass = isAvailable ? "status-available" : "status-in-team";

  const handleSendRequest = () => {
    if (!isRequestSent) {
      console.log(`Friend request sent to ${student.name} (ID: ${student.id})`);
      setIsRequestSent(true);
    }
  };

  return (
    <div className="student-card shadow-md rounded-md transition-ease">
      <img
        src={student.profilePicture || "https://via.placeholder.com/150"}
        alt={student.name}
        className="student-profile-pic"
      />
      <h3 className="student-name">{student.name}</h3>
      <p className="student-details">
        {student.branch} | {student.college}, {student.state}
      </p>
      <div className="student-skills">
        {student.skills.map((skill, index) => (
          <span key={index} className="skill-tag">
            {skill}
          </span>
        ))}
      </div>
      <p className={`student-status ${statusClass}`}>
        Status: {student.status}
      </p>

      <div className="student-card-actions">
        <Link
          to={`/profile/${student.id}`}
          className="view-profile-btn transition-ease"
        >
          View Profile
        </Link>

        {isAvailable && (
          <button
            className={`send-request-btn primary-btn transition-ease ${
              isRequestSent ? "sent-disabled" : ""
            }`}
            onClick={handleSendRequest}
            disabled={isRequestSent}
          >
            {isRequestSent ? "Request Sent!" : "Send Request"}
          </button>
        )}
      </div>
    </div>
  );
};

export default StudentCard;
