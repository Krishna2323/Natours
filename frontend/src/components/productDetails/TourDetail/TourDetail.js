import React from "react";
import { useSelector } from "react-redux";
import "./TourDetail.scss";
import TourDetailUL from "./TourDetailUL";
import TourDetailUL2 from "./TourDetailUL2";

const TourDetail = () => {
  const { product } = useSelector((state) => state.product);
  const [desc1, desc2] = product.description.split("\n");

  return (
    <div className="tour-detail">
      <div className="tour-detail__1">
        <div className="tour-detail__1__box-1">
          <span className="tour-detail__1__box-1-heading1 heading-4">
            Quick Facts
          </span>
          <ul className="tour-detail__1__box-1-list1">
            <TourDetailUL product={product} />
          </ul>
        </div>

        <div className="tour-detail__1__box-1">
          <span className="tour-detail__1__box-1-heading1 heading-4">
            Your Tour Guides
          </span>
          <ul className="tour-detail__1__box-1-list1">
            <TourDetailUL2 product={product} />
          </ul>
        </div>
      </div>
      <div className="tour-detail__2">
        <span className="heading-4 mb-big">About {product.name} Tour</span>
        <p className="paragraph">{desc1}</p>
        <p className="paragraph">{desc2}</p>
      </div>
    </div>
  );
};

export default TourDetail;
