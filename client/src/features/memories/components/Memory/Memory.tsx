import React from "react";
import MuiCard from "@mui/material/Card";
import CardActionBar from "./MemoryActionBar";
import CardActionArea from "@mui/material/CardActionArea";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";
import MemoryHead from "./MemoryHead";
import MemoryBody from "./MemoryBody";
import Grid from "@mui/material/Grid";
import MemoryInterface from "../../models/interfaces/MemoryInterface";

type Props = {
  memory: MemoryInterface;
  onDelete: () => void;
};

const Memory: React.FC<Props> = ({ memory, onDelete }) => {
  const navigate = useNavigate();
  return (
    <Grid item xs={12} sm={6} lg={4}>
      <MuiCard sx={{ minWidth: 280 }}>
        <CardActionArea
          onClick={() => navigate(`${ROUTES.MEMORY_DETAILS}/${memory._id}`)}>
          <MemoryHead memory={memory} />
          <MemoryBody memory={memory} />
        </CardActionArea>

        <CardActionBar onDelete={onDelete} memoryId={memory._id} />
      </MuiCard>
    </Grid>
  );
};

export default Memory;
