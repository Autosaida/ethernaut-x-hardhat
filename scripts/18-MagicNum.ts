import { ethers } from "hardhat";
import { MagicNum__factory } from "../typechain/factories/contracts/MagicNum__factory";


async function main() {
    const [signer] = await ethers.getSigners();
    const provider = ethers.provider;
    let instance_address = "0xC07305aD68b4f82b8CFD98B951708328bC56d219";
    let magicNum = new MagicNum__factory(signer).attach(instance_address);


    let tx = await signer.sendTransaction({
      data:"0x600a600c600039600a6000f3602a60005260206000f3",
      gasLimit:80000,
    })

    let res = await tx.wait();
    let solver = new ethers.Contract(res.contractAddress, ["function whatIsTheMeaningOfLife() view returns (uint)"], signer);
    let n: number = await solver.whatIsTheMeaningOfLife();
    console.log(n);
    tx = await magicNum.setSolver(solver.address);
    await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
