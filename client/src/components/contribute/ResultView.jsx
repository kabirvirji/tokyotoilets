import React from "react";
import "../../style/contribute/ResultView.css";


export default function ResultView(props) {
  return (
    <div className="sub-page contribute-result-container">
      <div className="contribute-result-center">
        <h1>
          {
            props.response.status === 200
              ? 'Success!'
              : 'Yikes!'
          }
        </h1>
        <p>
          {
            props.response.status === 200
              ? `Your new toilet at "${props.response.data.title}" has been placed.`
              : `Your new toilet could not be submitted.\n(${props.response.status} ${props.response.statusText})`
          }

        </p>
        <button
          className="contribute-result-ok"
          onClick={
            () => {
              props.setWizardState('redirect');
            }
          }
        >
          Ok
      </button>
      </div>
    </div>
  )
}
