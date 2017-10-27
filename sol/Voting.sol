pragma solidity ^0.4.11;
// We have to specify what version of compiler this code will compile with

contract Transaction {
  /* mapping field below is equivalent to an associative array or hash.
  The key of the mapping is candidate name stored as type bytes32 and value is
  an unsigned integer to store the vote count
  */
  
  // mapping (bytes32 => uint8) public candidateCredit;
  // mapping (bytes32 => uint8) public candidateDebt;

  /* Solidity doesn't let you pass in an array of strings in the constructor (yet).
  We will use an array of bytes32 instead to store the list of candidates
  */
  
  mapping (bytes32 => uint8) public candidateCredit;
  mapping (bytes32 => uint8) public candidateDebt;
  
  bytes32[] public candidateList;

  /* This is the constructor which will be called once when you
  deploy the contract to the blockchain. When we deploy the contract,
  we will pass an array of candidates who will be contesting in the election
  */
  function Transaction(bytes32[] candidateNames) {
    candidateList = candidateNames;
  }

  // This function returns the total votes a candidate has received so far
  function getCredit(bytes32 candidate) returns (uint8) {
    return candidateCredit[candidate];
  }

  function getDebt(bytes32 candidate) returns (uint8) {
      return candidateDebt[candidate];
  }
  // This function increments the vote count for the specified candidate. This
  // is equivalent to casting a vote
  function sendMoney(bytes32 candidate, uint8 money) {
    if (candidateDebt[candidate] > money) {
      candidateDebt[candidate] -= money;
    } else {
      candidateCredit[candidate] += money-candidateDebt[candidate];
      candidateDebt[candidate] = 0;
    }
  }

}
