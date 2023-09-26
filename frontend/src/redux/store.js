import { configureStore } from "@reduxjs/toolkit";
import authreducer from "../redux/features/auth/authslice";
import productReducer from "./features/products/productSlice";
import filterReducer from "./features/products/filterSlice";

export const store = configureStore({
    reducer: {
        auth: authreducer,
        product: productReducer,
        filter: filterReducer
    }
});