import React, { useState, useEffect } from "react";
import Signs from "../components/Arts/okazz_pollock/OkazzPollock";
import { Button, Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { useOkazzPollock } from "../hooks/useContract";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import Sparkles from "../components/Animations/Sparkle";

function Buy() {
  const contract = useOkazzPollock();
  const web3React = useWeb3React<Web3Provider>();
  const [entropy] = useState<number>(Math.random());
  const [loading, setLoading] = useState(true);
  const { account, chainId } = web3React;
  const [error, setError] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (contract) {
      const getOwner = async () => {
        const owner = await contract.owner();
        if (owner === account) {
          setIsOwner(true);
        }
      };
      getOwner();
    }
  }, [contract, account]);

  const generateArt = async () => {
    if (chainId === 4) {
      let generate;
      if (contract) {
        var options = {
          gasPrice: 10000000000,
          gasLimit: 285000,
          value: "20000000000000000",
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
          value: "2000000000000000000",
        };
        generate = await contract.transferOwnership(account, options);
        await generate.wait();
      }
    } else setError(true);
  };

  useEffect(() => {
    chainId === 4 && setError(false);
  }, [chainId]);

  return (
    <Grid
      container
      direction="column"
      justify="space-around"
      alignItems="stretch"
    >
      <Grid item>
        {loading ? "Generating..." : null}
        <Signs entropy={entropy} setLoading={setLoading}></Signs>
        <Sparkles>
          <Button
            style={{ marginTop: "10px" }}
            color="secondary"
            variant="outlined"
            onClick={generateArt}
          >
            CREATE
          </Button>
        </Sparkles>

        {error ? (
          <Typography>Please connect to the Rinkeby Network</Typography>
        ) : null}
      </Grid>
      <Grid item>
        {" "}
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
