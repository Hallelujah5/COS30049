const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Auction", function () {
  let MyNFT, myNFT, Auction, auction, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    MyNFT = await ethers.getContractFactory("MyNFT");
    myNFT = await MyNFT.deploy(ethers.ZeroAddress); // Updated
    await myNFT.waitForDeployment(); // Updated

    Auction = await ethers.getContractFactory("Auction");
    auction = await Auction.deploy(myNFT.target); // Updated to .target
    await auction.waitForDeployment(); // Updated

    await myNFT.mintNFT(owner.address, "ipfs://test1");
    await myNFT.approve(auction.target, 1); // Updated to .target
  });

  it("Should deploy with correct NFT contract address", async function () {
    expect(await auction.nftContract()).to.equal(myNFT.target); // Updated to .target
  });

  describe("startAuction", function () {
    it("Should start an auction", async function () {
      const tx = await auction.startAuction(1, ethers.utils.parseEther("0.5"));
      expect(await myNFT.ownerOf(1)).to.equal(auction.target); // Updated
      const auctionDetails = await auction.auctions(1);
      expect(auctionDetails.seller).to.equal(owner.address);
      expect(auctionDetails.highestBid).to.equal(
        ethers.utils.parseEther("0.5")
      );
      expect(auctionDetails.endBlock).to.equal(
        (await ethers.provider.getBlockNumber()) + 2
      );
      expect(auctionDetails.active).to.be.true;
      expect(tx)
        .to.emit(auction, "AuctionStarted")
        .withArgs(
          1,
          owner.address,
          ethers.utils.parseEther("0.5"),
          ethers.BigNumber.from((await ethers.provider.getBlockNumber()) + 2)
        );
    });

    it("Should revert if non-owner starts", async function () {
      await expect(
        auction.connect(addr1).startAuction(1, ethers.utils.parseEther("0.5"))
      ).to.be.revertedWith("Only owner can start auction");
    });
  });

  describe("bid", function () {
    it("Should place a bid", async function () {
      await auction.startAuction(1, ethers.utils.parseEther("0.5"));
      const tx = await auction
        .connect(addr1)
        .bid(1, { value: ethers.utils.parseEther("1") });
      const auctionDetails = await auction.auctions(1);
      expect(auctionDetails.highestBidder).to.equal(addr1.address);
      expect(auctionDetails.highestBid).to.equal(ethers.utils.parseEther("1"));
      expect(tx)
        .to.emit(auction, "BidPlaced")
        .withArgs(1, addr1.address, ethers.utils.parseEther("1"));
    });

    it("Should refund previous bidder", async function () {
      await auction.startAuction(1, ethers.utils.parseEther("0.5"));
      await auction
        .connect(addr1)
        .bid(1, { value: ethers.utils.parseEther("1") });
      const initialBalance = await ethers.provider.getBalance(addr1.address);
      await auction
        .connect(addr2)
        .bid(1, { value: ethers.utils.parseEther("2") });
      const finalBalance = await ethers.provider.getBalance(addr1.address);
      expect(finalBalance).to.be.closeTo(
        initialBalance.add(ethers.utils.parseEther("1")),
        ethers.utils.parseEther("0.1")
      );
    });

    it("Should revert if bid too low", async function () {
      await auction.startAuction(1, ethers.utils.parseEther("0.5"));
      await expect(
        auction.connect(addr1).bid(1, { value: ethers.utils.parseEther("0.4") })
      ).to.be.revertedWith("Bid must exceed current highest bid");
    });
  });

  describe("endAuction", function () {
    it("Should end auction with a winner", async function () {
      await auction.startAuction(1, ethers.utils.parseEther("0.5"));
      await auction
        .connect(addr1)
        .bid(1, { value: ethers.utils.parseEther("1") });
      await network.provider.send("evm_mine"); // Mine 1 block
      await network.provider.send("evm_mine"); // Mine 2nd block
      const tx = await auction.endAuction(1);
      expect(await myNFT.ownerOf(1)).to.equal(addr1.address);
      expect(await auction.auctions(1)).to.include({ active: false });
      expect(tx)
        .to.emit(auction, "AuctionEnded")
        .withArgs(1, addr1.address, ethers.utils.parseEther("1"));
    });

    it("Should return NFT if no bids", async function () {
      await auction.startAuction(1, ethers.utils.parseEther("0.5"));
      await network.provider.send("evm_mine");
      await network.provider.send("evm_mine");
      const tx = await auction.endAuction(1);
      expect(await myNFT.ownerOf(1)).to.equal(owner.address);
      expect(tx).to.emit(auction, "AuctionEnded").withArgs(1, owner.address, 0);
    });

    it("Should revert if ended too early", async function () {
      await auction.startAuction(1, ethers.utils.parseEther("0.5"));
      await expect(auction.endAuction(1)).to.be.revertedWith(
        "Auction has not ended yet"
      );
    });
  });
});
