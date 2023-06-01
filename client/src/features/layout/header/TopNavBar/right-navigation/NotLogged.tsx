import React from "react";
import Box from "@mui/material/Box";
import NavItem from "../../../components/NavItem";
import ROUTS from "../../../../routes/routesModel";

const NotLogged = () => {
  return (
    <Box>
      <NavItem label="signup" to={ROUTS.SIGNUP} />
      <NavItem label="login" to={ROUTS.LOGIN} />
    </Box>
  );
};

export default NotLogged;
