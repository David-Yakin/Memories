import React from "react";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import useForm from "../../forms/hooks/useForm";
import initialSignupForm from "../helpers/initialForms/initialSignupForm";
import signupSchema from "../models/Joi/signupSchema";
import Container from "@mui/material/Container";
import UserForm from "../components/UserForm";
import { useAppSelector } from "../../../app/hooks";
import useHandleUsers from "../hooks/useHandleUsers";
import Spinner from "../../general/components/Spinner";

const SignupPage = () => {
  const { user } = useAppSelector(state => state.auth);
  const { handleRegistration, isRegisterLogin } = useHandleUsers();
  const { value, ...rest } = useForm(
    initialSignupForm,
    signupSchema,
    handleRegistration
  );

  if (user) return <Navigate replace to={ROUTES.ROOT} />;
  if (isRegisterLogin) return <Spinner />;

  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <UserForm
        title="register user"
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

export default SignupPage;
