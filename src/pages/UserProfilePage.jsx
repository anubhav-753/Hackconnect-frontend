// src/pages/UserProfilePage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./UserProfilePage.css";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../contexts/AuthContext";

// Re-using the mock student data from TeamMakerPage.jsx for now
// NOTE: Ensure mockStudents has ALL fields including socialLinks, bio, etc.
const mockStudents = [
  {
    id: 1,
    name: "Aarav Sharma",
    profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
    college: "IIT Bombay",
    state: "Maharashtra",
    branch: "CSE",
    skills: [
      "Frontend",
      "React",
      "Node.js",
      "UI/UX",
      "Mobile Dev",
      "Cloud Development",
    ],
    achievements:
      "Winner of CodeFest 2024; Contributed to open-source project; Published article on Web Performance",
    bio: "Passionate full-stack developer with a keen interest in building scalable and user-friendly web applications. Love hackathons for the intense learning and collaborative environment.",
    status: "available",
    socialLinks: {
      linkedin: "https://linkedin.com/in/aaravsharma",
      github: "https://github.com/aaravdev",
    },
  },
  {
    id: 2,
    name: "Priya Singh",
    profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
    college: "NIT Rourkela",
    state: "Odisha",
    branch: "ECE",
    skills: [
      "AI/ML",
      "Python",
      "Data Science",
      "Computer Vision",
      "Deep Learning",
    ],
    achievements:
      "Published research paper on NLP; Top 10 in Kaggle competition; Developed a smart city prototype",
    bio: "AI enthusiast exploring the frontiers of machine learning. Specializing in computer vision and natural language processing. Eager to apply AI solutions to real-world problems.",
    status: "available",
    socialLinks: {
      linkedin: "https://linkedin.com/in/priyasingh",
      github: "https://github.com/priyaai",
    },
  },
  {
    id: 3,
    name: "Rahul Kumar",
    profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
    college: "BITS Pilani",
    state: "Rajasthan",
    branch: "IT",
    skills: [
      "Backend",
      "Java",
      "Spring Boot",
      "Database Management",
      "Cloud Architecture",
    ],
    achievements:
      "Developed an e-commerce platform; Certified Oracle DBA; Lead developer in university project",
    bio: "Experienced backend developer focused on robust and scalable systems. Proficient in Java and Spring Boot, with a strong understanding of database design and cloud services.",
    status: "in a team",
    socialLinks: {
      linkedin: "https://linkedin.com/in/rahulkumar",
      github: "https://github.com/rahuldev",
    },
  },
  {
    id: 4,
    name: "Disha Patel",
    profilePicture: "https://randomuser.me/api/portraits/women/4.jpg",
    college: "VIT Vellore",
    state: "Tamil Nadu",
    branch: "CSE",
    skills: [
      "Design",
      "Figma",
      "Photoshop",
      "UI/UX",
      "Graphic Design",
      "Web Design",
    ],
    achievements:
      "Designed 5+ mobile apps; Winner of Designathon 2023; Created design systems for startups",
    bio: "Creative UI/UX designer passionate about crafting intuitive and visually stunning digital experiences. Loves translating complex ideas into elegant designs.",
    status: "available",
    socialLinks: {
      linkedin: "https://linkedin.com/in/dishapatel",
      github: "https://github.com/dishadesigns",
    },
  },
  {
    id: 5,
    name: "Vikram Reddy",
    profilePicture: "https://randomuser.me/api/portraits/men/5.jpg",
    college: "IIT Madras",
    state: "Tamil Nadu",
    branch: "CSE",
    skills: [
      "AI/ML",
      "Deep Learning",
      "TensorFlow",
      "NLP",
      "Cloud Computing",
      "Research",
    ],
    achievements:
      "Built autonomous drone prototype; Google AI Residency alumnus; Published several research papers",
    bio: "Dedicated AI researcher and developer with a focus on cutting-edge deep learning models. Always looking for challenging projects to push the boundaries of AI.",
    status: "available",
    socialLinks: {
      linkedin: "https://linkedin.com/in/vikramreddy",
      github: "https://github.com/vikramai",
    },
  },
  {
    id: 6,
    name: "Sneha Sharma",
    profilePicture: "https://randomuser.me/api/portraits/women/6.jpg",
    college: "Delhi Technological University",
    state: "Delhi",
    branch: "IT",
    skills: ["Frontend", "Vue.js", "UX Research", "Accessibility"],
    achievements:
      "Lead UI/UX at startup hackathon; Created accessible web components",
    bio: "Frontend specialist passionate about creating highly performant and accessible web applications. Believes in inclusive design and continuous learning.",
    status: "available",
    socialLinks: {
      linkedin: "https://linkedin.com/in/snehasharma",
      github: "https://github.com/snehafrontend",
    },
  },
  {
    id: 7,
    name: "Arjun Gupta",
    profilePicture: "https://randomuser.me/api/portraits/men/7.jpg",
    college: "IIT Delhi",
    state: "Delhi",
    branch: "ECE",
    skills: ["Embedded Systems", "IoT", "C++", "Hardware Design"],
    achievements: "Built smart home automation system; Published IEEE paper",
    bio: "Innovator in embedded systems and IoT. Enthusiastic about bringing physical devices to life with code and hardware. Always keen on interdisciplinary projects.",
    status: "available",
    socialLinks: {
      linkedin: "https://linkedin.com/in/arjuncs",
      github: "https://github.com/arjuniot",
    },
  },
  {
    id: 8,
    name: "Sonia Kapoor",
    profilePicture: "https://randomuser.me/api/portraits/women/8.jpg",
    college: "SRM Institute of Science and Technology",
    state: "Tamil Nadu",
    branch: "IT",
    skills: ["Backend", "Python", "Django", "APIs", "Cybersecurity"],
    achievements: "Developed secure authentication system; Bug bounty hunter",
    status: "in a team",
    socialLinks: {
      linkedin: "https://linkedin.com/in/soniak",
      github: "https://github.com/soniabackend",
    },
  },
];

