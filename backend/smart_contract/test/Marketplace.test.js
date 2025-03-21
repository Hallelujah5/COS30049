const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Marketplace", function () {
  let MyNFT, myNFT, Marketplace, marketplace, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    MyNFT = await ethers.getContractFactory("MyNFT");
    myNFT = await MyNFT.deploy(ethers.ZeroAddress);
    await myNFT.waitForDeployment();

    Marketplace = await ethers.getContractFactory("Marketplace");
    marketplace = await Marketplace.deploy(myNFT.target);
    await marketplace.waitForDeployment();

    await myNFT.mintNFT(owner.address, "ipfs://test1");
    await myNFT.approve(marketplace.target, 1);
  });

  it("Should deploy with correct NFT contract address", async function () {
    expect(await marketplace.nftContract()).to.equal(myNFT.target);
  });

  describe("listNFT", function () {
    it("Should list an NFT", async function () {
      const tx = await marketplace.listNFT(1, ethers.parseEther("1"));
      expect(await myNFT.ownerOf(1)).to.equal(marketplace.target);
      const listing = await marketplace.listings(1);
      expect(listing[1]).to.equal(owner.address); // seller
      expect(listing[2]).to.equal(ethers.parseEther("1")); // price
      expect(listing[3]).to.be.true; // active
      expect(await marketplace.listingCount()).to.equal(1);
      expect(tx)
        .to.emit(marketplace, "NFTListed")
        .withArgs(1, owner.address, ethers.parseEther("1"));
    });

    it("Should revert if non-owner lists", async function () {
      await expect(
        marketplace.connect(addr1).listNFT(1, ethers.parseEther("1"))
      ).to.be.revertedWith("Only the owner can list the NFT");
    });

    it("Should revert if price is zero", async function () {
      await expect(marketplace.listNFT(1, 0)).to.be.revertedWith(
        "Price must be greater than zero"
      );
    });
  });

  describe("buyNFT", function () {
    it("Should buy a listed NFT", async function () {
      await marketplace.listNFT(1, ethers.parseEther("1"));
      const tx = await marketplace
        .connect(addr1)
        .buyNFT(1, { value: ethers.parseEther("1") });
      expect(await myNFT.ownerOf(1)).to.equal(addr1.address);
      const listing = await marketplace.listings(1);
      expect(listing[3]).to.be.false; // active
      expect(await marketplace.listingCount()).to.equal(0);
      expect(tx)
        .to.emit(marketplace, "NFTSold")
        .withArgs(1, addr1.address, owner.address, ethers.parseEther("1"));
    });

    it("Should revert if insufficient payment", async function () {
      await marketplace.listNFT(1, ethers.parseEther("1"));
      await expect(
        marketplace
          .connect(addr1)
          .buyNFT(1, { value: ethers.parseEther("0.5") })
      ).to.be.revertedWith("Insufficient payment");
    });
  });

  describe("cancelListing", function () {
    it("Should cancel a listing", async function () {
      await marketplace.listNFT(1, ethers.parseEther("1"));
      const tx = await marketplace.cancelListing(1);
      expect(await myNFT.ownerOf(1)).to.equal(owner.address);
      const listing = await marketplace.listings(1);
      expect(listing[3]).to.be.false; // active
      expect(await marketplace.listingCount()).to.equal(0);
      expect(tx)
        .to.emit(marketplace, "ListingCancelled")
        .withArgs(1, owner.address);
    });

    it("Should revert if non-seller cancels", async function () {
      await marketplace.listNFT(1, ethers.parseEther("1"));
      await expect(
        marketplace.connect(addr1).cancelListing(1)
      ).to.be.revertedWith("Only the seller can cancel");
    });
  });

  describe("getListing", function () {
    it("Should return listing details", async function () {
      await marketplace.listNFT(1, ethers.parseEther("1"));
      const [tokenId, seller, price, active] = await marketplace.getListing(1);
      expect(tokenId).to.equal(1);
      expect(seller).to.equal(owner.address);
      expect(price).to.equal(ethers.parseEther("1"));
      expect(active).to.be.true;
    });
  });
});
