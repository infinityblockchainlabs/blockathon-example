var crypto = require('crypto')

function flipByte(bytesString) {
    return bytesString.match(/.{2}/g).reverse().join("")
}

var version = flipByte('20000000')
var prevHash = flipByte('0000000000000000009183725930bd669105ed2ccf13135e5899643bb3b6c308')
var curMerkleHash = flipByte('54aac5a19d967ee2ab4fb6cd8f92aebfc251dc92c3c9f9bdec3b19a442c75fcd')
var time = flipByte('5A0D30CF')
var bits = flipByte('1800ce4b')
var nonce = flipByte('98EC3F6A')

var data = new Buffer(version + prevHash + curMerkleHash + time + bits + nonce, 'hex')

let hash = crypto.createHash('sha256').update(data).digest()
hash = crypto.createHash('sha256').update(hash).digest()
console.log(flipByte(hash.toString('hex')))