import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllHackathons } from "../services/hackathonService";
import { useAuth } from "../contexts/AuthContext";
import HackathonCard from "../components/HackathonCard";
import LoadingSpinner from "../components/LoadingSpinner";
import "./HackathonListingPage.css";

function HackathonListingPage() {
  const [ongoingHackathons, setOngoingHackathons] = useState([]);
  const [upcomingHackathons, setUpcomingHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAndCategorizeHackathons = async () => {
      try {
        const response = await getAllHackathons();
        const allActiveHackathons = response.data;
        const ongoing = allActiveHackathons.filter(
          (h) => h.status === "ongoing"
        );
        const upcoming = allActiveHackathons.filter(
          (h) => h.status === "upcoming"
        );
        setOngoingHackathons(ongoing);
        setUpcomingHackathons(upcoming);
      } catch (err) {
        setError("Could not fetch hackathons.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAndCategorizeHackathons();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error)
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div className="page-section">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Discover Hackathons</h1>
          {user && (
            <Link to="/create-hackathon" className="primary-btn">
              + Create Hackathon
            </Link>
          )}
        </div>
        {ongoingHackathons.length > 0 && (
          <section className="hackathon-category">
            <h2 className="category-title">🚀 Ongoing Hackathons</h2>
            <div className="hackathon-list">
              {ongoingHackathons.map((hackathon) => (
                <HackathonCard key={hackathon._id} hackathon={hackathon} />
              ))}
            </div>
          </section>
        )}
        {upcomingHackathons.length > 0 && (
          <section className="hackathon-category">
            <h2 className="category-title">🗓️ Upcoming Hackathons</h2>
            <div className="hackathon-list">
              {upcomingHackathons.map((hackathon) => (
                <HackathonCard key={hackathon._id} hackathon={hackathon} />
              ))}
            </div>
          </section>
        )}
        {!loading &&
          ongoingHackathons.length === 0 &&
          upcomingHackathons.length === 0 && (
            <div className="no-hackathons-found">
              <h2>No active hackathons found.</h2>
              <p>Check back later or create a new one!</p>
            </div>
          )}
      </div>
    </div>
  );
}

export default HackathonListingPage;
