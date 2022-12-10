import React, { Fragment } from "react";
// import user2 from "./../../assests/users/user-2.jpg";
// import user3 from "./../../assests/users/user-3.jpg";

const TourDetailUL2 = (props) => {
  const { product } = props;
  return (
    <Fragment>
      {" "}
      {product.guides.map((guide, i) => (
        <li key={guide._id}>
          <div>
            <img src={require(`./../../assests/users/${guide.photo}`)} alt="" />
            <strong>
              {guide.role === "guide" ? "TOUR GUIDE" : guide.role.toUpperCase()}
            </strong>
          </div>
          {guide.name}
        </li>
      ))}
      {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
    </Fragment>
  );
};

export default TourDetailUL2;
