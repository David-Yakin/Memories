import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

const baseUrl = process.env.REACT_APP_PORT || "http://localhost:5000";

const baseQuery = fetchBaseQuery({
  // הכתובת הראשית אליה נשלח את הבקשות
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) headers.set("x-auth-token", token);
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["user", "memories"],
  endpoints: builder => ({}),
});
