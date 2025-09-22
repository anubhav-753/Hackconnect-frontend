import React, { useEffect, useState } from "react";
import { getRecommendedStudents } from "../services/authService";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";
import "./RecommendedStudents.css"; // optional for styling

const RecommendedStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getRecommendedStudents();
        setStudents(data);
      } catch (err) {
        console.error("⚠️ Failed to load recommended students", err);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div className="recommended-students">
      <h2>Recommended Students</h2>
      <div className="student-cards">
        {students.map((student) => (
          <div key={student._id} className="student-card">
            <img
              src={student.avatar || "/default-avatar.png"}
              alt={student.name}
              className="student-avatar"
            />
            <h3>{student.name}</h3>
            <p>{student.college || "No College Info"} • {student.branch || "Branch not set"}</p>

            {/* Status */}
            <span className={`status ${student.status === "Available" ? "available" : "unavailable"}`}>
              {student.status || "Not Available"}
            </span>

            {/* Skills */}
            <h4>Skills</h4>
            <div className="skills">
              {student.skills?.length > 0 ? (
                student.skills.map((skill, idx) => (
                  <span key={idx} className="skill-tag">
                    {skill}
                  </span>
                ))
              ) : (
                <p>No skills listed</p>
              )}
            </div>

            {/* Social Links */}
            <div className="social-icons">
              {student.socialLinks?.linkedin && (
                <a href={student.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
              )}
              {student.socialLinks?.github && (
                <a href={student.socialLinks.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
              )}
              {student.socialLinks?.portfolio && (
                <a href={student.socialLinks.portfolio} target="_blank" rel="noopener noreferrer">
                  <FaGlobe />
                </a>
              )}
            </div>

            {/* Actions */}
            <div className="actions">
              <a href={`/profile/${student._id}`} className="view-profile">View Profile</a>
              <button className="send-request">Send Request</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedStudents;