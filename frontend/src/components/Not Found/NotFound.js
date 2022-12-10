import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };
  return (
    <div className="not-found">
      <p> Page Not Found!</p>{" "}
      <div>
        <button onClick={handleClick}>Go Back</button>
      </div>
    </div>
  );
};

export default NotFound;
