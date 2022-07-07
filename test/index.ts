import { expect } from "chai";
import { ethers } from "hardhat";

describe("SnapshotSeedRegistration", function () {
  it("Should allow registration and update of snapshot seed block", async function () {
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

  it("Should emit event upon registration", async function () {
    const SnapshotSeedRegistration = await ethers.getContractFactory(
      "SnapshotSeedRegistration"
    );
    const registration = await SnapshotSeedRegistration.deploy();
    await registration.deployed();

    const snapshotNumber = 1;
    const snapshotSeedBlock1 = 10000000;
    await expect(
      registration.registerSnapshotSeed(snapshotNumber, snapshotSeedBlock1)
    )
      .to.emit(registration, "SeedBlockRegistered")
      .withArgs(snapshotNumber, snapshotSeedBlock1);
  });

  it("Should emit event upon update", async function () {
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
      registration.updateSnapshotSeed(snapshotNumber, snapshotSeedBlock2)
    )
      .to.emit(registration, "SeedBlockUpdated")
      .withArgs(snapshotNumber, snapshotSeedBlock2);
  });

  it("Should only allow owner to register", async function () {
    // eslint-disable-next-line no-unused-vars
    const [owner, addr1] = await ethers.getSigners();
    const SnapshotSeedRegistration = await ethers.getContractFactory(
      "SnapshotSeedRegistration"
    );
    const registration = await SnapshotSeedRegistration.deploy();
    await registration.deployed();

    const snapshotNumber = 1;
    const snapshotSeedBlock = 10000000;
    await expect(
      registration
        .connect(addr1)
        .registerSnapshotSeed(snapshotNumber, snapshotSeedBlock)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Should only allow owner to update", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const SnapshotSeedRegistration = await ethers.getContractFactory(
      "SnapshotSeedRegistration"
    );
    const registration = await SnapshotSeedRegistration.deploy();
    await registration.deployed();

    const snapshotNumber = 1;
    const snapshotSeedBlock = 10000000;
    const registration1Tx = await registration
      .connect(owner)
      .registerSnapshotSeed(snapshotNumber, snapshotSeedBlock);
    await registration1Tx.wait();
    expect(await registration.getSnapshotSeed(snapshotNumber)).to.equal(
      snapshotSeedBlock
    );

    await expect(
      registration
        .connect(addr1)
        .updateSnapshotSeed(snapshotNumber, snapshotSeedBlock)
    ).to.be.revertedWith("Ownable: caller is not the owner");
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
