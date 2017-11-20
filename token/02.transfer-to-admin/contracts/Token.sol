pragma solidity ^0.4.0;

contract Token {

    uint256 public totalSupply;
    uint256 public availableNumber;
    mapping (address => uint256) balances;

    address owner;
    uint price = 100; // 1 ETH = 100 Token
    address public admin;

    event Transfer(address indexed _from, address indexed _to, uint256 _amount);

    // Modifier will change behavior of a function
    // The function will execute code in the modifier
    // before execute its own codes.
    modifier onlyOwner(address _addr) {
        require(_addr == owner);
        _;
    }

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
        uint cost = amount*1 ether/price;
        msg.sender.transfer(msg.value - cost);

        // Transfer eth to admin
        admin.transfer(cost);

        // Emit event
        Transfer(0x0, msg.sender, amount);
    }

    function changeAdmin(address _adminAddress) onlyOwner(msg.sender) public {
        admin = _adminAddress;
    }

    // Constant function that return token balance of an address
    function balanceOf(address _addr) public constant returns (uint256) {
        return balances[_addr];
    }

}