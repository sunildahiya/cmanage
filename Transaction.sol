pragma solidity ^0.4.11;
// We have to specify what version of compiler this code will compile with

contract Transaction {
  
  mapping (bytes32 => uint8) public candidateCredit;
  
  bytes32[] public candidateList;
  function Transaction(bytes32[] candidateNames) {
    candidateList = candidateNames;
  }

  function getCredit(bytes32 candidate) returns (uint8) {
    return candidateCredit[candidate];
  }

  function sendMoney(bytes32 candidate, uint8 money) {
      candidateCredit[candidate] += money;
  }

}
