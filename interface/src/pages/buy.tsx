import React, { useState } from "react";
import ArtOne from "../components/P5Art/ArtOne/ArtOne";
import { Button } from "@material-ui/core";
import { useArtPieceOne } from "../hooks/useContract";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

function Buy() {
  const contract = useArtPieceOne();
  const web3React = useWeb3React<Web3Provider>();
  const [entropy] = useState(Math.random());
  const { account } = web3React;

  const generateArt = async () => {
    let generate;
    if (contract) {
      var options = {
        gasPrice: 10000000000,
        gasLimit: 285000,
        value: "20000000000000000",
      };
      generate = await contract.tokenizeGeneratedArt(account, entropy, options);
      await generate.wait();
    }
  };

  return (
    <div>
      <ArtOne entropy={entropy}></ArtOne>
      <Button color="primary" variant="contained" onClick={generateArt}>
        CREATE TOKEN
      </Button>{" "}
    </div>
  );
}

export default Buy;
