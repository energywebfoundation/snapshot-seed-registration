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
    const registration2Tx = await registration.updateSnapshotSeed(
      snapshotNumber,
      snapshotSeedBlock2
    );
    await registration2Tx.wait();
    expect(await registration.getSnapshotSeed(snapshotNumber)).to.equal(
      snapshotSeedBlock2
    );
  });

  it("Should not allow update to the same seed block", async function () {
    const SnapshotSeedRegistration = await ethers.getContractFactory(
      "SnapshotSeedRegistration"
    );
    const registration = await SnapshotSeedRegistration.deploy();
    await registration.deployed();

    const snapshotNumber = 1;
    const snapshotSeedBlock = 10000000;
    const registration1Tx = await registration.registerSnapshotSeed(
      snapshotNumber,
      snapshotSeedBlock
    );
    await registration1Tx.wait();
    expect(await registration.getSnapshotSeed(snapshotNumber)).to.equal(
      snapshotSeedBlock
    );

    await expect(
      registration.updateSnapshotSeed(snapshotNumber, snapshotSeedBlock)
    ).to.be.revertedWith(
      "this seedBlockNumber already set for this snapshot number"
    );
  });

  it("Should not allow re-registration", async function () {
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
    await expect(
      registration.registerSnapshotSeed(snapshotNumber, snapshotSeedBlock2)
    ).to.be.revertedWith("already registered snapshot");
  });

  it("Should not allow update without registration", async function () {
    const SnapshotSeedRegistration = await ethers.getContractFactory(
      "SnapshotSeedRegistration"
    );
    const registration = await SnapshotSeedRegistration.deploy();
    await registration.deployed();

    const snapshotNumber = 1;
    const snapshotSeedBlock = 10000000;
    await expect(
      registration.updateSnapshotSeed(snapshotNumber, snapshotSeedBlock)
    ).to.be.revertedWith("no existing seed for this snapshot number");
  });
});
