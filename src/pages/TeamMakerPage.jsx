import React, { useState, useEffect } from "react";
import StudentCard from "../components/StudentCard"; // Make sure the path is correct
import "./TeamMakerPage.css";
import LoadingSpinner from "../components/LoadingSpinner"; // Assuming you have this component

// Mock data (extended for better demonstration)
const mockStudents = [
  {
    id: 1,
    name: "Aarav Sharma",
    profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
    college: "IIT Bombay",
    state: "Maharashtra",
    branch: "CSE",
    skills: ["Frontend", "React", "Node.js", "UI/UX", "Mobile Dev"],
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
    status: "in a team",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    profilePicture: "https://randomuser.me/api/portraits/women/4.jpg",
    college: "IIT Madras",
    state: "Tamil Nadu",
    branch: "CSE",
    skills: ["Data Science", "AI/ML", "React", "Python"],
    status: "available",
  },
  {
    id: 5,
    name: "Vikram Mehta",
    profilePicture: "https://randomuser.me/api/portraits/men/5.jpg",
    college: "IIIT Hyderabad",
    state: "Telangana",
    branch: "CSE",
    skills: ["Computer Vision", "C++", "Python", "AI/ML"],
    status: "available",
  },
  {
    id: 6,
    name: "Ananya Desai",
    profilePicture: "https://randomuser.me/api/portraits/women/6.jpg",
    college: "VIT Vellore",
    state: "Tamil Nadu",
    branch: "IT",
    skills: ["Frontend", "UI/UX", "Figma", "React"],
    status: "in a team",
  },
];

const TeamMakerPage = () => {
  const [college, setCollege] = useState("");
  const [state, setState] = useState("");
  const [skills, setSkills] = useState([]);
  const [branch, setBranch] = useState("");
  const [recommendedStudents, setRecommendedStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Derive lists from mock data
  const allColleges = [...new Set(mockStudents.map((s) => s.college))].sort();
  const allStates = [...new Set(mockStudents.map((s) => s.state))].sort();
  const allBranches = [...new Set(mockStudents.map((s) => s.branch))].sort();
  const allSkills = [...new Set(mockStudents.flatMap((s) => s.skills))].sort();

  // Simple emoji mapping for skills in the form
  const skillIcons = {
    "AI/ML": "🧠",
    Backend: "⚙️",
    "Computer Vision": "👁️",
    "Data Science": "📊",
    Frontend: "🖥️",
    React: "⚛️",
    "Node.js": "🟩",
    "UI/UX": "🎨",
    "Mobile Dev": "📱",
    Java: "☕",
    "Spring Boot": "🍃",
    "Database Management": "🗃️",
    Python: "🐍",
    "C++": "👾",
    Figma: "✏️",
  };

  useEffect(() => {
    // Initial load of students
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
    const { value, checked } = e.target;
    setSkills((prevSkills) =>
      checked
        ? [...prevSkills, value]
        : prevSkills.filter((skill) => skill !== value)
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
            ? skills.some((s) => student.skills.includes(s))
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
    <div className="team-maker-page">
      <div className="container">
        <h1 className="page-title">Find Your Dream Team with AI Team Maker</h1>

        <div className="team-maker-form-card">
          <h2 className="form-title">Build Your Team</h2>
          <div className="form-grid">
            {/* College Filter */}
            <div className="form-group">
              <label htmlFor="college" className="form-label">
                College
              </label>
              <div className="form-select-wrapper">
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
            </div>
            {/* State Filter */}
            <div className="form-group">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <div className="form-select-wrapper">
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
            </div>
            {/* Branch/Department Filter */}
            <div className="form-group">
              <label htmlFor="branch" className="form-label">
                Branch/Department
              </label>
              <div className="form-select-wrapper">
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
            </div>
          </div>
          {/* Skills Filter */}
          <div className="form-group form-group-full">
            <label className="form-label">Skills Needed</label>
            <div className="skills-checkbox-group">
              {allSkills.map((s) => (
                <label key={s} className="skill-pill-label" title={s}>
                  <input
                    type="checkbox"
                    value={s}
                    checked={skills.includes(s)}
                    onChange={handleSkillChange}
                    className="skill-checkbox-input"
                    aria-label={`Select skill: ${s}`}
                  />
                  <span className="skill-pill-text">
                    <span className="skill-icon">{skillIcons[s] || "⭐"}</span>
                    {s}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="form-actions">
            <button className="btn btn-gradient" onClick={handleFindTeammates}>
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
