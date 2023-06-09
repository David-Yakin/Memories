import React from "react";
import { Route, Routes } from "react-router-dom";
import ROUTES from "./routesModel";
import ErrorPage from "../general/pages/ErrorPage";
import MemoriesPage from "../memories/pages/MemoriesPage";
import SignupPage from "../users/pages/SignupPage";
import LoginPage from "../users/pages/LoginPage";
import EditProfilePage from "../users/pages/EditProfilePage";
import MemoryDetailsPage from "../memories/pages/MemoryDetailsPage";
import CreateMemoryPage from "../memories/pages/CreateMemoryPage";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<MemoriesPage />} />
      <Route path={ROUTES.CREATE_MEMORY} element={<CreateMemoryPage />} />
      <Route path={ROUTES.MEMORIES} element={<MemoriesPage />} />
      <Route
        path={`${ROUTES.MEMORY_DETAILS}/:memoryId`}
        element={<MemoryDetailsPage />}
      />
      <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.EDIT_USER} element={<EditProfilePage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
