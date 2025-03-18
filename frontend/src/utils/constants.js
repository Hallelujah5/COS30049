import transactionsAbi from "./Transactions.json";
import myNFTAbi from "./MyNFT.json";
import marketplaceAbi from "./Marketplace.json";

export const transactionsABI = transactionsAbi.abi;
export const transactionsAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Thay bằng địa chỉ sau khi deploy

export const myNFTABI = myNFTAbi.abi;
export const myNFTAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // From deploy.js (MyNFT (with marketplace) deployed to:)

export const marketplaceABI = marketplaceAbi.abi;
export const marketplaceAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; // From deploy.js
