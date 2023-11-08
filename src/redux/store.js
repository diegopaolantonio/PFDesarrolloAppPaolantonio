import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import { daApi } from "../services/daApi";

export const store = configureStore({
  reducer: {
    authSlice,
    [daApi.reducerPath]: daApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(daApi.middleware),
});
