import React, { useState } from "react";
import ArtCard from "../components/Cards/BuyArtCard";
import { Grid, Typography } from "@material-ui/core";
import { useOkazzPollock, useArtPieceOne } from "../hooks/useContract";
import { shortenAddress } from "../utils";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

function Buy() {
  const web3React = useWeb3React<Web3Provider>();

  const contractPollock = useOkazzPollock();
  const contractBlankets = useArtPieceOne();
  const [totalBlankets, setTotalBlankets] = useState("");
  const [totalPollock, setTotalPollock] = useState("");
  const [ownerPollock, setOwnerPollock] = useState("");
  const [ownerBlankets, setOwnerBlankets] = useState("");
  const { chainId } = web3React;

  React.useEffect(() => {
    if (contractPollock && chainId === 4) {
      const getTotal = async () => {
        const total = await contractPollock.totalSupply();
        setTotalPollock(total.toNumber());
        const owner = await contractPollock.owner();
        setOwnerPollock(shortenAddress(owner));
      };
      getTotal();
    }
  }, [chainId]);

  React.useEffect(() => {
    if (contractBlankets && chainId === 4) {
      const getTotal = async () => {
        const total = await contractBlankets.totalSupply();
        setTotalBlankets(total.toNumber());
        const owner = await contractBlankets.owner();
        setOwnerBlankets(shortenAddress(owner));
      };
      getTotal();
    }
  }, [chainId]);

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
            total={totalBlankets}
            imageUrl="https://i.ibb.co/3c9CxZT/canvas.png"
            author="Kgolid"
            owner={ownerBlankets}
          ></ArtCard>
        </Grid>
        <Grid item>
          <ArtCard
            to={"/createPollock"}
            title={"Pollock"}
            total={totalPollock}
            imageUrl="https://i.ibb.co/TYN8qsn/canvas-Okazz.png"
            author="Okazz"
            owner={ownerPollock}
          ></ArtCard>
        </Grid>
      </Grid>
    </div>
  );
}

export default Buy;
