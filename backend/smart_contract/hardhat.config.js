require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.0" },   // Hỗ trợ Transactions.sol
      { version: "0.8.20" }   // Hỗ trợ NFTTradingContract.sol
    ],
  },
  networks: {
    gochain: {
      url: process.env.LOCAL_NODE_URL || "http://127.0.0.1:8545",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
