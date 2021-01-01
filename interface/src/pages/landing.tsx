import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Typography variant="h2">Collect</Typography>
        <Typography
          variant="h2"
          style={{ color: "#002ef1", filter: "invert()" }}
        >
          VeryCommon
        </Typography>
      </Grid>

      <Typography variant="h2" style={{ marginRight: "-230px" }}>
        Digital Artworks
      </Typography>
      <Link
        style={{
          textDecoration: "none",
          color: "rgb(136, 136, 136);",
        }}
        to="/about"
      >
        <Typography
          variant="caption"
          style={{
            marginRight: "125px",
            textDecoration: "underline",
            color: "rgb(136, 136, 136);",
          }}
        >
          Learn more
        </Typography>{" "}
      </Link>

      <img
        style={{ width: "100%", marginTop: "80px" }}
        src="https://miro.medium.com/max/2880/1*-egs-meZ08WEmAhlwa481Q.png"
        alt="canvas"
      ></img>
    </>
  );
}

export default Landing;
