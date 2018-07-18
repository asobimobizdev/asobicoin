const assertRejected = require("assert-rejected");
const web3Utils = require("web3-utils");

const Coin = artifacts.require("contracts/AsobiCoin.sol");

contract("AsobiCoin", accounts => {
  const account = accounts[0];
  const otherAccount = accounts[1];
  const thirdAccount = accounts[2];
  const options = { from: account };
  const otherOptions = { from: otherAccount };
  const thirdOptions = { from: thirdAccount };

  const coinAmount = 100;
  const cap = web3Utils.toWei(
    "16_500_000_000".replace(/_/g, ""),
  );
  const overCap = web3Utils.toWei(
    "16_500_000_001".replace(/_/g, ""),
  );

  let coin;

  beforeEach(async () => {
    coin = await Coin.new();
  });

  it("should be created correctly", async () => {
    assert.equal(await coin.owner(), account);
  });

  describe("minting", () => {
    it("will let the owner mint", async () => {
      await coin.mint(account, coinAmount, options);
    });

    it("can mint inside the cap", async () => {
      await coin.mint(account, cap, options);
    });

    it("won't mint over the cap", async () => {
      await assertRejected(coin.mint(account, overCap, options));
    });

    it("won't let others mint", async () => {
      await assertRejected(coin.mint(otherAccount, coinAmount, otherOptions));
    });
  });

  describe("transferring", () => {
    beforeEach(async () => {
      await coin.mint(account, coinAmount);
    });

    it("lets users transfer coins", async () => {
      await coin.approve(otherAccount, coinAmount, options);
      await coin.transferFrom(
        account, otherAccount, coinAmount, otherOptions,
      );
    });

    it("won't let the wrong user transfer", async () => {
      await coin.approve(otherAccount, coinAmount, options);
      await assertRejected(coin.transferFrom(
        account, otherAccount, coinAmount, thirdOptions,
      ));
    });
  });
});
