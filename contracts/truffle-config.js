var HDWalletProvider = require("truffle-hdwallet-provider");
//test only, do not use!
var mnemonic = "hobby junior pass moon spin slim edit venue either ceiling ensure yard";
var rinkebyEndpoint = "https://rinkeby.infura.io/v3/0cd25f13fa42452181039a22154c025a";


module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, rinkebyEndpoint),
      gasPrice: 50000000000, // 50 gwei,
      gas: 4600000,
      network_id: 4,
    },
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  compilers: {
    solc: {
       version: "0.6.2",   

    },
  },
};
