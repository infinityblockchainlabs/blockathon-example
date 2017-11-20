var Web3 = require('web3')
var Tx = require('ethereumjs-tx')
var configs = require('./config')

web3 = new Web3(new Web3.providers.HttpProvider(configs.host));
console.log(web3)
console.log(web3.fromWei(123))
console.log(web3.toWei(123))
console.log(web3.toHex(123))
console.log(web3.isAddress('0xd09e35386cca7ea21158eca7faae16a476ec5d84'))

web3.version.getNetwork((err, network) => {
    console.log('Network id: ', network)
})

web3.eth.getAccounts((error, accounts) => {
    console.log('Accounts: ', accounts)
})

web3.eth.getBalance('0xd09e35386cca7ea21158eca7faae16a476ec5d84', (error, balance) => {
    console.log('Balance: ', balance.toString(10))
})