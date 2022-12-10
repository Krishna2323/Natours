import React, { Fragment } from "react";
import ReactDom from "react-dom";
// import "./Ask.scss";

const CustomModal = (props) => {
  return (
    <Fragment>
      {ReactDom.createPortal(
        <div className="backdrop" onClick={props.closeModal}></div>,
        document.getElementById("backdrop")
      )}
      {ReactDom.createPortal(
        props.component,
        document.getElementById("component")
      )}
    </Fragment>
  );
};

export default CustomModal;
