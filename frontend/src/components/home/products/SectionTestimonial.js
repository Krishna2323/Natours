import React from "react";
import "./SectionTestimonial.scss";
import user from "../../assests/users/user-1.jpg";
import img3 from "../../assests/tours/tour-1-2.jpg";

const arr = [1, 2, 3, 4];

const SectionTestimonial = () => {
  return (
    <div
      className="section-testimonial "
      style={{
        backgroundImage: ` url(${img3})`,
      }}
    >
      <h3 className="heading-primary color-light section-testimonial-heading ">
        Testimonials
      </h3>
      <div className="testimonials">
        {arr.map((e, i) => (
          <div key={i} className="testimonials-skew">
            <div className="testimonials-card">
              <div className="testimonials-card__info">
                <img src={user} alt="" />
                <p className="name">Jonas Smith</p>
              </div>
              <div>
                <p className="title color-light"> My Best Ever Tour.</p>
                <p className="paragraph text-start color-light">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui
                  veritatis voluptates ullam? Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionTestimonial;
