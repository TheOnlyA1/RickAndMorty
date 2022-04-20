import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import "./header-styles.css"

const Header = () => {

  return (
    <Grid className="header-container" container alignItems="center" justifyContent="center">
      
      <Grid item xs={12}>
            <Typography variant="h3">
                Rick and Morty 
            </Typography>
      </Grid>
      
    </Grid>
  );
};

export default Header;
