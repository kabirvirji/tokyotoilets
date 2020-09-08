import React, {
  useState
} from "react";

import ReactMapGL, {
  Marker,
  GeolocateControl
} from "react-map-gl";

import {
  faCheck
} from '@fortawesome/free-solid-svg-icons';

import Pin from '../Pin';
import FloatingButton from "../../components/FloatingButton";


export default function ContributeMapView(props) {
  const mapboxAccessToken = "pk.eyJ1Ijoibm90Y29tZnkiLCJhIjoiY2tiY2hrMDUyMDIxZzJwcWV6dTBrY2FtdCJ9.oyTieHHKJ4JgvwLMoA97Jg"

  const [viewport, setViewport] = useState({
    latitude: 35.6595771,
    longitude: 139.6965393,
    width: "100vw",
    height: "92.5vh",
    zoom: 16
  });

  const [events, setEvents] = useState({});

  const [userLocation, setUserLocation] = useState({
    latitude: 35.6598,
    longitude: 139.6954
  });

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={mapboxAccessToken}
        mapStyle="mapbox://styles/notcomfy/ckbcho8ny0dlq1io4d1owtzuu"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {props.toilets.map(toilet => (
          <Marker
            key={toilet.id}
            latitude={toilet.latitude}
            longitude={toilet.longitude}
          >
            <button
              className="marker-btn"
            >
              <img src="/restroom.png" alt="Toilet Icon" />
            </button>
          </Marker>
        ))}
        <Marker
          longitude={props.newLocation.longitude}
          latitude={props.newLocation.latitude}
          offsetTop={-20}
          offsetLeft={-10}
          draggable
          onDragStart={event => setEvents(event)}
          onDrag={event => setEvents(event)}
          onDragEnd={event => {
            props.setNewLocation(
              {
                latitude: event.lngLat[1],
                longitude: event.lngLat[0]
              }
            )
            if (!props.userMovedPin) {
              props.setUserMovedPin(true);
            }
          }}
        >
          <Pin size={30} />
        </Marker>
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          label="Enable Location"
          auto={true}
          onGeolocate={location => {
            setUserLocation({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            })
            if (!props.userMovedPin) {
              props.setNewLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
              })
            }
          }}
        />
      </ReactMapGL>
      <div className="directions-overlay">
        <div style={{ padding: "0px 15px" }}>
          <h3>Submit a new toilet</h3>
          <p>Drag pin to place toilet.</p>
        </div>
      </div>
      <FloatingButton
        buttonStyle="accent"
        icon={faCheck}
        onClick={() => {
          props.setWizardState('details');
        }}
        bottom="12.5vh"
        right="0px"
      />
    </div>
  )
}
