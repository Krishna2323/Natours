import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;
const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    top3: [],
    isLoading: false,
    isError: false,
    totalProducts: 0,
  },

  reducers: {
    getProducts(state, action) {
      state.isLoading = action.payload.isLoading;
      state.products = action.payload.productsAll;
      state.isError = action.payload.isError;
      state.top3 = action.payload.top3;
      state.totalProducts = action.payload.totalProducts;
    },
    fetchMoreProducts(state, action) {
      state.products = state.products.concat(action.payload.newProducts);
      state.top3 = action.payload.top3;
      state.totalProducts = action.payload.totalProducts;
    },
  },
});

export const fetchProducts = (
  minPrice = 0,
  maxPrice = 3000,
  minGroupSize = 0,
  maxGroupSize = 25,
  minRating = 0,
  minTourDuration = 0,
  maxTourDuration = 15,
  difficulty = null,
  page = 1,
  limit = 6
) => {
  return async (dispatch) => {
    try {
      dispatch(productsSlice.actions.getProducts({ isLoading: true }));
      let link = `/api/v1/tours?price[gte]=${minPrice}&price[lte]=${maxPrice}&ratingsAverage[gte]=${minRating}&maxGroupSize[gte]=${minGroupSize}
&maxGroupSize[lte]=${maxGroupSize}&duration[gte]=${minTourDuration}&duration[lte]=${maxTourDuration}&page=${page}&limit=${limit}`;

      if (difficulty) {
        link = `/api/v1/tours?price[gte]=${minPrice}&price[lte]=${maxPrice}&ratingsAverage[gte]=${minRating}&maxGroupSize[gte]=${minGroupSize}
  &maxGroupSize[lte]=${maxGroupSize}&duration[gte]=${minTourDuration}&duration[lte]=${maxTourDuration}&difficulty=${difficulty}&page=${page}&limit=${limit}`;
      }

      const products = await axios({
        method: "GET",
        url: link,
      });

      dispatch(
        productsSlice.actions.getProducts({
          productsAll: products.data.data.data,
          isLoading: false,
          totalProducts: products.data.results,
        })
      );
      console.log(products.data.results);

      // console.log(Cookies.get("jwt"));
    } catch (err) {
      console.log(err);
      dispatch(
        productsSlice.actions.getProducts({
          isLoading: false,
          isError: err.response.data.message || err.response,
        })
      );
    }
  };
};

export const fetchMoreProducts = (
  minPrice = 0,
  maxPrice = 3000,
  maxGroupSize = 25,
  minGroupSize = 0,
  minRating = 0,
  minTourDuration = 0,
  maxTourDuration = 15,
  difficulty = null,
  page,
  limit
) => {
  return async (dispatch) => {
    try {
      // dispatch(productsSlice.actions.fetchMoreProducts({ isLoading: true }));
      let link = `/api/v1/tours?price[gte]=${minPrice}&price[lte]=${maxPrice}&ratingsAverage[gte]=${minRating}&maxGroupSize[gte]=${minGroupSize}
&maxGroupSize[lte]=${maxGroupSize}&duration[gte]=${minTourDuration}&duration[lte]=${maxTourDuration}&page=${page}&limit=${limit}`;

      if (difficulty) {
        link = `/api/v1/tours?price[gte]=${minPrice}&price[lte]=${maxPrice}&ratingsAverage[gte]=${minRating}&maxGroupSize[gte]=${minGroupSize}
  &maxGroupSize[lte]=${maxGroupSize}&duration[gte]=${minTourDuration}&duration[lte]=${maxTourDuration}&difficulty=${difficulty}&page=${page}&limit=${limit}`;
      }

      const products = await axios({
        method: "GET",
        url: link,
      });

      dispatch(
        productsSlice.actions.fetchMoreProducts({
          newProducts: products.data.data.data,
          isLoading: false,
          totalProducts: products.data.results,
        })
      );

      console.log(products.data.data.results);
    } catch (err) {
      console.log(err);
      dispatch(
        productsSlice.actions.fetchMoreProducts({
          isLoading: false,
          isError: err.response.data.message || err.response.statusText,
        })
      );
    }
  };
};

export const fetchTopProducts = () => {
  return async (dispatch) => {
    try {
      dispatch(productsSlice.actions.getProducts({ isLoading: true }));

      const products = await axios({
        method: "GET",
        url: "/api/v1/tours/top/products",
      });

      dispatch(
        productsSlice.actions.getProducts({
          top3: products.data.data.data,
          isLoading: false,
        })
      );

      // console.log(Cookies.get("jwt"));
      console.log(products.data.data.data);
    } catch (err) {
      console.log(err);
      dispatch(
        productsSlice.actions.getProducts({
          isLoading: false,
          isError: err.response.data.message || err.response.statusText,
        })
      );
    }
  };
};

export default productsSlice;
