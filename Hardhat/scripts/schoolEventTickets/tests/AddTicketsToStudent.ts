import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();
const { STUDENT_ADDRESS } = process.env;


async function main() {
  const schoolEventTicketsContract = await ethers.getContractAt('SchoolEventTickets');

  // la escuela le otorga tickets al estudiante
  console.log('ADDRESS ', STUDENT_ADDRESS );
  const tx = await schoolEventTicketsContract.mint(STUDENT_ADDRESS, 555, 3, '');
  await tx.wait();
  
  console.log('🚀 ~ main ~ tx:', tx)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});