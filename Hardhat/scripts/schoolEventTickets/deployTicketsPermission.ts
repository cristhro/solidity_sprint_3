import { ethers } from "hardhat";

import * as dotenv from "dotenv";
dotenv.config();
const { SCHOOL_EVENT_TICKET_CONTRACT_ADDRESS } = process.env;

async function main() {
  const Contract = await ethers.getContractFactory("TicketsPermissionManager");
  const contract = await Contract.deploy(SCHOOL_EVENT_TICKET_CONTRACT_ADDRESS);
  await contract.deployed();

  console.log("Contract Tickets Permission Manager deployed to:", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
