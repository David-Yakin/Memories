import React from "react";
import useForm from "../../forms/hooks/useForm";
import initialCreateMemoryObject from "../helpers/initialForms/initialCreateMemoryObject";
import createMemorySchema from "../models/joi/createMemorySchema";
import { useAppSelector } from "../../../app/hooks";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import Container from "@mui/material/Container";
import CreateMemoryForm from "../components/memoriesForms/CreateMemoryForm";

const CreateMemoryPage = () => {
  const { user } = useAppSelector(state => state.auth);

  const { value, ...rest } = useForm(
    initialCreateMemoryObject,
    createMemorySchema,
    data => console.log(data)
  );

  const { data, errors } = value;
  const { onSubmit, handleReset, validateForm, handleInputChange, setData } =
    rest;

  if (!user) return <Navigate replace to={ROUTES.ROOT} />;

  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <CreateMemoryForm
        onSubmit={onSubmit}
        onReset={handleReset}
        onFormChange={validateForm}
        data={data}
        errors={errors}
        onInputChange={handleInputChange}
        setData={setData}
      />
    </Container>
  );
};

export default CreateMemoryPage;
