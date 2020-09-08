import React from "react";
import "../style/FloatingButton.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function FloatingButton(props) {

  return (
    <button
      className={`floating-button ${props.buttonStyle}`}
      onClick={props.onClick}
      style={{
        right: props.right,
        bottom: props.bottom
      }}
    >
      <FontAwesomeIcon className="floating-button-icon" icon={props.icon} />
    </button>
  )
}
