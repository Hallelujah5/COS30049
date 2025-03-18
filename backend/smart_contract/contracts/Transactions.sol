// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Transactions {
    struct Transaction {
        address from;
        address to;
        uint256 amount;
        string message;
        string keyword;
        uint256 timestamp;
    }

    Transaction[] private transactions;
    mapping(address => uint256) public transactionCount;
    address private owner;

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 amount,
        string message,
        string keyword,
        uint256 timestamp
    );

    constructor() {
        owner = msg.sender; // Người deploy contract là chủ sở hữu
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can withdraw");
        _;
    }

    ///  Hàm nhận ETH vào smart contract
    receive() external payable {}

    ///  Hàm fallback để nhận ETH nếu không có hàm nào phù hợp
    fallback() external payable {}

    function addToBlockchain(
        address payable receiver,
        uint256 amount,
        string memory message,
        string memory keyword
    ) public payable {
        require(msg.value == amount, "Amount mismatch");
        require(receiver != address(0), "Invalid recipient address");

        (bool success, ) = receiver.call{value: msg.value}("");
        require(success, "Transfer failed");

        transactions.push(
            Transaction(msg.sender, receiver, msg.value, message, keyword, block.timestamp)
        );
        transactionCount[msg.sender]++;

        emit Transfer(msg.sender, receiver, msg.value, message, keyword, block.timestamp);
    }

    function getAllTransactions() public view returns (Transaction[] memory) {
        return transactions;
    }

    function getTransactionCount(address user) public view returns (uint256) {
        return transactionCount[user];
    }

    ///  Hàm lấy số dư của smart contract
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    ///  Hàm rút ETH từ smart contract (chỉ cho chủ sở hữu) với địa chỉ tùy chỉnh
    function withdrawTo(address payable recipient, uint256 amount) public onlyOwner {
        require(address(this).balance >= amount, "Insufficient contract balance");
        require(recipient != address(0), "Invalid recipient address");
        recipient.transfer(amount);
    }
}
