import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./UserBookings.scss";
import UserAccountSidebar from "./UserAccountSidebar";
import { fetchProducts } from "../../store/products-slice";
import BookingsPreview from "./BookingsPreview";
import Loading from "../Not Found/Loading";

const UserBookings = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <Fragment>
      <div className="user-bookings">
        <UserAccountSidebar />
        {isLoading ? (
          <Loading text="Loading..." grid="2/-1" />
        ) : (
          <div className="user-bookings__container">
            <h3 className="heading-primary">My Bookings</h3>
            {products && products.map((p) => <BookingsPreview products={p} />)}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default UserBookings;
