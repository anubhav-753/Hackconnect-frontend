// src/pages/HackathonListingPage.jsx
import React, { useState, useEffect } from "react";
import "./HackathonListingPage.css";
import LoadingSpinner from "../components/LoadingSpinner"; // NEW: Import LoadingSpinner

const mockHackathons = [
  {
    id: 1,
    name: "InnovateX Global Hackathon",
    startDate: "2025-08-10",
    endDate: "2025-08-12",
    time: "9:00 AM IST",
    location: "Online",
    type: "International",
    status: "upcoming",
  },
  {
    id: 2,
    name: "Code for Good India",
    startDate: "2025-07-28",
    endDate: "2025-07-30",
    time: "10:00 AM IST",
    location: "Bengaluru, India",
    type: "National",
    status: "ongoing",
  },
  {
    id: 3,
    name: "Future AI Challenge",
    startDate: "2025-09-05",
    endDate: "2025-09-07",
    time: "11:00 AM PST",
    location: "San Francisco, USA (Online)",
    type: "International",
    status: "upcoming",
  },
  {
    id: 4,
    name: "EcoHack Kerala",
    startDate: "2025-08-20",
    endDate: "2025-08-22",
    time: "9:30 AM IST",
    location: "Kochi, India",
    type: "National",
    status: "upcoming",
  },
  {
    id: 5,
    name: "Quantum Leap Hackathon",
    startDate: "2025-07-20",
    endDate: "2025-07-22",
    time: "1:00 PM EST",
    location: "New York, USA",
    type: "International",
    status: "past",
  },
  {
    id: 6,
    name: "Student Innovation Summit",
    startDate: "2025-08-01",
    endDate: "2025-08-03",
    time: "9:00 AM IST",
    location: "Delhi, India (Hybrid)",
    type: "National",
    status: "upcoming",
  },
];

function HackathonListingPage() {
  const [hackathons, setHackathons] = useState([]);
  const [statusFilter, setStatusFilter] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [loading, setLoading] = useState(true); // NEW: Add loading state

  useEffect(() => {
    setLoading(true); // Set loading to true at the start of fetch/filter
    // Simulate a network request delay
    const timer = setTimeout(() => {
      let filtered = mockHackathons;

      // 1. Filter by status
      const now = new Date();
      filtered = filtered.filter((h) => {
        const startDate = new Date(h.startDate + "T00:00:00");
        const endDate = new Date(h.endDate + "T23:59:59");

        if (statusFilter === "ongoing") {
          return startDate <= now && endDate >= now;
        }
        if (statusFilter === "upcoming") {
          return startDate > now;
        }
        if (statusFilter === "past") {
          return endDate < now;
        }
        return true;
      });

      // 2. Filter by search term
      if (searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        filtered = filtered.filter(
          (h) =>
            h.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            h.location.toLowerCase().includes(lowerCaseSearchTerm)
        );
      }

      // 3. Filter by type
      if (typeFilter) {
        filtered = filtered.filter((h) => h.type === typeFilter);
      }

      setHackathons(filtered);
      setLoading(false); // Set loading to false after data is ready
    }, 500); // Simulate 500ms loading time

    return () => clearTimeout(timer); // Cleanup timeout on unmount or re-render
  }, [statusFilter, searchTerm, typeFilter]);

  const formatDateRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const options = { month: "short", day: "numeric", year: "numeric" };

    if (
      startDate.getFullYear() === endDate.getFullYear() &&
      startDate.getMonth() === endDate.getMonth() &&
      startDate.getDate() === endDate.getDate()
    ) {
      return startDate.toLocaleDateString("en-US", options);
    } else if (startDate.getFullYear() === endDate.getFullYear()) {
      return `${startDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })} - ${endDate.toLocaleDateString("en-US", options)}`;
    } else {
      return `${startDate.toLocaleDateString(
        "en-US",
        options
      )} - ${endDate.toLocaleDateString("en-US", options)}`;
    }
  };

  return (
    <div className="page-section hackathon-listing-page">
      <div className="container">
        <h1 className="page-title">Explore Hackathons</h1>
        <p className="page-description">
          Find the latest ongoing and upcoming national and international
          hackathons.
        </p>

        <div className="hackathon-filters-bar">
          <input
            type="text"
            className="filter-search-input form-input"
            placeholder="Search by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="filter-type-select form-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="National">National</option>
            <option value="International">International</option>
          </select>
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${
              statusFilter === "upcoming" ? "active-filter" : ""
            } transition-ease`}
            onClick={() => setStatusFilter("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`filter-btn ${
              statusFilter === "ongoing" ? "active-filter" : ""
            } transition-ease`}
            onClick={() => setStatusFilter("ongoing")}
          >
            Ongoing
          </button>
          <button
            className={`filter-btn ${
              statusFilter === "past" ? "active-filter" : ""
            } transition-ease`}
            onClick={() => setStatusFilter("past")}
          >
            Past
          </button>
        </div>

        {loading ? ( // NEW: Conditional rendering for loading spinner
          <LoadingSpinner />
        ) : (
          <div className="hackathon-grid">
            {hackathons.length > 0 ? (
              hackathons.map((hackathon) => (
                <div
                  key={hackathon.id}
                  className="hackathon-card shadow-md rounded-md transition-ease"
                >
                  <h3 className="hackathon-name">{hackathon.name}</h3>
                  <p className="hackathon-date">
                    {formatDateRange(hackathon.startDate, hackathon.endDate)} |{" "}
                    {hackathon.time}
                  </p>
                  <p className="hackathon-location">{hackathon.location}</p>
                  <div
                    className={`hackathon-status-badge status-${hackathon.status}`}
                  >
                    {hackathon.status.toUpperCase()}
                  </div>
                  <button className="hackathon-apply-btn primary-btn transition-ease">
                    Apply
                  </button>
                </div>
              ))
            ) : (
              <p className="no-hackathons-message">
                No hackathons found matching your criteria.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HackathonListingPage;
