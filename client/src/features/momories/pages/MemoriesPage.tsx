import { Container, Grid, Grow } from "@mui/material";
import React, { useEffect } from "react";
import { getMemories } from "../api/memoriesApi";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

const MemoriesPage = () => {
  const dispatch = useAppDispatch();
  // const { loading, error, memories } = useAppSelector(state => state.memories);

  useEffect(() => {
    dispatch(getMemories());
  }, []);

  return <Container>memory</Container>;
};

export default MemoriesPage;
