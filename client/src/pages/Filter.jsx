import React from "react";
import ToiletTagCheckBoxes from '../components/ToiletTagCheckBoxes';

export default function Filter(props) {
  return (
    <div className="sub-page">
      <div className="sub-page-container">
        <h1>Filter</h1>
        <p>Show only toilets that have all of the following selected tags on the map:</p>
        <div style={{ overflow: "scroll" }}>
          <ToiletTagCheckBoxes
            tags={props.selectedFilterTags}
            setTags={props.setSelectedFilterTags}
          />
        </div>
      </div>
    </div>
  )
}
