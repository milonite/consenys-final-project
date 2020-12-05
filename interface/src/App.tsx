import React from "react";
import Navbar from "./components/NavBar";
import Buy from "./pages/buy_blankets";
import MyTokens from "./pages/my_tokens";
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
              return <Redirect to="/create" />;
            }}
          />
          <Route exact path="/create" component={Buy} />
          <Route exact path="/mytokens" component={MyTokens} />
          <Route exact path="/market" component={Market} />
        </Switch>
      ) : (
        "test"
      )}
    </div>
  );
}

export default App;
