import { ethers } from "hardhat";
import { Token__factory } from "../typechain/factories/contracts/Token__factory";

async function main() {
    const [signer] = await ethers.getSigners();
    const provider = ethers.provider;
    let instance_address =  "0xeC265C1588e21c2158B876A1AC026b08DdBdE7Ad";
    let token = new Token__factory(signer).attach(instance_address);
    console.log(await token.balanceOf(signer.address));

    
    let tx = await token.transfer(token.address, 21);
    await tx.wait();
    console.log(await token.balanceOf(signer.address));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
