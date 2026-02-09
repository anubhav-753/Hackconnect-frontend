// src/pages/HomePage.jsx
import React, { useState } from "react";
import "./HomePage.css";
import TypewriterText from "../components/TypewriterText";
import ScrollDownIndicator from "../components/ScrollDownIndicator";
import FeatureCard from "../components/FeatureCard";
import Robot3D from "../components/Robot3D";

function HomePage() {
  const [showButtons, setShowButtons] = useState(false);

  const handleTaglineComplete = () => {
    setShowButtons(true);
  };

  return (
    <>
      {" "}
      {/* Use a React Fragment to wrap multiple top-level elements */}
      {/* Main hero section container */}
      <div className="homepage-section">
        {/* Left side: Text Content */}
        <div className="homepage-text-content">
          <TypewriterText
            text="HackConnect"
            loop={true}
            typingSpeed={100}
            deletingSpeed={50}
            pauseDuration={1500}
            as="h1"
            className="main-brand-typewriter"
            showCursor={true}
            cursorCharacter="_"
            cursorClassName="brand-cursor-style"
          />

          <TypewriterText
            text={["Find your teammates and bring your ideas to life!"]}
            loop={false}
            typingSpeed={70}
            deletingSpeed={30}
            initialDelay={500}
            pauseDuration={1000}
            as="h2"
            className="homepage-tagline-typewriter"
            showCursor={true}
            cursorCharacter="_"
            cursorClassName="tagline-cursor-style"
            textColors={["#ffffff"]}
            onSentenceComplete={handleTaglineComplete}
          />

          {showButtons && (
            <div className="homepage-buttons fade-in">
              <button className="homepage-button primary-btn transition-ease">
                Explore Hackathons
              </button>
              <button className="homepage-button secondary-btn transition-ease">
                Find Teammates
              </button>
            </div>
          )}
        </div>

        {/* Right side: 3D Visual Object */}
        <div className="homepage-visuals">
          <Robot3D />
        </div>

        {/* Scroll Down Indicator */}
        <ScrollDownIndicator />
      </div>
      {/* NEW SECTION: Why HackConnect? / Features */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-heading">Why Choose HackConnect?</h2>
          <p className="section-subheading">
            Your ultimate platform for hackathon success.
          </p>

          <div className="features-grid">
            <FeatureCard
              icon="💡" // Placeholder icon, can use actual icons later
              title="Discover Opportunities"
              description="Explore a vast directory of ongoing and upcoming hackathons, both national and international, tailored to your interests."
            />
            <FeatureCard
              icon="🤝" // Placeholder icon
              title="Build Dream Teams"
              description="Utilize our AI-powered Team Maker to find compatible teammates based on skills, college, and branch, ensuring diverse and effective collaboration."
            />
            <FeatureCard
              icon="🚀" // Placeholder icon
              title="Launch Your Ideas"
              description="Connect with like-minded innovators, develop groundbreaking projects, and showcase your talent to the world."
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
