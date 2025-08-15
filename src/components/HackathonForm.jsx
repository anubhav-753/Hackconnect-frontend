import React from "react";
import "./HackathonForm.css";

function HackathonForm({ hackathon, setHackathon, handleSubmit, formTitle }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHackathon((prev) => ({ ...prev, [name]: value }));
  };

  const handleThemeChange = (e) => {
    const themes = e.target.value.split(",").map((theme) => theme.trim());
    setHackathon((prev) => ({ ...prev, themes }));
  };

  return (
    <div className="hackathon-form-container">
      <form onSubmit={handleSubmit} className="hackathon-form shadow-md">
        <h1 className="form-title">{formTitle}</h1>
        <div className="form-group">
          <label htmlFor="title">Hackathon Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={hackathon.title}
            onChange={handleChange}
            required
            minLength="3"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={hackathon.description}
            onChange={handleChange}
            required
            minLength="10"
            rows="5"
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="datetime-local"
              id="startDate"
              name="startDate"
              value={hackathon.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="datetime-local"
              id="endDate"
              name="endDate"
              value={hackathon.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="e.g., Online"
            value={hackathon.location}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="website">Website URL</label>
          <input
            type="url"
            id="website"
            name="website"
            placeholder="https://example.com"
            value={hackathon.website}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="themes">Themes (comma-separated)</label>
          <input
            type="text"
            id="themes"
            name="themes"
            placeholder="e.g., AI, FinTech, Health"
            value={hackathon.themes.join(", ")}
            onChange={handleThemeChange}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="primary-btn submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default HackathonForm;
