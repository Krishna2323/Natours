import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getTour } from "../../store/productSlice";
import Loading from "../Not Found/Loading";
import ProductDetailHeader from "./ProductDetailHeader";
import "./SingleTour.scss";
// import TourBooking from "./TourBooking/TourBooking";
import TourDetail from "./TourDetail/TourDetail.js";
import TourGallery from "./TourGallery/TourGallery";
// import TourMap from "./TourMap/TourMap";
import TourReview from "./TourReview/TourReview";

const TourDetails = () => {
  const params = useParams();
  const dispacth = useDispatch();

  const { isLoading, product, isError } = useSelector((state) => state.product);

  useEffect(() => {
    dispacth(getTour(params.id));
    console.log(isError);
  }, [dispacth, params.id,isError]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="section-tour-details">
      {isError && <Loading text={`${isError}`} isError={true} />}
      {isLoading && <Loading text="Loading..." />}
      {!isLoading && product && (
        <Fragment>
          <ProductDetailHeader />
          <TourDetail />
          <TourGallery />
          {/* <TourMap product={product} /> */}
          <TourReview />
          {/* <TourBooking productId={product.id} /> */}
        </Fragment>
      )}
    </div>
  );
};

export default TourDetails;
