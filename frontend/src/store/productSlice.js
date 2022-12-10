import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productSlice = createSlice({
  name: "product",
  initialState: { product: null, isLoading: false, isError: false },
  reducers: {
    getTour(state, action) {
      state.product = action.payload.product;
      state.isError = action.payload.isError;
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const getTour = (id) =>
  async function (dispatch) {
    try {
      dispatch(productSlice.actions.getTour({ isLoading: true }));
      const product = await axios({
        method: "GET",
        url: `http://localhost:8000/api/v1/tours/${id}`,
        withCredentials: false,
      });
      dispatch(
        productSlice.actions.getTour({
          isLoading: false,
          product: product.data.data.data,
        })
      );
    } catch (err) {
      console.log(err.response);
      dispatch(
        productSlice.actions.getTour({
          isLoading: false,
          isError: err.response.data.error.mess,
        })
      );
    }
  };

export default productSlice;
