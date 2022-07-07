//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// import "hardhat/console.sol"; // Can use to help with debugging
import "@openzeppelin/contracts/access/Ownable.sol";

contract SnapshotSeedRegistration is Ownable {
  mapping(uint => uint) private snapshotSeedBlocks; 
  event SeedBlockRegistered(uint indexed snapshotNumber, uint indexed seedBlockNumber);
  event SeedBlockUpdated(uint indexed snapshotNumber, uint indexed seedBlockNumber);
  
  /*
   * This allows the owner to register which block they will be using for a snapshot seed
   * TODO: emit event
   */
  function registerSnapshotSeed(uint snapshotNumber, uint seedBlockNumber) public onlyOwner {
    require( snapshotSeedBlocks[snapshotNumber] == 0, "already registered snapshot");
    snapshotSeedBlocks[snapshotNumber] = seedBlockNumber;
    emit SeedBlockRegistered(snapshotNumber, seedBlockNumber);
  }
  
  /*
   * This allows the owner to update an existing registration
   * It is separate from register to make sure that users are intentional about wanting to perform an update
   * The updated is tracked by transaction and event history
   * TODO: emit event
   */
  function updateSnapshotSeed(uint snapshotNumber, uint seedBlockNumber) public onlyOwner {
    require( snapshotSeedBlocks[snapshotNumber] != 0, "no existing seed for this snapshot number");
    require( snapshotSeedBlocks[snapshotNumber] != seedBlockNumber, "this seedBlockNumber already set for this snapshot number");
    snapshotSeedBlocks[snapshotNumber] = seedBlockNumber;
    emit SeedBlockUpdated(snapshotNumber, seedBlockNumber);
  }

  /*
   * Get the snapshot seed block associated with a snapshot number 
   */
  function getSnapshotSeed(uint snapshotNumber) view public returns(uint) {
    return snapshotSeedBlocks[snapshotNumber];
  }
}
