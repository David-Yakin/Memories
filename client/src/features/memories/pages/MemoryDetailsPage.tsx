import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import useHandleMemories from "../hooks/useHandleMemories";
import Spinner from "../../general/components/Spinner";
import ROUTES from "../../routes/routesModel";

const MemoryDetailsPage = () => {
  const { memory } = useAppSelector(state => state.memories);
  const { user } = useAppSelector(state => state.auth);
  const { memoryId } = useParams();
  const { handleGetMemory, isMemoryLoading } = useHandleMemories();

  useEffect(() => {
    if (typeof memoryId === "string") handleGetMemory(memoryId);
  }, []);

  if (!user) return <Navigate replace to={ROUTES.ROOT} />;
  if (isMemoryLoading) return <Spinner />;
  return <div>MemoryDetailsPage</div>;
};

export default MemoryDetailsPage;
