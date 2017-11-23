pragma solidity ^0.4.0;

contract Token {

    uint256 public totalSupply;
    uint256 public availableNumber;
    mapping (address => uint256) balances;

    address owner;
    uint price = 100; // 1 ETH = 100 Token

    event Transfer(address indexed _from, address indexed _to, uint256 _amount);

    // Constructor
    // This function will be called when deploying
    function Token(uint256 _totalSupply) public {
        totalSupply = _totalSupply;
        availableNumber = _totalSupply;

        // Set owner is the person who deploy this contract
        owner = msg.sender;
    }

    // Fallback function
    // This function will be called when some account send ether
    // to this contract
    function () payable public {
        // Calculate amount of token
        uint256 amount = msg.value * price / 1 ether;
        if (amount > availableNumber) {
            amount = availableNumber;
        } 

        // Check amount > 0
        require(amount > 0);

        // Change token balance
        balances[msg.sender] += amount;
        availableNumber -= amount;

        // Refund eth
        msg.sender.transfer(msg.value - amount*1 ether/price);

        // Emit event
        Transfer(0x0, msg.sender,amount*1 ether/price);
    }

    // Constant function that return token balance of an address
    function balanceOf(address _addr) public constant returns (uint256) {
        return balances[_addr];
    }
}