import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useEagerConnect, useInactiveListener } from "../hooks";
import { injected } from "../connectors/injected";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { shortenAddress } from "../utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: "white",
      padding: "15px",
    },
    grow: {
      flexGrow: 1,
    },
    tabs: {
      width: "100%",
    },
    tab: {
      marginLeft: "50px",
      textTransform: "none",
      color: "black",
    },
    link: {
      textDecoration: "none",
      color: "black",
    },
    account: {
      border: "10px solid",
      borderImageSlice: 1,
      borderWidth: "0.5px",
      borderImageSource: "linear-gradient(to left, #00C853, #B2FF59)",
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  })
);

export default function ButtonAppBar() {
  const classes = useStyles();

  const [activatingConnector, setActivatingConnector] = React.useState();
  const web3React = useWeb3React<Web3Provider>();
  const { connector, account, activate, active } = web3React;
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager || !!activatingConnector);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid>
              <Typography variant="h6">VeryCommon</Typography>
            </Grid>
            <Grid></Grid>
            <Grid>
              <Link className={classes.link} to="/market">
                <Button color="inherit">MARKET</Button>
              </Link>
              <Link className={classes.link} to="/mytokens">
                <Button color="inherit">MY TOKENS</Button>
              </Link>

              {active === false ? (
                <Button onClick={() => activate(injected, undefined, true)}>
                  Connect
                </Button>
              ) : (
                <Button className={classes.account}>
                  {account ? shortenAddress(account) : account}
                </Button>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          ></Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
