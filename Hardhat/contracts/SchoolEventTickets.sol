// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SchoolEventTickets is ERC1155, Ownable {
    uint256 public constant EVENT_TICKET = 0; // ID único para los tickets de evento
    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC1155("") {
    }

    // Función para acuñar nuevos tickets, solo accesible por el propietario del contrato
    function mint(address account, uint256 id, uint256 amount, bytes memory data) public onlyOwner {
        _mint(account, id, amount, data);
    }

    // Establecer URI para un token específico
    function setURI(uint256 tokenId, string memory newuri) public onlyOwner {
        _tokenURIs[tokenId] = newuri;
    }

    // Sobreescribir la función uri para devolver URIs específicos para cada token
    function uri(uint256 tokenId) override public view returns (string memory) {
        return _tokenURIs[tokenId];
    }

    // Función para distribuir tickets a los participantes
    function distributeTickets(address[] memory recipients, uint256 amount, bytes memory data) public onlyOwner {
        for (uint i = 0; i < recipients.length; i++) {
            _mint(recipients[i], EVENT_TICKET, amount, data);
        }
    }
}
