# Group 6 - Assignment 2

## Description
Xyora is a decentralized NFT trading platform built for Assignment 2, designed to empower NFT enthusiasts with a secure, efficient, and intermediary-free marketplace. Leveraging blockchain technology via smart contracts, Xyora enables peer-to-peer trading of digital collectibles. It features an auction system, a marketplace for direct NFT sales, a custom NFT contract (MyNFT), and a transaction logging system—all deployed on Ethereum. This project showcases a full-stack dApp with a React frontend and Hardhat-managed backend.

## Usage

To explore Xyora, follow these steps:

1. **Clone the Repository**:
   - Clone the project to your local machine:
     ```sh
     git clone https://github.com/COS30049-SUVHN/group-project-spr-2025-g6.git
     ```

2. **Set Up the Backend**:
   - Deploy the smart contracts and configure the blockchain backend. See detailed instructions in the [backend README](https://github.com/COS30049-SUVHN/group-project-spr-2025-g6/blob/main/backend/ReadMe.md).

3. **Set Up the Frontend**:
   - Launch the React interface to interact with the platform. Follow the setup guide in the [frontend README](https://github.com/COS30049-SUVHN/group-project-spr-2025-g6/blob/main/frontend/ReadMe.md).

4. **Run the Platform Locally**:
   - After following all instructions in the backend and frontend READMEs, you are now ready to run our platform locally:

   - **Start the Network**:
     - Open a terminal and navigate to the smart contract directory:
       ```sh
       cd /backend/smart_contract
       npx hardhat node
       ```
     - This starts a local Ethereum node for testing.

   - **Deploy Smart Contracts**:
     - In a new terminal (keep the node running), deploy the contracts:
       ```sh
       cd /backend/smart_contract
       npx hardhat run scripts/deploy.js --network gochain
       ```
     - This deploys Auction, Marketplace, MyNFT, and Transactions to your local network (assumed as "gochain" per your instruction).

   - **Deploy Database and Frontend**:
     - Open a Command Prompt terminal in VS Code, navigate to the project root, and run the batch script:
       ```sh
       cd group-project-spr-2025-g6
       .\project_start.bat
       ```
     - This starts the database and frontend services.

5. **Interact with Xyora**:
   - Access the app (typically at `http://localhost:5173`) to:
     - Mint NFTs via Create.
     - List or buy NFTs in the Marketplace - Buy page.
     - Bid on or end auctions in Marketplace - Buy page.
     - Record ETH transactions with metadata in Transactions.
     - List the transaction in the Profile page

## How It Works
- **MyNFT**: A custom ERC-721 contract for minting, transferring, and managing NFTs with unique token URIs.
- **Marketplace**: Allows users to list NFTs for sale at a fixed price and buy listed NFTs, transferring ownership and ETH seamlessly.
- **Auction**: Enables NFT auctions with bidding, a set duration (e.g., 2 blocks), and automatic winner selection or NFT return if no bids.
- **Transactions**: Logs all ETH transfers with metadata (message, keyword, timestamp) on-chain for transparency.
- **Frontend**: A React app connects to these contracts via ethers.js, providing an intuitive UI for trading and tracking.

## Prerequisites
To run Xyora locally, ensure you have:

- Git
- Node.js (includes npm)
- A Web3 wallet (e.g., MetaMask) with test ETH (e.g., Local ETH network (named GoChain)
- Python 3.8+

## Repository Structure
- **backend/**: Smart contracts, Hardhat config, Database and API (see [backend README](https://github.com/COS30049-SUVHN/group-project-spr-2025-g6/blob/main/backend/ReadMe.md)).
- **frontend/**: React app for user interaction (see [frontend README](https://github.com/COS30049-SUVHN/group-project-spr-2025-g6/blob/main/frontend/ReadMe.md)).
- **README.md**: This file—your starting point!

## License
This project is licensed under the MIT License.
