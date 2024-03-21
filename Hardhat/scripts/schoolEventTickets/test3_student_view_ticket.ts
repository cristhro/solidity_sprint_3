import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();
const { SCHOOL_EVENT_TICKETS_CONTRACT_ADDRESS, DIRECTOR_ADDRESS, SCHOOL_EVENT_TICKET_EXCURSION, STUDENT1_ADDRESS, STUDENT2_ADDRESS, STUDENT3_ADDRESS } = process.env;


async function main() {
  const SchoolEventTicketsContract = await ethers.getContractAt('SchoolEventTickets', SCHOOL_EVENT_TICKETS_CONTRACT_ADDRESS);
// Lista de destinatarios de las entradas
  const recipientBalance = await SchoolEventTicketsContract.balanceOf(STUDENT1_ADDRESS, SCHOOL_EVENT_TICKET_EXCURSION);
  console.log(`Saldo de Student 1 ${STUDENT1_ADDRESS}: ${recipientBalance.toString()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
