

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var xmlhttp = new XMLHttpRequest();
var abi;
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      abi = JSON.parse(this.responseText);
  }
};
xmlhttp.open("GET", "ContractFunc.json", true);
xmlhttp.send();

VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = VotingContract.at('0xc21a98f53804f17cfca39f9195802dbfb2dc155b');
candidates = {"Pankaj": "credit-1", "Sandip": "credit-2", "Hemant": "credit-3"}

function sendMoney(money) {
  candidateName = $("#candidate").val();
  contractInstance.sendMoney(candidateName, money, {from: web3.eth.accounts[0]}, function() {
    let div_id = candidates[candidateName];
    $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
  });
}

$(document).ready(function() {
  candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    let val = contractInstance.totalVotesFor.call(name).toString()
    $("#" + candidates[name]).html(val);
  }
});

