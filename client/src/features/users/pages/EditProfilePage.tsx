import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import useForm from "../../forms/hooks/useForm";
import Container from "@mui/material/Container";
import { useAppSelector } from "../../../app/hooks";
import useHandleUsers from "../hooks/useHandleUsers";
import EditUserForm from "../components/EditUserForm";
import { useGetUserProfileQuery } from "../slices/usersApiSlice";
import mapUserToModel from "../helpers/mapToModel/mapUserToModel";
import initialEditUserForm from "../helpers/initialForms/initialEditUserForm";
import editUserSchema from "../models/Joi/editUserSchema";
import Spinner from "../../general/components/Spinner";

const EditProfilePage = () => {
  const { user } = useAppSelector(state => state.auth);
  const { handleEditAccount, isEditUserLoading } = useHandleUsers();
  const { data: userProfile } = useGetUserProfileQuery();

  const { value, ...rest } = useForm(
    initialEditUserForm,
    editUserSchema,
    handleEditAccount
  );
  const { setData } = rest;

  useEffect(() => {
    if (userProfile) {
      const userMappedToModel = mapUserToModel(userProfile);
      setData(userMappedToModel);
    }
  }, [userProfile, setData]);

  if (!user) return <Navigate replace to={ROUTES.ROOT} />;
  if (isEditUserLoading) return <Spinner />;
  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <EditUserForm
        onSubmit={rest.onSubmit}
        onReset={rest.handleReset}
        onFormChange={rest.validateForm}
        onInputChange={rest.handleInputChange}
        data={value.data}
        errors={value.errors}
      />
    </Container>
  );
};

export default EditProfilePage;
