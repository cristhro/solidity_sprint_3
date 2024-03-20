pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface ISchoolCertificateNFT {
    function mintCertificate(address to, string calldata tokenURI) external returns (uint256);
    function setTransfersEnabled(bool _transfersEnabled) external;
    function burn(uint256 tokenId) external;
    function revokeCertificate(uint256 tokenId) external;
    function isRevoked(uint256 tokenId) external returns (bool);
}



contract SchoolCertificateNFT is ISchoolCertificateNFT, ERC721URIStorage, Ownable {


    // Variable para llevar la cuenta de los tokenIds
    uint256 private _currentTokenId = 0;

    // Mapping para rastrear los certificados revocados
    mapping(uint256 => bool) public revokedCertificates;

    // Estado que controla si las transferencias están habilitadas
    bool public transfersEnabled = false;


    constructor() ERC721("StudentCertificate", "STUCERT") {} 


    function mintCertificate(address _to, string memory _tokenURI)  public
        returns (uint256) onlyOwner {
        uint256 newTokenId = _currentTokenId + 1;
        _currentTokenId = newTokenId;

        _safeMint(_to, newTokenId);
        _setTokenURI(newTokenId, _tokenURI + "/" + newTokenId);

        // Emitir un evento podría ser útil para auditar y rastrear la emisión de certificados
        emit CertificateMinted(_to, newTokenId, _tokenURI);

        return newTokenId;
    }

   
    function burn(uint256 tokenId) public virtual {
        // Solo el propietario del token o el propietario del contrato puede quemar el token
        require(_isApprovedOrOwner(_msgSender(), tokenId) || owner() == _msgSender(), "Caller is not owner nor approved");
        _burn(tokenId);
    }


     function revokeCertificate(uint256 tokenId) public onlyOwner {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        revokedCertificates[tokenId] = true;
        emit CertificateRevoked(tokenId);
    }

     function isRevoked(uint256 tokenId) public view returns (bool) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return revokedCertificates[tokenId];
    }

    function setTransfersEnabled(bool _transfersEnabled) public onlyOwner {
        transfersEnabled = _transfersEnabled;
    }


    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal virtual override
    {
        super._beforeTokenTransfer(from, to, tokenId);
        // Requiere que las transferencias estén habilitadas o que el remitente sea el propietario (permitiendo mint y burn)
        require(transfersEnabled || from == address(0) || to == address(0), "StudentCertificates: transfers are disabled");
    }

  // Evento para emitir cada vez que se acuña un nuevo certificado
    event CertificateMinted(address indexed to, uint256 indexed tokenId, string tokenURI);
    event CertificateRevoked(uint256 indexed tokenId);

}
