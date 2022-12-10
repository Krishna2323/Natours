import React, { useEffect } from "react";
import "./LoginSingup.scss";
import img1 from "../assests/tours/tour-1-1.jpg";
import Login from "./Login";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const LoginSingup = (props) => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  });
  return (
    <div className="loginSingup">
      <div
        className="loginSingup-container"
        style={{ backgroundImage: `url(${img1})` }}
      >
        <Login />
      </div>
    </div>
  );
};

export default LoginSingup;
