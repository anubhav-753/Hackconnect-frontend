// src/components/ScrollDownIndicator.jsx
import React from "react";
import "./ScrollDownIndicator.css";

function ScrollDownIndicator() {
  const handleClick = () => {
    window.scrollBy({
      top: window.innerHeight * 0.9, // Scroll down by roughly 90% of viewport height
      behavior: "smooth",
    });
  };

  return (
    <div className="scroll-down-indicator" onClick={handleClick}>
      <div className="mouse-icon">
        <div className="scroll-wheel"></div>
      </div>
      <div className="arrow-down-icon"></div> {/* Simple CSS arrow */}
    </div>
  );
}

export default ScrollDownIndicator;
