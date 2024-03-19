import { ethers } from "hardhat";

import * as dotenv from "dotenv";
dotenv.config();
const { DIRECTOR_ADDRESS, SCHOOL_TOKEN_CONTRACT_ADDRESS } = process.env;

async function main() {
  const Contract = await ethers.getContractFactory("SchoolCertificate");
  const contract = await Contract.deploy(DIRECTOR_ADDRESS, SCHOOL_TOKEN_CONTRACT_ADDRESS);
  await contract.deployed();

  console.log("Contract SchoolCertificate deployed to:", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
