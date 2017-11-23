
var Token = artifacts.require('./Token.sol');
var Admin = artifacts.require("./Admin.sol");

contract('Admin', function (accounts) {
    var admin, token;
    it('Set dividend', function () {
        return Admin.deployed()
            .then((instance) => {
                admin = instance;
                return Token.deployed()
            })
            .then((instance) => {
                token = instance;
                return admin.setDividend(0,
                    [accounts[3], accounts[4]],
                    [1e18, 22322],
                    { value: 1e18 * 10 }
                )
            })
            .then((rs) => {
                return token.dividendOf.call(accounts[3], 0)
            })
            .then((dividend) => {
                assert.equal(dividend.toNumber(), 1e18)
            })
    });

    it('Claim', function () {
        var ac = accounts[3]
        var oldBal;
        var txFee;
        // Get balance before claim
        oldBal = web3.eth.getBalance(ac);
        return token.claim(0, { from: ac })
            .then((rs) => {
                txFee = rs.receipt.gasUsed;
                var tx = web3.eth.getTransaction(rs.tx);
                txFee = tx.gasPrice * txFee;

                // // Get balance after claimed
                var newBal =  web3.eth.getBalance(ac)
                // // Expect new balance = old balance + claim - tx fee
                assert.equal(newBal, oldBal - txFee + 1e18)
            });
    })
});
