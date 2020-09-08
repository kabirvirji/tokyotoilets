import React from "react";
import ImageModalButton from "../components/ImageModalButton";
import electricTranslations from "../assets/electric.png"
import squatGuide from "../assets/squat.png"
import "../style/Learn.css"

export default function Learn(props) {
  return (
    <div className="sub-page">
      <div className="sub-page-container" style={{ overflow: "scroll" }}>
        <h1>Learn</h1>
        <p>This page contains resources to simplify your toilet experience in Japan.</p>
        <h2>Guides</h2>
        <ul>
          <li><ImageModalButton text="Electric toilet button guide" image={electricTranslations} /></li>
          <li><ImageModalButton text="Squat toilet guide" image={squatGuide} /></li>
        </ul>
      </div>
    </div>
  )
}
