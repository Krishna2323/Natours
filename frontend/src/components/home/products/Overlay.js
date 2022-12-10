import React from "react";
import "./Overlay.scss";

const Overlay = (props) => {
  return (
    <div className="overlay" onClick={props.handleOverlay}>
      <div className="overlay-container">{props.text}</div>
    </div>
  );
};

export default Overlay;
