import React from "react";
import { Typography, Divider } from "@mui/material";
import { memoryFont } from "../memoriesStyles";
import { makeFirstLetterCapital } from "../../utils/algoMethods";

type Props = { title: string; content: string };

const MemoryBodyRow: React.FC<Props> = ({ title, content }) => {
  return (
    <>
      <Typography variant="body2" color="text.secondary" noWrap sx={memoryFont}>
        <Typography fontWeight={700} component="span">
          {makeFirstLetterCapital(title)}:{" "}
        </Typography>
        {content}
      </Typography>
      <Divider color="black" />
    </>
  );
};

export default MemoryBodyRow;
