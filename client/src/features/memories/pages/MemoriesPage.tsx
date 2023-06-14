import { Container } from "@mui/material";
// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../../app/hooks";
// import MemoryInterface from "../interfaces/MemoryInterface";
import MemoriesFeedback from "../components/MemoriesFeedback";
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

  const { handleGetMemories, isMemoriesLoading, getMemoriesError } =
    useHandleMemories();

  const { memories } = useAppSelector(state => state.memories);

  useEffect(() => {
    handleGetMemories();
  }, []);

  if (!user) return <Navigate to={ROUTES.LOGIN} replace />;

  const handleDeleteMemory = () => {
    console.log("in memories page handleDeleteMemory");

    handleGetMemories();
  };

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
        error={checkError(getMemoriesError)}
        onDelete={handleDeleteMemory}
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
