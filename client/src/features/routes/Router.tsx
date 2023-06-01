import React from "react";
import { Route, Routes } from "react-router-dom";
import ROUTS from "./routesModel";
import ErrorPage from "../general/pages/ErrorPage";
import MemoriesPage from "../momories/pages/MemoriesPage";
import SignupPage from "../users/pages/SignupPage";
import LoginPage from "../users/pages/LoginPage";
import EditProfilePage from "../users/pages/EditProfilePage";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTS.ROOT} element={<MemoriesPage />} />
      <Route path={ROUTS.MEMORIES} element={<MemoriesPage />} />
      <Route path={ROUTS.SIGNUP} element={<SignupPage />} />
      <Route path={ROUTS.LOGIN} element={<LoginPage />} />
      <Route path={ROUTS.EDIT_USER} element={<EditProfilePage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
