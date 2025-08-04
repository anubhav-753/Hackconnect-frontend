// src/pages/AboutPage.jsx
import React from "react";
import "./AboutPage.css"; // Create this CSS file next

function AboutPage() {
  return (
    <div className="page-section about-page">
      <div className="container">
        <h1 className="page-title">About HackConnect</h1>
        <p className="about-text">
          HackConnect is a pioneering platform dedicated to empowering the next
          generation of innovators, developers, and designers. Our mission is to
          bridge the gap between aspiring talent and exciting hackathon
          opportunities, fostering collaboration and groundbreaking solutions.
        </p>
        <p className="about-text">
          We believe in the power of collective intelligence. Whether you're a
          seasoned hackathon veteran or a newcomer looking for your first
          challenge, HackConnect provides the tools to discover the perfect
          event and assemble your dream team. Our AI Team Maker leverages
          cutting-edge technology to connect individuals based on their skills,
          college, state, and branch, ensuring diverse and effective teams.
        </p>
        <p className="about-text">
          Join HackConnect today and unlock your potential. Find your next
          challenge, build your dream team, and bring your innovative ideas to
          life!
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
