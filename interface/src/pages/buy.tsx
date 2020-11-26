import React from "react";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { useArtPieceOne } from "../hooks/useContract";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
function Buy() {
  const contract = useArtPieceOne();
  const web3React = useWeb3React<Web3Provider>();
  const { account } = web3React;

  const generateArt = async () => {
    let generate;
    if (contract) {
      generate = await contract.tokenizeGeneratedArt(account, "test34");
      console.log(generate);
      await generate.wait();
      console.log(generate);
    }
  };

  return (
    <div>
      <Typography>Hello</Typography>
      <Button color="primary" variant="contained" onClick={generateArt}>
        CREATE TOKEN
      </Button>{" "}
    </div>
  );
}

export default Buy;
