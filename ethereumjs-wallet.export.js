var Web3 = require('web3')
var Wallet = require('ethereumjs-wallet')
var configs = require('./config')

let privKey = new Buffer(configs.private_key, 'hex')
wallet = Wallet.fromPrivateKey(privKey)
console.log(wallet.toV3('your_password'))