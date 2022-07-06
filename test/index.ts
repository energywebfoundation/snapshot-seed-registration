import { expect } from "chai";
import { ethers } from "hardhat";

describe("SnapshotSeedRegistration", function () {
  it("Should allow registration and update of snapshot block", async function () {
    const SnapshotSeedRegistration = await ethers.getContractFactory(
      "SnapshotSeedRegistration"
    );
    const registration = await SnapshotSeedRegistration.deploy();
    await registration.deployed();

    const snapshotNumber = 1;
    const snapshotSeedBlock1 = 10000000;
    const registration1Tx = await registration.registerSnapshotSeed(
      snapshotNumber,
      snapshotSeedBlock1
    );
    await registration1Tx.wait();
    expect(await registration.getSnapshotSeed(snapshotNumber)).to.equal(
      snapshotSeedBlock1
    );

    const snapshotSeedBlock2 = 20000000;
    const registration2Tx = await registration.registerSnapshotSeed(
      snapshotNumber,
      snapshotSeedBlock2
    );
    await registration2Tx.wait();
    expect(await registration.getSnapshotSeed(snapshotNumber)).to.equal(
      snapshotSeedBlock2
    );
  });
});
