pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/CappedToken.sol";


/**
 * @title AsobiCoin is the CappedToken implementation for ASOBI COIN
 * @dev AsobiCoin is limited to 16,500,000,000 ABX
 * @dev AsobiCoin has 18 decimals of precision
 * @dev AsobiCoin has the symbol ABX
 */
contract AsobiCoin is CappedToken {
    string public name = "ASOBI COIN";
    string public symbol = "ABX";
    uint256 public decimals = 18;
    constructor() public CappedToken(16500000000 ether) {
    }
}
