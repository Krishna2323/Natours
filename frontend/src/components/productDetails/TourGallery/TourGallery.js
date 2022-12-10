import React from "react";
import "./TourGallery.scss";
import img1 from "../../assests/tours/tour-1-1.jpg";
import img2 from "../../assests/tours/tour-1-2.jpg";
import img3 from "../../assests/tours/tour-1-3.jpg";

const TourGallery = () => {
  return (
    <div className="tour-gallery">
      <div className="img-1">
        <img src={img1} alt="" />
      </div>
      <div className="img-2">
        <img src={img2} alt="" />
      </div>{" "}
      <div className="img-3">
        <img src={img3} alt="" />
      </div>
    </div>
  );
};

export default TourGallery;
