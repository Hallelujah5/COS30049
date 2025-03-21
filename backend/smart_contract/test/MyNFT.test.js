const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT", function () {
  let MyNFT, myNFT, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    MyNFT = await ethers.getContractFactory("MyNFT");
    myNFT = await MyNFT.deploy(addr1.address); // Dummy marketplace address
    await myNFT.deployed();
  });

  it("Should deploy with correct initial state", async function () {
    expect(await myNFT.owner()).to.equal(owner.address);
    expect(await myNFT.marketplaceAddress()).to.equal(addr1.address);
    expect(await myNFT.tokenIdCounter()).to.equal(1);
  });

  describe("mintNFT", function () {
    it("Should mint an NFT correctly", async function () {
      const tx = await myNFT.mintNFT(addr1.address, "ipfs://test1");
      const receipt = await tx.wait();
      expect(await myNFT.ownerOf(1)).to.equal(addr1.address);
      expect(await myNFT.tokenURI(1)).to.equal("ipfs://test1");
      expect(await myNFT.balanceOf(addr1.address)).to.equal(1);
      expect(await myNFT.tokenIdCounter()).to.equal(2);
      expect(receipt).to.emit(myNFT, "Minted").withArgs(addr1.address, 1, "ipfs://test1");
      expect(receipt).to.emit(myNFT, "Transfer").withArgs(ethers.constants.AddressZero, addr1.address, 1);
    });

    it("Should revert when minting to zero address", async function () {
      await expect(myNFT.mintNFT(ethers.constants.AddressZero, "ipfs://test1"))
        .to.be.revertedWith("Recipient cannot be zero address");
    });
  });

  describe("approve", function () {
    it("Should approve an address", async function () {
      await myNFT.mintNFT(owner.address, "ipfs://test1");
      const tx = await myNFT.approve(addr1.address, 1);
      expect(await myNFT.getApproved(1)).to.equal(addr1.address);
      expect(tx).to.emit(myNFT, "Approval").withArgs(owner.address, addr1.address, 1);
    });

    it("Should revert if non-owner tries to approve", async function () {
      await myNFT.mintNFT(addr1.address, "ipfs://test1");
      await expect(myNFT.connect(addr2).approve(owner.address, 1))
        .to.be.revertedWith("Only owner can approve");
    });
  });

  describe("transfer", function () {
    it("Should transfer as owner", async function () {
      await myNFT.mintNFT(owner.address, "ipfs://test1");
      const tx = await myNFT.transfer(addr1.address, 1);
      expect(await myNFT.ownerOf(1)).to.equal(addr1.address);
      expect(await myNFT.balanceOf(owner.address)).to.equal(0);
      expect(await myNFT.balanceOf(addr1.address)).to.equal(1);
      expect(await myNFT.getApproved(1)).to.equal(ethers.constants.AddressZero);
      expect(tx).to.emit(myNFT, "Transfer").withArgs(owner.address, addr1.address, 1);
    });

    it("Should transfer as approved", async function () {
      await myNFT.mintNFT(owner.address, "ipfs://test1");
      await myNFT.approve(addr1.address, 1);
      await myNFT.connect(addr1).transfer(addr2.address, 1);
      expect(await myNFT.ownerOf(1)).to.equal(addr2.address);
    });

    it("Should revert if unauthorized", async function () {
      await myNFT.mintNFT(owner.address, "ipfs://test1");
      await expect(myNFT.connect(addr1).transfer(addr2.address, 1))
        .to.be.revertedWith("Only owner or approved address can transfer");
    });

    it("Should revert if transferring to zero address", async function () {
      await myNFT.mintNFT(owner.address, "ipfs://test1");
      await expect(myNFT.transfer(ethers.constants.AddressZero, 1))
        .to.be.revertedWith("Cannot transfer to zero address");
    });
  });

  describe("View functions", function () {
    it("Should return correct ownerOf", async function () {
      await myNFT.mintNFT(addr1.address, "ipfs://test1");
      expect(await myNFT.ownerOf(1)).to.equal(addr1.address);
      await expect(myNFT.ownerOf(2)).to.be.revertedWith("Token does not exist");
    });

    it("Should return correct tokenURI", async function () {
      await myNFT.mintNFT(addr1.address, "ipfs://test1");
      expect(await myNFT.tokenURI(1)).to.equal("ipfs://test1");
    });

    it("Should return correct balanceOf", async function () {
      await myNFT.mintNFT(addr1.address, "ipfs://test1");
      expect(await myNFT.balanceOf(addr1.address)).to.equal(1);
      await expect(myNFT.balanceOf(ethers.constants.AddressZero))
        .to.be.revertedWith("Cannot query zero address");
    });
  });
});