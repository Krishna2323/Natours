import React, { useEffect, useState } from "react";
import "./TourReview.scss";
import img1 from "../../assests/tours/tour-1-1.jpg";
import { useSelector } from "react-redux";

const TourReview = () => {
  const [current, setCurrent] = useState(0);

  const { product } = useSelector((state) => state.product);
  const { reviews } = product;

  const handlePlusClick = () => {
    const reviews = document.querySelectorAll(".review");
    if (current === reviews.length - 1) {
      setCurrent((cur) => cur - reviews.length + 1);
    } else {
      setCurrent((cur) => Number(cur) + 1);
    }
  };

  const handlePrevClick = () => {
    const reviews = document.querySelectorAll(".review");

    if (current <= 0) {
      setCurrent((cur) => reviews.length - 1);
    } else {
      setCurrent((cur) => cur - 1);
    }
  };

  const handleDotClick = (e) => {
    setCurrent((ehhh) => Number(e.target.dataset.num));
  };

  useEffect(() => {
    const reviews = document.querySelectorAll(".review");

    console.log(reviews);
    reviews.forEach((el, i) => {
      if (+el.dataset.num === current) {
        el.style.transform = `translateX(${(i - current) * 100}%) scale(1.1)`;
        el.classList.add("active-review");
      } else {
        el.style.transform = `translateX(${(i - current) * 100}%) `;
        el.classList.add("inactive-review");
        // el.style.opacity = 0.5;
      }
    });

    const dots = document.querySelectorAll(".dot");

    dots.forEach((el) => {
      if (parseInt(el.dataset.num) === current) {
        el.classList.add("dot-active");
      } else {
        el.classList.remove("dot-active");
      }
    });
  }, [current]);

  return (
    <div className="tour-review " style={{ backgroundImage: `url(${img1})` }}>
      <h3 className="heading-primary">Happy Customers </h3>
      <div className="tour-review-box ">
        {reviews.map((el, i) => (
          <div
            key={i}
            data-num={i}
            style={{ transform: `translateX(${100 * i}%)` }}
            className="review review-active"
          >
            <div className="review__user-details">
              <img
                className="review-img"
                src={require(`./../../assests/users/${el.user.photo}`)}
                alt="User Profile Pic"
              ></img>
              <h2 className="review-name">- {el.user.name}</h2>
            </div>
            <div className="review__review-details">
              <span className="review-title">Best Tour Of My Life</span>
              <p className="review-text">
                {el.review} Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Nisi repudiandae autem quaerat ea explicabo deserunt,
                magnam dolore nobis optio excepturi.
              </p>
            </div>
          </div>
        ))}

        <button onClick={handlePlusClick} className=" slider-btn increase-btn">
          {" "}
          &rarr;
        </button>
        <button onClick={handlePrevClick} className="slider-btn decrease-btn">
          {" "}
          &larr;
        </button>
        <div className="tour-review-box-dot">
          {reviews.map((el, i) => (
            <div
              key={i}
              className="dot"
              data-num={i}
              onClick={handleDotClick}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourReview;
