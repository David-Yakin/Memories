import MuiMenu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import MenuLink from "./MenuLink";
import ROUTES from "../../../../routes/routesModel";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { logout } from "../../../../users/slices/authSlice";
import DeleteDialog from "../../../../general/components/DeleteDialog";
import { useState } from "react";
import useHandleUsers from "./../../../../users/hooks/useHandleUsers";
import Spinner from "../../../../general/components/Spinner";

type Props = {
  isOpen: boolean;
  anchorEl: HTMLElement;
  onClose: () => void;
};

const Menu: React.FC<Props> = ({ isOpen, anchorEl, onClose }) => {
  const { user } = useAppSelector(state => state.auth);
  const [isDialogOpen, setDialog] = useState(false);

  const { handleDeleteUser, isDeleteUserLoading } = useHandleUsers();

  const handleDialog = (term?: string) => {
    if (term === "open") return setDialog(true);
    setDialog(false);
    onClose();
  };

  const handleDelete = () => {
    handleDialog();
    if (user) handleDeleteUser(user._id);
  };

  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logout());
    onClose();
  };

  if (isDeleteUserLoading) return <Spinner />;

  return (
    <MuiMenu
      open={isOpen}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}>
      <Box>
        <MenuLink
          label="about"
          navigateTo={ROUTES.ABOUT}
          onClick={onClose}
          styles={{ display: { xs: "block", md: "none" } }}
        />

        {!user ? (
          <>
            <MenuLink
              label="login"
              navigateTo={ROUTES.LOGIN}
              onClick={onClose}
              styles={{ display: { xs: "block", md: "none" } }}
            />
            <MenuLink
              label="signup"
              navigateTo={ROUTES.SIGNUP}
              onClick={onClose}
              styles={{ display: { xs: "block", md: "none" } }}
            />
          </>
        ) : (
          <>
            <MenuLink label="profile" navigateTo={""} onClick={onClose} />
            <MenuLink
              label="edit account"
              navigateTo={ROUTES.EDIT_USER}
              onClick={onClose}
            />
            <MenuItem onClick={onLogout}>Logout</MenuItem>
            <MenuItem onClick={() => handleDialog("open")}>
              Delete account
            </MenuItem>
            <DeleteDialog
              isDialogOpen={isDialogOpen}
              onChangeDialog={handleDialog}
              onDelete={handleDelete}
              item="user"
            />
          </>
        )}
      </Box>
    </MuiMenu>
  );
};

export default Menu;
