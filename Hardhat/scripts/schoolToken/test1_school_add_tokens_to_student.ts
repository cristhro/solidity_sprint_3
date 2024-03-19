import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();
const { SCHOOL_TOKEN_CONTRACT_ADDRESS, STUDENT_ADDRESS } = process.env;


async function main() {
  const schoolTokenContract = await ethers.getContractAt('SchoolToken', SCHOOL_TOKEN_CONTRACT_ADDRESS);

  // la escuela le otorga tokens al estudiante
  const tx = await schoolTokenContract.mintTokens(STUDENT_ADDRESS, 100);
  await tx.wait();
  
  console.log('🚀 ~ main ~ tx:', tx)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
