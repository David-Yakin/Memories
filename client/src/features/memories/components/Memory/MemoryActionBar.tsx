import React, { useState } from "react";
import { Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import DeleteDialog from "../../../general/components/DeleteDialog";
import useHandleMemories from "../../hooks/useHandleMemories";

type Props = {
  onDelete: () => void;
  memoryId: string;
};

const MemoryActionBar: React.FC<Props> = ({ onDelete, memoryId }) => {
  const { handleDeleteMemory } = useHandleMemories();
  const [isDialogOpen, setDialog] = useState(false);

  const handleDialog = (term?: string) => {
    if (term === "open") return setDialog(true);
    setDialog(false);
  };

  const handleDelete = () => {
    handleDialog();
    handleDeleteMemory(memoryId);
    onDelete();
  };

  return (
    <CardActions disableSpacing sx={{ pt: 0, justifyContent: "space-between" }}>
      <Box>
        <IconButton
          onClick={() => handleDialog("open")}
          aria-label="delete card">
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
      <DeleteDialog
        isDialogOpen={isDialogOpen}
        item="memory"
        onChangeDialog={handleDialog}
        onDelete={handleDelete}
      />
    </CardActions>
  );
};

export default MemoryActionBar;
