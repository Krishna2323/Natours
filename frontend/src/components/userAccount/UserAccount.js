import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UserAccount.scss";
import UserAccountSidebar from "./UserAccountSidebar";
import { updateUser } from "../../store/loginSlice";
import Alert from "../layout/alert/Alert";
import Loading from "../Not Found/Loading";

const UserAccount = () => {
  // const navigate = useNavigate();
  const { user, status, alert, isLoading, isUpdating } = useSelector(
    (s) => s.user
  );

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [photo, setPhoto] = useState(user.photo);
  const [formPhoto, setFormPhoto] = useState(user.photo);

  const dispatch = useDispatch();

  const submitForm = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", name);
    form.append("email", email);
    form.append("photo", formPhoto);

    dispatch(updateUser(form));
  };

  const photoChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPhoto(reader.result);
      }
    };
    setFormPhoto(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
  };

  // useEffect(() => {
  //   setPhoto(user.photo);
  // }, []);

  return (
    <Fragment>
      {isUpdating && <Loading text="Updating..." />}

      {user && !isUpdating && (
        <Fragment>
          {alert && (
            <Alert
              type={`${status}`.toLowerCase()}
              alert={`${status}`[0].toUpperCase() + `${status}`.slice(1)}
              message={alert}
            />
          )}

          <div className="user-account">
            <UserAccountSidebar />
            <div className="user-account__dashboard-container">
              <div className="user-account__dashboard">
                <span className="heading-secondary">Your Account Settings</span>
                <form
                  onSubmit={submitForm}
                  className="user-account__dashboard-form"
                >
                  <div className="user-account__dashboard-form__row">
                    <label>Name</label>
                    <input
                      defaultValue={user.name}
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      required
                      minLength={1}
                    />
                  </div>
                  <div className="user-account__dashboard-form__row">
                    <label>Email</label>
                    <input
                      type="email"
                      required
                      defaultValue={user.email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="user-account__dashboard-form__row">
                    <div className="user-account__dashboard-form__row__image">
                      <img
                        src={
                          photo === user.photo
                            ? require(`../assests/users/${photo}`)
                            : photo
                        }
                        alt=""
                      />

                      <input
                        id="user-account__photo"
                        type="file"
                        onChange={photoChange}
                      />
                      <label htmlFor="user-account__photo">
                        Choose New Photo
                      </label>
                    </div>
                  </div>
                  <button className="user-account__dashboard-form__submit-btn btn-primary">
                    Save Setting
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UserAccount;
