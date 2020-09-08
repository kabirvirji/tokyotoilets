import React, {
  useState
} from "react";
import axios from 'axios';
import ToiletTagCheckBoxes from '../ToiletTagCheckBoxes';


export default function ReviewView(props) {
  const [complete, setComplete] = useState(false);
  const [averageWaitTime, setAverageWaitTime] = useState('');
  const [toiletFilterTags, setToiletFilterTags] = useState(
    {
      baby: false,
      wheelchair: false,
      squat: false,
      urinal: false,
      electric: false,
      regular: false
    }
  );

  return (
    <div className="sub-page">
      <div className="sub-page-container" style={{ overflow: 'scroll' }}>
        <h3>Submit a toilet trip review</h3>
        <p>Enter details of your trip to "{props.trip.toiletTitle}"</p>
        <form onSubmit={
          (event) => {
            event.preventDefault();

            const selectedToiletTags = Object.keys(toiletFilterTags).filter(
              key => (toiletFilterTags[key])
            );

            const updatedTripReview = {
              _id: props.trip._id,
              review: {
                averageWaitTime: parseInt(averageWaitTime) * 60,
                tags: selectedToiletTags
              }
            };

            axios.post('/api/trips/review', updatedTripReview)
              .then((response) => {
                props.setSelectedTrip(null);
              }, (error) => {
                props.setSelectedTrip(null);
              });
          }
        }>
          <div className="contribute-form">
            <input
              type="number"
              placeholder="Wait time for toilet in minutes (0-30)"
              min={0}
              max={30}
              required
              onChange={
                event => {
                  setAverageWaitTime(event.target.value)
                }
              }
            />
          </div>
          <h4>Please select all amenities that you used on your trip:</h4>
          <ToiletTagCheckBoxes
            tags={toiletFilterTags}
            setTags={setToiletFilterTags}
          />
          <div className="contribute-form">
            <button
              className="contribute-back"
              onClick={
                event => {
                  event.preventDefault();
                  props.setSelectedTrip(null);
                }
              }
            >
              Back
            </button>
            <input className="contribute-submit" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  )
}
