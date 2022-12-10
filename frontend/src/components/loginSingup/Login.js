import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAlerts, loginUser } from "../../store/loginSlice";
import Alert from "../layout/alert/Alert";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const { isLoggedIn, alert, status, isLoading } = useSelector(
    (state) => state.user
  );

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  const loginHandler = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setErr("Please Provide A Valid Email");
      console.log(err);
      return;
    }
    if (!password.length >= 90) {
      setErr("Password Must Contain Minimum 8 Characters");
      console.log(err);

      return;
    }

    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
        navigate("/");
        dispatch(clearAlerts());
      }, 1500);
    }
  }, [dispatch, isLoggedIn, navigate]);
  return (
    <Fragment>
      {isLoading && (
        <Alert type="warning" alert="Login In" message="Please Wait" />
      )}

      {alert && (
        <Alert
          type={`${status}`.toLowerCase()}
          alert={`${status}`[0].toUpperCase() + `${status}`.slice(1)}
          message={alert}
        />
      )}
      {/* {isLoggedIn && (
        <Alert
          type="success"
          alert="Logged In"
          message={`Welcome Back ${user.name.split(" ")[0]}`}
        />
      )} */}

      {
        <form onSubmit={loginHandler} className="singup">
          <h5 className="heading-4">Welcome Back To Natours!</h5>
          {err && <p>Error</p>}

          <div className="form-row">
            <label htmlFor="singup-email">Email</label>

            <input
              type="email"
              id="singup-email"
              autoComplete="off"
              onChange={emailHandler}
            />
          </div>
          <div className="form-row">
            <label htmlFor="singup-password">Password</label>

            <input
              type="password"
              id="singup-password"
              minLength={8}
              onChange={passwordHandler}
            />
          </div>

          <button className="form-btn mt-small">Submit</button>
          <Link to="/singup" className="form-link mt-small-1">
            New To Natours? Singup Here.
          </Link>
        </form>
      }
    </Fragment>
  );
};

export default Login;
