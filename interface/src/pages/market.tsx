import React from "react";
import ArtCard from "../components/Cards/BuyArtCard";
import { Grid, Typography } from "@material-ui/core";

function Buy() {
  return (
    <div>
      <Typography variant="h6">MARKET </Typography>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <ArtCard
            to={"/createBlankets"}
            title={"Blankets"}
            imageUrl="https://i.ibb.co/3c9CxZT/canvas.png"
            author="Kgolid"
          ></ArtCard>
        </Grid>
        <Grid item>
          <ArtCard
            to={"/createPollock"}
            title={"Pollock"}
            imageUrl="https://i.ibb.co/TYN8qsn/canvas-Okazz.png"
            author="Okazz"
          ></ArtCard>
        </Grid>
      </Grid>
    </div>
  );
}

export default Buy;
