var Web3 = require('web3')
var Tx = require('ethereumjs-tx')
var configs = require('./config')

web3 = new Web3(new Web3.providers.HttpProvider(configs.host));

web3.eth.getAccounts((error, accounts) => {
    let codeABI = configs.contract_abi // paste your smart contract abi object here
    let address = configs.contract_address
    let contract = web3.eth.contract(codeABI).at(address)
    console.log(contract.foo(accounts[0]).toString(10))
    console.log(contract.foo2(accounts[0], {from: accounts[0], gas: 500000}))
    console.log(contract.foo2.sendTransaction({from: accounts[0], value: web3.toWei(1), gas: 500000}))
})