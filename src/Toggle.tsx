// @ts-nocheck
import React, { useState } from "react";
import "./Toggle.css"; // Ensure the CSS file is in the same directory and named Toggle.css

const Toggle = ({ translateMode, onToggle }) => {
  return (
    <div
      className={`toggle-container ${translateMode ? "toggled" : ""}`}
      onClick={onToggle}
    >
      <div className={`toggle-button ${translateMode ? "toggled" : ""}`}></div>
    </div>
  );
};


export default Toggle;