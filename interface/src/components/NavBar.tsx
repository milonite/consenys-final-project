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
import { Link, useLocation } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { shortenAddress } from "../utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: "white",
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
  const [value, setValue] = React.useState(0);

  const [activatingConnector, setActivatingConnector] = React.useState();
  const web3React = useWeb3React<Web3Provider>();
  const { connector, account, activate, deactivate, active } = web3React;
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager || !!activatingConnector);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
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
              <Typography variant="h5"> G-Net ✶</Typography>
            </Grid>
            <Grid>
              {active === false ? (
                <Button onClick={() => activate(injected, undefined, true)}>
                  Connect
                </Button>
              ) : (
                <Typography variant="caption" noWrap>
                  {account ? shortenAddress(account) : account}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar position="static">
        <Toolbar>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid>
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="secondary"
              >
                <Tab
                  className={classes.tab}
                  component={Link}
                  to="/create"
                  label={"--create-- "}
                />
                <Tab
                  className={classes.tab}
                  component={Link}
                  to="/mytokens"
                  label={"--my_tokens-- "}
                />
              </Tabs>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
