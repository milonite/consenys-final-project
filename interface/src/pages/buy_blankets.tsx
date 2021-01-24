import React, { useState, useEffect } from "react";
import Blankets from "../components/Arts/kgolid_blankets/KGolidBlankets";
import { Button, Typography, Grid } from "@material-ui/core";
import { useArtPieceOne } from "../hooks/useContract";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import Sparkles from "../components/Animations/Sparkle";

function Buy() {
  const contract = useArtPieceOne();
  const web3React = useWeb3React<Web3Provider>();
  const [entropy] = useState(Math.random());
  const { account, chainId } = web3React;
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);
  const [isOwner, setIsOwner] = useState(true);

  useEffect(() => {
    chainId === 4 && setError(false);
  }, [chainId]);

  const generateArt = async () => {
    if (chainId === 4) {
      let generate;
      if (contract) {
        var options = {
          gasPrice: 10000000000,
          gasLimit: 285000,
          value: "10000000000000000",
        };
        generate = await contract.tokenizeGeneratedArt(
          account,
          entropy.toString(),
          options
        );
        await generate.wait();
      }
    } else setError(true);
  };

  const buyCode = async () => {
    if (chainId === 4) {
      let generate;
      if (contract) {
        var options = {
          gasPrice: 10000000000,
          gasLimit: 285000,
          value: "4000000000000000000",
        };
        generate = await contract.transferOwnership(account, options);
        await generate.wait();
      }
    } else setError(true);
  };

  const enableButton = async () => {
    setDisabled(false);
    if (contract) {
      const owner = await contract.owner();
      if (owner === account) {
        setIsOwner(true);
      } else setIsOwner(false);
    }
  };

  return (
    <Grid
      container
      direction="column"
      justify="space-around"
      alignItems="stretch"
    >
      {console.log("test")}
      <Grid item>
        <Blankets entropy={entropy} enableButton={enableButton}></Blankets>
        {error && "Please connect to the Rinkeby Network"}
        {disabled ? (
          <Button
            disabled={disabled}
            style={{ marginTop: "10px" }}
            color="secondary"
            variant="outlined"
            onClick={generateArt}
          >
            CREATE
          </Button>
        ) : (
          <Sparkles>
            <Button
              disabled={disabled}
              style={{ marginTop: "10px" }}
              color="secondary"
              variant="outlined"
              onClick={generateArt}
            >
              CREATE
            </Button>
          </Sparkles>
        )}
      </Grid>

      <Grid item>
        {!isOwner ? (
          <Typography variant="caption">
            Or{" "}
            <button
              onClick={() => buyCode()}
              style={{
                textDecoration: "underline",
                padding: 0,
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
            >
              buy the code
            </button>
          </Typography>
        ) : null}
      </Grid>
    </Grid>
  );
}

export default Buy;
