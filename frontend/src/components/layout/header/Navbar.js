import React, { useState } from "react";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAlerts, logoutUser } from "../../../store/loginSlice";
import Alert from "../alert/Alert";
import Ask from "../ask/Ask";
import logo from "../../assests/logo-white.png";
// import logo from "./../../../../../starter/public/img/users";

import "./navbar.scss";

const Navbar = () => {
  const { user, status, alert } = useSelector((state) => state.user);
  const [ask, setAsk] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAskModal = () => {
    setAsk(true);
  };

  const closeAskModal = () => {
    setAsk(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setAsk(false);

    setTimeout(() => {
      dispatch(clearAlerts());
      navigate("/");
    }, 2000);
  };

  useEffect(() => {
    // if (user) {
    //   navigate("/");
    // }
  }, [user, navigate]);
  return (
    <Fragment>
      {ask && (
        <Ask
          opacity={100}
          text="Are You Sure To Logout?"
          visibility={100}
          onClick={handleLogout}
          closeModal={closeAskModal}
        />
      )}

      {alert && (
        <Alert
          type={`${status}`.toLowerCase()}
          alert={`${status}`[0].toUpperCase() + `${status}`.slice(1)}
          message={alert}
        />
      )}
      <nav className="nav">
        <Link to="/allTours" className="nav-tours">
          All Tours
        </Link>

        <div className="nav-logo">
          <Link to="/">
            {" "}
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="nav-cta">
          {!user ? (
            <>
              <Link to="/login" className="nav-cta__login">
                Login
              </Link>
              <Link to="/singup" className="nav-cta__singup">
                <span>SignUp</span>
              </Link>
            </>
          ) : (
            <div className="nav-cta">
              {user.photo ? (
                <Link to="/my-account">
                  <img
                    className="nav-cta__user-photo"
                    src={require(`./../../assests/users/${user.photo}`)}
                    alt=""
                  />
                </Link>
              ) : (
                <Link to="/login">
                  <img
                    className="nav-cta__user-photo"
                    src={require(`../../assests/users/default.jpg`)}
                    alt=""
                  />
                </Link>
              )}

              <span onClick={handleAskModal} className="nav-cta__logout">
                Logout
              </span>
            </div>
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
