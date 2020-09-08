import React, {
  useState,
  useEffect
} from "react";

import ReactMapGL, {
  Marker,
  Popup,
  GeolocateControl,
  Source,
  Layer
} from "react-map-gl";

import {
  faToilet,
  faShare,
  faFlag,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import FloatingButton from "../FloatingButton";
import DirectionsHeader from "../DirectionsHeader";

export default function MapView(props) {
  const mapboxAccessToken = "pk.eyJ1Ijoibm90Y29tZnkiLCJhIjoiY2tiY2hrMDUyMDIxZzJwcWV6dTBrY2FtdCJ9.oyTieHHKJ4JgvwLMoA97Jg"
  const [viewport, setViewport] = useState({
    latitude: 35.6595771,
    longitude: 139.6965393,
    width: "100vw",
    height: "92.5vh",
    zoom: 17
  });

  const [userLocation, setUserLocation] = useState({
    latitude: 35.6598,
    longitude: 139.6954
  })

  const [selectedToilet, setSelectedToilet] = useState(null);
  const [showDetailedSteps, setShowDetailedSteps] = useState(false);
  const [directionsRoute, setDirectionsRoute] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedToilet(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

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
        {directionsRoute ? renderDirectionsPathLine(directionsRoute) : <div />}
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
          }}
        />
        {props.toilets.map(toilet => (
          <Marker
            key={toilet.id}
            latitude={toilet.latitude}
            longitude={toilet.longitude}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedToilet(toilet);
              }}
            >
              <img src="/restroom.png" alt="Toilet Icon" />
            </button>
          </Marker>
        ))}
        {selectedToilet ? (
          <Popup
            latitude={selectedToilet.latitude}
            longitude={selectedToilet.longitude}
            onClose={() => {
              setSelectedToilet(null);
            }}
          >
            <div>
              <h2>{selectedToilet.title ? selectedToilet.title : "No details available"}</h2>
              <p>{selectedToilet.tags[0] ? `toilet tags: ${selectedToilet.tags[0]}` : ""}</p>
              <p>{selectedToilet.accuracy ? `accuracy: ${selectedToilet.accuracy} %` : ""}</p>
              <p>
                {
                  selectedToilet.average_wait_time ?
                    `average wait time: ${
                    (selectedToilet.average_wait_time / 60).toFixed()
                    }
                  m
                  ${
                    selectedToilet.average_wait_time % 60
                    }
                  s`
                    :
                    ""
                }
              </p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
      {
        showDetailedSteps
          ? renderDetailedStepsButtons(setShowDetailedSteps)
          : directionsRoute
            ? renderDirectionButtons(setDirectionsRoute, setShowDetailedSteps, props.setStage, directionsRoute)
            : renderExploreButtons(props, userLocation, mapboxAccessToken, setDirectionsRoute)
      }
      <DirectionsHeader
        route={directionsRoute}
        showDetailedSteps={showDetailedSteps}
      />
    </div>
  )
}


function renderExploreButtons(props, userLocation, mapboxAccessToken, setDirectionsRoute) {
  return (
    <FloatingButton
      buttonStyle="accent"
      icon={faToilet}
      onClick={() => {
        const closestToilet = findClosestToilet(props.toilets, userLocation)
        getDirectionsToToilet(closestToilet, userLocation, mapboxAccessToken, setDirectionsRoute)
      }}
      bottom="12.5vh"
      right="0px"
    />
  )
}


function renderDirectionButtons(setDirectionsRoute, setShowDetailedSteps, setStage, directionsRoute) {
  return (
    <div>
      <FloatingButton
        buttonStyle="normal"
        icon={faFlag}
        onClick={
          () => {
            console.log(directionsRoute);

            const newTrip = {
              toiletId: directionsRoute.toiletId,
              toiletTitle: directionsRoute.name,
              distance: (directionsRoute.distance / 1000).toFixed(3)
            };

            axios.post('/api/trips', newTrip);
            setDirectionsRoute(null);
            setStage('complete');
          }
        }
        bottom="21.5vh"
        right="0px"
      />

      <FloatingButton
        buttonStyle="accent"
        icon={faShare}
        onClick={() => {
          setShowDetailedSteps(true)
        }}
        bottom="12.5vh"
        right="0px"
      />
    </div>
  )
}


function renderDetailedStepsButtons(setShowDetailedSteps) {
  return (
    <FloatingButton
      buttonStyle="normal"
      icon={faTimes}
      onClick={() => {
        setShowDetailedSteps(false)
      }}
      bottom="12.5vh"
      right="0px"
    />
  )
}


function calculateDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}


function findClosestToilet(toilets, userLocation) {
  let minimum = 360
  let minimumIndex = 0
  const mapboxWalkSpeedMetersPerSecond = 1.42

  toilets.forEach((toilet, i) => {
    const distance = calculateDistance(
      userLocation.longitude,
      userLocation.latitude,
      toilet.longitude,
      toilet.latitude
    )

    const waitTimeAsDistance = mapboxWalkSpeedMetersPerSecond * toilet.average_wait_time
    const combinedDistance = distance + waitTimeAsDistance

    if (combinedDistance <= minimum) {
      minimum = combinedDistance
      minimumIndex = i
    }
  })

  return toilets[minimumIndex]
}


function getDirectionsToToilet(toilet, userLocation, mapboxAccessToken, setDirectionsRoute) {
  fetch(
    `https://api.mapbox.com/directions/v5/mapbox/walking/` +
    `${userLocation.longitude},${userLocation.latitude};` +
    `${toilet.longitude},${toilet.latitude}?` +
    `geometries=geojson&` +
    `steps=${true}&` +
    `access_token=${mapboxAccessToken}&` +
    `overview=full`
  )
    .then(response => response.json())
    .then(
      (response) => {
        console.log(response.routes)
        setDirectionsRoute({
          ...response.routes[0],
          name: toilet.title,
          toiletId: toilet._id,
          average_wait_time: toilet.average_wait_time
        })
      },
      (error) => {
        console.log(error)
      }
    )
}

function renderDirectionsPathLine(directionsRoute) {
  return (
    <Source id="directions-line" type="geojson" data={directionsRoute.geometry}>
      <Layer
        id="directions-line-layer"
        type="line"
        paint={{
          "line-width": 8,
          "line-color": "#007cbf"
        }}
        layout={{
          "line-join": "round",
          "line-cap": "round"
        }}
      />
    </Source>
  )
}
