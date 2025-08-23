// src/pages/TeamMakerPage.jsx
import React, { useState, useEffect } from "react";
import StudentCard from "../components/StudentCard";
import "./TeamMakerPage.css";
import LoadingSpinner from "../components/LoadingSpinner";

// Mock data remains the same...
const mockStudents = [
  {
    id: 1,
    name: "Aarav Sharma",
    profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
    college: "IIT Bombay",
    state: "Maharashtra",
    branch: "CSE",
    skills: ["Frontend", "React", "Node.js", "UI/UX", "Mobile Dev"],
    achievements: "Winner of CodeFest 2024; Contributed to open-source project",
    status: "available",
  },
  {
    id: 2,
    name: "Priya Singh",
    profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
    college: "NIT Rourkela",
    state: "Odisha",
    branch: "ECE",
    skills: ["AI/ML", "Python", "Data Science", "Computer Vision"],
    achievements:
      "Published research paper on NLP; Top 10 in Kaggle competition",
    status: "available",
  },
  {
    id: 3,
    name: "Rahul Kumar",
    profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
    college: "BITS Pilani",
    state: "Rajasthan",
    branch: "IT",
    skills: ["Backend", "Java", "Spring Boot", "Database Management"],
    achievements: "Developed an e-commerce platform; Certified Oracle DBA",
    status: "in a team",
  },
  // ... other students
];

const TeamMakerPage = () => {
  const [college, setCollege] = useState("");
  const [state, setState] = useState("");
  const [skills, setSkills] = useState([]);
  const [branch, setBranch] = useState("");
  const [recommendedStudents, setRecommendedStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const allColleges = [...new Set(mockStudents.map((s) => s.college))].sort();
  const allStates = [...new Set(mockStudents.map((s) => s.state))].sort();
  const allBranches = [...new Set(mockStudents.map((s) => s.branch))].sort();
  const allSkills = [...new Set(mockStudents.flatMap((s) => s.skills))].sort();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setRecommendedStudents(
        mockStudents.filter((s) => s.status === "available").slice(0, 6)
      );
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSkillChange = (e) => {
    const value = e.target.value;
    setSkills(
      skills.includes(value)
        ? skills.filter((skill) => skill !== value)
        : [...skills, value]
    );
  };

  const handleFindTeammates = () => {
    setLoading(true);
    const timer = setTimeout(() => {
      const filteredStudents = mockStudents.filter((student) => {
        const collegeMatch = college ? student.college === college : true;
        const stateMatch = state ? student.state === state : true;
        const branchMatch = branch ? student.branch === branch : true;
        const skillsMatch =
          skills.length > 0
            ? skills.some((selectedSkill) =>
                student.skills.includes(selectedSkill)
              )
            : true;

        return (
          student.status === "available" &&
          collegeMatch &&
          stateMatch &&
          branchMatch &&
          skillsMatch
        );
      });
      setRecommendedStudents(filteredStudents);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  };

  return (
    <div className="page-section team-maker-page">
      <div className="container">
        <h1 className="page-title">Find Your Dream Team with AI Team Maker</h1>

        <div className="team-maker-form-card shadow-md rounded-md">
          <h2 className="form-title">Build Your Team</h2>
          <div className="form-grid">
            {/* College Filter */}
            <div className="form-group">
              <label htmlFor="college" className="form-label">
                College:
              </label>
              <select
                id="college"
                className="form-select"
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
            {/* State Filter */}
            <div className="form-group">
              <label htmlFor="state" className="form-label">
                State:
              </label>
              <select
                id="state"
                className="form-select"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">Any State</option>
                {allStates.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            {/* Branch/Department Filter */}
            <div className="form-group">
              <label htmlFor="branch" className="form-label">
                Branch/Department:
              </label>
              <select
                id="branch"
                className="form-select"
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
            {/* --- MODIFIED SKILLS FILTER SECTION --- */}
            <div className="form-group form-group-skills">
              <label className="form-label">Skills Needed:</label>
              <div className="skills-checkbox-group">
                {allSkills.map((s) => (
                  <label key={s} className="skill-checkbox-label">
                    <input
                      type="checkbox"
                      value={s}
                      checked={skills.includes(s)}
                      onChange={handleSkillChange}
                      className="form-checkbox"
                    />
                    <span className="skill-checkbox-text">{s}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* --- END OF MODIFIED SECTION --- */}
          </div>

          <div className="form-actions">
            <button
              className="primary-btn form-submit-btn transition-ease"
              onClick={handleFindTeammates}
            >
              Find Teammates
            </button>
          </div>
        </div>

        <h2 className="section-subtitle">Recommended Students</h2>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="student-card-grid">
            {recommendedStudents.length > 0 ? (
              recommendedStudents.map((student) => (
                <StudentCard key={student.id} student={student} />
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
