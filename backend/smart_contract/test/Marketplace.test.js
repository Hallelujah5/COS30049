const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Marketplace", function () {
  let MyNFT, myNFT, Marketplace, marketplace, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    MyNFT = await ethers.getContractFactory("MyNFT");
    myNFT = await MyNFT.deploy(ethers.ZeroAddress); // Updated
    await myNFT.waitForDeployment(); // Updated

    Marketplace = await ethers.getContractFactory("Marketplace");
    marketplace = await Marketplace.deploy(myNFT.target); // Updated to .target
    await marketplace.waitForDeployment(); // Updated

    await myNFT.mintNFT(owner.address, "ipfs://test1");
    await myNFT.approve(marketplace.target, 1); // Updated to .target
  });

  it("Should deploy with correct NFT contract address", async function () {
    expect(await marketplace.nftContract()).to.equal(myNFT.target); // Updated to .target
  });

  describe("listNFT", function () {
    it("Should list an NFT", async function () {
      const tx = await marketplace.listNFT(1, ethers.utils.parseEther("1"));
      expect(await myNFT.ownerOf(1)).to.equal(marketplace.target); // Updated
      const listing = await marketplace.listings(1);
      expect(listing.seller).to.equal(owner.address);
      expect(listing.price).to.equal(ethers.utils.parseEther("1"));
      expect(listing.active).to.be.true;
      expect(await marketplace.listingCount()).to.equal(1);
      expect(tx)
        .to.emit(marketplace, "NFTListed")
        .withArgs(1, owner.address, ethers.utils.parseEther("1"));
    });

    it("Should revert if non-owner lists", async function () {
      await expect(
        marketplace.connect(addr1).listNFT(1, ethers.utils.parseEther("1"))
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
      await marketplace.listNFT(1, ethers.utils.parseEther("1"));
      const tx = await marketplace
        .connect(addr1)
        .buyNFT(1, { value: ethers.utils.parseEther("1") });
      expect(await myNFT.ownerOf(1)).to.equal(addr1.address);
      expect(await marketplace.listings(1)).to.include({ active: false });
      expect(await marketplace.listingCount()).to.equal(0);
      expect(tx)
        .to.emit(marketplace, "NFTSold")
        .withArgs(
          1,
          addr1.address,
          owner.address,
          ethers.utils.parseEther("1")
        );
    });

    it("Should refund excess payment", async function () {
      await marketplace.listNFT(1, ethers.utils.parseEther("1"));
      const initialBalance = await ethers.provider.getBalance(addr1.address);
      await marketplace
        .connect(addr1)
        .buyNFT(1, { value: ethers.utils.parseEther("2") });
      const finalBalance = await ethers.provider.getBalance(addr1.address);
      expect(finalBalance).to.be.closeTo(
        initialBalance.sub(ethers.utils.parseEther("1")),
        ethers.utils.parseEther("0.1")
      );
    });

    it("Should revert if insufficient payment", async function () {
      await marketplace.listNFT(1, ethers.utils.parseEther("1"));
      await expect(
        marketplace
          .connect(addr1)
          .buyNFT(1, { value: ethers.utils.parseEther("0.5") })
      ).to.be.revertedWith("Insufficient payment");
    });
  });

  describe("cancelListing", function () {
    it("Should cancel a listing", async function () {
      await marketplace.listNFT(1, ethers.utils.parseEther("1"));
      const tx = await marketplace.cancelListing(1);
      expect(await myNFT.ownerOf(1)).to.equal(owner.address);
      expect(await marketplace.listings(1)).to.include({ active: false });
      expect(await marketplace.listingCount()).to.equal(0);
      expect(tx)
        .to.emit(marketplace, "ListingCancelled")
        .withArgs(1, owner.address);
    });

    it("Should revert if non-seller cancels", async function () {
      await marketplace.listNFT(1, ethers.utils.parseEther("1"));
      await expect(
        marketplace.connect(addr1).cancelListing(1)
      ).to.be.revertedWith("Only the seller can cancel");
    });
  });

  describe("getListing", function () {
    it("Should return listing details", async function () {
      await marketplace.listNFT(1, ethers.utils.parseEther("1"));
      const [tokenId, seller, price, active] = await marketplace.getListing(1);
      expect(tokenId).to.equal(1);
      expect(seller).to.equal(owner.address);
      expect(price).to.equal(ethers.utils.parseEther("1"));
      expect(active).to.be.true;
    });
  });
});
