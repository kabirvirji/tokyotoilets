import React, {
  useState
} from "react";
import MapView from "../components/explore/MapView";
import TripCompleteView from "../components/explore/TripCompleteView";


export default function Explore(props) {
  const [stage, setStage] = useState('map');

  switch (stage) {
    case 'map':
      return (
        <MapView
          toilets={props.toilets}
          setStage={setStage}
        />
      )

    case 'complete':
      return <TripCompleteView setStage={setStage} />

    default:
      return <div />
  }
}
