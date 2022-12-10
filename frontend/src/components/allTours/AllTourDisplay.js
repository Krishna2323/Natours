import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import "./AllTourDisplay.scss";
import ProductCard from "../home/products/ProductCard";
import Loading from "../Not Found/Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const AllTourDisplay = (props) => {
  const { products, isLoading, totalProducts } = useSelector(
    (state) => state.products
  );

  const fetchMore = () => {
    props.fetchMore();
  };

  return (
    <Fragment>
      {!isLoading ? (
        <div className="all-tour-display">
          <h2
            className="heading-primary all-tour-display__heading"
            onClick={props.sidebarFunc}
          >
            {(products && products.length === 0) ? (
              <h2 className="heading-primary">No Results Found!</h2>
            ) : (
              "Results:"
            )}
          </h2>

          <div className="all-tour-display__tours">
            {products && (
              <InfiniteScroll
                key={"SSSSSKKKK"}
                dataLength={products.length}
                next={fetchMore}
                hasMore={totalProducts !== products.length}
                loader={<Loading isError={false} text={"Loading..."} />}
              >
                <div className="all-tour-display__tours-inner">
                  {products &&
                    products.map((product, i) => (
                      <ProductCard key={i} product={product}></ProductCard>
                    ))}
                </div>
              </InfiniteScroll>
            )}
          </div>
        </div>
      ) : (
        <div className="all-tour-display">
          <Loading isError={false} text={"Loading Tours..."} />
        </div>
      )}
    </Fragment>
  );
};

export default AllTourDisplay;
