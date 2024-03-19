pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SchoolToken is ERC20 {

  string public constant NAME = "SchoolToken";
  string public constant SYMBOL = "DPT";

  constructor() ERC20(NAME, SYMBOL) {
    shoollAddress = msg.sender;
  }

  // Función para transferir tokens entre usuarios
  function transfer(address recipient, uint256 amount) public override returns (bool) {
    _transfer(msg.sender, recipient, amount);
    return true;
  }

  function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
    _transfer(sender, recipient, amount);
    return true;
  }

  // Función para aprobar transferencias de terceros
  function approve(address spender, uint256 amount) public override returns (bool) {
    _approve(msg.sender, spender, amount);
    return true;
  }

  // Función para consultar el saldo de un usuario
  function balanceOf(address account) public view override returns (uint256) {
    return super.balanceOf(account);
  }

  // Función para consultar el saldo de un usuario
  function myBalance() public view  returns (uint256) {
    return super.balanceOf(msg.sender);
  }

  // Función personalizada para que la escuela cree y envíe tokens a los estudiantes
  function mintTokens(address student, uint256 amount) public onlySchool {
    _mint(student, amount);
  }

  // Modifier para restringir la función a la escuela
  modifier onlySchool() {
    require(msg.sender == shoollAddress, "Only the school can mint tokens");
    _;
  }

  // Variable para almacenar la dirección de la escuela
  address public shoollAddress;
}
