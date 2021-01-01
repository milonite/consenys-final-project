import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { useOkazzPollock, useArtPieceOne } from "../hooks/useContract";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import OverviewCard from "../components/Cards/OverviewCard";
import MyMachine from "../components/Cards/MyMachine";
import Dialog from "../components/Dialogs/Dialog";
import LoadingBar from "../components/Loading/LoadingBar";
import { shortenAddress } from "../utils";

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
  const [isBlanketsOwner, setIsBlanketsOwner] = useState(false);
  const [isPollockOwner, setIsPollockOwner] = useState(false);
  const [totalBlankets, setTotalBlankets] = useState(0);
  const [totalPollock, setTotalPollock] = useState(0);
  const [ownerPollock, setOwnerPollock] = useState("");
  const [ownerBlankets, setOwnerBlankets] = useState("");

  const { account, active, chainId } = web3React;

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
  }, [contractPollock, account, contractBlankets]);

  React.useEffect(() => {
    if (contractPollock) {
      const getOwner = async () => {
        const owner = await contractPollock.owner();
        setOwnerPollock(shortenAddress(owner));

        if (owner === account) {
          setIsPollockOwner(true);
          const total = await contractPollock.totalSupply();
          setTotalPollock(total.toNumber());
        }
      };
      getOwner();
    }
  }, [isPollockOwner, account]);

  React.useEffect(() => {
    if (contractBlankets) {
      const getOwner = async () => {
        const owner = await contractBlankets.owner();
        setOwnerBlankets(shortenAddress(owner));

        if (owner === account) {
          setIsBlanketsOwner(true);
          const total = await contractBlankets.totalSupply();
          setTotalBlankets(total.toNumber());
        }
      };
      getOwner();
    }
  }, [contractBlankets, account]);

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
      {tokenIdsPollock.length > 0 && tokenIdsBlankets.length > 0 && (
        <Typography variant="h6"> MY TOKENS </Typography>
      )}

      {active === false || chainId !== 4
        ? "Please connect to the Rinkeby Network"
        : [
            loading ? (
              <LoadingBar></LoadingBar>
            ) : (
              <>
                <Grid
                  container
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
                        owner={ownerPollock}
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
                        owner={ownerBlankets}
                        handleSelect={handleSelect}
                        imageUrl="https://i.ibb.co/3c9CxZT/canvas.png"
                      ></OverviewCard>
                    </Grid>
                  ))}
                </Grid>
              </>
            ),
          ]}

      <Typography variant="h6"> MY MACHINES </Typography>
      <Grid container direction="row" justify="center" alignItems="center">
        {isBlanketsOwner && (
          <Grid item>
            <MyMachine
              to={"/createBlankets"}
              title={"Blankets"}
              total={totalBlankets}
              imageUrl="https://i.ibb.co/3c9CxZT/canvas.png"
              author="Kgolid"
            ></MyMachine>
          </Grid>
        )}
        {isPollockOwner && (
          <Grid item>
            <MyMachine
              to={"/createPollock"}
              title={"Pollock"}
              total={totalPollock}
              imageUrl="https://i.ibb.co/TYN8qsn/canvas-Okazz.png"
              author="Okazz"
            ></MyMachine>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default TokenList;
