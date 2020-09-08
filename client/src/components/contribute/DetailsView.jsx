import React, {
  useState
} from "react";
import "../../style/contribute/DetailsView.css";
import ToiletTagCheckBoxes from "../ToiletTagCheckBoxes";
import axios from 'axios';


export default function DetailsView(props) {
  const [toiletTitle, setToiletTitle] = useState('');
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
    <div className="sub-page" style={{ overflow: 'scroll' }}>
      <div style={{ padding: "0px 15px" }}>
        <h3>Submit a new toilet</h3>
        <p>Enter details to complete submission.</p>

        <form onSubmit={
          (event) => {
            event.preventDefault();

            const selectedToiletTags = Object.keys(toiletFilterTags).filter(
              key => (toiletFilterTags[key])
            );

            const newToiletToSubmit = {
              title: toiletTitle,
              average_wait_time: parseInt(averageWaitTime) * 60,
              tags: selectedToiletTags,
              accuracy: 85,
              longitude: props.longitude,
              latitude: props.latitude,
              submitter: props.currentUser.email
            };

            axios.post('/api/saveToilet', newToiletToSubmit)
              .then((response) => {
                props.setSubmissionResponse(response);
                props.setWizardState('result');
              }, (error) => {
                props.setSubmissionResponse(error.response);
                props.setWizardState('result');
              });
          }
        }>
          <div className="contribute-form">
            <input
              className="contribute-form-input"
              type="text"
              placeholder="Building name of toilet (e.g. Starbucks)"
              required
              value={toiletTitle}
              onChange={
                event => {
                  setToiletTitle(event.target.value)
                }
              }
            />

          </div>
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
          <h4>Please select all available amenities:</h4>
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
                  props.setWizardState('map');
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
