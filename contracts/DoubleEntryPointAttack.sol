// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DoubleEntryPoint.sol";

contract DoubleEntryPointAttack is IDetectionBot {
    address public vault;
    function setVaultAddr(address _vault) public {
        vault = _vault;
    }

    function handleTransaction(address user, bytes calldata msgData) external override {
        (,,address addr) = abi.decode(msgData[4:], (address, uint256, address));  
        if (addr == vault) {
            IForta(msg.sender).raiseAlert(user);
        }
    }
}