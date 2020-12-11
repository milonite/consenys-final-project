import React, { useState } from "react";
import Signs from "../components/Arts/okazz_pollock/OkazzPollock";
import { Button } from "@material-ui/core";
import { useOkazzPollock } from "../hooks/useContract";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import Sparkles from "../components/Animations/Sparkle";

function Buy() {
  const contract = useOkazzPollock();
  const web3React = useWeb3React<Web3Provider>();
  const [entropy] = useState<number>(Math.random());
  const { account } = web3React;

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

  return (
    <div>
      <Signs entropy={entropy}></Signs>
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
    </div>
  );
}

export default Buy;
