const VeryCommon = artifacts.require("VeryCommon");

const pricePiece = web3.utils.toWei("0.02", "ether");
const priceCollection = web3.utils.toWei("2", "ether");

module.exports = function (deployer) {
  deployer.deploy(
    VeryCommon,
    "KgolidBlankets",
    "KBLK",
    priceCollection,
    pricePiece
  );
};
