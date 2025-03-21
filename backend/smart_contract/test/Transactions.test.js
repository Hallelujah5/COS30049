const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Transactions", function () {
  let Transactions, transactions, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    Transactions = await ethers.getContractFactory("Transactions");
    transactions = await Transactions.deploy();
    await transactions.waitForDeployment();
  });

  it.skip("Should deploy with correct owner", async function () {
    expect(await transactions.owner).to.equal(owner.address);
  });

  describe("addToBlockchain", function () {
    it("Should add a transaction", async function () {
      const tx = await transactions.addToBlockchain(
        addr1.address,
        ethers.parseEther("1"),
        "Hello",
        "Test",
        {
          value: ethers.parseEther("1"),
        }
      );
      const allTxs = await transactions.getAllTransactions();
      expect(allTxs.length).to.equal(1); // Check transaction was added
      expect(await transactions.transactionCount(owner.address)).to.equal(1); // Check sender count

      // Debug logs
      console.log(
        "ethers.BigNumber exists:",
        typeof ethers.BigNumber !== "undefined"
      );
      const latestBlock = await ethers.provider.getBlock("latest");
      console.log("Latest block timestamp:", latestBlock.timestamp);

      expect(tx).to.emit(transactions, "Transfer").withArgs(
        owner.address,
        addr1.address,
        ethers.parseEther("1"), // Returns BigInt in v6
        "Hello",
        "Test",
        BigInt(latestBlock.timestamp) // Use BigInt for uint256
      ); // Check event emission
    });

    it("Should revert if amount mismatch", async function () {
      await expect(
        transactions.addToBlockchain(
          addr1.address,
          ethers.parseEther("1"),
          "Hello",
          "Test",
          {
            value: ethers.parseEther("0.5"),
          }
        )
      ).to.be.revertedWith("Amount mismatch");
    });

    it("Should revert if receiver is zero address", async function () {
      await expect(
        transactions.addToBlockchain(
          ethers.ZeroAddress,
          ethers.parseEther("1"),
          "Hello",
          "Test",
          {
            value: ethers.parseEther("1"),
          }
        )
      ).to.be.revertedWith("Invalid recipient address");
    });
  });

  describe("receive and fallback", function () {
    it("Should receive ETH", async function () {
      await owner.sendTransaction({
        to: transactions.target,
        value: ethers.parseEther("1"),
      });
      expect(await transactions.getContractBalance()).to.equal(
        ethers.parseEther("1")
      );
    });
  });

  describe("withdrawTo", function () {
    it("Should withdraw ETH as owner", async function () {
      await owner.sendTransaction({
        to: transactions.target,
        value: ethers.parseEther("1"),
      });
      await transactions.withdrawTo(addr1.address, ethers.parseEther("1"));
      expect(await transactions.getContractBalance()).to.equal(0);
    });

    it("Should revert if non-owner withdraws", async function () {
      await expect(
        transactions
          .connect(addr1)
          .withdrawTo(addr1.address, ethers.parseEther("1"))
      ).to.be.revertedWith("Only owner can withdraw");
    });

    it("Should revert if insufficient balance", async function () {
      await expect(
        transactions.withdrawTo(addr1.address, ethers.parseEther("1"))
      ).to.be.revertedWith("Insufficient contract balance");
    });
  });

  describe("View functions", function () {
    it("Should return all transactions", async function () {
      await transactions.addToBlockchain(
        addr1.address,
        ethers.parseEther("1"),
        "Hello",
        "Test",
        {
          value: ethers.parseEther("1"),
        }
      );
      const allTxs = await transactions.getAllTransactions();
      expect(allTxs.length).to.equal(1);
    });

    it("Should return transaction count", async function () {
      await transactions.addToBlockchain(
        addr1.address,
        ethers.parseEther("1"),
        "Hello",
        "Test",
        {
          value: ethers.parseEther("1"),
        }
      );
      expect(await transactions.transactionCount(owner.address)).to.equal(1);
    });
  });
});
