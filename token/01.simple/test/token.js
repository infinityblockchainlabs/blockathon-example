
var Token = artifacts.require('./Token.sol');

contract('Token', function (accounts) {
    it('Should issue right number of tokens', function () {
        // Load smartcontract instant
        return Token.deployed().then(function (instance) {

            // Call function "totalSupply"
            instance.totalSupply.call().then((rs) => {
                var ac1 = accounts[1];
                var ac2 = accounts[2];
                var ammount1 = 1e18 * 1.5;
                var ammount2 = 1e18 * 1.5;

                // Send 1.5 eth from account 1 to get 150 tokens
                web3.eth.sendTransaction({ from: ac1, to: instance.address, value: ammount1 })
                return instance.balanceOf.call(ac1)
                    .then((rs) => {
                        assert.equal(rs.toString(10), '150');
                        // Send 1.5 eth from account1 to get 150 tokens
                        // But totalSupply=200 so, account2 get only 50 tokens
                        return web3.eth.sendTransaction({ from: ac2, to: instance.address, value: ammount2 });
                    })
                    .then((rs) => {
                        return instance.balanceOf.call(ac2);
                    })
                    .then((rs) => {
                        assert.equal(rs.toString(10), '50');
                    });
            })
        })
    });

});
