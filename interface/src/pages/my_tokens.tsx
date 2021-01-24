import React, { useState } from "react";
import Pollock from "../components/Arts/okazz_pollock/OkazzPollock";
import Blankets from "../components/Arts/kgolid_blankets/KGolidBlankets";
import { Typography } from "@material-ui/core";
import { useOkazzPollock } from "../hooks/useContract";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

function Buy() {
  const contractPollock = useOkazzPollock();
  const web3React = useWeb3React<Web3Provider>();
  const [entropiesPollock, setEntropiesPollock] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { account, chainId } = web3React;

  // TO DO: Refactor
  React.useEffect(() => {
    setLoading(true);
    const getBalancePollock = async () => {
      if (contractPollock && chainId === 4) {
        try {
          const balance = await contractPollock.balanceOf(account);
          const tokenIds = [];

          for (let i = 0; i < balance.toNumber(); i++) {
            const id = await contractPollock.tokenOfOwnerByIndex(account, i);
            console.log(id);
            tokenIds.push(id);
          }
          for (const tokenId of tokenIds) {
            const tokenUri = await contractPollock.tokenURI(tokenId);
            setEntropiesPollock((entropies: []) => [...entropies, tokenUri]);
          }
        } catch {
          console.log("error");
        }
        setLoading(false);
      }
    };
    getBalancePollock();
  }, [contractPollock, account]);

  return (
    <div>
      <Typography variant="h6">MY TOKENS </Typography>

      {loading ? (
        "....loading"
      ) : (
        <>
          <Pollock
            entropy={parseFloat(
              entropiesPollock[Object.values(entropiesPollock).length - 1]
            )}
          ></Pollock>
          <Blankets entropy={parseFloat(entropiesPollock[1])}></Blankets>
        </>
      )}
    </div>
  );
}

export default Buy;
