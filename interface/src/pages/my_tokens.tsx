import React, { useState } from "react";
import Blankets from "../components/P5Art/kgolid_blankets/KGolidBlankets";
import { Grid } from "@material-ui/core";
import { useArtPieceOne } from "../hooks/useContract";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

function Buy() {
  const contract = useArtPieceOne();
  const web3React = useWeb3React<Web3Provider>();
  const [entropies, setEntropies] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { account } = web3React;

  React.useEffect(() => {
    setLoading(true);
    const getBalance = async () => {
      if (contract) {
        try {
          const balance = await contract.balanceOf(account);
          const tokenIds = [];

          for (let i = 0; i < balance.toNumber(); i++) {
            const id = await contract.tokenOfOwnerByIndex(account, i);
            tokenIds.push(id);
          }
          for (const tokenId of tokenIds) {
            const tokenUri = await contract.tokenURI(tokenId);
            setEntropies((entropies: []) => [...entropies, tokenUri]);
          }
        } catch {
          console.log("error");
        }
        setLoading(false);
      }
    };
    getBalance();
  }, [contract, account]);

  return (
    <div>
      {loading
        ? "....loading"
        : entropies.map((entropy: string) => {
            return <Blankets entropy={parseFloat(entropy)}></Blankets>;
          })}
    </div>
  );
}

export default Buy;
