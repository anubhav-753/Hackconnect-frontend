// src/pages/HackathonListingPage.jsx
import React, { useState, useEffect } from "react";
import { getAllHackathons } from "../services/hackathonService";
import HackathonCard from "../components/HackathonCard";
import LoadingSpinner from "../components/LoadingSpinner";
import "./HackathonListingPage.css";

const HackathonListingPage = () => {
  const [allHackathons, setAllHackathons] = useState([]);
  const [filteredHackathons, setFilteredHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const { data } = await getAllHackathons();
        setAllHackathons(data);
        setFilteredHackathons(data);
      } catch (err) {
        setError("Failed to load hackathons. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchHackathons();
  }, []);

  useEffect(() => {
    const results = allHackathons.filter(
      (hackathon) =>
        hackathon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hackathon.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredHackathons(results);
  }, [searchTerm, allHackathons]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error-message container">{error}</div>;
  }

  const now = new Date();
  const upcomingHackathons = filteredHackathons.filter(
    (h) => new Date(h.startDate) > now
  );
  const ongoingHackathons = filteredHackathons.filter(
    (h) => new Date(h.startDate) <= now && new Date(h.endDate) >= now
  );
  const pastHackathons = filteredHackathons.filter(
    (h) => new Date(h.endDate) < now
  );

  return (
    <div className="page-section">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Explore Hackathons</h1>

        </div>

        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search by title or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Ongoing Hackathons Section */}
        <section className="hackathon-category">
          <h2 className="category-title">🚀 Ongoing Hackathons</h2>
          <div className="hackathon-list">
            {ongoingHackathons.length > 0 ? (
              ongoingHackathons.map((hackathon) => (
                <HackathonCard key={hackathon._id} hackathon={hackathon} />
              ))
            ) : (
              <p className="empty-category-message">
                No ongoing hackathons match your search.
              </p>
            )}
          </div>
        </section>

        {/* Upcoming Hackathons Section */}
        <section className="hackathon-category">
          <h2 className="category-title">📅 Upcoming Hackathons</h2>
          <div className="hackathon-list">
            {upcomingHackathons.length > 0 ? (
              upcomingHackathons.map((hackathon) => (
                <HackathonCard key={hackathon._id} hackathon={hackathon} />
              ))
            ) : (
              <p className="empty-category-message">
                No upcoming hackathons match your search.
              </p>
            )}
          </div>
        </section>

        {/* Past Hackathons Section */}
        <section className="hackathon-category">
          <h2 className="category-title">🕰️ Past Hackathons</h2>
          <div className="hackathon-list">
            {pastHackathons.length > 0 ? (
              pastHackathons.map((hackathon) => (
                <HackathonCard key={hackathon._id} hackathon={hackathon} />
              ))
            ) : (
              <p className="empty-category-message">
                No past hackathons match your search.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HackathonListingPage;
