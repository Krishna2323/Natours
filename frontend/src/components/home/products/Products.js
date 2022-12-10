import React from "react";
import { useSelector } from "react-redux";
import "./product.scss";
import ProductCard from "./ProductCard";
import Loading from "../../Not Found/Loading";

const Products = () => {
  const { top3: products, isError } = useSelector((state) => state.products);

  return (
    <div className="section-product">
      <h2 className="heading-primary">Top Tours</h2>
      <div className="products">
        {isError && <Loading text={`${isError}`} isError={true} />}

        {products &&
          products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
      </div>
    </div>
  );
};

export default Products;
