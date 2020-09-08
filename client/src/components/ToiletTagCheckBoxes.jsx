import React from "react";
import "../style/ToiletTagCheckBoxes.css";

const toiletFilterTagsToText = {
  baby: "Baby changing station",
  electric: "Electric/Super",
  regular: "Regular/Western",
  urinal: "Urinal",
  squat: "Squat",
  wheelchair: "Wheelchair accessible"
}

export default function ToiletTagCheckBoxes(props) {
  return (
    <React.Fragment>
      {
        Object.keys(props.tags).map((tag, i) => (
          <div
            key={`filter-fragment-${i}`}
            style={{ display: "block", padding: "5px" }}
          >
            <input
              type="checkbox"
              className="filter-checkbox"
              id={`filter-checkbox-${i}`}
              name={tag}
              value={tag}
              checked={props.tags[tag]}
              onChange={event => {
                const target = event.target
                console.log(props.tags)

                props.setTags({
                  ...props.tags,
                  [tag]: target.checked
                })
              }}
            />
            <label htmlFor={`filter-checkbox-${i}`}>
              {toiletFilterTagsToText[tag]}
            </label>
          </div>
        ))
      }
    </React.Fragment>
  )
}
