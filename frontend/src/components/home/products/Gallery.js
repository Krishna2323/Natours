import React, { Fragment } from "react";
import "./Gallery.scss";
import img1 from "../../assests/tours/tour-4-1.jpg";
import img2 from "../../assests/tours/tour-4-2.jpg";
import img3 from "../../assests/tours/tour-4-3.jpg";
import img4 from "../../assests/tours/tour-5-1.jpg";
import img5 from "../../assests/tours/tour-5-2.jpg";
import img6 from "../../assests/tours/tour-5-3.jpg";
import img7 from "../../assests/tours/tour-6-1.jpg";
import img8 from "../../assests/tours/tour-6-2.jpg";
import img9 from "../../assests/tours/tour-6-3.jpg";
import img10 from "../../assests/tours/tour-7-1.jpg";
import img11 from "../../assests/tours/tour-7-2.jpg";
import img12 from "../../assests/tours/tour-7-3.jpg";
import img13 from "../../assests/tours/tour-8-1.jpg";
import img14 from "../../assests/tours/tour-8-2.jpg";
import img16 from "../../assests/tours/tour-9-1.jpg";
import img17 from "../../assests/tours/tour-9-2.jpg";
import img18 from "../../assests/tours/tour-9-3.jpg";

const Gallery = () => {
  return (
    <Fragment>
      <div className="section-gallery">
        <h2 className="heading-secondary mb-large text-center">
          Gallery Of Beauty & Joy
        </h2>
        <div className="gallery-grid">
          <div className="gallery-grid-inner">
            <div className="gallery-grid-inner-inner">
              <figure className="gallery gallery-img-1">
                <img src={img1} alt="" />
              </figure>
              <figure className="gallery gallery-img-2">
                <img src={img2} alt="" />
              </figure>
              <figure className="gallery gallery-img-3">
                <img src={img3} alt="" />
              </figure>
              <figure className="gallery gallery-img-4">
                <img src={img4} alt="" />
              </figure>
              <figure className="gallery gallery-img-5">
                <img src={img5} alt="" />
              </figure>
              <figure className="gallery gallery-img-6">
                <img src={img6} alt="" />
              </figure>
              <figure className="gallery gallery-img-7">
                <img src={img7} alt="" />
              </figure>
              <figure className="gallery gallery-img-8">
                <img src={img8} alt="" />
              </figure>
              <figure className="gallery gallery-img-9">
                <img src={img9} alt="" />
              </figure>
              <figure className="gallery gallery-img-10">
                <img src={img10} alt="" />
              </figure>
              <figure className="gallery gallery-img-11">
                <img src={img11} alt="" />
              </figure>
              <figure className="gallery gallery-img-12">
                <img src={img12} alt="" />
              </figure>
              <figure className="gallery gallery-img-13">
                <img src={img13} alt="" />
              </figure>
              <figure className="gallery gallery-img-14">
                <img src={img14} alt="" />
              </figure>
              <figure className="gallery gallery-img-16">
                <img src={img16} alt="" />
              </figure>
              <figure className="gallery gallery-img-17">
                <img src={img17} alt="" />
              </figure>
              <figure className="gallery gallery-img-18">
                <img src={img18} alt="" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Gallery;
