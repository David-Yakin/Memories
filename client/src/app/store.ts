import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import authReducer from "../features/users/slices/authSlice";
import memoriesReducer from "../features/memories/slices/memoriesSlice";
import { apiSlice } from "./apiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    memories: memoriesReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: GetDefaultMiddleware =>
    GetDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
