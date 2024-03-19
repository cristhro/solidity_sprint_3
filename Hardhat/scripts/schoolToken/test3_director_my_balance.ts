import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();
const { SCHOOL_TOKEN_CONTRACT_ADDRESS } = process.env;


async function main() {
  const schoolTokenContract = await ethers.getContractAt('SchoolToken', SCHOOL_TOKEN_CONTRACT_ADDRESS);

  // Muestra el balance (invocando el contrato con la cuenta del director)
  const balance = await schoolTokenContract.myBalance();
  
  console.log('🚀 ~ main ~ tx:', balance)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
