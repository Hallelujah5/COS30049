# Xyora Backend Setup

This README guides you through setting up the backend for Xyora, a decentralized NFT trading platform. The backend includes Ethereum smart contracts managed with Hardhat, plus a database and API (covered in a separate section).

## 1. Setting Up the Smart Contracts and Network

### Prerequisites
- **Node.js** and **npm**: Install from [nodejs.org](https://nodejs.org/) (v16+ recommended).
- **Git**: For cloning the repository.
- **MetaMask**: Chrome extension for wallet and network setup (instructions below).
- **Hardhat**: Installed via npm (see below).

### Initial Setup
1. **Navigate to the Backend Directory**:
   ```sh
   cd group-project-spr-2025-g6/backend/smart_contract/
   ```

2. **Install Dependencies**:
   ```sh
   npm install
   ```

### Start the Local Network
1. **Navigate to Smart Contract Directory**:
   ```sh
   cd backend/smart_contract
   ```

2. **Run Hardhat Node**:
   Start a local Ethereum node:
   ```sh
   npx hardhat node
   ```
   Note the network URL (e.g., `http://127.0.0.1:8545/`) from the first line of output—save this for later. Keep this terminal running.

### Redeploy the Smart Contracts
*Note: After modifying smart contracts, redeploy immediately. This is optional since deployment is pre-done, but redeploy if errors occur.*

1. **Navigate to Smart Contract Directory**:
   ```sh
   cd backend/smart_contract
   ```

2. **Remove Cache and Artifacts**:
   Clear old build files:
   ```sh
   Remove-Item -Recurse -Force cache, artifacts
   ```

3. **Clean the Project**:
   ```sh
   npx hardhat clean
   ```

4. **Compile the Contracts**:
   ```sh
   npx hardhat compile
   ```

5. **Run the Deployment Script**:
   ```sh
   npx hardhat run scripts/deploy.js --network gochain
   ```

### Update Frontend with Contract Artifacts
Copy these files from `group-project-spr-2025-g6/backend/smart_contract/artifacts/contracts/` to `group-project-spr-2025-g6/frontend/src/utils/`:
- `Transactions.sol/Transactions.json` → `Transactions.json`
- `MyNFT.sol/MyNFT.json` → `MyNFT.json`
- `Auction.sol/Auction.json` → `Auction.json`
- `Marketplace.sol/Marketplace.json` → `Marketplace.json`

### Verify Contract Addresses
Check `group-project-spr-2025-g6/frontend/src/utils/constants.js` for correct deployed addresses (logged during deployment).

### Create .env File
In `group-project-spr-2025-g6/backend/smart_contract/`, create `.env`:
```sh
touch .env
```
Add:
```text
LOCAL_NODE_URL=http://127.0.0.1:8545
PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```
*Notes:*
- Replace `LOCAL_NODE_URL` with your `npx hardhat node` output (e.g., `http://127.0.0.1:8545/`).
- Replace `PRIVATE_KEY` with your MetaMask private key (see MetaMask guide).
- This file isn’t committed for security—create it manually.

### Final Deployment Steps
With `.env`, artifacts in `frontend/src/utils/`, and correct addresses in `constants.js`:
```sh
cd backend/smart_contract
npm install
```

Verify Contracts:
Run tests:
```sh
npx hardhat test
```
*Expect: 38 passing and 1 pending.*

Your smart contracts are now working!

## 2. Setting Up MetaMask

### Install MetaMask
Add the Chrome extension and set up a wallet: [Getting Started with MetaMask](https://metamask.io/download.html).

### Add Custom Network (Required)
While `npx hardhat node` is running, add your local network to MetaMask: [How to Add a Custom Network](https://metamask.io/download.html).

Network details:
- **Network Name**: GoChain Testnet
- **URL**: Your `npx hardhat node` URL (e.g., `http://127.0.0.1:8545/`)
- **ID**: 31337 (local ETH network ID)
- **Network Currency**: GO

### Import Wallets (Required)
Run:
```sh
npx hardhat node
```
Copy the first 5 private keys from the output (e.g., `0xac0974...`).
Import them into MetaMask: [How to Import an Account](https://metamask.io/download.html).
These wallets come with test ETH for your local network.

## 3. Setting Up the Database and API

### Prerequisites
- **MySQL Workbench**: For managing the database.
- **Python**: Required for the API (v3.8+ recommended, installed from [python.org](https://www.python.org/)).
- **Node.js and npm**: Already installed from Section 1.

### Install and Set Up MySQL Workbench
1. **Install MySQL Workbench**:
   Follow this guide to download and install MySQL Workbench: [MySQL Workbench Installation](https://dev.mysql.com/downloads/workbench/).

2. **Check MySQL Status**:
   - Open the Services panel:
     ```sh
     Press Windows + R, type services.msc, and hit Enter.
     ```
   - Find “MySQL80” (or your MySQL service name), ensure it’s running. Start it if stopped.

### Start the Database and API
1. **Navigate to Project Root**:
   ```sh
   cd group-project-spr-2025-g6
Run the Startup Script: Execute the batch file to create a blank database and install dependencies:

sh
.\project_start.bat
Notes:

This installs dependencies from requirements.txt (assumed Python-based).
Creates a database with default credentials:
Username: root
Password: root
Default port is 3306. If your MySQL uses a different port, modify main.py accordingly.
Verify Setup:

Check MySQL Workbench to confirm the database exists (e.g., connect with root:root@localhost:3306).
The API should now be running (port unspecified—assumed started by project_start.bat).
Notes
Keep npx hardhat node running for MetaMask and deployment.
Update .env and constants.js if redeploying to a new network.
If MySQL port differs from 3306, edit main.py with your port.
Return to the main README to run the full platform!
