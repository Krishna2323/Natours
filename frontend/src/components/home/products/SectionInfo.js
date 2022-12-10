import React from "react";
import "./SectionInfo.scss";
import img1 from "../../assests/tours/tour-1-1.jpg";
import img2 from "../../assests/tours/tour-1-2.jpg";
import img3 from "../../assests/tours/tour-1-3.jpg";

const SectionInfo = () => {
  return (
    <div className="section-info">
      <div className="section-info__container text-center">
        <h1 className="heading-primary ">
          EXCITING TOURS FOR ADVENTUROUS PEOPLE
        </h1>
        <div className="info">
          <div className="info-details">
            <div>
              <span className="heading-tertiary mb-medium">
                Lorem ipsum dolor sit amet.
              </span>
              <p className="paragraph">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                autem necessitatibus, nobis nihil minima dolore quia explicabo
                cumque repudiandae dolorem similique cum delectus exercitationem
                quasi incidunt, vel repellat, magni dignissimos.
              </p>
            </div>
            <div>
              <span className="heading-tertiary mb-medium">
                LIVE ADVENTURES LIKE YOU NEVER HAVE BEFORE
              </span>
              <p className="paragraph">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                autem necessitatibus, nobis nihil minima dolore quia explicabo
                cumque repudiandae dolorem similique cum delectu.
              </p>
            </div>
          </div>
          {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

          <div className="info-image-box">
            <div>
              <img src={img1} className="img-1" alt="" />
              <img src={img2} className="img-2" alt="" />
              <img src={img3} className="img-3" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionInfo;
