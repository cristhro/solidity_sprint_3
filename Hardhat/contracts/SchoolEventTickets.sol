// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface ISchoolEventTicket {
  function generateTickets(address account, uint256 eventId, uint256 amount, bytes memory data) external;
  function distributeTickets(address[] memory recipients,uint256 eventId, uint256 amount, bytes memory data) external;
  function transferTicket(address from, address to, uint256 eventId, uint256 amount, bytes memory data) external;
  function viewTicket(address account, uint256 eventId) external view returns (uint256);
}

contract SchoolEventTickets is ISchoolEventTicket, ERC1155, Ownable {
    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC1155("SchoolEventTickets") {
    }

    function viewTicket(address account, uint256 eventId) public override  view returns (uint256) {
        require(account != address(0), "ERC1155: balance query for the zero address");
        return super.balanceOf(account, eventId);
    }
    
    // Función para acuñar nuevos tickets, solo accesible por el propietario del contrato
    function generateTickets(address account, uint256 eventId, uint256 amount, bytes memory data) public override onlyOwner {
        _mint(account, eventId, amount, data);
    }

    // Establecer URI para un token específico
    function setURI(uint256 tokenId, string memory newuri) public onlyOwner {
        _tokenURIs[tokenId] = newuri;
    }

    // Sobreescribir la función uri para devolver URIs específicos para cada token
    function uri(uint256 tokenId)  override  public   view returns (string memory) {
        return _tokenURIs[tokenId];
    }

    // Función para distribuir tickets a los participantes
    function distributeTickets(address[] memory recipients, uint256 eventId, uint256 amount, bytes memory data) public override  onlyOwner {
        for (uint i = 0; i < recipients.length; i++) {
            _mint(recipients[i], eventId, amount, data);
        }
    }

     // Función simplificada para la transferencia de tickets entre participantes
    function transferTicket(address from, address to, uint256 eventId,  uint256 amount, bytes memory data) public override {
        require(balanceOf(from, eventId) >= amount, "Insufficient ticket balance to transfer.");
        safeTransferFrom(from, to, eventId, amount, data);
    }
}
