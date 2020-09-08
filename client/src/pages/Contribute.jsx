import React, {
  useState
} from "react";
import { Redirect } from "react-router";
import MapView from '../components/contribute/MapView';
import DetailsView from '../components/contribute/DetailsView';
import ResultView from '../components/contribute/ResultView';


export default function Contribute(props) {
  const [newLocation, setNewLocation] = useState({
    latitude: 35.6598,
    longitude: 139.6954
  })

  const [wizardState, setWizardState] = useState('map');
  // Prevent pin resetting when going back from details view to map view.
  const [userMovedPin, setUserMovedPin] = useState(false);
  const [submissionResponse, setSubmissionResponse] = useState(null);

  switch (wizardState) {
    /*
      First step, user drags pin on map view to place toilet coordinates.
      Old contents of this file were moved into the MapView subcomponent.
    */
    case 'map':
      return (
        <MapView
          toilets={props.toilets}
          newLocation={newLocation}
          setNewLocation={setNewLocation}
          setWizardState={setWizardState}
          userMovedPin={userMovedPin}
          setUserMovedPin={setUserMovedPin}
        />
      )

    /*
      Second step, user fills out toilet title, tags, etc. Can return to first
      step to adjust coordinates if desired.
    */
    case 'details':
      return (
        <DetailsView
          latitude={newLocation.latitude}
          longitude={newLocation.longitude}
          setWizardState={setWizardState}
          currentUser={props.currentUser}
          setSubmissionResponse={setSubmissionResponse}
        />
      )

    /*
      Renders server response, success or error on creating new toilet record.
    */
    case 'result':
      return (
        <ResultView
          response={submissionResponse}
          setWizardState={setWizardState}
        />
      )

    /*
      Redirects user back to Explore page.
    */
    case 'redirect':
      props.setRefreshToilets(true);
      return <Redirect to="/explore" />

    // Console screeching at me.
    default:
      return <div />
  }
}
