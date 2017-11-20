var Web3 = require('web3')
var Tx = require('ethereumjs-tx')
var configs = require('./config')

web3 = new Web3(new Web3.providers.HttpProvider(configs.host))
let accounts = []
web3.eth.getAccounts((error, accounts) => {
    console.log(accounts)

    web3.eth.getTransactionCount(configs.address, (error, txCount) => {
        let privKey = new Buffer(configs.private_key, 'hex')
        let rawTransactionObj = {nonce: web3.toHex(txCount), to: accounts[0],
            value: web3.toHex(web3.toWei(0.01, 'ether')), gasPrice: web3.toHex(21000), 
            gasLimit: web3.toHex(300000),
        }
        let tx = new Tx(rawTransactionObj);
        tx.sign(privKey)
        let serializeTx = '0x' + tx.serialize().toString('hex')
        web3.eth.sendRawTransaction(serializeTx, (error, txHash) => {
            console.log(txHash)
        })
    })
})