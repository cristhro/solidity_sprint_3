// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // // We get the contract to deploy
  // const ContractSafeMath = await ethers.getContractFactory("SafeMath");
  // const contractSafeMath = await ContractSafeMath.deploy();
  // await contractSafeMath.deployed();

  // console.log("Contract SafeMath deployed to:", contractSafeMath.address);


  // // We get the contract to deploy
  // const ContractERC20 = await ethers.getContractFactory("ERC20Basic");
  // const contractERC20 = await ContractERC20.deploy(1000);
  // await contractERC20.deployed();

  // console.log("Contract ERC20 deployed to:", contractERC20.address);


// We get the contract to deploy
const Contract = await ethers.getContractFactory("Disney");
const contract = await Contract.deploy();
await contract.deployed();

console.log("Contract disney deployed to:", contract.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
