import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../redux/slice/counterSlice";
import homeSlice from "./slice/homeSlice";
import authSlice from "./slice/authSlice";
import { daApi } from "../services/daApi";

export const store = configureStore({
  reducer: {
    counterReducer,
    homeSlice,
    authSlice,
    [daApi.reducerPath]: daApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(daApi.middleware),
});
