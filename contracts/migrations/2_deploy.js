const VeryCommon = artifacts.require("VeryCommon");

const pricePiece = web3.utils.toWei("0.01", "ether");
const priceCollection = web3.utils.toWei("4", "ether");

module.exports = function (deployer) {
  deployer.deploy(
    VeryCommon,
    "KgolidBlankets",
    "KBLK",
    priceCollection,
    pricePiece
  );
};
