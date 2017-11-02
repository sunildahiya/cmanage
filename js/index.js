web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var contractInstance;
var contractAddress='0xb6b6de93b8df61c9eec356bbaeb7dd0a847216fc';

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    contractAddress = this.responseText;
    contractInstance = TransactionContract.at(contractAddress);
  }
};
xhttp.open("GET", "address.txt", true);
xhttp.send();


var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      abi = JSON.parse(this.responseText);
      TransactionContract = web3.eth.contract(abi);
      // In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
      contractInstance = TransactionContract.at(contractAddress);
    }
  };
  xmlhttp.open("GET", "ContractFunc.json", true);
  // xmlhttp.open("GET", "address.txt", true);
  xmlhttp.send();

    
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
candidatesCredit = {"Pankaj": "credit-1", "Sandip": "credit-2", "Hemant": "credit-3"}

function sendMoney(money) {
  candidateName = $("#candidate").val();
  contractInstance.sendMoney(candidateName, money, {from: web3.eth.accounts[0]}, function() {
    let div_id = candidatesCredit[candidateName];
    $("#" + div_id).html(contractInstance.getCredit.call(candidateName).toString());
    var balance = 0;
    candidateNames = Object.keys(candidatesCredit);
    for (var i=0; i<candidateNames.length; i++){
      var name = candidateNames[i];
      balance = balance + parseInt(contractInstance.getCredit.call(name).toString());
    }
    $("#" + "balance").html(balance.toString());
    $("#" + "money").val("");
    $("#" + "candidate").val("")
  });
 
}

$(document).ready(function() {
  candidateNames = Object.keys(candidatesCredit);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    let valCredit = contractInstance.getCredit.call(name).toString()
    $("#" + candidatesCredit[name]).html(valCredit);
  }
});

    
$(function() {
  $('input.autocomplete').autocomplete({
    data: {
      "Pankaj":'http://placehold.it/250x250',
      "Sandip": 'http://placehold.it/250x250',
      "Hemant": 'http://placehold.it/250x250',
    }
  });
});
