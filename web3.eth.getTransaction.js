var Web3 = require('web3')
var configs = require('./config')

web3 = new Web3(new Web3.providers.HttpProvider(configs.host))

web3.eth.getTransactionReceipt('0xffffbb7b3219eb06a8f9676d79a3e32013548ddfa2c29b8d3b7e157ceba69396', (error, tx) => {
    console.log(tx)
})

web3.eth.getTransaction('0xffffbb7b3219eb06a8f9676d79a3e32013548ddfa2c29b8d3b7e157ceba69396', (error, tx) => {
    console.log(tx)
})