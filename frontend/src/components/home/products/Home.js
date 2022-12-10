import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopProducts } from "../../../store/products-slice";
import Products from "./Products";
import HomeHeader from "./HomeHeader";
import SectionInfo from "./SectionInfo";
import SectionTestimonial from "./SectionTestimonial";
import Gallery from "./Gallery";
// import Loading from "../../Not Found/Loading";

const Home = () => {
  const dispatch = useDispatch();

  // const { isLoading, isError } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchTopProducts());
  }, [dispatch]);
  return (
    <Fragment>
      <Fragment>
        <HomeHeader />
        <SectionInfo />
        <SectionTestimonial />
        <Products />
        <Gallery />
      </Fragment>
    </Fragment>
  );
};

export default Home;
