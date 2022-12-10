import React, { Fragment } from "react";
import icons from "../../assests/icons.svg";

const TourDetailUL = (props) => {
  const { product } = props;
  const Dnew = Date.now();
  const date = new Intl.DateTimeFormat("en-US").format(Dnew);

  return (
    <Fragment>
      <li>
        <div>
          <svg>
            <use xlinkHref={`${icons}/#icon-calendar`} />
          </svg>
          <strong>Next Date </strong>
        </div>
        {date}
      </li>
      {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      <li>
        <div>
          <svg>
            <use xlinkHref={`${icons}/#icon-trending-up`} />
          </svg>
          <strong>Difficulty </strong>
        </div>
        {`${product.difficulty}`.charAt(0).toUpperCase() +
          `${product.difficulty}`.slice(1).toLowerCase()}
      </li>
      {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      <li>
        <div>
          <svg>
            <use xlinkHref={`${icons}/#icon-user`} />
          </svg>
          <strong>Participants </strong>
        </div>
        {product.maxGroupSize} Peoples
      </li>
      {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      <li>
        <div>
          <svg>
            <use xlinkHref={`${icons}/#icon-star`} />
          </svg>
          <strong>Rating </strong>
        </div>
        {`${product.ratingsAverage}/5 (${product.ratingsQuantity})`}
      </li>
    </Fragment>
  );
};

export default TourDetailUL;
