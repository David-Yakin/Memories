import React from "react";
import Grid from "@mui/material/Grid";
import MemoryInterface from "../interfaces/MemoryInterface";
import Memory from "./Memory/Memory";

type Props = {
  memories: MemoryInterface[];
};

const Memories: React.FC<Props> = ({ memories }) => {
  // const handleDelete = (id: string) =>
  //   console.log(`You clicked card no: ${id}`);

  return (
    <Grid container spacing={2} pb={2}>
      {memories.map((memory: MemoryInterface) => (
        <Memory memory={memory} key={memory._id} />
      ))}
    </Grid>
  );
};

export default Memories;
