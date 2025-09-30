import React from "react";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";

const StudentCard = ({ student, onSendRequest }) => {
  const status = (student?.status || "Not Available").toLowerCase();
  const isAvailable =
    status.includes("available") || status === "available" || status === "open";

  const avatarSrc =
    student?.avatar && student.avatar.trim() !== ""
      ? student.avatar
      : "/default-avatar.png";

  return (
    <div className="student-card">
      <div className="student-card__header">
        <img
          src={avatarSrc}
          alt={student?.name || "Student Avatar"}
          className="student-card__avatar"
          onError={(e) => (e.currentTarget.src = "/default-avatar.png")}
        />
        <div className="student-card__title">
          <h3 className="student-card__name">{student?.name || "Unknown"}</h3>
          <p className="student-card__meta">
            {student?.college || "—"}
            {student?.branch ? ` • ${student.branch}` : ""}
          </p>
        </div>
        <span
          className={`student-card__status ${
            isAvailable ? "available" : "unavailable"
          }`}
        >
          {isAvailable ? "Available" : "Not Available"}
        </span>
      </div>

      <div className="student-card__divider" />

      <div className="student-card__block">
        <h4 className="student-card__label">Skills</h4>
        <div className="student-card__skills">
          {Array.isArray(student?.skills) && student.skills.length > 0 ? (
            student.skills.map((s, idx) => (
              <span className="chip" key={`${s}-${idx}`}>
                {s}
              </span>
            ))
          ) : (
            <span className="muted">No skills yet</span>
          )}
        </div>
      </div>

      <div className="student-card__social">
        {student?.socialLinks?.linkedin && (
          <a
            href={student.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="social-icon"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
        )}
        {student?.socialLinks?.github && (
          <a
            href={student.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="social-icon"
            title="GitHub"
          >
            <FaGithub />
          </a>
        )}
        {student?.socialLinks?.portfolio && (
          <a
            href={student.socialLinks.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Portfolio"
            className="social-icon"
            title="Portfolio"
          >
            <FaGlobe />
          </a>
        )}
      </div>

      <div className="student-card__actions">
        <a href={`/profile/${student?._id}`} className="btn btn--ghost">
          View Profile
        </a>
        <button
          type="button"
          className="btn btn--primary"
          onClick={onSendRequest}
        >
          Send Request
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
