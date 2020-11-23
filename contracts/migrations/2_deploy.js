const ArtPieceOne = artifacts.require("ArtPieceOne");

module.exports = function(deployer) {
  deployer.deploy(ArtPieceOne);
};