import React from "react";
import "./App.css";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useEagerConnect, useInactiveListener } from "./hooks/hooks";
import { Button } from "@material-ui/core";
import { injected } from "./connectors/injected";
import Navbar from "./components/NavBar";

function App() {
  const [activatingConnector, setActivatingConnector] = React.useState();

  const web3React = useWeb3React<Web3Provider>();
  const { connector, account, activate, deactivate, active } = web3React;

  console.log(web3React);
  console.log(connector);
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager || !!activatingConnector);

  return (
    <div className="App">
      <Navbar></Navbar>
      <p>{account} </p>

      {active === false ? (
        <Button
          onClick={() => activate(injected, undefined, true)}
          color="primary"
        >
          Connect
        </Button>
      ) : (
        <Button onClick={deactivate} color="primary">
          {" "}
          Disconnect
        </Button>
      )}
    </div>
  );
}

export default App;
