import React from "react";
import "./LoginSingup.scss";
import Singup from "./Singup";
import img1 from "../assests/tours/tour-1-1.jpg";
const SingupForm = (props) => {
  return (
    <div className="loginSingup">
      <div
        className="loginSingup-container"
        style={{ backgroundImage: `url(${img1})` }}
      >
        <Singup />
      </div>
    </div>
  );
};

export default SingupForm;
