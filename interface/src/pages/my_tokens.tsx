import React, { useState } from "react";
import ArtOne from "../components/P5Art/ArtOne/ArtOne";
import { Button } from "@material-ui/core";
import { useArtPieceOne } from "../hooks/useContract";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

function Buy() {
  const contract = useArtPieceOne();
  const web3React = useWeb3React<Web3Provider>();
  const [entropies, setEntropies] = useState<any>([]);
  const { account } = web3React;

  React.useEffect(() => {
    const getBalance = async () => {
      if (contract) {
        const balance = await contract.balanceOf(account);
        const tokenIds = [];
        for (let i = 0; i < balance.toNumber(); i++) {
          const id = await contract.tokenOfOwnerByIndex(account, i);
          const tokenURI = await contract.tokenURI(id);
          console.log(tokenURI);
          tokenIds.push(id);
        }
        for (const tokenId of tokenIds) {
          const tokenUri = await contract.tokenURI(tokenId);
          console.log(tokenUri);
          setEntropies((entropies: []) => [...entropies, tokenUri]);
        }
      }
    };
    getBalance();
  }, [contract, account]);

  return (
    <div>
      {entropies.forEach((entropy: string[]) => {
        <ArtOne entropy={entropy}></ArtOne>;
      })}
    </div>
  );
}

export default Buy;
