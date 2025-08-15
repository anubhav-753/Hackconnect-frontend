import React, { useState, useEffect } from "react";
import { getAllHackathons } from "../services/hackathonService";
import HackathonCard from "../components/HackathonCard";
import LoadingSpinner from "../components/LoadingSpinner";
import "./HackathonListingPage.css"; // Add a CSS file for page layout

function HackathonListingPage() {
  const [ongoingHackathons, setOngoingHackathons] = useState([]);
  const [upcomingHackathons, setUpcomingHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndCategorizeHackathons = async () => {
      try {
        // The backend now sends only active and sorted hackathons
        const response = await getAllHackathons();
        const allActiveHackathons = response.data;

        // We can categorize them on the frontend based on their status
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
        {/* Section for Ongoing Hackathons */}
        {ongoingHackathons.length > 0 && (
          <section className="hackathon-category">
            <h1 className="category-title">🚀 Ongoing Hackathons</h1>
            <div className="hackathon-list">
              {ongoingHackathons.map((hackathon) => (
                <HackathonCard key={hackathon._id} hackathon={hackathon} />
              ))}
            </div>
          </section>
        )}

        {/* Section for Upcoming Hackathons */}
        {upcomingHackathons.length > 0 && (
          <section className="hackathon-category">
            <h1 className="category-title">🗓️ Upcoming Hackathons</h1>
            <div className="hackathon-list">
              {upcomingHackathons.map((hackathon) => (
                <HackathonCard key={hackathon._id} hackathon={hackathon} />
              ))}
            </div>
          </section>
        )}

        {/* Message if no active hackathons are found */}
        {!loading &&
          ongoingHackathons.length === 0 &&
          upcomingHackathons.length === 0 && (
            <div className="no-hackathons-found">
              <h2>No active hackathons at the moment.</h2>
              <p>Check back later or be the first to create a new one!</p>
            </div>
          )}
      </div>
    </div>
  );
}

export default HackathonListingPage;
