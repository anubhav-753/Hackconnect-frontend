import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import api from "../services/api"; // Your Axios instance
import io from "socket.io-client"; // 1. Import the socket.io client
import { useAuth } from "../contexts/AuthContext";
import HackathonCard from "../components/HackathonCard";
import LoadingSpinner from "../components/LoadingSpinner";
import "./HackathonListingPage.css";

// 2. Establish a connection to your backend server
const socket = io("http://localhost:3000");

function HackathonListingPage() {
  const [allHackathons, setAllHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();

  const fetchHackathons = async (query = "") => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get(`/hackathons?search=${query}`);
      setAllHackathons(data);
    } catch (err) {
      setError("Could not fetch hackathons.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial data when the component first loads
  useEffect(() => {
    fetchHackathons();
  }, []);

  // --- 3. ADD REAL-TIME LISTENER ---
  useEffect(() => {
    // Listen for the 'hackathons-updated' event from the server
    socket.on("hackathons-updated", (updatedHackathons) => {
      console.log("Received real-time hackathon update!");
      // Update the state with the new list from the server
      setAllHackathons(updatedHackathons);
    });

    // Clean up the listener when the component unmounts to prevent memory leaks
    return () => {
      socket.off("hackathons-updated");
    };
  }, []); // The empty dependency array ensures this runs only once

  const handleSearch = (e) => {
    e.preventDefault();
    fetchHackathons(searchTerm);
  };

  const categorizedHackathons = useMemo(() => {
    const now = new Date();
    const upcoming = [];
    const ongoing = [];
    const past = [];

    allHackathons.forEach((hackathon) => {
      const startDate = new Date(hackathon.startDate);
      const endDate = new Date(hackathon.endDate);

      if (endDate < now) {
        past.push(hackathon);
      } else if (startDate > now) {
        upcoming.push(hackathon);
      } else {
        ongoing.push(hackathon);
      }
    });

    past.reverse();

    return { ongoing, upcoming, past };
  }, [allHackathons]);

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

        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by keyword (e.g., AI, Web3, Health...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="primary-btn search-btn">
            Search
          </button>
        </form>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        ) : (
          <>
            <section className="hackathon-category">
              <h2 className="category-title">🚀 Ongoing Hackathons</h2>
              {categorizedHackathons.ongoing.length > 0 ? (
                <div className="hackathon-list">
                  {categorizedHackathons.ongoing.map((hackathon) => (
                    <HackathonCard key={hackathon._id} hackathon={hackathon} />
                  ))}
                </div>
              ) : (
                <p className="empty-category-message">
                  No hackathons are currently ongoing.
                </p>
              )}
            </section>

            <section className="hackathon-category">
              <h2 className="category-title">🗓️ Upcoming Hackathons</h2>
              {categorizedHackathons.upcoming.length > 0 ? (
                <div className="hackathon-list">
                  {categorizedHackathons.upcoming.map((hackathon) => (
                    <HackathonCard key={hackathon._id} hackathon={hackathon} />
                  ))}
                </div>
              ) : (
                <p className="empty-category-message">
                  No upcoming hackathons found.
                </p>
              )}
            </section>

            <section className="hackathon-category">
              <h2 className="category-title">🏆 Past Hackathons</h2>
              {categorizedHackathons.past.length > 0 ? (
                <div className="hackathon-list">
                  {categorizedHackathons.past.map((hackathon) => (
                    <HackathonCard key={hackathon._id} hackathon={hackathon} />
                  ))}
                </div>
              ) : (
                <p className="empty-category-message">
                  No past hackathons to show.
                </p>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default HackathonListingPage;
