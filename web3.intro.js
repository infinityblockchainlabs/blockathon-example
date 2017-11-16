var Web3 = require('web3')
var Tx = require('ethereumjs-tx')
var configs = require('./config')

web3 = new Web3(new Web3.providers.HttpProvider(configs.host));
console.log(web3.fromWei(123))
console.log(web3.toWei(123))
console.log(web3.toHex(123))
console.log(web3.isAddress('0x0174b4957ec6366aba1747e28b95719ba370796a'))

web3.eth.getAccounts((error, accounts) => {
    console.log(accounts)
})