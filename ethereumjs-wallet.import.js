var Web3 = require('web3')
var Wallet = require('ethereumjs-wallet')
var configs = require('./config')

let privKey = new Buffer(configs.private_key, 'hex')
wallet = Wallet.fromPrivateKey(privKey)
console.log('0x' + wallet.getPrivateKey().toString('hex'))
console.log('0x' + wallet.getAddress().toString('hex'))