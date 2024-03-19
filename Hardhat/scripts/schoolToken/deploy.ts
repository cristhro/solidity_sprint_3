import { ethers } from "hardhat";

import * as dotenv from "dotenv";
dotenv.config();
const { SCHOOL_GRADES_CONTRACT_ADDRESS } = process.env;

async function main() {
  const Contract = await ethers.getContractFactory("SchoolToken");
  const contract = await Contract.deploy();
  await contract.deployed();

  console.log("Contract School token deployed to:", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
