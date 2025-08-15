import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HackathonForm from "../components/HackathonForm";
import {
  getHackathonById,
  updateHackathon,
} from "../services/hackathonService";
import LoadingSpinner from "../components/LoadingSpinner";

const toHTMLDateTime = (isoDate) => {
  if (!isoDate) return "";
  return new Date(isoDate).toISOString().slice(0, 16);
};

function EditHackathonPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [hackathon, setHackathon] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const response = await getHackathonById(id);
        const data = response.data;
        setHackathon({
          ...data,
          startDate: toHTMLDateTime(data.startDate),
          endDate: toHTMLDateTime(data.endDate),
        });
      } catch (err) {
        setError("Failed to fetch hackathon data.");
      } finally {
        setLoading(false);
      }
    };
    fetchHackathon();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const dataToSend = {
        ...hackathon,
        startDate: new Date(hackathon.startDate).toISOString(),
        endDate: new Date(hackathon.endDate).toISOString(),
      };
      await updateHackathon(id, dataToSend);
      navigate(`/hackathons/${id}`);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to update hackathon.";
      setError(errorMessage);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error && !hackathon)
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div className="page-section">
      <div className="container">
        {hackathon && (
          <HackathonForm
            hackathon={hackathon}
            setHackathon={setHackathon}
            handleSubmit={handleSubmit}
            formTitle="Edit Hackathon"
          />
        )}
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      </div>
    </div>
  );
}

export default EditHackathonPage;
