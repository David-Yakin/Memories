import React from "react";
import Spinner from "../../general/components/Spinner";
import Error from "../../general/components/Error";
import Typography from "@mui/material/Typography";
import MemoryInterface from "../models/interfaces/MemoryInterface";
import Memories from "./Memories";

type Props = {
  isLoading: boolean;
  error: string | null;
  memories: MemoryInterface[] | null;
};

const MemoriesFeedback: React.FC<Props> = ({ isLoading, error, memories }) => {
  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (memories && memories.length) return <Memories memories={memories} />;
  if (memories && !memories.length)
    return (
      <Typography>
        Oops I can't recall any memory...
        <br />
        It's time to make a new one!
      </Typography>
    );
  return null;
};

export default MemoriesFeedback;
