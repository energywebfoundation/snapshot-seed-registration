//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SnapshotSeedRegistration is Ownable {
  mapping(uint => uint) public snapshotSeedBlocks; 
  
  /*
   * This allows the owner to register which block they will be using for a snapshot seed
   */
  function registerSnapshotSeed(uint snapshotNumber, uint seedBlockNumber) public onlyOwner {
    snapshotSeedBlocks[snapshotNumber] = seedBlockNumber;
  }
}
