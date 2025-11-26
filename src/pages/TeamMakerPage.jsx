import React, { useState, useEffect } from "react";
import StudentCard from "../components/StudentCard";
import "./TeamMakerPage.css";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  getRecommendedStudents,
  sendConnectionRequest,
} from "../services/authService";

const TeamMakerPage = () => {
  const [college, setCollege] = useState("");
  const [state, setState] = useState("");
  const [skills, setSkills] = useState([]);
  const [branch, setBranch] = useState("");
  const [recommendedStudents, setRecommendedStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const normalizeSkill = (skill) =>
    skill?.toLowerCase().replace(/\./g, "").replace(/\s+/g, "") || "";

  useEffect(() => {
    loadRecommended();
  }, []);

  const loadRecommended = async (filters = {}) => {
    setLoading(true);
    try {
      const students = await getRecommendedStudents(filters);
      setRecommendedStudents(students);
      setFilteredStudents(students);
    } catch (e) {
      console.error("Failed to fetch students", e);
    }
    setLoading(false);
  };

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    setSkills((prev) =>
      checked ? [...prev, value] : prev.filter((s) => s !== value)
    );
  };

  const handleFindTeammates = async () => {
    const filters = {
      college: college || undefined,
      state: state || undefined,
      branch: branch || undefined,
      skills:
        skills.length > 0
          ? skills
              .map((s) =>
                s.toLowerCase().replace(/\./g, "").replace(/\s+/g, "")
              )
              .join(",")
          : undefined,
    };

    await loadRecommended(filters);

    setFilteredStudents(() => {
      if (skills.length === 0) return recommendedStudents;
      return recommendedStudents.filter((student) => {
        const studentSkills = (student.skills || []).map(normalizeSkill);
        return skills.every((sel) =>
          studentSkills.includes(normalizeSkill(sel))
        );
      });
    });
  };

  const clearFilters = () => {
    setCollege("");
    setState("");
    setBranch("");
    setSkills([]);
    loadRecommended({});
  };

  // ✅ Return success flag so button can update
  const handleSendRequest = async (userId) => {
    try {
      const res = await sendConnectionRequest(userId);
      alert(res.message);
      return true;
    } catch (err) {
      alert("Failed to send request. Maybe already sent?");
      return false;
    }
  };

  return (
    <div className="team-maker-page">
      <div className="container">
        <h1 className="page-title">Find Your Dream Team</h1>

        {/* ---------------- Filters ---------------- */}
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
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>State</label>
              <select value={state} onChange={(e) => setState(e.target.value)}>
                <option value="">Any State</option>
                {allStates.map((s) => (
                  <option key={s}>{s}</option>
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
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>

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

        {/* ---------------- Recommended Students ---------------- */}
        <h2 className="section-subtitle">Recommended Students</h2>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="student-card-grid">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <StudentCard
                  key={student._id}
                  student={student}
                  onSendRequest={handleSendRequest}
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
