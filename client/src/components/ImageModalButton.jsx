import React, {
  useState
} from "react";
import FloatingButton from "./FloatingButton";
import "../style/ImageModalButton.css"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


export default function ImageModalButton(props) {
  const [showModal, setShowModal] = useState(false)

  return (
    <React.Fragment>
      <button
        className="tutorial-button"
        onClick={() => setShowModal(!showModal)}
      >
        {props.text}
      </button>
      {renderModal(props, showModal, setShowModal)}
    </React.Fragment>
  )
}

function renderModal(props, showModal, setShowModal) {
  if (showModal) {
    return (
      <React.Fragment>
        <div className="tutorial-modal">
          <img className="tutorial-image" src={props.image} />
        </div>
        <FloatingButton
          buttonStyle="normal"
          icon={faArrowLeft}
          onClick={() => {
            setShowModal(false)
          }}
          bottom="5vh"
          right="0px"
        />
      </React.Fragment>
    )
  } else {
    return <div />
  }
}
