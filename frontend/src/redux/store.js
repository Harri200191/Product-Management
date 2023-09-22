import { configureStore } from "@reduxjs/toolkit";
import authreducer from "../redux/features/auth/authslice";

export const store = configureStore({
    reducer: {
        auth: authreducer
    }
});