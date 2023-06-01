import React from "react";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import NavBarLink from "../../../components/NavBarLink";
import ROUTS from "../../../../routes/routesModel";

const LogoIcon = () => {
  return (
    <NavBarLink to={ROUTS.ROOT}>
      <IconButton
        sx={{ display: { xs: "inline-flex", md: "none" } }}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu">
        <Avatar alt="memories icon" src="/assets/images/familyPic.png" />
      </IconButton>
    </NavBarLink>
  );
};

export default LogoIcon;