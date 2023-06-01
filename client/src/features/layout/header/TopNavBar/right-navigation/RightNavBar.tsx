import React from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import SearchBar from "../search-bar/SearchBar";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MoreButton from "./MoreButton";
import Logged from "./Logged";
import NotLogged from "./NotLogged";
import { useAppSelector } from "../../../../../app/hooks";
import { useTheme } from "../../../../general/providers/ThemeProvider";

const RightNavBar = () => {
  const { user } = useAppSelector(state => state.auth);
  const { isDark, toggleDarkMode } = useTheme();
  return (
    <>
      <Box sx={{ display: { xs: "none", md: "inline-flex" } }}>
        <SearchBar />

        <IconButton sx={{ marginLeft: 1 }} onClick={toggleDarkMode}>
          {isDark ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        {!user ? <NotLogged /> : <Logged />}
      </Box>

      <MoreButton />
    </>
  );
};

export default RightNavBar;