function UserProfilePage() {
  const { id } = useParams();
  const { user: currentUser, isLoggedIn, updateUser } = useAuth(); // Get currentUser and updateUser function

  const [displayedUser, setDisplayedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const isMyProfile =
    isLoggedIn && currentUser && parseInt(id) === currentUser.id;

  useEffect(() => {
    setLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      let userToLoad = null;
      // Always try to find the user from mockStudents first by ID
      const foundUserInMocks = mockStudents.find((s) => s.id === parseInt(id));

      if (foundUserInMocks) {
        // Create a mutable copy and ensure socialLinks is an object
        const userCopy = { ...foundUserInMocks };
        if (!userCopy.socialLinks) userCopy.socialLinks = {};
        if (!userCopy.skills) userCopy.skills = []; // Ensure skills is an array
        if (!userCopy.achievements) userCopy.achievements = ""; // Ensure achievements is string

        setDisplayedUser(userCopy);
        setFormData(userCopy); // Initialize form data for editing

        // If this is the logged-in user's profile, update AuthContext with full mock data details
        // This ensures currentUser in context has all detailed properties like status, bio etc.
        if (
          isMyProfile &&
          currentUser.id === foundUserInMocks.id &&
          updateUser
        ) {
          updateUser(userCopy); // Update context user with full details from mock
        }
        setLoading(false);
      } else {
        setError("User not found.");
        setLoading(false);
      }
    }, 500); // Simulate 500ms loading time
    return () => clearTimeout(timer);
  }, [id, isMyProfile, currentUser, updateUser]); // Rerun if ID, isMyProfile, currentUser, or updateUser function changes

  const handleEdit = () => {
    setIsEditing(true);
    // Create a deep copy of current displayed user's data for form, especially for socialLinks
    setFormData({
      ...displayedUser,
      socialLinks: { ...(displayedUser.socialLinks || {}) },
      skills: [...(displayedUser.skills || [])],
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Revert form data to original displayed user data (deep copy for socialLinks)
    setFormData({
      ...displayedUser,
      socialLinks: { ...(displayedUser.socialLinks || {}) },
      skills: [...(displayedUser.skills || [])],
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    // Handle nested socialLinks specifically
    if (name.startsWith("socialLinks.")) {
      const socialPlatform = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialPlatform]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    console.log("Saving user data (frontend simulation):", formData);

    // Simulate API call success
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update the displayed user data on frontend
    setDisplayedUser({ ...formData });
    setIsEditing(false); // Exit editing mode
    setLoading(false);

    // Update user in AuthContext if it's "My Profile"
    if (isMyProfile && updateUser) {
      updateUser({ ...formData }); // Pass the updated formData to context
    }
    alert("Profile updated successfully (frontend simulation)!"); // Simple feedback
  };

  // Ensure displayedUser is not null before proceeding to render
  if (loading) {
    return (
      <div className="page-section user-profile-page flex-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-section user-profile-page flex-center">
        <p className="error-message">{error}</p>
        <Link to="/team-maker" className="back-link">
          Back to Team Maker
        </Link>
      </div>
    );
  }

  // If user is null AFTER loading and no error, means profile data is unavailable
  if (!displayedUser) {
    return (
      <div className="page-section user-profile-page flex-center">
        <p className="error-message">
          Profile data unavailable or user not found.
        </p>
        <Link to="/team-maker" className="back-link">
          Back to Team Maker
        </Link>
      </div>
    );
  }

  // Use userToDisplay for rendering, which will be either original displayedUser or formData
  const userToDisplay = isEditing ? formData : displayedUser;
  const isAvailable = userToDisplay.status === "available";
  const statusClass = isAvailable ? "status-available" : "status-in-team";

  return (
    <div className="page-section user-profile-page">
      <div className="container user-profile-container">
        <div className="profile-header shadow-md rounded-md">
          <img
            src={
              userToDisplay.profilePicture || "https://via.placeholder.com/200"
            }
            alt={userToDisplay.name}
            className="profile-picture"
          />
          <div className="profile-header-info">
            {isEditing ? ( // Show input for name in editing mode
              <input
                type="text"
                name="name"
                value={userToDisplay.name || ""}
                onChange={handleFormChange}
                className="form-input profile-name-input"
                placeholder="Full Name"
              />
            ) : (
              <h1 className="profile-name">{userToDisplay.name}</h1>
            )}

            <p className="profile-info">
              {isEditing ? ( // Show inputs for college, state, branch
                <>
                  <input
                    type="text"
                    name="branch"
                    value={userToDisplay.branch || ""}
                    onChange={handleFormChange}
                    className="form-input profile-inline-input"
                    placeholder="Branch"
                  />
                  <span> | </span>
                  <input
                    type="text"
                    name="college"
                    value={userToDisplay.college || ""}
                    onChange={handleFormChange}
                    className="form-input profile-inline-input"
                    placeholder="College"
                  />
                  <span>, </span>
                  <input
                    type="text"
                    name="state"
                    value={userToDisplay.state || ""}
                    onChange={handleFormChange}
                    className="form-input profile-inline-input"
                    placeholder="State"
                  />
                </>
              ) : (
                `${userToDisplay.branch || ""} | ${
                  userToDisplay.college || ""
                }, ${userToDisplay.state || ""}`
              )}
            </p>

            {/* Status is not editable in this simple demo, always displayed */}
            <p className={`profile-status-badge ${statusClass}`}>
              Status: {userToDisplay.status || "N/A"}
            </p>

            <div className="profile-social-links">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="socialLinks.linkedin"
                    value={userToDisplay.socialLinks.linkedin || ""}
                    onChange={handleFormChange}
                    className="form-input profile-inline-input"
                    placeholder="LinkedIn URL"
                  />
                  <input
                    type="text"
                    name="socialLinks.github"
                    value={userToDisplay.socialLinks.github || ""}
                    onChange={handleFormChange}
                    className="form-input profile-inline-input"
                    placeholder="GitHub URL"
                  />
                </>
              ) : (
                <>
                  {userToDisplay.socialLinks.linkedin && (
                    <a
                      href={userToDisplay.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      LinkedIn
                    </a>
                  )}
                  {userToDisplay.socialLinks.github && (
                    <a
                      href={userToDisplay.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      GitHub
                    </a>
                  )}
                </>
              )}
            </div>
            {/* Edit/Save/Cancel Buttons for My Profile */}
            {isMyProfile && (
              <div className="profile-edit-actions">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="primary-btn transition-ease"
                    >
                      Save Profile
                    </button>
                    <button
                      onClick={handleCancel}
                      className="secondary-btn transition-ease"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="secondary-btn transition-ease"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="profile-details-card shadow-md rounded-md">
          <h2 className="section-heading">Bio</h2>
          {isEditing ? (
            <textarea
              name="bio"
              value={userToDisplay.bio || ""}
              onChange={handleFormChange}
              className="form-input profile-textarea-input"
              rows="5"
              placeholder="Tell us about yourself..."
            ></textarea>
          ) : (
            <p className="profile-bio">
              {userToDisplay.bio || "No bio provided."}
            </p>
          )}

          <h2 className="section-heading">Skills</h2>
          {isEditing ? (
            <textarea
              name="skills"
              value={
                userToDisplay.skills ? userToDisplay.skills.join(", ") : ""
              }
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  skills: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter((s) => s),
                }))
              }
              className="form-input profile-textarea-input"
              rows="3"
              placeholder="Comma-separated skills (e.g., React, Node.js)"
            ></textarea>
          ) : (
            <div className="profile-skills-list">
              {userToDisplay.skills && userToDisplay.skills.length > 0 ? (
                userToDisplay.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))
              ) : (
                <p className="no-info-message">No skills listed.</p>
              )}
            </div>
          )}

          <h2 className="section-heading">Achievements</h2>
          {isEditing ? (
            <textarea
              name="achievements"
              value={userToDisplay.achievements || ""}
              onChange={handleFormChange}
              className="form-input profile-textarea-input"
              rows="5"
              placeholder="List your achievements (e.g., 'Won X Hackathon; Published Y Paper')"
            ></textarea>
          ) : (
            <p className="profile-achievements">
              {userToDisplay.achievements || "No achievements listed."}
            </p>
          )}
        </div>

        {/* Back to Team Maker button (hide if editing own profile) */}
        {!isMyProfile && (
          <Link
            to="/team-maker"
            className="back-to-team-maker-btn primary-btn transition-ease"
          >
            ← Back to Team Maker
          </Link>
        )}
      </div>
    </div>
  );
}

export default UserProfilePage;
