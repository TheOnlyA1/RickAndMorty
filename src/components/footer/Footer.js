import React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import "./footer-styles.css";

const Footer = () => {
  return (
    <Grid
      className="footer-container"
      container
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={12}>
        <Typography variant="h3">By Amir Awan</Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
