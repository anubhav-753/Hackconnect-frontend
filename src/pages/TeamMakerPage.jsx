import React, { useState, useEffect } from "react";
import StudentCard from "../components/StudentCard";
import "./TeamMakerPage.css";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  getRecommendedStudents,
  sendConnectionRequest,
} from "../services/authService";

const TeamMakerPage = () => {
  // Filters
  const [college, setCollege] = useState("");
  const [state, setState] = useState("");
  const [skills, setSkills] = useState([]);
  const [branch, setBranch] = useState("");

  // Data
  const [recommendedStudents, setRecommendedStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Static lists
  const allColleges = [
    "IIT Bombay",
    "IIT Delhi",
    "IIT Madras",
    "IIT Kanpur",
    "IIT Kharagpur",
    "IIT Roorkee",
    "IIT Guwahati",
    "IIT Hyderabad",
    "NIT Trichy",
    "NIT Surathkal",
    "NIT Warangal",
    "NIT Rourkela",
    "BITS Pilani",
    "VIT Vellore",
    "IIIT Hyderabad",
    "DTU Delhi",
    "NSUT Delhi",
    "Jadavpur University",
    "COEP Pune",
    "Manipal IT",
  ].sort();

  const allStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi",
    "Chandigarh",
    "Jammu & Kashmir",
  ].sort();

  const allBranches = [
    "CSE - Computer Science",
    "IT - Information Technology",
    "ECE - Electronics",
    "EEE - Electrical",
    "ME - Mechanical",
    "CE - Civil",
    "AI/ML",
    "Data Science",
    "Chemical Engineering",
    "Biotechnology",
    "Aerospace Engineering",
  ].sort();

  // Skills (static list for a consistent UI)
  const allSkills = [
    "AI/ML",
    "Backend",
    "C++",
    "Computer Vision",
    "Data Science",
    "Database Management",
    "Figma",
    "Frontend",
    "Java",
    "Mobile Dev",
    "Node.js",
    "MongoDB",
    "Python",
    "React",
    "Spring Boot",
    "UI/UX",
  ];

  // Emoji map
  const skillIcons = {
    "AI/ML": "🧠",
    Backend: "⚙️",
    "C++": "👾",
    "Computer Vision": "👁️",
    "Data Science": "📊",
    "Database Management": "🗃️",
    Figma: "✏️",
    Frontend: "🖥️",
    Java: "☕",
    "Mobile Dev": "📱",
    "Node.js": "🟩",
    MongoDB: "🍀",
    Python: "🐍",
    React: "⚛️",
    "Spring Boot": "🍃",
    "UI/UX": "🎨",
    Default: "⭐",
  };

  // Load data
  useEffect(() => {
    loadRecommended();
  }, []);

  const loadRecommended = async (filters = {}) => {
    setLoading(true);
    try {
      const students = await getRecommendedStudents(filters);
      setRecommendedStudents(students);
    } catch (e) {
      console.error("Failed to fetch students", e);
    }
    setLoading(false);
  };

  // Skill pill toggle
  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    setSkills((prev) =>
      checked ? [...prev, value] : prev.filter((s) => s !== value)
    );
  };

  // Apply filters
  const handleFindTeammates = () => {
    const filters = {
      college: college || undefined,
      state: state || undefined,
      branch: branch || undefined,
      skills: skills.length > 0 ? skills.join(",") : undefined,
    };
    loadRecommended(filters);
  };

  // Clear filters
  const clearFilters = () => {
    setCollege("");
    setState("");
    setBranch("");
    setSkills([]);
    loadRecommended({});
  };

  // Send request
  const handleSendRequest = async (userId) => {
    try {
      const res = await sendConnectionRequest(userId);
      alert(res.message);
    } catch (err) {
      alert("Failed to send request. Maybe already sent?");
    }
  };

  return (
    <div className="team-maker-page">
      <div className="container">
        {/* Title */}
        <h1 className="page-title">Find Your Dream Team</h1>

        {/* Filters Card */}
        <div className="team-maker-form-card">
          <div className="filters-header">
            <h2>Filters</h2>
            <button className="btn btn--ghost btn--sm" onClick={clearFilters}>
              Clear
            </button>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>College</label>
              <select
                value={college}
                onChange={(e) => setCollege(e.target.value)}
              >
                <option value="">Any College</option>
                {allColleges.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>State</label>
              <select value={state} onChange={(e) => setState(e.target.value)}>
                <option value="">Any State</option>
                {allStates.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Branch</label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              >
                <option value="">Any Branch</option>
                {allBranches.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Skills Pills */}
          <div className="form-group">
            <label>Skills Needed</label>
            <div className="skills-checkbox-group">
              {allSkills.map((skill) => (
                <label key={skill}>
                  <input
                    type="checkbox"
                    value={skill}
                    checked={skills.includes(skill)}
                    onChange={handleSkillChange}
                  />
                  <span className="skill-pill-content">
                    <span className="skill-icon">
                      {skillIcons[skill] || skillIcons.Default}
                    </span>
                    {skill}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button className="btn btn--primary" onClick={handleFindTeammates}>
              Find Teammates
            </button>
          </div>
        </div>

        {/* Recommended Students */}
        <h2 className="section-subtitle">Recommended Students</h2>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="student-card-grid">
            {recommendedStudents.length > 0 ? (
              recommendedStudents.map((student) => (
                <StudentCard
                  key={student._id}
                  student={student}
                  onSendRequest={() => handleSendRequest(student._id)}
                />
              ))
            ) : (
              <p className="no-results-message">
                No students found matching your criteria. Try different filters!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMakerPage;
