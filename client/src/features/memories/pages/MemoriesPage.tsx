import { Container } from "@mui/material";
// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../../app/hooks";
// import MemoryInterface from "../interfaces/MemoryInterface";
import MemoriesFeedback from "../components/MemoriesFeedback";
import { useGetMemoriesQuery } from "../slices/memoryApiSlice";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Navigate, useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useAppSelector } from "../../../app/hooks";
import { useEffect } from "react";
import useHandleMemories from "../hooks/useHandleMemories";

const MemoriesPage = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.auth);

  const { handleGetMemories } = useHandleMemories();

  const {
    data: memories,
    isLoading: isMemoriesLoading,
    error: memoriesError,
  } = useGetMemoriesQuery();

  useEffect(() => {
    if (memories) handleGetMemories(memories);
  }, []);

  if (!user) return <Navigate to={ROUTES.LOGIN} replace />;

  if (memoriesError && "data" in memoriesError) {
    console.log(memoriesError.data);
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
        isLoading={isMemoriesLoading}
        error={checkError(memoriesError)}
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
