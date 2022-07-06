import { expect } from "chai";
import { ethers } from "hardhat";

describe("SnapshotSeedRegistration", function () {
  it("Should allow registration of snapshot block", async function () {
    const SnapshotSeedRegistration = await ethers.getContractFactory(
      "SnapshotSeedRegistration"
    );
    const registration = await SnapshotSeedRegistration.deploy();
    await registration.deployed();

    const setGreetingTx = await registration.registerSnapshotSeed(1, 18000000);

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await registration.getSnapshotSeed(1)).to.equal(18000000);
  });
});
