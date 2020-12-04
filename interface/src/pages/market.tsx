import React, { useState } from "react";
import ArtOne from "../components/P5Art/ArtOne/ArtOne";
import Psycho from "../components/P5Art/kgolid_psycho/KGolidPsycho";
import { Grid } from "@material-ui/core";
import { useArtPieceOne } from "../hooks/useContract";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

function Buy() {
  const web3React = useWeb3React<Web3Provider>();
  const [entropy] = useState(Math.random());

  return (
    <div>
      <Grid container>
        <Grid item>MARKET</Grid>
        <Grid item>
          <ArtOne entropy={entropy}></ArtOne>
        </Grid>
        <Grid item>
          <Psycho entropy={entropy}></Psycho>
        </Grid>
      </Grid>
    </div>
  );
}

export default Buy;
