const VeryCommon = artifacts.require("VeryCommon");

randomN = Math.random();
const pricePiece = web3.utils.toWei("0.02", "ether");
const priceCollection = web3.utils.toWei("2", "ether");

contract("VeryCommon", (accounts) => {
  it("should tokenize random number", async () => {
    const VeryCommonInstance = await VeryCommon.deployed();

    await VeryCommonInstance.tokenizeGeneratedArt(
      accounts[0],
      randomN.toString(),
      { value: pricePiece }
    );
    const balance = await VeryCommonInstance.balanceOf(accounts[0]);

    assert.equal(balance.toString(), 1, "Balance expected to be 1");
  });

  it("should transfer ownership when bought", async () => {
    const VeryCommonInstance = await VeryCommon.deployed();
    const newOwner = accounts[1];

    await VeryCommonInstance.transferOwnership(newOwner, {
      value: priceCollection,
    });
    const owner = await VeryCommonInstance.owner.call();

    assert.equal(newOwner, owner, "New owner expect to be current owner");
  });

  it("should change the price to the collection", async () => {
    const VeryCommonInstance = await VeryCommon.deployed();
    const newPrice = web3.utils.toWei("4", "ether");

    await VeryCommonInstance.changePriceCollection(newPrice, {
      from: accounts[1],
    });
    const price = await VeryCommonInstance.priceCollection.call();

    assert.equal(
      newPrice,
      price,
      "New price expected to be current collection price"
    );
  });

  it("should change the price to the generated pieces", async () => {
    const VeryCommonInstance = await VeryCommon.deployed();
    const newPrice = web3.utils.toWei("0.04", "ether");

    await VeryCommonInstance.changePricePiece(newPrice, { from: accounts[1] });
    const price = await VeryCommonInstance.pricePiece.call();

    assert.equal(
      newPrice,
      price,
      "New price expected to be current piece price"
    );
  });

  it("should change the price to the generated pieces", async () => {
    const VeryCommonInstance = await VeryCommon.deployed();
    const balance = await web3.eth.getBalance(accounts[1]);

    await VeryCommonInstance.withdraw();
    const newBalance = await web3.eth.getBalance(accounts[1]);

    assert.equal(
      newBalance > balance,
      1,
      "New Balance expected to be higher then balance"
    );
  });
});
