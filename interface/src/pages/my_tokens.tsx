import React, { useState } from "react";
import ArtOne from "../components/P5Art/ArtOne/ArtOne";
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
        const balance = await contract.balanceOf(account);
        const tokenIds = [];
        for (let i = 0; i < balance.toNumber(); i++) {
          const id = await contract.tokenOfOwnerByIndex(account, i);
          tokenIds.push(id);
        }
        for (const tokenId of tokenIds) {
          const tokenUri = await contract.tokenURI(tokenId);
          setEntropies((entropies: []) => [...entropies, tokenUri]);
          setLoading(false);
        }
      }
    };
    getBalance();
  }, [contract, account]);

  return (
    <Grid container>
      {entropies.lenght === 0
        ? "....loading"
        : entropies.forEach((element: any) => {
            <Grid item>
              <ArtOne entropy={parseInt(entropies[0])}></ArtOne>
            </Grid>;
          })}
    </Grid>
  );
}

export default Buy;
