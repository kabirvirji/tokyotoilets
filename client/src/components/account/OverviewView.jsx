import React, {
  useState,
  useEffect
} from "react";

import {
  faUser
} from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from 'react-router-dom';


export default function OverviewView(props) {
  const [trips, setTrips] = useState([]);
  const [logout, setLogout] = useState(false);

  useEffect(
    () => {
      axios.get('/api/trips')
        .then(response => {
          console.log(response.data)
          setTrips(response.data);
        })
        .catch(error => {
          console.log(error);
        })
    }
    , []);

  return (
    <div className="sub-page">
      <div className="sub-page-container" style={{ overflow: 'scroll' }}>
        <h1>Account</h1>
        <div className="account-user-panel">
          <FontAwesomeIcon className="account-user-icon" icon={faUser} />
          <div>
            <h3>{props.user.name}</h3>
            <p>{props.user.email}</p>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <button
            className="account-button"
            onClick={
              event => {
                axios.get('/api/users/logout')
                  .then(response => {
                    setLogout(true);
                  })
                  .catch(error => {
                    setLogout(true);
                  })
              }
            }
          >
            Sign out
          </button>
          {
            logout
              ? <Redirect to="/" />
              : <div />
          }
        </div>
        <h3>Toilet trip history</h3>
        <div>
          {
            trips.length > 0
              ? (trips.map(trip => (
                <div key={trip._id} className="account-trip-panel">
                  <div>
                    <p className="account-trip-panel-text"><b>{trip.toiletTitle}</b></p>
                    <p className="account-trip-panel-text"><em>{trip.distance}km</em></p>
                    <p className="account-trip-panel-text">{trip.timestamp}</p>
                  </div>
                  <button
                    disabled={trip.review.averageWaitTime}
                    className={trip.review.averageWaitTime ? "account-button-review-disabled" : "account-button-review"}
                    onClick={
                      event => {
                        // Ratchet way to determine whether review occured
                        if (!trip.review.averageWaitTime) {
                          props.setSelectedTrip(trip);
                        }
                      }
                    }
                  >
                    {
                      trip.review.averageWaitTime ? 'Reviewed' : 'Review'
                    }
                  </button>
                </div>
              )))
              : (
                <div style={{ textAlign: 'center', color: 'grey' }}>
                  <p>You haven't taken any toilet trips.</p>
                </div>
              )
          }
        </div>
      </div>
    </div>
  )
}
