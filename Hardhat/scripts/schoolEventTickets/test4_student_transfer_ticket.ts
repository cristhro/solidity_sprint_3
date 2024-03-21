import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();
const { SCHOOL_EVENT_TICKETS_CONTRACT_ADDRESS, DIRECTOR_ADDRESS, SCHOOL_EVENT_TICKET_EXCURSION, STUDENT1_ADDRESS, STUDENT2_ADDRESS } = process.env;


async function main() {
  const SchoolEventTicketsContract = await ethers.getContractAt('SchoolEventTickets', SCHOOL_EVENT_TICKETS_CONTRACT_ADDRESS);
  // Lista de destinatarios de las entradas
  const tx = await SchoolEventTicketsContract.transferTicket(STUDENT1_ADDRESS, STUDENT2_ADDRESS, SCHOOL_EVENT_TICKET_EXCURSION, 1, "0x");
  await tx.wait();
  console.log('tx:', tx)
  
  const student1Balance = await SchoolEventTicketsContract.balanceOf(STUDENT1_ADDRESS, SCHOOL_EVENT_TICKET_EXCURSION);
  console.log(`Student1 ${STUDENT1_ADDRESS}: ${student1Balance.toString()}`);
  
  const student2Balance = await SchoolEventTicketsContract.balanceOf(STUDENT2_ADDRESS, SCHOOL_EVENT_TICKET_EXCURSION);
  console.log(`Student2 ${STUDENT2_ADDRESS}: ${student2Balance.toString()}`);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
