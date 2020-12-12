import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { useOkazzPollock, useArtPieceOne } from "../hooks/useContract";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import OverviewCard from "../components/Cards/OverviewCard";
import Dialog from "../components/Dialogs/Dialog";

interface selected {
  art: string | null;
  tokenId: string | null;
}

function TokenList() {
  const contractPollock = useOkazzPollock();
  const contractBlankets = useArtPieceOne();
  const web3React = useWeb3React<Web3Provider>();
  const [selected, setSelected] = useState<selected>({
    art: null,
    tokenId: null,
  });
  const [loading, setLoading] = useState(false);
  const [tokenIdsPollock, setTokenIdsPollock] = useState([]);
  const [tokenIdsBlankets, setTokenIdsBlankets] = useState([]);
  const { account } = web3React;

  React.useEffect(() => {
    setLoading(true);
    const getBalancePollock = async () => {
      if (contractPollock) {
        try {
          const balance = await contractPollock.balanceOf(account);
          for (let i = 0; i < balance.toNumber(); i++) {
            const id = await contractPollock.tokenOfOwnerByIndex(account, i);
            setTokenIdsPollock((tokenids: any): any => [
              ...tokenids,
              id.toNumber(),
            ]);
          }
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      }
    };
    const getBalanceBlanket = async () => {
      if (contractBlankets) {
        try {
          const balance = await contractBlankets.balanceOf(account);
          for (let i = 0; i < balance.toNumber(); i++) {
            const id = await contractBlankets.tokenOfOwnerByIndex(account, i);
            setTokenIdsBlankets((tokenids: any): any => [
              ...tokenids,
              id.toNumber(),
            ]);
          }
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      }
    };
    getBalancePollock();
    getBalanceBlanket();
  }, [contractPollock, account]);

  const handleSelect = (art: string, tokenId: string) => {
    setSelected({
      art: art,
      tokenId: tokenId,
    });
  };

  const handleClose = () => {
    setSelected({
      art: null,
      tokenId: null,
    });
  };

  return (
    <div>
      <Dialog
        handleClose={handleClose}
        open={selected.art ? true : false}
        selected={selected}
      ></Dialog>
      <Typography variant="h6"> MY TOKENS </Typography>
      {loading ? (
        "....loading"
      ) : (
        <>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="center"
            alignItems="center"
          >
            {tokenIdsPollock.map((el) => (
              <Grid item>
                <OverviewCard
                  title={"Pollock"}
                  author={"Okazz"}
                  tokenId={el}
                  handleSelect={handleSelect}
                  imageUrl={"https://i.ibb.co/TYN8qsn/canvas-Okazz.png"}
                ></OverviewCard>
              </Grid>
            ))}
            {tokenIdsBlankets.map((el) => (
              <Grid item>
                <OverviewCard
                  title={"Blankets"}
                  author={"Kgolid"}
                  tokenId={el}
                  handleSelect={handleSelect}
                  imageUrl="https://i.ibb.co/3c9CxZT/canvas.png"
                ></OverviewCard>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
}

export default TokenList;
