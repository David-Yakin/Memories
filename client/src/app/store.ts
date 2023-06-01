import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { memoryReducer } from "../features/momories/memorySlice";
import authReducer from "../features/users/slices/authSlice";
import { apiSlice } from "./apiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    memories: memoryReducer,
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
