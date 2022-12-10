import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAlerts, singupUser } from "../../store/loginSlice";

const Singup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(singupUser({ name, email, password, passwordConfirm }));
  };

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
        dispatch(clearAlerts());
        navigate("/");
      }, 2000);
    }
  }, [dispatch, isLoggedIn, navigate]);

  return (
    <Fragment>
      <form className="singup" onSubmit={submitHandler}>
        <h1 className="heading-4">Singup To Explore Natours!</h1>
        <div className="form-row">
          <label htmlFor="singup-name">Name</label>

          <input
            type="text"
            id="singup-name"
            autoComplete="off"
            minLength={8}
            onChange={nameHandler}
            defaultValue={name}
          />
        </div>
        <div className="form-row">
          <label htmlFor="singup-email">Email</label>

          <input
            type="text"
            id="singup-email"
            autoComplete="off"
            onChange={emailHandler}
            defaultValue={email}
          />
        </div>
        <div className="form-row">
          <label htmlFor="singup-password">Password</label>

          <input
            type="password"
            id="singup-password"
            minLength={8}
            defaultValue={password}
            onChange={passwordHandler}
          />
        </div>
        <div className="form-row">
          <label htmlFor="singup-Confirmpassword">Confirm Password</label>

          <input
            type="password"
            id="singup-Confirmpassword"
            minLength={8}
            defaultChecked={passwordConfirm}
            onChange={passwordChangeHandler}
          />
        </div>
        <button className="form-btn mt-small">Submit</button>

        <Link to="/login" className="form-link mt-small-1">
          Already A User? Login Here.
        </Link>
      </form>
    </Fragment>
  );
};

export default Singup;
