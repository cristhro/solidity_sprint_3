const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TicketsPermissionManager", function () {
  let SchoolEventTickets, schoolEventTickets;
  let TicketsPermissionManager, ticketsPermissionManager;
  let owner, user1;

  beforeEach(async function () {
    // Configuración inicial: Cuentas
    [owner, user1] = await ethers.getSigners();

    // Despliegue del contrato SchoolEventTickets
    SchoolEventTickets = await ethers.getContractFactory("SchoolEventTickets");
    schoolEventTickets = await SchoolEventTickets.deploy();
    await schoolEventTickets.deployed();

    // Despliegue del contrato TicketsPermissionManager con la dirección del contrato SchoolEventTickets
    TicketsPermissionManager = await ethers.getContractFactory("TicketsPermissionManager");
    ticketsPermissionManager = await TicketsPermissionManager.deploy(schoolEventTickets.address);
    await ticketsPermissionManager.deployed();
  });

  it("should allow a user to grant and revoke permission to the manager", async function () {
    // Otorgar permiso al TicketsPermissionManager para gestionar los tokens del usuario1
    await schoolEventTickets.connect(user1).setApprovalForAll(ticketsPermissionManager.address, true);
    
    // Verificar que el permiso ha sido otorgado
    expect(await schoolEventTickets.isApprovedForAll(user1.address, ticketsPermissionManager.address)).to.equal(true);

    // Revocar el permiso
    await schoolEventTickets.connect(user1).setApprovalForAll(ticketsPermissionManager.address, false);
    
    // Verificar que el permiso ha sido revocado
    expect(await schoolEventTickets.isApprovedForAll(user1.address, ticketsPermissionManager.address)).to.equal(false);
  });
});
