// src/pages/HackathonListingPage.jsx
import React, { useState, useEffect } from "react";
import { getAllHackathons } from "../services/hackathonService";
import HackathonCard from "../components/HackathonCard";
import LoadingSpinner from "../components/LoadingSpinner";
import "./HackathonListingPage.css";

const HackathonListingPage = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const { data } = await getAllHackathons();
        setHackathons(data);
      } catch (err) {
        setError("Failed to load hackathons. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchHackathons();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="hackathon-listing-page">
      <h1>Upcoming Hackathons</h1>
      <div className="hackathon-list">
        {hackathons.length > 0 ? (
          hackathons.map((hackathon) => (
            <HackathonCard key={hackathon._id} hackathon={hackathon} />
          ))
        ) : (
          <p>No hackathons found.</p>
        )}
      </div>
    </div>
  );
};

export default HackathonListingPage;
