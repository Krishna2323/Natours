import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import AllTourDisplay from "./AllTourDisplay";
import "./allTours.scss";
import AllTourSidebar from "./AllTourSidebar";
import { fetchProducts, fetchMoreProducts } from "../../store/products-slice";

const AllTours = () => {
  const [sidebar, setSidebar] = useState(false);
  // const { productsLength } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [minGroupSize, setMinGroupSize] = useState(0);
  const [maxGroupSize, setMaxGroupSize] = useState(25);
  const [minTourDuration, setMinTourDuration] = useState(0);
  const [maxTourDuration, setMaxTourDuration] = useState(15);
  const [minRating, setMinRating] = useState(0);
  const [difficulty, setDifficulty] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  const handleFilterChange = (
    minPrice,
    maxPrice,
    maxGroupSize,
    minGroupSize,
    minRating,
    minTourDuration,
    maxTourDuration,
    difficulty,
    page,
    limit
  ) => {
    dispatch(
      fetchProducts(
        minPrice,
        maxPrice,
        minGroupSize,
        maxGroupSize,
        minRating,
        minTourDuration,
        maxTourDuration,
        difficulty,
        page,
        limit
      )
    );
    handleSidebar();
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
    setMinGroupSize(minGroupSize);
    setMaxGroupSize(maxGroupSize);
    setMinTourDuration(minTourDuration);
    setMaxTourDuration(maxTourDuration);
    setMinRating(minRating);
    setDifficulty(difficulty);
    setLimit(limit);
    setPage(page);
  };

  const fetchMore = () => {
    console.log("Fetching More");
    console.log(page + 1);
    dispatch(
      fetchMoreProducts(
        minPrice,
        maxPrice,
        maxGroupSize,
        minGroupSize,
        minRating,
        minTourDuration,
        maxTourDuration,
        difficulty,
        page + 1,
        limit
      )
    );
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    dispatch(fetchProducts());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="allTours">
      <AllTourSidebar
        sidebar={sidebar}
        page={page}
        sidebarFunc={handleSidebar}
        handleFilterChange={handleFilterChange}
      />
      <AllTourDisplay sidebarFunc={handleSidebar} fetchMore={fetchMore} />
    </div>
  );
};

export default AllTours;
