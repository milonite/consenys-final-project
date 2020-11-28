import React from "react";
import { Button } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useEagerConnect, useInactiveListener } from "../hooks";

function Connect() {
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
    <div>
      <Button color="primary" variant="contained">
        CONNECT
      </Button>{" "}
    </div>
  );
}

export default Connect;
