import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.scss";
// import img from "./../../assests/tours/tour-3-cover.jpg";
import CardUl from "./CardUl";
import Overlay from "./Overlay";

const ProductCard = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { product } = props;

  const handleOpen = (props) => {
    setIsOpen((e) => !e);
  };

  return (
    <Link to={`/tour/${product._id}`} className="link">
      <div className="card">
        <h3 className="card-title">
          <span>{product.name}</span>
        </h3>

        <div className="card-header">
          <img
            src={require(`./../../assests/tours/${product.imageCover}`)}
            alt=""
          />
        </div>
        <div className="card-desc">
          <span className="card-paragraph">
            {product.difficulty} {`${product.duration}`.toUpperCase()} Day Tour
          </span>
        </div>

        <CardUl product={product} />
        <div className="card-rating">
          <span className="paragraph ">
            {" "}
            <strong>{product.ratingsAverage} </strong>Rating(8)
          </span>
          <span className="paragraph ">
            <strong>${product.price}</strong> Per Person
          </span>
        </div>

        <button className="btn-secondary btn-card" onClick={handleOpen}>
          Explore Tour
        </button>
      </div>
      {isOpen ? (
        <Overlay text={props.productName} handleOverlay={handleOpen} />
      ) : null}
    </Link>
  );
};

export default ProductCard;
