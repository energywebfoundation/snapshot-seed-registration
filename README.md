# Snapshot Seed Registration

A simple smart contract to allow registration of the blocks whose hashes will be used as seeds for the snapshot.

The registered blocknumbers are to be provided as input to the [snapshot blocknumber calculation](https://github.com/energywebfoundation/snapshot-block-calculator). 

Contract for Consortia Staking Snapshots is deployed on EWC at [0x4A0F475c59c9453B29c66548DB86f6557a75F448](https://explorer.energyweb.org/address/0x4A0F475c59c9453B29c66548DB86f6557a75F448/transactions)

## Deployment

Contract deployment using script
```
npx hardhat run --network ewc scripts/deploy.ts
```

Contract flattened for verification using POANetwork flattener: https://github.com/poanetwork/solidity-flattener
```
./node_modules/.bin/poa-solidity-flattener ./contracts/SnapshotSeedRegistration.sol
```

## Hardhat documentation

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

### Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/deploy.ts
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```

## Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).
