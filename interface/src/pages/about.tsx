import React from "react";
import { Grid, Typography } from "@material-ui/core";

function About() {
  return (
    <>
      <Grid
        container
        spacing={4}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h2">About</Typography>
        </Grid>
        <Grid item zeroMinWidth>
          <Typography
            variant="body1"
            style={{
              marginRight: "10%",
              marginLeft: "10%",
              textAlign: "initial",
            }}
          >
            VeryCommon is a platform of tokenized generative art. The users can
            generate unique pieces from the tokenized art machine. Also, the Art
            Machine (the code) can be bought and sold. All the revenues from the
            generated pieces of art go to the current owner.
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default About;
