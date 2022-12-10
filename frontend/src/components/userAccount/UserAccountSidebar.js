import React from "react";
import "./UserAccountSidebar.scss";
import { Link } from "react-router-dom";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";

const UserAccountSidebar = () => {
  return (
    <div className="user-account__sidebar">
      <ul className="user-account__sidebar-links">
        <li className="user-account__sidebar-links__item">
          <Link className="user-account__sidebar-links__link" to="/my-bookings">
            <MdIcons.MdDashboard />
            <span> Dashboard</span>
          </Link>
        </li>
        <li className="user-account__sidebar-links__item">
          <Link className="user-account__sidebar-links__link" to="/my-bookings">
            <FaIcons.FaPassport />
            <span>My Bookings</span>
          </Link>
        </li>{" "}
        <li className="user-account__sidebar-links__item user-account__sidebar-links__item--active">
          <Link className="user-account__sidebar-links__link" to="/my-account">
            <MdIcons.MdFavorite />
            <span>Favourites</span>
          </Link>
        </li>{" "}
        <li className="user-account__sidebar-links__item">
          <Link className="user-account__sidebar-links__link" to="/my-account">
            <MdIcons.MdSettings />
            <span> Settings</span>{" "}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserAccountSidebar;
