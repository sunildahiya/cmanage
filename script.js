// #! /usr/bin/env node
setTimeout( myFunc2, 5000);
function myFunc2() {
Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
fs = require('fs')
code = fs.readFileSync('Transaction.sol').toString()
solc = require('solc')
compiledCode = solc.compile(code)
abiDefinition = JSON.parse(compiledCode.contracts[':Transaction'].interface)
TransactionContract = web3.eth.contract(abiDefinition)
byteCode = compiledCode.contracts[':Transaction'].bytecode
deployedContract = TransactionContract.new(['Pankaj','Sandip','Hemant'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
function myFunc()
 {
    console.log(deployedContract.address);
    var out=fs.createWriteStream('address.txt',{encoding:'utf8'} );
    out.write(deployedContract.address);
    out.end()
 }
setTimeout( myFunc, 500);
}
