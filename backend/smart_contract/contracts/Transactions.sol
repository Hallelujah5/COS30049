// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Transactions contract: Records and manages ETH transactions with metadata
contract Transactions {
    // Struct: Defines the details of a transaction
    struct Transaction {
        address from; // Sender address
        address to; // Receiver address
        uint256 amount; // Amount of ETH transferred (in wei)
        string message; // Custom message
        string keyword; // Custom keyword
        uint256 timestamp; // Time of the transaction
    }

    // Private array: Stores all transactions
    Transaction[] private transactions;
    // Mapping: Tracks the number of transactions per address
    mapping(address => uint256) public transactionCount;
    // Private address: Stores the contract owner (deployer)
    address private owner;

    // Event emitted when a transaction is recorded
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 amount,
        string message,
        string keyword,
        uint256 timestamp
    );

    // Constructor: Sets the deployer as the owner
    constructor() {
        owner = msg.sender; // Deployer becomes the owner
    }

    // Modifier: Restricts function access to only the contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can withdraw");
        _;
    }

    // Special function: Allows the contract to receive ETH directly
    receive() external payable {}

    // Fallback function: Handles ETH sent to the contract without a matching function
    fallback() external payable {}

    // Record a transaction and transfer ETH to a receiver
    function addToBlockchain(
        address payable receiver,
        uint256 amount,
        string memory message,
        string memory keyword
    ) public payable {
        require(msg.value == amount, "Amount mismatch"); // Ensure sent ETH matches specified amount
        require(receiver != address(0), "Invalid recipient address"); // Ensure receiver is valid

        (bool success, ) = receiver.call{value: msg.value}(""); // Send ETH to the receiver
        require(success, "Transfer failed"); // Revert if transfer fails

        transactions.push( // Add transaction to the array
            Transaction(msg.sender, receiver, msg.value, message, keyword, block.timestamp)
        );
        transactionCount[msg.sender]++; // Increment sender’s transaction count

        emit Transfer(msg.sender, receiver, msg.value, message, keyword, block.timestamp); // Emit transfer event
    }

    // View function: Get all recorded transactions
    function getAllTransactions() public view returns (Transaction[] memory) {
        return transactions; // Return the transaction array
    }

    // View function: Get the number of transactions for a specific address
    function getTransactionCount(address user) public view returns (uint256) {
        return transactionCount[user]; // Return the user’s transaction count
    }

    // View function: Get the current ETH balance of the contract
    function getContractBalance() public view returns (uint256) {
        return address(this).balance; // Return the contract’s balance
    }

    // Withdraw ETH from the contract to a specified address (only owner)
    function withdrawTo(address payable recipient, uint256 amount) public onlyOwner {
        require(address(this).balance >= amount, "Insufficient contract balance"); // Ensure enough ETH
        require(recipient != address(0), "Invalid recipient address"); // Ensure recipient is valid
        recipient.transfer(amount); // Send ETH to the recipient
    }
}