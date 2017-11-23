pragma solidity ^0.4.0;
import {Token} from "./Token.sol";

contract Admin {
    address owner;
    Token public tokenContract;

    function Admin(address _tokenAddress) public {
        tokenContract = Token(_tokenAddress);
        owner = msg.sender;
    }

    modifier onlyOwner(address _addr) {
        require(_addr == owner);
        _;
    }
    function () payable public {
        
    }

    function setDividend(uint _round, address[] _addrs, uint256[] _amounts) onlyOwner(msg.sender) payable public {
        tokenContract.setDividend.value(msg.value)(_round, _addrs, _amounts);
    }
}