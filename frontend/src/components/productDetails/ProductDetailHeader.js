import React, { Fragment } from "react";
// import img1 from "./../assests/tours/tour-1-2.jpg";
import "./ProductDetailHeader.scss";
import icon from "../assests/icons.svg";
import { useSelector } from "react-redux";

const ProductDetailHeader = () => {
  const { product } = useSelector((state) => state.product);
  return (
    <Fragment>
      <div className="product-detail-header">
        <img src={require(`./../assests/tours/${product.imageCover}`)} alt="" />
        <div className="text-detail">
          <h1>
            {product.name}
            <ul className="text-detail-list">
              <li>
                {" "}
                <svg>
                  <use xlinkHref={`${icon}/#icon-clock`} />
                </svg>
                {product.duration} Days
              </li>
              <li>
                <svg>
                  <use xlinkHref={`${icon}/#icon-map-pin`} />
                </svg>
                {product.startLocation.description}
              </li>
            </ul>
          </h1>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductDetailHeader;
