import React, { useState } from "react";
import ArtCard from "../components/Cards/ArtCard";
import { Grid } from "@material-ui/core";

function Buy() {
  const [entropy] = useState(Math.random());

  return (
    <div>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <ArtCard></ArtCard>
        </Grid>
        <Grid item>
          <ArtCard></ArtCard>
        </Grid>
        <Grid item>
          <ArtCard></ArtCard>
        </Grid>
        
      </Grid>
    </div>
  );
}

export default Buy;
