import { createSlice } from "@reduxjs/toolkit";
import JwtDecode from "jwt-decode";
import { CurrentUser } from "../models/types/userTypes";

type InitialState = {
  token: string | null;
  user: CurrentUser | null;
};

const initialState: InitialState = {
  token: localStorage.getItem("token") || null,
  user: localStorage.getItem("token")
    ? JwtDecode(localStorage.getItem("token")!)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getToken: state => {
      const token = localStorage.getItem("token");
      state.token = token ? token : null;
    },
    setUser: (state, action) => {
      const token = action.payload;
      state.token = token;
      localStorage.setItem("token", token);
      const user: CurrentUser = JwtDecode(token);
      state.user = token ? user : null;
    },
    logout: state => {
      state.token = null;
      localStorage.removeItem("token");
      state.user = null;
    },
  },
});

export const { setUser, logout, getToken } = authSlice.actions;
export default authSlice.reducer;
