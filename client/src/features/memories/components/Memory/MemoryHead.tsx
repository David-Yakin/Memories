import React from "react";
import CardMedia from "@mui/material/CardMedia";
import MemoryInterface from "../../models/interfaces/MemoryInterface";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import moment from "moment";
import { memoryImg, textOverlayLeft } from "../memoriesStyles";
import { makeFirstLetterCapital } from "../../utils/algoMethods";

type Props = { memory: MemoryInterface };

const MemoryHead: React.FC<Props> = ({ memory }) => {
  const { image, createdAt } = memory;
  const { url, alt } = image;

  return (
    <Box>
      <CardMedia
        component="img"
        image={url}
        alt={alt}
        title={alt}
        sx={memoryImg}
      />
      <CardHeader
        title={makeFirstLetterCapital(alt)}
        subheader={moment(createdAt).fromNow()}
        subheaderTypographyProps={{ color: "white" }}
        sx={textOverlayLeft}
      />
    </Box>
  );
};

export default MemoryHead;
