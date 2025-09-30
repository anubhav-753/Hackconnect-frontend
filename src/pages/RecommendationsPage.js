import React, { useEffect, useState, useCallback } from "react";
import api from "../utils/api"; 
import StudentCard from "../components/StudentCard";

const RecommendationsPage = () => {
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({
    college: "Any College",
    state: "Any State",
    branch: "Any Branch",
    skills: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Deduplication helper
  const mergeUnique = (existing, incoming) => {
    const existingIds = new Set(existing.map((u) => u._id));
    return [...existing, ...incoming.filter((u) => !existingIds.has(u._id))];
  };

  // Normalize filters before API
  const sanitizeFilters = (filters) => ({
    college: !filters.college || filters.college.startsWith("Any") ? "" : filters.college.trim(),
    state: !filters.state || filters.state.startsWith("Any") ? "" : filters.state.trim(),
    branch: !filters.branch || filters.branch.startsWith("Any") ? "" : filters.branch.trim(),
    skills: filters.skills.trim(),
  });

  const fetchStudents = useCallback(
    async (reset = false) => {
      setLoading(true);
      setError("");
      try {
        const displayedIds = reset ? [] : students.map((s) => s._id);

        const { data } = await api.get("/users/recommendations", {
          params: {
            ...sanitizeFilters(filters),
            excludeIds: displayedIds,
          },
        });

        if (reset) {
          setStudents(data);
        } else {
          setStudents((prev) => mergeUnique(prev, data));
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load recommendations.");
      } finally {
        setLoading(false);
      }
    },
    [filters, students]
  );

  useEffect(() => {
    fetchStudents(true);
  }, [filters]);

  return (
    <div className="recommendations-page">
      <h2>Find Your Dream Team</h2>

      {/* Filter UI */}
      <div className="filters">
        <select
          value={filters.college}
          onChange={(e) => setFilters((f) => ({ ...f, college: e.target.value }))}
        >
          <option>Any College</option>
          <option>ABC College</option>
          <option>XYZ University</option>
        </select>

        <select
          value={filters.state}
          onChange={(e) => setFilters((f) => ({ ...f, state: e.target.value }))}
        >
          <option>Any State</option>
          <option>Odisha</option>
          <option>Karnataka</option>
          <option>Maharashtra</option>
        </select>

        <select
          value={filters.branch}
          onChange={(e) => setFilters((f) => ({ ...f, branch: e.target.value }))}
        >
          <option>Any Branch</option>
          <option>CSE</option>
          <option>ECE</option>
          <option>Mechanical</option>
          <option>Civil</option>
        </select>

        <input
          type="text"
          placeholder="Skills (comma separated)"
          value={filters.skills}
          onChange={(e) => setFilters((f) => ({ ...f, skills: e.target.value }))}
        />

        <button onClick={() => fetchStudents(true)}>Find Teammates</button>
      </div>

      {error && <p className="error-text">{error}</p>}
      {loading && <p>Loading...</p>}

      <div className="cards-grid">
        {students.length > 0 ? (
          students.map((s) => (
            <StudentCard
              key={s._id}
              student={s}
              onSendRequest={() => console.log("Send request to", s._id)}
            />
          ))
        ) : (
          !loading && <p>No students found matching your criteria.</p>
        )}
      </div>

      {students.length > 0 && (
        <button className="btn btn--secondary" onClick={() => fetchStudents(false)}>
          Load More
        </button>
      )}
    </div>
  );
};

export default RecommendationsPage;