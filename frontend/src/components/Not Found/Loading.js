import React, { useEffect } from "react";
import "./NotFound.scss";

const Loading = (props) => {
  return (
    <div
      className="loading"
      style={props.grid ? { gridColumn: `${props.grid}` } : null}
    >
      <p className={props.isError ? "error" : "success"}> {props.text}</p>
    </div>
  );
};

export default Loading;
