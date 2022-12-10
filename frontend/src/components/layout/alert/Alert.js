import React, { Fragment } from "react";
import ReactDom from "react-dom";
import "./Alert.scss";

const Alert = (props) => {
  return (
    <Fragment>
      {ReactDom.createPortal(
        <div className={`alert-pop`}>
          <span className={`alert-pop-header ${props.type}`}>
            {props.alert} :
          </span>
          <span className={`alert-pop-message ${props.type}`}>
            {" "}
            &nbsp;
            {props.message}
          </span>
        </div>,
        document.getElementById("alert")
      )}
    </Fragment>
  );
};

export default Alert;
