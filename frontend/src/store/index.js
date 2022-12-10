import { configureStore } from "@reduxjs/toolkit";
import login from "./loginSlice";
import productsSlice from "./products-slice";
import productSlice from "./productSlice";

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    product: productSlice.reducer,
    user: login.reducer,
  },
});

export default store;
