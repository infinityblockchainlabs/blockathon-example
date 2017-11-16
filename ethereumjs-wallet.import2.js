var Web3 = require('web3')
var Wallet = require('ethereumjs-wallet')
var configs = require('./config')

let keystore = configs.key_store
wallet = Wallet.fromV3(keystore, configs.key_store_pw)
console.log('0x' + wallet.getPrivateKey().toString('hex'))
console.log('0x' + wallet.getAddress().toString('hex'))