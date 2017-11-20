pragma solidity ^0.4.0;

contract Token {

    uint256 public totalSupply;
    uint256 public availableNumber;
    mapping (address => uint256) balances;

    // Struct to store dividend infor of token holder 
    // Dividend will be shared by round
    struct Dividend {
        uint amount;
        bool claimed;
    }
    mapping(uint => mapping(address => Dividend)) public dividends;

    address owner;
    uint price = 100; // 1 ETH = 100 Token
    address public admin;

    event Transfer(address indexed _from, address indexed _to, uint256 _amount);
    event SetDividend(uint256 indexed _round, address indexed _to, uint256 _amount);
    event Claim(uint256 indexed _round, address indexed _to, uint256 _amount);

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

    function setDividend(uint256 _round, address[] _addrs, uint256[] _amounts) payable public {
        for (uint256 i = 0; i < _addrs.length; i++) {
            dividends[_round][_addrs[i]].amount = _amounts[i];
            dividends[_round][_addrs[i]].claimed = false;
            SetDividend(_round, _addrs[i], _amounts[i]);
        }
    }

    function claim(uint256 _round) public {
        if (dividends[_round][msg.sender].amount == 0 || dividends[_round][msg.sender].claimed) {
            return;
        }
        dividends[_round][msg.sender].claimed = true;
        msg.sender.transfer(dividends[_round][msg.sender].amount);
        Claim(_round, msg.sender, dividends[_round][msg.sender].amount);
    }

    // Constant function that return token balance of an address
    function balanceOf(address _addr) public constant returns (uint256) {
        return balances[_addr];
    }

    function dividendOf(address _addr, uint256 _round) public constant returns(uint256) {
        return dividends[_round][_addr].amount;
    }

}