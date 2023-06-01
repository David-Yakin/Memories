import React from "react";
import Typography from "@mui/material/Typography";
import NavBarLink from "../../../components/NavBarLink";
import ROUTS from "../../../../routes/routesModel";

const Logo = () => {
  return (
    <NavBarLink to={ROUTS.ROOT}>
      <Typography
        variant="h4"
        sx={{
          display: { xs: "none", md: "inline-flex" },
          marginRight: 2,
          fontFamily: "fantasy",
        }}>
        Memories
      </Typography>
    </NavBarLink>
  );
};

export default Logo;
