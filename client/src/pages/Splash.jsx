import React, {
  useState,
  useEffect
} from "react";
import "../style/Splash.css";
import { AnimateKeyframes, Animate } from "react-simple-animate";
import logo from "../assets/logo1.png"
import NavigationButton from '../components/navigation/NavigationButton'
import {
  faWalking,
  faFilter,
  faLightbulb,
  faMapPin,
  faToilet,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons'


export default function Splash(props) {
  
  return (
    <div>
    {/* <AnimateKeyframes 
      play={true}
      iterationCount="1"
      direction="alternate"
      duration={3}
      keyframes={[
        'transform: rotateX(0) rotateY(0) rotateZ(0)',
        'transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg)',
      ]}
    > */}
        <img className="logo" src={logo} />
    {/* </AnimateKeyframes> */}
      {/* <Animate
        play={true} 
        duration={2} 
        delay={3}
        end={{ opacity: 1, transform: 'translateY(-10px)' }}
        start={{ opacity: 0, transform: 'translateY(0)' }}
        easeType="cubic-bezier(0.445, 0.05, 0.55, 0.95)"
      > */}
        <div className="nav-button">
        <NavigationButton
            icon={faToilet}
            page={"explore"}
          />
          <NavigationButton
            icon={faArrowRight}
            page={"explore"}
          />
        </div>
      {/* </Animate> */}
    </div>
  )
};


