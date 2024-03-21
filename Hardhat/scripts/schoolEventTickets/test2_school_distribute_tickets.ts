import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();
const { SCHOOL_EVENT_TICKETS_CONTRACT_ADDRESS, DIRECTOR_ADDRESS, SCHOOL_EVENT_TICKET_EXCURSION, STUDENT1_ADDRESS, STUDENT2_ADDRESS, STUDENT3_ADDRESS } = process.env;


async function main() {
  const SchoolEventTicketsContract = await ethers.getContractAt('SchoolEventTickets', SCHOOL_EVENT_TICKETS_CONTRACT_ADDRESS);
  // Lista de destinatarios de las entradas
  const students = [
    STUDENT1_ADDRESS,
    STUDENT2_ADDRESS,
    STUDENT3_ADDRESS,
  ];

  const amount = 1;

  // Distribución de entradas a los destinatarios
  const tx = await SchoolEventTicketsContract.distributeTickets(students, SCHOOL_EVENT_TICKET_EXCURSION,  amount, "0x");
  await tx.wait();
  console.log('tx:', tx)

  // Verificación del saldo de los destinatarios
  for (const recipient of students) {
    const recipientBalance = await SchoolEventTicketsContract.balanceOf(recipient, SCHOOL_EVENT_TICKET_EXCURSION);
    console.log(`Saldo de entradas de ${recipient}: ${recipientBalance.toString()}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
