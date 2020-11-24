import React from "react";
import Navbar from "./components/NavBar";
import Buy from "./pages/buy";
import "./App.css";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

function App() {
  const web3React = useWeb3React<Web3Provider>();
  const { active } = web3React;

  return (
    <div className="App">
      <Navbar></Navbar>
      {active ? <Buy></Buy> : "test"}
    </div>
  );
}

export default App;
