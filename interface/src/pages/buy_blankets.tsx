import React, { useState } from "react";
import Blankets from "../components/Arts/kgolid_blankets/KGolidBlankets";
import { Button } from "@material-ui/core";
import { useArtPieceOne } from "../hooks/useContract";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import Sparkles from "../components/Animations/Sparkle";

function Buy() {
  const contract = useArtPieceOne();
  const web3React = useWeb3React<Web3Provider>();
  const [entropy] = useState(Math.random());
  const { account } = web3React;
  const [disabled, setDisabled] = useState(true);

  const generateArt = async () => {
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
  };

  const enableButton = () => {
    setDisabled(false);
  };

  return (
    <div>
      <Blankets entropy={entropy} enableButton={enableButton}></Blankets>
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
    </div>
  );
}

export default Buy;
