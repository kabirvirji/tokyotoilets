import React, {
  useState
} from "react";
import '../style/Account.css';
import OverviewView from "../components/account/OverviewView";
import ReviewView from "../components/account/ReviewView";


export default function Account(props) {
  const [selectedTrip, setSelectedTrip] = useState(null);
  return (
    selectedTrip
      ? <ReviewView trip={selectedTrip} setSelectedTrip={setSelectedTrip} />
      : <OverviewView user={props.user} setSelectedTrip={setSelectedTrip} />
  )
}
