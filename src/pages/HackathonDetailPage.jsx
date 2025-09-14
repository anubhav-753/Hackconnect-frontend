// src/pages/HackathonDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getHackathonById } from "../services/hackathonService";
import LoadingSpinner from "../components/LoadingSpinner";
import "./HackathonDetailPage.css";

const HackathonDetailPage = () => {
  const { id } = useParams();
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const { data } = await getHackathonById(id);
        setHackathon(data);
      } catch (err) {
        setError("Hackathon not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchHackathon();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="hackathon-detail-page">
      {hackathon && (
        <>
          <h2>{hackathon.title}</h2>
          <p>{hackathon.description}</p>
          {/* Add more details as needed */}
        </>
      )}
    </div>
  );
};

export default HackathonDetailPage;
