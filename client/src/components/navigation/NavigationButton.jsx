import React from "react";
import "../../style/navigation/NavigationButton.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from "react-router-dom";

export default function NavigationButton(props) {
  return (
    <NavLink
      to={`/${props.page}`}
      className="navigation-button"
      activeClassName="selected"
    >
      <FontAwesomeIcon className="navigation-button-icon" icon={props.icon} />
    </NavLink>
  )
}
