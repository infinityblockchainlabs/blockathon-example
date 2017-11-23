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
}