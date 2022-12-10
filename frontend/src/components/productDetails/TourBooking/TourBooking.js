import React, { Fragment, useState } from "react";
import "./TourBooking.scss";
import { useStripe } from "@stripe/react-stripe-js";
import CustomModal from "../../layout/customModal/CustomModal";
import axios from "axios";
import Alert from "./../../layout/alert/Alert";

const TourBooking = (props) => {
  const stripe = useStripe();
  const [bookingModal, setBokkingModal] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await axios.get(
        `/api/v1/booking/checkout-session/${props.productId}`
      );
      console.log(res);

      await stripe.redirectToCheckout({ sessionId: res.data.session.id });

      setBokkingModal(false);
    } catch (error) {
      setError(error.response.data.message);

      setTimeout(() => {
        setError(null);
      }, 3000);
    }
    setBokkingModal(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const openBookingModal = async (e) => {
    e.preventDefault();

    setBokkingModal(true);
  };

  const closeBookingModal = () => {
    setBokkingModal(false);
  };

  const bookingModalHtml = (
    <div className="tour-booking__modal">
      <span className="tour-booking__modal-heading heading-primary">
        Book Your Tour Now !
      </span>
      <form className="tour-booking__modal-form">
        <div className="tour-booking__modal-form__row">
          <label htmlFor="booking-name">Name</label>{" "}
          <input type="text" id="booking-name" />
        </div>
        <div className="tour-booking__modal-form__row">
          <label htmlFor="booking-name">Email</label>{" "}
          <input type="text" id="booking-name" />
        </div>{" "}
        <button
          onClick={handleSubmit}
          className="tour-booking__modal__submit-btn btn-secondary"
        >
          Book!
        </button>
      </form>
    </div>
  );

  return (
    <Fragment>
      {error && <Alert type="error" alert="Failed" message={error} />}
      {bookingModal && (
        <CustomModal
          component={bookingModalHtml}
          closeModal={closeBookingModal}
        ></CustomModal>
      )}
      <div className="tour-booking">
        <form className="tour-booking__div-1">
          <label htmlFor="card-element"></label>

          <button className="btn-primary" onClick={openBookingModal}>
            BOOK
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default TourBooking;
