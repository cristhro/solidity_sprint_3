// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./SchoolToken.sol";
import "./SchoolCertificateNFT.sol";

contract SchoolRequestCertificate {

  // Estructura para almacenar la información de un certificado
  struct RequestInfo {
    string studentName;
    string degree;
    uint year;
    bool allowed;
    bool granted;
    uint tokenCertificate; 
  }


    // Instancia del contrato ISchoolCertificateNFT
    ISchoolCertificateNFT schoolCertificateNFT;

  // Constructor para establecer el director y el contrato SchoolToken
  constructor(address _director, address _schoolToken, address _schoolCertificatesNFTAddress) {
    director = payable(_director);
    schoolToken = SchoolToken(_schoolToken);
    schoolCertificateNFT = ISchoolCertificateNFT(_schoolCertificatesNFTAddress);
  }

  function createCertificate(address _student, string memory _tokenURI)  internal
      returns (uint256)  {
        uint idCertificate = schoolCertificateNFT.mintCertificate(_student, _tokenURI);
      return idCertificate;
  }

    // function availableTransfer(bool _transfersEnabled) public {
    //   schoolCertificateNFT.setTransfersEnabled(_transfersEnabled);
    // }

    // function burnCertificate(uint256 tokenId)  public {
    //   schoolCertificateNFT.burn(tokenId);
    // }

    // function revokeCertificate(uint256 tokenId) public {
    //   schoolCertificateNFT.revokeCertificate(tokenId);
    // }

    // function isRevoked(uint256 tokenId) public returns (bool) {
    //   bool isRevoked = schoolCertificateNFT.isRevoked(tokenId);
    //   return isRevoked;
    // }


  // Mapping para almacenar los certificados de los estudiantes
  mapping(address => RequestInfo) public certificates;

  // Precio del certificado en tokens
  uint public certificatePrice = 100;

  // Dirección del director de la escuela
  address payable public director;

  // Instancia del contrato SchoolToken
  SchoolToken public schoolToken;


  // Función para que un estudiante solicite un certificado
  function requestCertificate(string memory _studentName, string memory _degree, uint _year) public {
    // Almacena la solicitud en el mapping
    certificates[msg.sender] = RequestInfo(_studentName, _degree, _year, false, false, 0);
  }

  // Función para que el estudiante autorice el pago de un certificado al director de la escuela
  function allowCertificate() public payable {
    require(msg.value == certificatePrice, "Debe enviar el precio correcto del certificado");
    require(certificates[msg.sender].allowed == false, "El certificado ya ha sido autorizado");

    // Marca el certificado como pagado
    certificates[msg.sender].allowed = true;

    // Transfiere el pago al director
    schoolToken.approve(director, certificatePrice);
  }

  // Función para que la escuela otorgue un certificado a un estudiante
  function grantCertificate(address _student) public {
    require(msg.sender == director, "Solo el director puede otorgar certificados");
    require(certificates[_student].allowed == true, "El estudiante debe pagar el certificado antes de que se le otorgue");


    // Marca el certificado como otorgado
    certificates[_student].granted = true;


    schoolToken.transferFrom( _student, director, 100);


    createCertificate(_student, "http://linkTokensCertificate"); 
  }

  // Función para que un estudiante vea su certificado
  function viewCertificate() public view returns (RequestInfo memory) {
    return certificates[msg.sender];
  }

  // Función para verificar la autenticidad de un certificado
  function verifyCertificate(address _student) public view returns (bool) {
    return certificates[_student].granted;
  }
}
