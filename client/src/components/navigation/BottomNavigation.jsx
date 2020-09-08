import React from "react";
import "../../style/navigation/BottomNavigation.css"
import {
  faWalking,
  faFilter,
  faLightbulb,
  faMapPin,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import NavigationButton from './NavigationButton'

function createNavigationButton(icon, page) {
  return (
    <NavigationButton
      icon={icon}
      page={page}
    />
  )
}

export default function BottomNavigation(props) {
  return (
    <div className="navigation-bar-body">
      {createNavigationButton(faWalking, "explore", props)}
      {createNavigationButton(faFilter, "filter", props)}
      {createNavigationButton(faLightbulb, "learn", props)}
      {createNavigationButton(faMapPin, "contribute", props)}
      {createNavigationButton(faUser, "account", props)}
    </div>
  )
}
