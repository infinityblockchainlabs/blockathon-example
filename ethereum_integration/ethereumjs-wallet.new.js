var Web3 = require('web3')
var Wallet = require('ethereumjs-wallet')

wallet = Wallet.generate()
console.log('0x' + wallet.getPrivateKey().toString('hex'))
console.log('0x' + wallet.getAddress().toString('hex'))