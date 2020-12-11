import React from "react";
import Navbar from "./components/NavBar";
import BuyBlankets from "./pages/buy_blankets";
import BuyPollock from "./pages/buy_pollock";
import MyTokens from "./pages/my_tokens_list";
import Market from "./pages/market";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

function App() {
  const web3React = useWeb3React<Web3Provider>();
  const { active } = web3React;

  return (
    <div className="App">
      <Navbar></Navbar>

      {active ? (
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return <Redirect to="/market" />;
            }}
          />
          <Route exact path="/createPollock" component={BuyPollock} />
          <Route exact path="/createBlankets" component={BuyBlankets} />
          <Route exact path="/mytokens" component={MyTokens} />
          <Route exact path="/market" component={Market} />
        </Switch>
      ) : (
        "Please Connect to Wallet on the Rinkeby Network"
      )}
    </div>
  );
}

export default App;
