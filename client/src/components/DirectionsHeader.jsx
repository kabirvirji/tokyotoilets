import React from "react";
import "../style/DirectionsHeader.css"

export default function DirectionsHeader(props) {
  if (!props.route) {
    return <div />
  }

  const className = props.showDetailedSteps
    ? "directions-overlay directions-detailed-steps"
    : "directions-overlay"

  return (
    <div className={className}>
      <div style={{ padding: "0px 15px" }}>
        <h3>{props.route.name}</h3>
        <p>
          {`${formatDistance(props.route.distance)} away (${formatTravelTime(props.route.duration)}, ~${(props.route.average_wait_time / 60).toFixed()}m wait)`}
        </p>
      </div>
      {
        props.showDetailedSteps
          ? renderStepByStepInstructions(props)
          : <div />
      }
    </div>
  )
}

function renderStepByStepInstructions(props) {
  return (
    <ol className="direction-step-list">
      {
        props.route.legs[0].steps.map((step, index) => (
          <li key={index} className="direction-step">{step.maneuver.instruction}</li>
        ))
      }
    </ol>
  )
}


function formatTravelTime(duration) {
  const minutes = (duration / 60).toFixed()
  const seconds = (duration % 60).toFixed()
  return `${minutes}m${seconds}s`
}


function formatDistance(distance) {
  let unit = 'm'
  if (distance >= 1000) {
    distance = distance / 1000
    unit = 'km'
  }
  return `${distance.toFixed(1)} ${unit}`
}
