import React from "react";
import icon from "../../assests/icons.svg";

const CardUl = (props) => {
  const { product } = props;
  return (
    <div className="card-details">
      <ul className="card-details__features">
        <li>
          {" "}
          <svg className="card-icon">
            <use xlinkHref={`${icon}/#icon-map-pin`} />
          </svg>{" "}
          {product.startLocation.description}
        </li>
        {/* /////// */}
        <li>
          {" "}
          <svg className="card-icon">
            <use xlinkHref={`${icon}/#icon-calendar`} />
          </svg>{" "}
          {product.startDates[0].slice(0, 10)}
        </li>
        {/* /////// */}
        <li>
          {" "}
          <svg className="card-icon">
            <use xlinkHref={`${icon}/#icon-flag`} />
          </svg>{" "}
          {product.locations.length + 1} Stops
        </li>
        <li>
          {" "}
          <svg className="card-icon">
            <use xlinkHref={`${icon}/#icon-user`} />
          </svg>{" "}
          {product.maxGroupSize} Peoples
        </li>
      </ul>
    </div>
  );
};

export default CardUl;
