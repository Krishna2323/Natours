import React from "react";
import "./HomeHeader.scss";
import image from "../../assests/tours/tour-1-1.jpg";
import { Link } from "react-router-dom";

const style = {
  backgroundImage: `url(${image})`,
};

const HomeHeader = () => {
  return (
    <div style={style} className="header-header">
      <div className="header-container">
        <div className="header-container-inner">
          <h3 className="heading-primary color-light">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui?
          </h3>
          <Link to="/allTours" className="btn-primary">Explore Your Dream Tour</Link>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
