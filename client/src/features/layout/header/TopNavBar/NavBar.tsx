import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import LeftNavBar from "./left-navigation/LeftNavBar";
import RightNavBar from "./right-navigation/RightNavBar";
import SearchBar from "./search-bar/SearchBar";
import { MenuProvider } from "./menu/MenuProvider";

export const NavBar = () => {
  return (
    <MenuProvider>
      <AppBar position="sticky" color="secondary">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <LeftNavBar />

          <Box sx={{ display: { xs: "inline-flex", md: "none" } }}>
            <SearchBar />
          </Box>

          <RightNavBar />
        </Toolbar>
      </AppBar>
    </MenuProvider>
  );
};
