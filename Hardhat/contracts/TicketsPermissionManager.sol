// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ISchoolEventTickets {
    function setApprovalForAll(address operator, bool approved) external;
}

contract TicketsPermissionManager {
    // Dirección del contrato SchoolEventTickets
    address public schoolEventTicketsAddress;

    // Constructor que establece la dirección del contrato SchoolEventTickets
    constructor(address _schoolEventTicketsAddress) {
        require(_schoolEventTicketsAddress != address(0), "Invalid address");
        schoolEventTicketsAddress = _schoolEventTicketsAddress;
    }

    // Función para que los usuarios otorguen o revoquen permisos al operador
    function setApprovalForAllOnSchoolEventTickets(bool approved) public {
        ISchoolEventTickets(schoolEventTicketsAddress).setApprovalForAll(msg.sender, approved);
    }
}
