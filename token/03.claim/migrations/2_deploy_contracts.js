var Token = artifacts.require("./Token.sol");
var Admin = artifacts.require("./Admin.sol");

module.exports = function (deployer) {
  return deployer.deploy(Token, 200).then(() => {
    return deployer.deploy(Admin, Token.address)
  })
};
