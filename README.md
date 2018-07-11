# ASOBI COIN Smart Contract

This repository contains the
[ERC-20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md) smart
contract code for the ASOBI COIN token based on the Ethereum blockchain.

It also contains everything necessary to

- test basic token functionality,
- flatten the smart contract code to upload and verify on
  [Etherscan](https://etherscan.io/), and
- audit the smart contract code once it has been deployed.

Currently, ASOBI COIN has not been deployed on the main Ethereum network. As
soon as this happens, the ASOBI COIN smart contract address will be added to
this README file.

## Quickstart

```
git clone git@github.com:asobicoin/asobicoin.git
# or
git clone https://github.com/asobicoin/asobicoin.git
cd asobicoin
npm install
npm test
```

The following commands are available:

| Command            | Description |
|--------------------|-------------|
| `npm run compile`  | Compile all smart contracts using truffle |
| `npm run lint-fix` | Try to automatically fix lint issues found by ESlint and Solium |
| `npm run lint`     | Run ESlint and Solium to lint all JavaScript and Solidity code |
| `npm test`         | Run all smart contract tests using truffle |

## Flattening Smart Contract Code for Etherscan

In order to flatten `contracts/AsobiCoin.sol`, the following tools are necessary:

| Name                                                                                    | Version Used                       |
|-----------------------------------------------------------------------------------------|------------------------------------|
| [Solidity Compiler](http://solidity.readthedocs.io/en/v0.4.24/installing-solidity.html) | `0.4.24+commit.e67f0147.Linux.g++` |
| [solidity-flattener](https://github.com/BlockCatIO/solidity-flattener#installation)     | `0.2.2`                            |

After installing the above mentioned tools, you can then run:

```bash
bin/flatten contracts/AsobiCoin.sol
```

You will see the following output:

```
pragma solidity ^0.4.13;

contract ERC20Basic {
  function totalSupply() public view returns (uint256);
  function balanceOf(address who) public view returns (uint256);
  function transfer(address to, uint256 value) public returns (bool);
  event Transfer(address indexed from, address indexed to, uint256 value);
}

// ... here be contracts

contract AsobiCoin is CappedToken {
    string public name = "ASOBI COIN";
    string public symbol = "ABX";
    uint256 public decimals = 18;
    constructor() public CappedToken(300000000 ether) {
    }
}

library SafeMath {

// ... here be SafeMath

}
```

For extra comfort, you can copy the code directly to the X clipboard:

```bash
bin/flatten contracts/AsobiCoin.sol | xclip -sel clipboard
```

You can then hand the code over to [Etherscan](https://etherscan.io/). You can
upload the code directly when viewing the deployed smart contract on Etherscan
after deployment. You can also upload it using the [Verify Contract
Code](https://etherscan.io/verifyContract) form, provided you know have the
contract address at hand.

Note: I would like to switch to another code flattener, since
solidity-flattener is nearing its end-of-life. Possible choices are:

- [Soljitsu](https://github.com/BlockChainCompany/soljitsu): Appears to be
  a very complete solution.
- [truffle-flattener](https://github.com/alcuadrado/truffle-flattener/): Works
  out of the box, but at least [one
  issue](https://github.com/alcuadrado/truffle-flattener/issues/12) reports
  an Etherscan verification mismatch.

Current issues with solidity-flattener:

- Defaults to Solidity 0.4.13
- Does not support `contract X is Y(arg)` syntax
- Has trouble with relative imports

## Project Organization

```
.
├── bin
│   └── flatten
├── contracts
│   ├── AsobiCoin.sol
│   ├── Escrow.sol
│   └── Migrations.sol
├── migrations
│   └── 1_initial_migration.js
├── package.json
├── package-lock.json
├── README.md
├── test
│   └── AsobiCoin.js
└── truffle.js
```

| File                                | Description                      |
|-------------------------------------|----------------------------------|
| `bin/flatten`                       | Flatten Solidity smart contracts |
| `contracts/`                        | Contain Solidity smart contracts |
| `contracts/AsobiCoin.sol`           | Contain ASOBI COIN smart contract |
| `contracts/Migrations.sol`          | Contain Truffle Suite migration smart contract |
| `migrations/`                       | Contain Truffle Suite smart contract migrations |
| `migrations/1_initial_migration.js` | Initial migration |
| `package.json`                      | NPM package file |
| `package-lock.json`                 | NPM package lock file |
| `README.md`                         | README file |
| `test/`                             | Solidity smart contract tests run by Truffle Suite |
| `test/AsobiCoin.js`                 | Test ASOBI COIN smart contract |
| `truffle.js`                        | Configuration for Truffle Suite |

## Project Dependencies

To use ASOBI COIN in other projects, only the following dependency is necessary.

| Name                                                                   | Version  |
|------------------------------------------------------------------------|----------|
| [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-solidity/) | `1.10.0` |

To develop ASOBI COIN, the following dependencies are used

| Name | Version |
|--------------------------------------------------------------------------------|-|
| [assert-rejected](https://www.npmjs.com/package/assert-rejected)               | `>= 1.1.1 < 2.0.0` |
| [ESlint](https://www.npmjs.com/package/eslint)                                 | `>= 4.15.0 < 5.0.0`|
| [eth-gas-reporter](https://www.npmjs.com/package/eth-gas-reporter)             | `>= 0.1.9 < 1.0.0` |
| [Solium](https://www.npmjs.com/package/solium)                                 | `>= 1.1.8 < 2.0.0` |
| [solium-plugin-zeppelin](https://www.npmjs.com/package/solium-plugin-zeppelin) | [Git `aec043`](https://github.com/OpenZeppelin/solium-plugin-zeppelin/commit/aec043c) |
| [truffle](https://www.npmjs.com/package/truffle)                               | `>= 4.1.13 < 5.0.0` |
| [web3-utils](https://www.npmjs.com/package/web3-utils)                   | `>= 1.0.0-beta.34 < 2.0.0` |
