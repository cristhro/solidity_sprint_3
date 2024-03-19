import { ethers } from "hardhat";
import { expect } from "chai"; // Import assertion library (e.g., Chai)

const { SCHOOL_CERTIFICATE_CONTRACT_ADDRESS, STUDENT_ADDRESS } = process.env;


async function main() {
  const schoolCertificateContract = await ethers.getContractAt('SchoolCertificate', SCHOOL_CERTIFICATE_CONTRACT_ADDRESS);

  // El director de la escuela otorgue un título a un estudiante
  const tx = await schoolCertificateContract.grantCertificate(STUDENT_ADDRESS);

  await tx.wait();
  console.log(`Certificate granted to ${STUDENT_ADDRESS}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
