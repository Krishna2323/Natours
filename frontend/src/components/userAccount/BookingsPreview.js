import * as React from "react";
import "./BookingsPreview.scss";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: "Very Satisfied",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

const BookingsPreview = (props) => {
  const { products } = props;
  return (
    <div className="user-bookings-preview">
      {/* TOUR IMAGE */}
      <img
        src={require(`../assests/tours/${props.products.imageCover}`)}
        alt=""
        className="user-bookings-preview__img"
      />
      {/* TOUR DETAILS  */}

      <div className="user-bookings-preview__details">
        {/* TOUR DETAIL BOX 1 */}
        <div className="user-bookings-preview__details__box-1">
          <h1 className="heading-secondary">{products.name}</h1>
          <p className="tour-details__id">Booking Id : {products.id} </p>
          <p className="tour-details__date">Booked On : 12-03-22</p>
          <p className="tour-details__participants">Number Of Bookings : 5</p>
          <h1 className="heading-tertiary tour-details__price">
            Total Price : 5 x ${products.price} = ${5 * products.price}
          </h1>
        </div>
        {/* TOUR DETAIL BOX 2 */}
        <div className="user-bookings-preview__details__box-2">
          <textarea
            rows={5}
            type="text"
            maxLength={125}
            placeholder="Write A Review..."
          />
          <div className="user-bookings-preview__details__box-2__ratings">
            <Rating
              defaultValue={5}
              name="highlight-selected-only"
              IconContainerComponent={IconContainer}
              highlightSelectedOnly
              color="success"
            />
          </div>

          <Link to="/submitRating">Submit Review</Link>
        </div>
      </div>
    </div>
  );
};

export default BookingsPreview;
