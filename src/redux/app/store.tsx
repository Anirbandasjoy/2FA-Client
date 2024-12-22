import { configureStore } from "@reduxjs/toolkit";
import baseAuthApi from "../api/baseApi";
import userInfoReducer from "../features/auth/authSlice";
export const store = configureStore({
  reducer: {
    [baseAuthApi.reducerPath]: baseAuthApi.reducer,
    userInfo: userInfoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAuthApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
