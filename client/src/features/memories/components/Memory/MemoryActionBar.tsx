import React, { useState } from "react";
import { Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";

type Props = {
  onDelete: (x: string) => void;
  memoryId: string;
};

const MemoryActionBar: React.FC<Props> = ({ onDelete, memoryId }) => {
  const [isDialogOpen, setDialog] = useState(false);

  return (
    <CardActions disableSpacing sx={{ pt: 0, justifyContent: "space-between" }}>
      <Box>
        <IconButton onClick={() => onDelete(memoryId)} aria-label="delete card">
          <DeleteIcon />
        </IconButton>

        <IconButton onClick={() => {}} aria-label="edit card">
          <EditIcon />
        </IconButton>
      </Box>

      <Box>
        <IconButton aria-label="Share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="add to fav">
          <FavoriteIcon />
        </IconButton>
      </Box>
    </CardActions>
  );
};

export default MemoryActionBar;
