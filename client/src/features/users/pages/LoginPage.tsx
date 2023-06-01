import useForm from "../../forms/hooks/useForm";
import Container from "@mui/material/Container";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import initialLoginForm from "../helpers/initialForms/initialLoginForm";
import loginSchema from "../models/Joi/loginSchema";
import { useAppSelector } from "../../../app/hooks";
import LoginForm from "../components/LoginForm";
import useHandleUsers from "../hooks/useHandleUsers";
import Spinner from "../../general/components/Spinner";

const LoginPage = () => {
  const { user } = useAppSelector(state => state.auth);

  const { handleLogin, isLoginLoading } = useHandleUsers();
  const { value, ...rest } = useForm(
    initialLoginForm,
    loginSchema,
    handleLogin
  );
  const { data, errors } = value;
  const { handleInputChange, handleReset, onSubmit, validateForm } = rest;

  if (user) return <Navigate replace to={ROUTES.ROOT} />;

  if (isLoginLoading) return <Spinner />;

  return (
    <Container
      sx={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <LoginForm
        onSubmit={onSubmit}
        onReset={handleReset}
        onFormChange={validateForm}
        onInputChange={handleInputChange}
        data={data}
        errors={errors}
      />
    </Container>
  );
};

export default LoginPage;
