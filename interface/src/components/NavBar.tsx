import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useEagerConnect, useInactiveListener } from "../hooks";
import { injected } from "../connectors/injected";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function ButtonAppBar() {
  const classes = useStyles();
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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Typography noWrap>{account}</Typography>

          {active === false ? (
            <Button onClick={() => activate(injected, undefined, true)}>
              Connect
            </Button>
          ) : (
            <Button onClick={deactivate}> Disconnect</Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
