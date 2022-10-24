import dataReducer from "./dataSlice";
import cartReducer from "./cartSlice";
import commonReducer from "./commonSlice";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    data: dataReducer,
    cart: cartReducer,
    common: commonReducer,
  },
});
