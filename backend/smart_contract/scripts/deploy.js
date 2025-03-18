const hre = require("hardhat");

async function main() {
    const Transactions = await hre.ethers.getContractFactory("Transactions");
    const transactions = await Transactions.deploy();
    await transactions.waitForDeployment();
    console.log("Transactions deployed to:", transactions.target);

    const MyNFT = await hre.ethers.getContractFactory("MyNFT");
    const myNFT = await MyNFT.deploy("0x0000000000000000000000000000000000000000");
    await myNFT.waitForDeployment();
    console.log("MyNFT deployed to:", myNFT.target);

    const Marketplace = await hre.ethers.getContractFactory("Marketplace");
    const marketplace = await Marketplace.deploy(myNFT.target);
    await marketplace.waitForDeployment();
    console.log("Marketplace deployed to:", marketplace.target);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

runMain();