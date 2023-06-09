import { Container } from "@mui/material";
// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../../app/hooks";
// import MemoryInterface from "../interfaces/MemoryInterface";
import MemoriesFeedback from "../components/MemoriesFeedback";
import { useGetMemoriesQuery } from "../slices/memoryApiSlice";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";

const MemoriesPage = () => {
  const { data: memories, isLoading, error } = useGetMemoriesQuery();
  const navigate = useNavigate();
  if (error && "data" in error) {
    console.log(error.data);
  }

  const checkError = (errorObj: any) => {
    return errorObj && "data" in errorObj && typeof errorObj.data === "string"
      ? errorObj.data
      : null;
  };

  return (
    <Container>
      <MemoriesFeedback
        memories={memories!}
        isLoading={isLoading}
        error={checkError(error)}
      />
      <Fab
        onClick={() => navigate(ROUTES.CREATE_MEMORY)}
        color="secondary"
        aria-label="add"
        sx={{
          position: "absolute",
          bottom: 75,
          right: 16,
        }}>
        <AddIcon />
      </Fab>
    </Container>
  );
};

export default MemoriesPage;
