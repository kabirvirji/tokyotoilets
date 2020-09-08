import React from 'react';
import '../../style/explore/TripCompleteView.css'

export default function TripCompleteView(props) {
  return (
    <div className="sub-page explore-complete-container">
      <div className="explore-complete-center">
        <h1>Trip Complete!</h1>
        <p>Please review your toilet experience after use by going to <b>Account {'>'} Toilet trip history</b>.</p>
        <p>This helps us to keep the data accurate! Thank you.</p>
        <button
          className="explore-complete-ok"
          onClick={
            () => {
              props.setStage('map');
            }
          }
        >
          Ok
      </button>
      </div>
    </div>
  )
}
