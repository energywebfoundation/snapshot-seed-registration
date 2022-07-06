//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SnapshotSeedRegistration is Ownable {
  mapping(uint => uint) private snapshotSeedBlocks; 
  
  /*
   * This allows the owner to register which block they will be using for a snapshot seed
   * TODO: emit event
   */
  function registerSnapshotSeed(uint snapshotNumber, uint seedBlockNumber) public onlyOwner {
    snapshotSeedBlocks[snapshotNumber] = seedBlockNumber;
  }

  /*
   * Get the snapshot seed block associated with a snapshot number 
   */
  function getSnapshotSeed(uint snapshotNumber) view public returns(uint) {
    return snapshotSeedBlocks[snapshotNumber];
  }
}
