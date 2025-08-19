import React, { useState, useEffect, useRef, useCallback } from "react";

// --- SVG Icons for Social Links (Integrated for a cleaner look) ---
const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-5 h-5 fill-current"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);
const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-5 h-5 fill-current"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);
const PortfolioIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-5 h-5 fill-current"
  >
    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1 15.5v-7l6 3.5-6 3.5z" />
  </svg>
);
const defaultUserIcon =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2EwYTVhZSI+PHBhdGggZD0iTTEyIDJDNi44MiAyIDIgNi44MiAyIDEyczQuODIgMTAgMTAgMTAgMTAtNC44MiAxMC0xMFMxNy4xOCAyIDEyIDJ6bTAgM2MxLjY2IDAgMyAxLjM0IDMgM3MtMS4zNCAzLTMgMy0zLTEuMzQtMy0zIDEuMzQtMyAzLTN6bTAgMTRjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6Ii8+PC9zdmc+";

// Main App Component
const App = () => {
  const fileInputRef = useRef(null);

  // --- State Management ---
  const [displayedUser, setDisplayedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // --- Initial Data Loading ---
  useEffect(() => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      const mockUser = {
        name: "Alex Doe",
        profilePicture: defaultUserIcon,
        status: "available",
        bio: "A passionate developer ready to build amazing things. I specialize in creating modern, responsive web applications with a focus on user experience.",
        skills: ["React", "JavaScript", "Node.js", "Tailwind CSS", "Next.js"],
        achievements:
          "Winner of the 'Most Innovative Idea' award at a recent hackathon.",
        socialLinks: {
          linkedin: "https://linkedin.com/in/alexdoe",
          github: "https://github.com/alexdoe",
          portfolio: "https://alexdoe.com",
        },
      };
      setDisplayedUser(mockUser);
      setLoading(false);
    }, 800);
  }, []);

  // --- Event Handlers ---
  const handleEdit = () => {
    setFormData({
      ...displayedUser,
      skills: displayedUser.skills.join(", "), // Convert array to string for editing
    });
    setImagePreview(displayedUser.profilePicture);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, newProfilePicture: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    const skillsArray =
      typeof formData.skills === "string"
        ? formData.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean)
        : displayedUser.skills;

    const finalData = {
      ...formData,
      skills: skillsArray,
      profilePicture: imagePreview || displayedUser.profilePicture,
    };
    delete finalData.newProfilePicture;

    setDisplayedUser(finalData);
    setIsEditing(false);
    setImagePreview(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- Gemini API Bio Generation ---
  const generateBio = useCallback(async () => {
    const keywords = formData.skills || "";
    if (!keywords) {
      alert("Please add some skills first to generate a bio.");
      return;
    }
    setIsGenerating(true);

    const prompt = `Write a professional and engaging bio for a software engineer's profile page, in the first person. The bio should be around 50-70 words. Use the following keywords as inspiration: "${keywords}".`;

    const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
    const apiKey = ""; // API key is handled by the environment
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        setFormData((prev) => ({ ...prev, bio: text.trim() }));
      } else {
        throw new Error("Unexpected response structure from Gemini API.");
      }
    } catch (err) {
      console.error("API call failed:", err);
      alert("Failed to generate bio. Please try again later.");
    } finally {
      setIsGenerating(false);
    }
  }, [formData.skills]);

  // --- Render Logic ---
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p>Loading Profile...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );
  if (!displayedUser) return null;

  const userToDisplay = isEditing
    ? { ...formData, profilePicture: imagePreview }
    : displayedUser;
  const statusClass =
    userToDisplay.status === "available" ? "bg-green-500" : "bg-red-500";

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* --- Left Column: Profile Card --- */}
            <div className="lg:col-span-1 flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl border">
              <div className="relative">
                <img
                  src={userToDisplay.profilePicture}
                  alt={userToDisplay.name}
                  className="w-36 h-36 rounded-full border-4 border-blue-400 object-cover shadow-lg"
                />
                {isEditing && (
                  <button
                    className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
                    onClick={() => fileInputRef.current.click()}
                    aria-label="Change profile picture"
                  >
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                      <path
                        fillRule="evenodd"
                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                style={{ display: "none" }}
                accept="image/*"
              />

              {isEditing ? (
                <input
                  name="name"
                  value={userToDisplay.name}
                  onChange={handleFormChange}
                  className="text-3xl font-bold mt-4 bg-gray-200 rounded-md p-2 text-center w-full"
                />
              ) : (
                <h1 className="text-3xl font-bold mt-4">
                  {userToDisplay.name}
                </h1>
              )}

              <div
                className={`mt-2 text-xs font-semibold px-3 py-1 rounded-full text-white ${statusClass}`}
              >
                Status: {userToDisplay.status}
              </div>

              <div className="flex justify-center space-x-4 mt-6">
                <a
                  href={userToDisplay.socialLinks.linkedin}
                  className="text-gray-500 hover:text-blue-600"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href={userToDisplay.socialLinks.github}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <GitHubIcon />
                </a>
                <a
                  href={userToDisplay.socialLinks.portfolio}
                  className="text-gray-500 hover:text-blue-500"
                >
                  <PortfolioIcon />
                </a>
              </div>

              <div className="mt-8 w-full">
                {isEditing ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* --- Right Column: Detailed Information --- */}
            <div className="lg:col-span-2 space-y-8">
              {/* Bio Section */}
              <div>
                <h2 className="text-2xl font-semibold border-b-2 border-blue-400 pb-2 mb-4">
                  Bio
                </h2>
                {isEditing ? (
                  <div className="space-y-3">
                    <textarea
                      name="bio"
                      value={userToDisplay.bio}
                      onChange={handleFormChange}
                      rows="4"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                    ></textarea>
                    <button
                      onClick={generateBio}
                      disabled={isGenerating}
                      className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 text-white font-semibold py-2 px-5 rounded-lg flex items-center justify-center"
                    >
                      {isGenerating ? "Generating..." : "✨ Generate with AI"}
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-600 leading-relaxed">
                    {userToDisplay.bio}
                  </p>
                )}
              </div>

              {/* Skills Section */}
              <div>
                <h2 className="text-2xl font-semibold border-b-2 border-blue-400 pb-2 mb-4">
                  Skills
                </h2>
                {isEditing ? (
                  <input
                    name="skills"
                    value={userToDisplay.skills}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                    placeholder="Comma-separated skills"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {userToDisplay.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1.5 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Achievements Section */}
              <div>
                <h2 className="text-2xl font-semibold border-b-2 border-blue-400 pb-2 mb-4">
                  Achievements
                </h2>
                {isEditing ? (
                  <textarea
                    name="achievements"
                    value={userToDisplay.achievements}
                    onChange={handleFormChange}
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  ></textarea>
                ) : (
                  <div className="flex items-start">
                    <span className="text-yellow-500 mt-1 mr-3 text-xl">
                      🏆
                    </span>
                    <p className="text-gray-600">
                      {userToDisplay.achievements}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
