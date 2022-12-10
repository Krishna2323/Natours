import React, { Fragment } from "react";
import ReactDom from "react-dom";
import "./Ask.scss";

const Ask = (props) => {
  return (
    <Fragment>
      {ReactDom.createPortal(
        <div className="backdrop" onClick={props.closeModal}></div>,
        document.getElementById("backdrop")
      )}
      {ReactDom.createPortal(
        <div className="ask">
          <span className="ask-text">{props.text}</span>
          <div className="ask-btn-box">
            {" "}
            <button onClick={props.closeModal} className="ask-btn">
              No
            </button>
            <button className="ask-btn" onClick={props.onClick}>
              Yes
            </button>
          </div>
        </div>,
        document.getElementById("ask")
      )}
    </Fragment>
  );
};

export default Ask;
