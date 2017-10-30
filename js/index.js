

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var contractInstance;
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      abi = JSON.parse(this.responseText);
      TransactionContract = web3.eth.contract(abi);
      // In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
      contractInstance = TransactionContract.at('0x4758bcabb3985a59cce407540969749485b5229d');
    }
  };
  xmlhttp.open("GET", "ContractFunc.json", true);
  xmlhttp.send();

// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
candidatesCredit = {"Pankaj": "credit-1", "Sandip": "credit-2", "Hemant": "credit-3"}
candidatesDebt = {"Pankaj": "debt-1", "Sandip": "debt-2", "Hemant": "debt-3"}

function sendMoney(money) {
  candidateName = $("#candidate").val();
  contractInstance.sendMoney(candidateName, money, {from: web3.eth.accounts[0]}, function() {
    let div_id = candidatesCredit[candidateName];
    $("#" + div_id).html(contractInstance.getCredit.call(candidateName).toString());
    div_id = candidatesDebt[candidateName];
    $("#" + div_id).html(contractInstance.getDebt.call(candidateName).toString());
  });
}

$(document).ready(function() {
  candidateNames = Object.keys(candidatesCredit);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    let valCredit = contractInstance.getCredit.call(name).toString()
    let valDebt = contractInstance.getDebt.call(name).toString()
    $("#" + candidatesCredit[name]).html(valCredit);
    $("#" + candidatesDebt[name]).html(valDebt);
  }
});

