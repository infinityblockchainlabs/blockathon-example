var Web3 = require('web3')
var configs = require('./config')

web3 = new Web3(new Web3.providers.HttpProvider(configs.host))
let accounts = []
web3.eth.getAccounts((err, accounts) => {
    console.log(accounts)

    let transactionObj = {
        from: accounts[0],
        to: configs.receiving_addr,
        value: web3.toWei(0.1, 'ether')
    }

    web3.eth.sendTransaction(transactionObj, (error, result) => {
        console.log(result) // this is the transaction hash
    })
})