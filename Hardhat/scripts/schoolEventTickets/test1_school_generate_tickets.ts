import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();
const { SCHOOL_EVENT_TICKETS_CONTRACT_ADDRESS, DIRECTOR_ADDRESS, SCHOOL_EVENT_TICKET_EXCURSION } = process.env;


async function main() {
  const SchoolEventTicketsContract = await ethers.getContractAt('SchoolEventTickets', SCHOOL_EVENT_TICKETS_CONTRACT_ADDRESS);

  // Estudiante solicita un título
  const tx = await SchoolEventTicketsContract.generateTickets(DIRECTOR_ADDRESS, SCHOOL_EVENT_TICKET_EXCURSION, 25, "0x" );
  await tx.wait();
  console.log('tx:', tx)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
