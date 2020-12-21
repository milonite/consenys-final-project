import React from "react";
import Navbar from "./components/NavBar";
import BuyBlankets from "./pages/buy_blankets";
import BuyPollock from "./pages/buy_pollock";
import MyTokens from "./pages/my_tokens_list";
import Market from "./pages/market";
import Landing from "./pages/landing";
import "./App.css";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>

      <Switch>
        <Route exact path="/createPollock" component={BuyPollock} />
        <Route exact path="/createBlankets" component={BuyBlankets} />
        <Route exact path="/mytokens" component={MyTokens} />
        <Route exact path="/market" component={Market} />
        <Route exact component={Landing} />
      </Switch>
    </div>
  );
}

export default App;
