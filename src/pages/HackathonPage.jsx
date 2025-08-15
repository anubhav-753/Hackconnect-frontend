import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HackathonForm from "../components/HackathonForm";
import { createHackathon } from "../services/hackathonService";

function CreateHackathonPage() {
  const navigate = useNavigate();
  const [hackathon, setHackathon] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    website: "",
    themes: [],
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const dataToSend = {
        ...hackathon,
        startDate: new Date(hackathon.startDate).toISOString(),
        endDate: new Date(hackathon.endDate).toISOString(),
      };
      const response = await createHackathon(dataToSend);
      navigate(`/hackathons/${response.data._id}`);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to create hackathon.";
      setError(errorMessage);
    }
  };

  return (
    <div className="page-section">
      <div className="container">
        <HackathonForm
          hackathon={hackathon}
          setHackathon={setHackathon}
          handleSubmit={handleSubmit}
          formTitle="Create a New Hackathon"
        />
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      </div>
    </div>
  );
}

export default CreateHackathonPage;
